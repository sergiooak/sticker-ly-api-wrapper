export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'stickers-related'
    event.context.routePath = '/stickers/[id]/related'
    try {
      const { id } = getRouterParams(event)
      const response: StickerRelatedResponse = await useFetchApi(`sticker/related?sid=${id}`)
      const data = response.result.stickers.map(useMapSticker)
      return useFormatter(event, 200, `Found ${data.length} related stickers`, data)
    } catch (error) {
      console.error('Error fetching related stickers:', error)
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
