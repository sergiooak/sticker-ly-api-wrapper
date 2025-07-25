export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'home-tabs-id'
    event.context.routePath = '/home-tabs/[id]'
    try {
      const id = event.context?.params?.id || event.req.url?.split('/').pop()
      if (!id) {
        throw new Error('Missing home tab id')
      }
      const response = await useFetchApi<HomeTabPacksResponse>(`hometab/${id}/packs`, { method: 'GET' })
      const packs = (response.result?.stickerPacks || []).map(useMapPack)
      return useFormatter(event, 200, 'Fetched home tab packs', packs)
    } catch (error) {
      console.error('Error fetching home tab packs:', error)
      return useFormatter(event, 500, 'Failed to fetch home tab packs', null, error)
    }
  },
  {
    swr: true,
    maxAge: 60 * 5, // 5 minutes cache
    staleMaxAge: 60 * 60 // 1 hour stale cache
  }
)
