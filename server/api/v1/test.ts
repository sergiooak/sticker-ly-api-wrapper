export default defineCachedEventHandler(async (event) => {
  return useFormatter(true, 'This is a test endpoint for the Sticker.ly API Wrapper.', {
    method: event.method,
    path: event.path
  })
}, { swr: true, maxAge: 5, staleMaxAge: 60 * 60 })
