export default defineCachedEventHandler(
  async () => {
    try {
      const apiResponse = await useStickerlyApi<RecommendTagsResponse>('sticker/tag/recommend', { method: 'GET' })
      const tags: string[] = apiResponse.result.recommendTags || []
      return useFormatter(true, 'Recommended tags fetched successfully', tags)
    } catch (error) {
      console.error('Error fetching recommended tags:', error)
      return useFormatter(false, 'Failed to fetch recommended tags', [], error)
    }
  },
  {
    swr: true,
    maxAge: 60 * 15, // 15 minutes cache
    staleMaxAge: 60 * 60 * 6 // 6 hours stale cache
  }
)
