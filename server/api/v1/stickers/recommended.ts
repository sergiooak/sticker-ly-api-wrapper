type StickerPack = {
  isPaid: boolean
  trayResourceUrl: string
  packId: string
  nsfwScore: number
  resourceFileNames: string[]
  stickerCount: number
  thumb: boolean
  status: string
  name: string
  private: boolean
}

type User = {
  oid: string
  userName: string
  isOfficial: boolean
  profileUrl: string
  isMe: boolean
  relationType: string
  creatorType: string
}

type Sticker = {
  stickerPack: StickerPack
  user: User
  packId: string
  resourceUrl: string
  packName: string
  sid: string
  animated: boolean
  liked: boolean
  viewCount: number
  isAnimated: boolean
}

type StickerRecommendResponse = {
  result: {
    stickers: Sticker[]
  }
}

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

  const data = response.result.stickers.map(sticker => ({
    id: sticker.sid,
    url: sticker.resourceUrl,
    isAnimated: sticker.isAnimated,
    views: sticker.viewCount,
    pack: {
      id: sticker.packId,
      name: sticker.stickerPack.name.trim(),
      thumbnail: sticker.stickerPack.trayResourceUrl,
      isNsfw: sticker.stickerPack.nsfwScore > 0,
      nsfwScore: sticker.stickerPack.nsfwScore,
      stickerUrls: sticker.stickerPack.resourceFileNames.map(fileName =>
        sticker.resourceUrl.substring(0, sticker.resourceUrl.lastIndexOf('/')) + '/' + fileName
      )
    },
    user: {
      id: sticker.user?.oid || null,
      name: sticker.user?.userName.trim() || null,
      isOfficial: sticker.user?.isOfficial || false,
      profileUrl: sticker.user?.profileUrl || null
    }
  }))

  return useFormatter(true, `Found ${data.length} recommended stickers`, data)
}, { swr: true, maxAge: 60, staleMaxAge: 60 * 60 })
// 1 minute cache, 1 hour stale cache
