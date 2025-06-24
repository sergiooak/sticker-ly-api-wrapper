// Shared types and mapping logic for stickers endpoints

export type StickerPack = {
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

export type User = {
  oid: string
  userName: string
  isOfficial?: boolean
  profileUrl: string
  isMe?: boolean
  relationType?: string
  creatorType: string
}

export type Sticker = {
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

export function mapSticker(sticker: any) {
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

export type StickerSearchResponse = {
  result: {
    stickers: Sticker[]
    size: number
  }
}

export type StickerRecommendResponse = {
  result: {
    stickers: Sticker[]
  }
}

export type StickerRelatedResponse = {
  result: {
    stickers: Sticker[]
  }
}
