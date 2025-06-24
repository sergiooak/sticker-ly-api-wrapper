import type { Sticker } from './types'

export function useMapSticker(sticker: Sticker) {
  return {
    id: sticker.sid,
    url: sticker.resourceUrl,
    isAnimated: sticker.isAnimated,
    views: sticker.viewCount,
    pack: {
      id: sticker.packId,
      name: sticker.stickerPack.name?.trim(),
      thumbnail: sticker.stickerPack.trayResourceUrl,
      isNsfw: sticker.stickerPack.nsfwScore > 0,
      nsfwScore: sticker.stickerPack.nsfwScore,
      stickerUrls: (sticker.stickerPack.resourceFileNames || []).map((fileName: string) =>
        sticker.resourceUrl.substring(0, sticker.resourceUrl.lastIndexOf('/')) + '/' + fileName
      )
    },
    user: {
      id: sticker.user?.oid || null,
      name: sticker.user?.userName?.trim() || null,
      isOfficial: sticker.user?.isOfficial || false,
      profileUrl: sticker.user?.profileUrl || null
    }
  }
}
