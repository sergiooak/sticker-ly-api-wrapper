export default defineCachedEventHandler(
  async () => {
    try {
      const apiResponse = await useStickerlyApi<StickerPackRecommendedResponse>('stickerPack/recommend')

      const recommendedPacks = apiResponse.result.stickerPacks.map(useMapPack)
      const paidPacks = apiResponse.result.paidStickerPacks?.map(useMapPack) ?? []

      const result = { recommendedPacks, paidPacks }
      const infoMessage = `Found ${recommendedPacks.length} recommended packs and ${paidPacks.length} premium packs`

      return useFormatter(true, infoMessage, result)
    } catch (error) {
      console.error('Error fetching recommended sticker packs:', error)
      return useFormatter(false, 'Failed to fetch recommended sticker packs', null, error)
    }
  },
  {
    swr: true,
    maxAge: 60, // 1 minute cache
    staleMaxAge: 60 * 60 // 1 hour stale cache
  }
)
