export default defineCachedEventHandler(
  async (event) => {
    try {
      const { id } = getRouterParams(event)
      const response: StickerRelatedResponse = await useFetchApi(`sticker/related?sid=${id}`)
      const data = response.result.stickers.map(useMapSticker)
      return useFormatter(true, `Found ${data.length} related stickers`, data)
    } catch (error) {
      console.error('Error fetching related stickers:', error)
      return useFormatter(false, 'Failed to fetch related stickers', null, error)
    }
  },
  {
    swr: true,
    maxAge: 60 * 5, // 5 minutes cache
    staleMaxAge: 60 * 60 // 1 hour stale cache
  }
)
