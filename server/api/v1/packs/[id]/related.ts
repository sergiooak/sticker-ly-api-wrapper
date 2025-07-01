export default defineCachedEventHandler(
  async (event) => {
    event.context.routeId = 'packs-related'
    event.context.routePath = '/packs/[id]/related'
    const packId = event.context.params?.id

    if (!packId) {
      return useFormatter(event, 400, 'Pack ID is required', null)
    }

    try {
      const response = await useFetchApi<RecommendedPackCategoriesResponse>(
        `stickerPack/${packId}/recommendedCategories`
      )

      const recommendedCategories = response.result.recommendedPackCategories ?? []
      if (recommendedCategories.length === 0) {
        return useFormatter(event, 404, 'No recommended packs found for this pack', null)
      }

      const data = recommendedCategories[0]?.stickerPacks?.map(useMapPack) ?? []
      const message = `Found ${data.length} related packs for pack ${packId}`

      return useFormatter(event, 200, message, data)
    } catch (error) {
      console.error('Error fetching recommended categories:', error)
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
