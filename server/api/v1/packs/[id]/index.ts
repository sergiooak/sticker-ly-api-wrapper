export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'packs-id'
    event.context.routePath = '/packs/[id]'
    try {
      const packId = event.context.params?.id

      if (!packId) {
        return useFormatter(event, 400, 'Pack ID is required', null)
      }

      const response: StickerPackResponse = await useFetchApi(
        `stickerPack/${packId}`
      )

      const pack = response.result
      const data = {
        id: pack.packId,
        name: pack.name?.trim(),
        isAnimated: pack.isAnimated,
        isPaid: pack.isPaid,
        views: pack.viewCount,
        stickerUrls: pack.stickers.map(sticker => pack.resourceUrlPrefix + sticker.fileName)
      }

      const message = `Successfully retrieved sticker pack: ${pack.name}`
      return useFormatter(event, 200, message, data)
    } catch (error) {
      console.error('Error fetching sticker pack:', error)
      // @ts-expect-error - TypeScript doesn't know about the error structure
      const { statusCode = 500, statusMessage = 'Internal Server Error' } = (error as unknown) || {}
      return useFormatter(event, statusCode, statusMessage, [], {
        message: (error as Error).message || 'An unexpected error occurred',
        stack: (error as Error).stack || 'No stack trace available'
      })
    }
  },
  {
    swr: true,
    maxAge: 60 * 5, // 5 minutes cache
    staleMaxAge: 60 * 60 // 1 hour stale cache
  }
)
