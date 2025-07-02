import { createApiLogger } from '../utils/apiLogger'

export default defineEventHandler(async (event) => {
  event.context.routeId = 'logs'
  event.context.routePath = '/logs'

  try {
    const query = getQuery(event)
    const page = Number(query['pagination[page]']) || 1
    const pageSize = Number(query['pagination[pageSize]']) || 20
    const method = (query['filters[method]'] as string)?.toUpperCase()
    const statusCode = query['filters[status_code]']
      ? Number(query['filters[status_code]'])
      : undefined
    const since = query['filters[since]'] as string | undefined

    const db = useDatabase()
    const globalLogger = globalThis as {
      __apiLogger?: Awaited<ReturnType<typeof createApiLogger>>
    }
    let apiLogger = globalLogger.__apiLogger
    if (!apiLogger) {
      apiLogger = await createApiLogger(db)
      globalLogger.__apiLogger = apiLogger
    }

    const offset = (page - 1) * pageSize
    const logs = await apiLogger.getApiLogs({
      limit: pageSize,
      offset,
      method,
      status_code: statusCode,
      since
    })

    // Total count for pagination
    let countQuery = 'SELECT COUNT(*) as count FROM api_logs WHERE 1=1'
    const params: (string | number)[] = []
    if (method) {
      countQuery += ' AND method = ?'
      params.push(method)
    }
    if (statusCode) {
      countQuery += ' AND status_code = ?'
      params.push(statusCode)
    }
    if (since) {
      countQuery += ' AND created_at >= ?'
      params.push(since)
    }

    const countResult = (await db.prepare(countQuery).get(...params)) as {
      count: number
    }
    const total = Number(countResult?.count) || 0
    const pageCount = Math.ceil(total / pageSize)

    const meta = {
      pagination: { page, pageSize, pageCount, total }
    }

    return useFormatter(event, 200, 'Fetched logs', logs, meta)
  } catch (error) {
    console.error('Error fetching API logs:', error)
    return useFormatter(event, 500, 'Failed to fetch logs', null, {
      message: (error as Error).message || 'An unexpected error occurred',
      stack: (error as Error).stack || 'No stack trace available'
    })
  }
})
