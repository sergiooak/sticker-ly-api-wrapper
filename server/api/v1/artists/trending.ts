export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'artists-trending'
    event.context.routePath = '/artists/trending'
    try {
      const response = await useFetchApi<TrendingSearchResponse>('trending/search', { method: 'POST' })

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
    maxAge: 60 * 30, // 30 minutes cache
    staleMaxAge: 60 * 60 * 6 // 6 hours stale cache
  }
)
