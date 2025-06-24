export default defineCachedEventHandler(
  async () => {
    try {
      const response = await useStickerlyApi<TrendingSearchResponse>('trending/search', { method: 'POST' })

      const artists = (response?.result?.recommendUsers || [])
        .map((item: RecommendUser) => useMapArtist(item.user))

      return useFormatter(true, 'Trending artists fetched successfully', artists)
    } catch (error) {
      console.error('Error fetching recommended artists:', error)
      return useFormatter(false, 'Failed to fetch recommended artists', null, error)
    }
  },
  {
    swr: true,
    maxAge: 60, // 1 minute cache
    staleMaxAge: 60 * 60 // 1 hour stale cache
  }
)
