export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'tags-recommended'
    event.context.routePath = '/tags/recommended'
    try {
      const apiResponse = await useFetchApi<RecommendTagsResponse>('sticker/tag/recommend', { method: 'GET' })
      const tags: string[] = apiResponse.result.recommendTags || []
      return useFormatter(event, 200, 'Recommended tags fetched successfully', tags)
    } catch (error) {
      console.error('Error fetching recommended tags:', error)
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
    maxAge: 60 * 10, // 10 minutes cache
    staleMaxAge: 60 * 60 * 2 // 2 hours stale cache
  }
)
