export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'packs-recommended'
    event.context.routePath = '/packs/recommended'
    try {
      const apiResponse = await useFetchApi<StickerPackRecommendedResponse>('stickerPack/recommend')

      const packs = apiResponse.result.stickerPacks.map(useMapPack)
      const premium = apiResponse.result.paidStickerPacks?.map(useMapPack) ?? []

      const result = { packs, premium }
      const infoMessage = `Found ${packs.length} recommended packs and ${premium.length} premium packs`

      return useFormatter(true, infoMessage, result)
    } catch (error) {
      console.error('Error fetching recommended sticker packs:', error)
      return useFormatter(false, 'Failed to fetch recommended sticker packs', null, error)
    }
  },
  {
    swr: true,
    maxAge: 60 * 10, // 10 minutes cache
    staleMaxAge: 60 * 60 * 2 // 2 hours stale cache
  }
)
