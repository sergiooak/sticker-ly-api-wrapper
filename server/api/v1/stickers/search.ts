export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'stickers-search'
    event.context.routePath = '/stickers/search'
    try {
      const query = getQuery(event)
      // Strapi-style pagination
      const page = Number(query['pagination[page]']) || 1
      const pageSize = Number(query['pagination[pageSize]']) || 10
      const keyword = (query['keyword'] as string)?.trim() || ''

      if (!keyword) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Keyword is required'
        })
      }

      const lowercasedKeyword = keyword.trim().toLowerCase()
      if (lowercasedKeyword.length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Keyword must contain at least one letter or number'
        })
      }

      const lowercasedKeywordWithoutAccents = lowercasedKeyword
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()

      const keywordParts = lowercasedKeywordWithoutAccents
        .split(/\s+/)
        .filter(Boolean)

      const normalizedKeyword = keywordParts.join(' | ')
      const country = 'country:BR'
      const finalKeyword = [
        lowercasedKeyword,
        lowercasedKeywordWithoutAccents,
        normalizedKeyword,
        country
      ].join(' | ')

      // Sticker.ly API request
      const response: StickerSearchResponse = await useFetchApi('sticker/searchV2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          keyword: finalKeyword,
          size: pageSize,
          cursor: page,
          limit: pageSize
        }
      })

      const stickers = response.result.stickers.map(useMapSticker)

      if (!stickers || stickers.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: `No stickers found for "${keyword}"`
        })
      }

      // Pagination meta
      const total = response.result.size || 0
      const pageCount = Math.ceil(total / pageSize)
      const meta = {
        keyword: {
          original: keyword,
          improved: finalKeyword
        },
        pagination: {
          page,
          pageSize,
          pageCount,
          total
        }
      }

      return useFormatter(event, 200, `Found ${stickers.length} stickers for "${keyword}"`, stickers, meta)
    } catch (error) {
      console.warn('Error searching stickers:', error)
      // @ts-expect-error - TypeScript doesn't know about the error structure
      const { statusCode = 500, statusMessage = 'Internal Server Error' } = (error as unknown) || {}
      return useFormatter(event, statusCode, statusMessage, [], {
        message: (error as Error).message || 'An unexpected error occurred',
        stack: (error as Error).stack || 'No stack trace available'
      })
    }
  },
  {
    swr: true,
    maxAge: 30, // 30 seconds cache
    staleMaxAge: 60 * 30 // 30 minutes stale cache
  }
)
