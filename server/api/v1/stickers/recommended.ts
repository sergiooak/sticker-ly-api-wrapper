export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'stickers-recommended'
    event.context.routePath = '/stickers/recommended'
    try {
      const response: StickerRecommendResponse = await useFetchApi(`sticker/recommend`)
      const data = response.result.stickers.map(useMapSticker)
      return useFormatter(event, 200, `Found ${data.length} recommended stickers`, data)
    } catch (error) {
      console.error('Error fetching recommended stickers:', error)
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
    maxAge: 60 * 10, // 10 minutes cache
    staleMaxAge: 60 * 60 * 2 // 2 hours stale cache
  }
)
