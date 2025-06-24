export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const query = body.query || ''
    const page = body.page || 0
    const limit = body.limit || 20

    const response = await useStickerlyApi<SearchPackResponse>(
      'stickerPack/searchV2',
      {
        method: 'POST',
        body: {
          query,
          page,
          limit
        }
      }
    )

    const packs = response.result.stickerPacks.map(useMapPack)

    const data = {
      packs,
      total: packs.length,
      hasMore: response.result.hasMore,
      query
    }

    const message = `Found ${packs.length} sticker packs matching "${query}"`
    return useFormatter(true, message, data)
  } catch (error) {
    console.error('Error searching sticker packs:', error)
    return useFormatter(false, 'Failed to search sticker packs', null, error)
  }
})
