export default defineEventHandler(
  async (event) => {
    try {
      const id = event.context?.params?.id || event.req.url?.split('/').pop()
      if (!id) {
        throw new Error('Missing home tab id')
      }
      const response = await useStickerlyApi<HomeTabPacksResponse>(`hometab/${id}/packs`, { method: 'GET' })
      const packs = (response.result?.stickerPacks || []).map(useMapPack)
      return useFormatter(true, 'Fetched home tab packs', packs)
    } catch (error) {
      return useFormatter(false, 'Failed to fetch home tab packs', null, error)
    }
  }
)
