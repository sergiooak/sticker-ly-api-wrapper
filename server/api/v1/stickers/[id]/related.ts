export default defineCachedEventHandler(
  async (event) => {
    try {
      const { id } = getRouterParams(event)
      const response: StickerRelatedResponse = await useFetchApi(`sticker/related?sid=${id}`)
      const data = response.result.stickers.map(useMapSticker)
      return useFormatter(true, `Found ${data.length} related stickers`, data)
    } catch (error) {
      return useFormatter(false, 'Failed to fetch related stickers', null, error)
    }
  },
  {
    swr: true,
    maxAge: 60,
    staleMaxAge: 60 * 60
  }
)
