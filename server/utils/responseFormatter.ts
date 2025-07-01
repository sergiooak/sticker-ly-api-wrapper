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

  if (statusCode < 300) {
    return {
      status: 'success',
      message,
      data,
      meta: extra as M,
      timestamp: new Date().toISOString()
    }
  } else {
    return {
      status: 'error',
      message,
      data: null,
      errors: extra as E,
      timestamp: new Date().toISOString()
    }
  }
}
