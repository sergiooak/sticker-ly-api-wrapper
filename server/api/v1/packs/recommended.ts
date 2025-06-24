export default defineEventHandler(async (_event) => {
  try {
    const response = await useStickerlyApi<StickerPackRecommendedResponse>('stickerPack/recommend')

    const packs = response.result.stickerPacks.map((pack) => {
      return {
        id: pack.packId,
        name: pack.name?.trim(),
        isAnimated: pack.isAnimated,
        isPaid: pack.isPaid,
        views: pack.viewCount,
        stickerUrls: (pack.resourceFiles || []).map((fileName: string) =>
          pack.resourceUrlPrefix + fileName
        ),
        user: {
          id: pack.user?.oid || null,
          name: pack.user?.userName?.trim() || null,
          isOfficial: pack.user?.isOfficial || false,
          profileUrl: pack.user?.profileUrl || null
        }
      }
    })

    const premiumPacks = response.result.paidStickerPacks.map((pack) => {
      return {
        id: pack.packId,
        name: pack.name?.trim(),
        isAnimated: pack.isAnimated,
        isPaid: pack.isPaid,
        views: pack.viewCount,
        stickerUrls: (pack.resourceFiles || []).map((fileName: string) =>
          pack.resourceUrlPrefix + fileName
        ),
        user: {
          id: pack.user?.oid || null,
          name: pack.user?.userName?.trim() || null,
          isOfficial: pack.user?.isOfficial || false,
          profileUrl: pack.user?.profileUrl || null
        }
      }
    })
    const data = {
      packs,
      premiumPacks
    }

    const message = `Found ${packs.length} recommended packs and ${premiumPacks.length} premium packs`
    return useFormatter(true, message, data)
  } catch (error) {
    console.error('Error fetching recommended sticker packs:', error)
    return useFormatter(false, 'Failed to fetch recommended sticker packs', null, error)
  }
})
