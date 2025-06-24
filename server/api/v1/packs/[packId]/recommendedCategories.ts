export default defineCachedEventHandler(async (event) => {
  try {
    const packId = event.context.params?.packId

    if (!packId) {
      return useFormatter(false, 'Pack ID is required', null)
    }

    const response = await useStickerlyApi<RecommendedPackCategoriesResponse>(
      `stickerPack/${packId}/recommendedCategories`
    )

    const categories = response.result.categories || []

    const data = {
      packId,
      categories: categories.map(category => ({
        id: category.id,
        name: category.name,
        count: category.stickerCount
      }))
    }

    const message = `Found ${categories.length} recommended categories for pack ${packId}`
    return useFormatter(true, message, data)
  } catch (error) {
    console.error('Error fetching recommended categories:', error)
    return useFormatter(false, 'Failed to fetch recommended categories', null, error)
  }
}, { swr: true, maxAge: 60 * 30, staleMaxAge: 60 * 60 * 12 })
// 30 minutes cache, 12 hours stale cache
