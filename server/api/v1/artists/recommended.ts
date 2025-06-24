export default defineCachedEventHandler(
  async () => {
    try {
      const response = await useStickerlyApi<{ result: { recommendArtists: { user: StickerlyArtistRaw }[] } }>(
        'artist/recommend',
        { method: 'POST' }
      )
      const artists: StickerlyArtist[] = (response?.result?.recommendArtists || [])
        .map(item => useMapArtist(item.user))
      return useFormatter(true, 'Recommended artists fetched successfully', artists)
    } catch (error) {
      console.error('Error fetching recommended artists:', error)
      return useFormatter(false, 'Failed to fetch recommended artists', null, error)
    }
  },
  {
    swr: true,
    maxAge: 60, // 1 minute cache
    staleMaxAge: 60 * 60 // 1 hour stale cache
  }
)
