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

/** Raw artist type as received from Stickerly API. */
export type StickerlyArtistRaw = {
  oid: string
  isPrivate: boolean
  allowUserCollection: boolean
  stickerCount: number
  relationship: string
  followerCount: number
  followingCount: number
  isOfficial: boolean
  creatorType: string
  bio: string
  socialLink: string[]
  newUser: boolean
  isMe: boolean
  shareUrl: string
  profileUrl: string
  coverUrl: string
  userName: string
  displayName: string
}

/** Wrapper for recommended user in trending search response. */
export type RecommendUser = {
  user: StickerlyArtistRaw
}

/** Trending search API response structure. */
export type TrendingSearchResponse = {
  result: {
    recommendUsers: RecommendUser[]
  }
}

/** Artist information for Stickerly. */
export interface StickerlyArtist {
  id: string
  name: string
  username: string
  bio: string
  stickerCount: number
  followerCount: number
  followingCount: number
  isOfficial: boolean
  creatorType: string
  profileUrl: string
  coverUrl: string
}

// ==========================
// Home Tab Types
// ==========================

export type HomeTabOverview = {
  layoutType: string
  keyword: string
  contentType: string
  limit: number
  title: string
  id: number
}

export type HomeTabOverviewResponse = {
  result: {
    hometabs: HomeTabOverview[]
  }
}

export type HomeTabPacksResponse = {
  result: {
    stickerPacks: StickerPackDetailed[]
  }
}

// ==========================
// API Logging Types
// ==========================

/** API request log entry for database storage */
export type ApiLogEntry = {
  id: string
  method: string
  route_id: string
  route_path: string
  full_url: string
  requester_ip: string
  user_agent?: string
  referer?: string
  status_code: number
  response_time_ms: number
  error_message?: string
  created_at: string
  updated_at: string
}

/** API log creation payload (without auto-generated fields) */
export type ApiLogCreate = Omit<ApiLogEntry, 'id' | 'created_at' | 'updated_at'>
