export default defineCachedEventHandler(
  async (event) => {
    const packId = event.context.params?.id

    if (!packId) {
      return useFormatter(false, 'Pack ID is required', null)
    }

    try {
      const response = await useStickerlyApi<RecommendedPackCategoriesResponse>(
        `stickerPack/${packId}/recommendedCategories`
      )

      const recommendedCategories = response.result.recommendedPackCategories ?? []
      if (recommendedCategories.length === 0) {
        return useFormatter(false, 'No recommended packs found for this pack', null)
      }

      const data = recommendedCategories[0]?.stickerPacks?.map(useMapPack) ?? []
      const message = `Found ${data.length} related packs for pack ${packId}`

      return useFormatter(true, message, data)
    } catch (error) {
      console.error('Error fetching recommended categories:', error)
      return useFormatter(false, 'Failed to fetch recommended categories', null, error)
    }
  },
  {
    swr: true,
    maxAge: 60, // 1 minute cache
    staleMaxAge: 60 * 60 // 1 hour stale cache
  }
)
