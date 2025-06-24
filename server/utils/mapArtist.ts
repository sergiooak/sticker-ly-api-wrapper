import type { StickerlyArtist, StickerlyArtistRaw } from './types'

export function useMapArtist(user: StickerlyArtistRaw): StickerlyArtist {
  return {
    oid: user.oid,
    isPrivate: user.isPrivate,
    allowUserCollection: user.allowUserCollection,
    stickerCount: user.stickerCount,
    relationship: user.relationship,
    followerCount: user.followerCount,
    followingCount: user.followingCount,
    isOfficial: user.isOfficial,
    creatorType: user.creatorType,
    bio: user.bio,
    socialLink: user.socialLink,
    newUser: user.newUser,
    isMe: user.isMe,
    shareUrl: user.shareUrl,
    profileUrl: user.profileUrl,
    coverUrl: user.coverUrl,
    userName: user.userName,
    displayName: user.displayName
  }
}
