export default defineCachedEventHandler(
  async () => {
    try {
      const response = await useFetchApi<HomeTabOverviewResponse>('hometab/overview', {
        method: 'GET'
      })
      return useFormatter(true, 'Fetched home tab overview', response.result?.hometabs.map(tab => ({
        id: tab.id,
        title: tab.title,
        keyword: tab.keyword
      })) || null)
    } catch (error) {
      console.error('Error fetching home tab overview:', error)
      return useFormatter(false, 'Failed to fetch home tab overview', null, error)
    }
  },
  {
    swr: true,
    maxAge: 60, // 1 minute cache
    staleMaxAge: 60 * 60 // 1 hour stale cache
  }
)
