import { createApiLogger } from '../utils/apiLogger'

export default defineEventHandler(async (event) => {
  event.context.routeId = 'stats'
  event.context.routePath = '/stats'

  try {
    const query = getQuery(event)
    const timeframe = query['timeframe']

    const db = useDatabase()
    const globalLogger = globalThis as {
      __apiLogger?: Awaited<ReturnType<typeof createApiLogger>>
    }
    let apiLogger = globalLogger.__apiLogger
    if (!apiLogger) {
      apiLogger = await createApiLogger(db)
      globalLogger.__apiLogger = apiLogger
    }

    const stats = await apiLogger.getApiStats(timeframe)

    const meta = { timeframe }

    return useFormatter(event, 200, 'Fetched stats', stats, meta)
  } catch (error) {
    console.error('Error fetching API stats:', error)
    return useFormatter(event, 500, 'Failed to fetch stats', null, {
      message: (error as Error).message || 'An unexpected error occurred',
      stack: (error as Error).stack || 'No stack trace available'
    })
  }
})
