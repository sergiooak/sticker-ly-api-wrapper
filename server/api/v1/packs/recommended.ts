import type { StickerPackRecommendedResponse } from '~~/server/utils/types'
import { useFormatter } from '~~/server/utils/responseFormatter'
import { useStickerlyApi } from '~~/server/utils/stickerlyApi'
import { useMapPack } from '~~/server/utils/mapPack'

export default defineCachedEventHandler(async () => {
  try {
    const response = await useStickerlyApi<StickerPackRecommendedResponse>('stickerPack/recommend')

    const packs = response.result.stickerPacks.map(useMapPack)

    const premiumPacks = response.result.paidStickerPacks?.map(useMapPack) || []
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
}, { swr: true, maxAge: 60, staleMaxAge: 60 * 60 })
// 1 minute cache, 1 hour stale cache
