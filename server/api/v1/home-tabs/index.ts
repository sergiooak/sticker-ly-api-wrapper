export default defineEventHandler(
  async () => {
    try {
      const response = await useStickerlyApi<HomeTabOverviewResponse>('hometab/overview', {
        method: 'GET'
      })
      console.log('Home tab overview response:', response)
      return useFormatter(true, 'Fetched home tab overview', response.result?.hometabs.map(tab => ({
        id: tab.id,
        title: tab.title,
        keyword: tab.keyword
      })) || null)
    } catch (error) {
      return useFormatter(false, 'Failed to fetch home tab overview', null, error)
    }
  }
)
