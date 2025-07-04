import { createApiLogger } from '../utils/apiLogger'

export default defineEventHandler(async (event) => {
  event.context.routeId = 'stats'
  event.context.routePath = '/stats'

  try {
    const { timeframe } = getQuery(event)
    let apiLogger: Awaited<ReturnType<typeof createApiLogger>> | null = null

    if (process.env.DATABASE_URL) {
      const db = useDatabase()
      const globalLogger = globalThis as { __apiLogger?: Awaited<ReturnType<typeof createApiLogger>> }
      apiLogger = globalLogger.__apiLogger ?? (globalLogger.__apiLogger = await createApiLogger(db))
    }

    let cutoffISO: string | undefined
    if (typeof timeframe === 'string' && timeframe) {
      const match = timeframe.match(/^(\d+)([mhdwMy])$/)
      const units: Record<string, number> = {
        m: 60 * 1000, // minute
        h: 60 * 60 * 1000, // hour
        d: 24 * 60 * 60 * 1000, // day
        w: 7 * 24 * 60 * 60 * 1000, // week
        M: 30 * 24 * 60 * 60 * 1000, // month (approx)
        y: 365 * 24 * 60 * 60 * 1000 // year (approx)
      }
      if (!match || typeof match[1] !== 'string' || typeof match[2] !== 'string' || !units[match[2]]) {
        throw new Error('Invalid timeframe')
      }
      // @ts-expect-error: match is checked above and cannot be undefined here
      cutoffISO = new Date(Date.now() - parseInt(match![1], 10) * units[match![2] as keyof typeof units]).toISOString()
    }

    const stats = apiLogger
      ? await apiLogger.getApiStats(cutoffISO)
      : { total_requests: 0, unique_ips: 0, avg_response_time: 0, error_rate: 0, top_endpoints: [] }

    return useFormatter(event, 200, 'Fetched stats', stats, { timeframe })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return useFormatter(event, 200, 'Fetched stats (fallback)', {
      total_requests: 0, unique_ips: 0, avg_response_time: 0, error_rate: 0, top_endpoints: []
    }, { timeframe: getQuery(event)['timeframe'] })
  }
})
