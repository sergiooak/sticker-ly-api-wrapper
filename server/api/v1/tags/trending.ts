export default defineCachedEventHandler(
  async () => {
    try {
      const apiResponse = await useFetchApi<TrendingTagsResponse>('trending/search', { method: 'POST' })
      const tags: TrendingTag[] = apiResponse.result.keywords || []
      return useFormatter(true, 'Trending tags fetched successfully', tags)
    } catch (error) {
      return useFormatter(false, 'Failed to fetch trending tags', [], error)
    }
  },
  {
    swr: true,
    maxAge: 60 * 15, // 15 minutes cache
    staleMaxAge: 60 * 60 * 6 // 6 hours stale cache
  }
)
