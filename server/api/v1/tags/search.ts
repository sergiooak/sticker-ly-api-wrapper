export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'tags-search'
    event.context.routePath = '/tags/search'
    try {
      const query = getQuery(event)
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

      // Sticker.ly API request
      const apiResponse = await useFetchApi<StickerTagSearchResponse>('stickerTag/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          keyword: lowercasedKeyword,
          size: pageSize,
          cursor: page,
          limit: pageSize
        }
      })

      const tags = apiResponse.result.stickerTags || []
      const nextCursor = apiResponse.result.nextCursor
      const total = tags.length
      const pageCount = nextCursor ? page + 1 : page
      const meta = {
        keyword: {
          original: keyword,
          improved: lowercasedKeyword
        },
        pagination: {
          page,
          pageSize,
          pageCount,
          total
        }
      }

      return useFormatter(true, `Found ${tags.length} tags for "${keyword}"`, tags, { meta })
    } catch (error) {
      console.error('Error searching sticker tags:', error)
      return useFormatter(false, 'Failed to search sticker tags', null, error)
    }
  },
  {
    swr: true,
    maxAge: 30, // 30 seconds cache
    staleMaxAge: 60 * 30 // 30 minutes stale cache
  }
)
