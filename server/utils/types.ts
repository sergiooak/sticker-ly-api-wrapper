// Base types for shared properties

export type BaseUser = {
  oid: string
  userName: string
  profileUrl: string
  creatorType: string
}

export type User = BaseUser & {
  isOfficial?: boolean
  isMe?: boolean
  relationType?: string
}

export type OfficialUser = BaseUser & {
  isOfficial: boolean
}

// Sticker pack types
export type BaseStickerPack = {
  isPaid: boolean
  packId: string
  thumb: boolean
  name: string
}

export type StickerPack = BaseStickerPack & {
  trayResourceUrl: string
  nsfwScore: number
  resourceFileNames: string[]
  stickerCount: number
  status: string
  private: boolean
}

export type StickerPackDetailed = BaseStickerPack & {
  animated: boolean
  trayIndex: number
  viewCount: number
  authorName: string
  exportCount: number
  isOfficial: boolean
  website: string
  endNewmarkDate?: number
  isAnimated: boolean
  shareUrl: string
  resourceUrlPrefix: string
  resourceVersion: number
  resourceZip: string
  updated: number
  owner: string
  resourceFiles: string[]
}

// Sticker types
export type BaseSticker = {
  sid: string
  animated: boolean
  isAnimated: boolean
  viewCount: number
  liked: boolean
}

export type Sticker = BaseSticker & {
  stickerPack: StickerPack
  user: User
  packId: string
  resourceUrl: string
  packName: string
}

export type StickerDetail = BaseSticker & {
  stickerPack: StickerPack
  fileName: string
}

// API response types with generics to reduce repetition
export type ApiResponse<T> = {
  result: T
}

export type StickerListResult = {
  stickers: Sticker[]
  size?: number
}

export type StickerPackListResult = {
  stickerPacks: StickerPackDetailed[]
  paidStickerPacks?: StickerPackDetailed[]
  boardId?: number
}

export type StickerPackSearchResult = {
  stickerPacks: StickerPackDetailed[]
  hasMore: boolean
}

export type StickerPackResult = {
  stickers: StickerDetail[]
  packId: string
  exportCount: number
  animated: boolean
  thumb: boolean
  website: string
  viewCount: number
  authorName: string
  trayIndex: number
  isPaid: boolean
  isAnimated: boolean
  resourceVersion: number
  shareUrl: string
  resourceZip: string
  resourceUrlPrefix: string
  owner: string
  updated: number
  name: string
}

export type CategoryResult = {
  categories: {
    id: string
    name: string
    stickerCount: number
  }[]
}

export type RecommendedPackCategory = {
  title: string
  stickerPacks: (StickerPackDetailed & {
    categoryType: string
    subCategoryType: string
    fullCategoryPath: string
    user: User
  })[]
}

export type RecommendedPackCategoriesResult = {
  recommendedPackCategories: RecommendedPackCategory[]
}

// Specific response types using generics
export type StickerSearchResponse = ApiResponse<StickerListResult>
export type StickerRecommendResponse = ApiResponse<StickerListResult>
export type StickerRelatedResponse = ApiResponse<StickerListResult>
export type StickerPackRecommendedResponse = ApiResponse<StickerPackListResult>
export type StickerPackResponse = ApiResponse<StickerPackResult>
export type SearchPackResponse = ApiResponse<StickerPackSearchResult>
export type RecommendedPackCategoriesResponse = ApiResponse<RecommendedPackCategoriesResult>

// Keeping old type for backward compatibility
export type StickerPackRecommended = StickerPackDetailed & {
  user: OfficialUser
}

export type StickerPackRecommendedUser = OfficialUser
export type StickerPackDetailSticker = StickerDetail

export type TrendingTag = {
  keyword: string
  isNew: boolean
  image: string
}

export type TrendingTagsResponse = {
  result: {
    keywords: TrendingTag[]
  }
}

export type RecommendTagsResponse = {
  result: {
    recommendTags: string[]
  }
}

export type StickerTag = {
  tagName: string
  count: number
}

export type StickerTagSearchResponse = {
  result: {
    stickerTags: StickerTag[]
    nextCursor?: string
  }
}
