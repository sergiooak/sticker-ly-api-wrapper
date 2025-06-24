// ==========================
// User Types
// ==========================

/** Base type for user properties shared across user types. */
export type BaseUser = {
  oid: string
  userName: string
  profileUrl: string
  creatorType: string
}

/** General user type, may include additional properties. */
export type User = BaseUser & {
  isOfficial?: boolean
  isMe?: boolean
  relationType?: string
}

/** Official user type, always marked as official. */
export type OfficialUser = BaseUser & {
  isOfficial: boolean
}

// ==========================
// Sticker Pack Types
// ==========================

/** Base type for sticker pack properties. */
export type BaseStickerPack = {
  isPaid: boolean
  packId: string
  thumb: boolean
  name: string
}

/** Sticker pack with additional details. */
export type StickerPack = BaseStickerPack & {
  trayResourceUrl: string
  nsfwScore: number
  resourceFileNames: string[]
  stickerCount: number
  status: string
  private: boolean
}

/** Detailed sticker pack information. */
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

// ==========================
// Sticker Types
// ==========================

/** Base type for sticker properties. */
export type BaseSticker = {
  sid: string
  animated: boolean
  isAnimated: boolean
  viewCount: number
  liked: boolean
}

/** Sticker with associated pack and user. */
export type Sticker = BaseSticker & {
  stickerPack: StickerPack
  user: User
  packId: string
  resourceUrl: string
  packName: string
}

/** Detailed sticker information. */
export type StickerDetail = BaseSticker & {
  stickerPack: StickerPack
  fileName: string
}

// ==========================
// API Response Types
// ==========================

/** Generic API response wrapper. */
export type ApiResponse<T> = {
  result: T
}

/** Result for a list of stickers. */
export type StickerListResult = {
  stickers: Sticker[]
  size?: number
}

/** Result for a list of sticker packs. */
export type StickerPackListResult = {
  stickerPacks: StickerPackDetailed[]
  paidStickerPacks?: StickerPackDetailed[]
  boardId?: number
}

/** Result for sticker pack search. */
export type StickerPackSearchResult = {
  stickerPacks: StickerPackDetailed[]
  hasMore: boolean
}

/** Result for a single sticker pack. */
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

/** Result for sticker categories. */
export type CategoryResult = {
  categories: {
    id: string
    name: string
    stickerCount: number
  }[]
}

/** Recommended sticker pack category. */
export type RecommendedPackCategory = {
  title: string
  stickerPacks: (StickerPackDetailed & {
    categoryType: string
    subCategoryType: string
    fullCategoryPath: string
    user: User
  })[]
}

/** Result for recommended pack categories. */
export type RecommendedPackCategoriesResult = {
  recommendedPackCategories: RecommendedPackCategory[]
}

// ==========================
// Specific API Response Types
// ==========================

export type StickerSearchResponse = ApiResponse<StickerListResult>
export type StickerRecommendResponse = ApiResponse<StickerListResult>
export type StickerRelatedResponse = ApiResponse<StickerListResult>
export type StickerPackRecommendedResponse = ApiResponse<StickerPackListResult>
export type StickerPackResponse = ApiResponse<StickerPackResult>
export type SearchPackResponse = ApiResponse<StickerPackSearchResult>
export type RecommendedPackCategoriesResponse = ApiResponse<RecommendedPackCategoriesResult>

// ==========================
// Legacy & Compatibility Types
// ==========================

/** Old type for recommended sticker pack (backward compatibility). */
export type StickerPackRecommended = StickerPackDetailed & {
  user: OfficialUser
}

export type StickerPackRecommendedUser = OfficialUser
export type StickerPackDetailSticker = StickerDetail

// ==========================
// Tag & Trending Types
// ==========================

/** Trending tag information. */
export type TrendingTag = {
  keyword: string
  isNew: boolean
  image: string
}

/** Response for trending tags. */
export type TrendingTagsResponse = {
  result: {
    keywords: TrendingTag[]
  }
}

/** Response for recommended tags. */
export type RecommendTagsResponse = {
  result: {
    recommendTags: string[]
  }
}

/** Sticker tag information. */
export type StickerTag = {
  tagName: string
  count: number
}

/** Response for sticker tag search. */
export type StickerTagSearchResponse = {
  result: {
    stickerTags: StickerTag[]
    nextCursor?: string
  }
}
