import type { StickerPackResponse } from '~~/server/utils/types'
import { useFormatter } from '~~/server/utils/responseFormatter'
import { useStickerlyApi } from '~~/server/utils/stickerlyApi'
import { useMapPack } from '~~/server/utils/mapPack'

export default defineCachedEventHandler(async (event) => {
  try {
    const packId = event.context.params?.packId

    if (!packId) {
      return useFormatter(false, 'Pack ID is required', null)
    }

    const response: StickerPackResponse = await useStickerlyApi(
      `stickerPack/${packId}`
    )

    const pack = useMapPack(response.result)

    const message = `Successfully retrieved sticker pack: ${pack.name}`
    return useFormatter(true, message, pack)
  } catch (error) {
    console.error('Error fetching sticker pack:', error)
    return useFormatter(false, 'Failed to fetch sticker pack', null, error)
  }
}, { swr: true, maxAge: 60 * 5, staleMaxAge: 60 * 60 * 24 })
// 5 minutes cache, 24 hours stale cache
