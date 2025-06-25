export default defineCachedEventHandler(
  async () => {
    try {
      const response: StickerRecommendResponse = await useFetchApi(`sticker/recommend`)
      const data = response.result.stickers.map(useMapSticker)
      return useFormatter(true, `Found ${data.length} recommended stickers`, data)
    } catch (error) {
      console.error('Error fetching recommended stickers:', error)
      return useFormatter(false, 'Failed to fetch recommended stickers', null, error)
    }
  },
  {
    swr: true,
    maxAge: 60 * 10, // 10 minutes cache
    staleMaxAge: 60 * 60 * 2 // 2 hours stale cache
  }
)
