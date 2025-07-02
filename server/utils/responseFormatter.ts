import type { H3Event } from 'h3'

export interface ApiResponseSuccess<T = unknown, M = unknown> {
  status: 'success'
  message: string
  data: T
  meta?: M
  errors?: undefined
  timestamp: string
}

export interface ApiResponseError<E = unknown> {
  status: 'error'
  message: string
  data: null
  meta?: undefined
  errors?: E
  timestamp: string
}

export type ApiResponse<T = unknown, M = unknown, E = unknown> = ApiResponseSuccess<T, M> | ApiResponseError<E>

export function useFormatter<T = unknown, M = unknown, E = unknown>(
  event: H3Event,
  statusCode: number,
  message: string,
  data: T,
  extra?: M | E
): ApiResponse<T, M, E> {
  if (event.node && event.node.res) {
    event.node.res.statusCode = statusCode
  }

  // Helper to recursively replace URLs in any string property
  function replaceStickerlyUrls<TValue>(obj: TValue): TValue {
    if (typeof obj === 'string') {
      return obj.replaceAll(
        'https://stickerly.pstatic.net/',
        `${process.env.NUXT_PUBLIC_SITE_URL || '/'}file/`
      ) as TValue
    } else if (Array.isArray(obj)) {
      return obj.map(replaceStickerlyUrls) as TValue
    } else if (obj && typeof obj === 'object') {
      const newObj = {} as Record<string, unknown>
      for (const key in obj) {
        newObj[key] = replaceStickerlyUrls((obj as Record<string, unknown>)[key])
      }
      return newObj as TValue
    }
    return obj
  }

  if (statusCode < 300) {
    return {
      status: 'success',
      message,
      data: replaceStickerlyUrls(data),
      meta: extra ? replaceStickerlyUrls(extra as M) : undefined,
      timestamp: new Date().toISOString()
    }
  } else {
    return {
      status: 'error',
      message,
      data: null,
      errors: extra ? replaceStickerlyUrls(extra as E) : undefined,
      timestamp: new Date().toISOString()
    }
  }
}
