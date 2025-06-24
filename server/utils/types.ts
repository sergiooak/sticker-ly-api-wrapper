// Types for stickers endpoints

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

export type StickerPackRecommendedUser = {
  oid: string
  userName: string
  isOfficial: boolean
  profileUrl: string
  creatorType: string
}

export type StickerPackRecommended = {
  user: StickerPackRecommendedUser
  isPaid: boolean
  packId: string
  animated: boolean
  trayIndex: number
  viewCount: number
  authorName: string
  resourceFiles: string[]
  exportCount: number
  isOfficial: boolean
  website: string
  thumb: boolean
  endNewmarkDate?: number
  isAnimated: boolean
  shareUrl: string
  resourceUrlPrefix: string
  resourceVersion: number
  resourceZip: string
  updated: number
  owner: string
  name: string
}

export type StickerPackRecommendedResponse = {
  result: {
    stickerPacks: StickerPackRecommended[]
    paidStickerPacks: StickerPackRecommended[]
    boardId: number
  }
}
