import type { StickerPackDetailed, OfficialUser } from './types'

export function useMapPack(pack: StickerPackDetailed) {
  // if the type is StickerPackResult console.log it

  console.log('StickerPackResult:', pack)

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
          id: (pack.user as OfficialUser).oid || null,
          name: (pack.user as OfficialUser).userName?.trim() || null,
          isOfficial: (pack.user as OfficialUser).isOfficial || false,
          profileUrl: (pack.user as OfficialUser).profileUrl || null
        }
      : null
  }
}
