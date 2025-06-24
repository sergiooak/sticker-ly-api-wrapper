export function useMapPack(pack: StickerPackRecommended | StickerPackResult) {
  return {
    id: pack.packId,
    name: pack.name?.trim(),
    isAnimated: pack.isAnimated,
    isPaid: pack.isPaid,
    views: pack.viewCount,
    stickerUrls: ('resourceFiles' in pack && 'resourceUrlPrefix' in pack && Array.isArray(pack.resourceFiles)
      ? pack.resourceFiles.map((fileName: string) => pack.resourceUrlPrefix + fileName)
      : []
    ),
    user: 'user' in pack && pack.user
      ? {
          id: pack.user.oid || null,
          name: pack.user.userName?.trim() || null,
          isOfficial: pack.user.isOfficial || false,
          profileUrl: pack.user.profileUrl || null
        }
      : null
  }
}
