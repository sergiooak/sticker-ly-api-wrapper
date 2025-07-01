export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'packs-search'
    event.context.routePath = '/packs/search'
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

      return useFormatter(true, `Found ${stickers.length} stickers for "${keyword}"`, stickers, { meta })
    } catch (error) {
      console.error('Error searching stickers:', error)
      return useFormatter(false, 'Failed to search stickers', null, error)
    }
  },
  {
    swr: true,
    maxAge: 30, // 30 seconds cache
    staleMaxAge: 60 * 30 // 30 minutes stale cache
  }
)
