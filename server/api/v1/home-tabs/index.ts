export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'home-tabs-index'
    event.context.routePath = '/home-tabs'
    try {
      const response = await useFetchApi<HomeTabOverviewResponse>('hometab/overview', {
        method: 'GET'
      })
      return useFormatter(event, 200, 'Fetched home tab overview', response.result?.hometabs.map(tab => ({
        id: tab.id,
        title: tab.title,
        keyword: tab.keyword
      })) || null)
    } catch (error) {
      console.error('Error fetching home tab overview:', error)
      return useFormatter(event, 500, 'Failed to fetch home tab overview', null, error)
    }
  },
  {
    swr: true,
    maxAge: 60 * 5, // 5 minutes cache
    staleMaxAge: 60 * 60 // 1 hour stale cache
  }
)
