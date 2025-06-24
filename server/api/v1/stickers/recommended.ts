export default defineCachedEventHandler(async () => {
  const response: StickerRecommendResponse = await useStickerlyApi(`sticker/recommend`)

  const data = response.result.stickers.map(useMapSticker)

  return useFormatter(true, `Found ${data.length} recommended stickers`, data)
}, { swr: true, maxAge: 60, staleMaxAge: 60 * 60 })
// 1 minute cache, 1 hour stale cache
