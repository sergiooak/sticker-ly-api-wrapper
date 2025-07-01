export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'tags-recommended'
    event.context.routePath = '/tags/recommended'
    try {
      const apiResponse = await useFetchApi<RecommendTagsResponse>('sticker/tag/recommend', { method: 'GET' })
      const tags: string[] = apiResponse.result.recommendTags || []
      return useFormatter(true, 'Recommended tags fetched successfully', tags)
    } catch (error) {
      console.error('Error fetching recommended tags:', error)
      return useFormatter(false, 'Failed to fetch recommended tags', [], error)
    }
  },
  {
    swr: true,
    maxAge: 60 * 10, // 10 minutes cache
    staleMaxAge: 60 * 60 * 2 // 2 hours stale cache
  }
)
