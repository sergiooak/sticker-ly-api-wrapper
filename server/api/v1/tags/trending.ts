export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'tags-trending'
    event.context.routePath = '/tags/trending'
    try {
      const apiResponse = await useFetchApi<TrendingTagsResponse>('trending/search', { method: 'POST' })
      const tags: TrendingTag[] = apiResponse.result.keywords || []
      return useFormatter(event, 200, 'Trending tags fetched successfully', tags)
    } catch (error) {
      console.error('Error fetching trending tags:', error)
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
    maxAge: 60 * 30, // 30 minutes cache
    staleMaxAge: 60 * 60 * 6 // 6 hours stale cache
  }
)
