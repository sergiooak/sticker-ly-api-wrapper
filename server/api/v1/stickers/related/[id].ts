export default defineCachedEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const response: StickerRelatedResponse = await useStickerlyApi(`sticker/related?sid=${id}`)

  const data = response.result.stickers.map(useMapSticker)

  return useFormatter(true, `Found ${data.length} related stickers`, data)
}, { swr: true, maxAge: 60, staleMaxAge: 60 * 60 })
// 1 minute cache, 1 hour stale cache
