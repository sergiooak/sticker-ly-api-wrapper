export async function useStickerlyApi<T>(endpoint: string, options: {
  method?: 'GET' | 'POST'
  headers?: Record<string, string>
  body?: unknown
} = {}): Promise<T> {
  const apiBaseUrl = 'https://api.sticker.ly/'
  const version = 'v4'
  const url = `${apiBaseUrl}${version}/${endpoint}`

  const response = await $fetch(url, {
    method: options.method || 'GET',
    headers: {
      'User-Agent': 'androidapp.stickerly/2.16.0 (G011A; U; Android 22; pt-BR; br;)',
      ...options.headers
    },
    ...(options.body ? { body: options.body } : {})
  })
  return response as T
}
