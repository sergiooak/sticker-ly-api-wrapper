export default defineCachedEventHandler(async () => {
  const apiBaseUrl = 'https://api.sticker.ly/'
  const version = 'v4'
  const endpoint = 'sticker/recommend'

  const url = `${apiBaseUrl}${version}/${endpoint}`

  // request to the Sticker.ly API
  const response: StickerRecommendResponse = await $fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'androidapp.stickerly/2.16.0 (G011A; U; Android 22; pt-BR; br;)'
    }
  })

  const data = response.result.stickers.map(useMapSticker)

  return useFormatter(true, `Found ${data.length} recommended stickers`, data)
}, { swr: true, maxAge: 60, staleMaxAge: 60 * 60 })
// 1 minute cache, 1 hour stale cache
