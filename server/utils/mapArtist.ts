import type { StickerlyArtist, StickerlyArtistRaw } from './types'

export function useMapArtist(user: StickerlyArtistRaw): StickerlyArtist {
  return {
    id: user.oid,
    name: user.displayName,
    username: user.userName,
    bio: user.bio,
    stickerCount: user.stickerCount,
    followerCount: user.followerCount,
    followingCount: user.followingCount,
    isOfficial: user.isOfficial,
    creatorType: user.creatorType,
    profileUrl: user.profileUrl,
    coverUrl: user.coverUrl
  }
}
