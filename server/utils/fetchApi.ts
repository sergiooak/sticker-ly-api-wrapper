export async function useFetchApi<T>(endpoint: string, options: {
  method?: 'GET' | 'POST'
  headers?: Record<string, string>
  body?: unknown
} = {}): Promise<T> {
  const apiBaseUrl = process.env.STICKERLY_API_BASE_URL
  const userAgent = process.env.STICKERLY_USER_AGENT

  if (!apiBaseUrl) {
    throw new Error('STICKERLY_API_BASE_URL is not set in the environment variables.')
  }
  if (!userAgent) {
    throw new Error('STICKERLY_USER_AGENT is not set in the environment variables.')
  }

  const version = 'v4'
  const url = `${apiBaseUrl}${version}/${endpoint}`

  const response = await $fetch(url, {
    method: options.method || 'GET',
    headers: {
      'User-Agent': userAgent,
      ...options.headers
    },
    ...(options.body ? { body: options.body } : {})
  })
  return response as T
}
