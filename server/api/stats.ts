import { createApiLogger } from '../utils/apiLogger'

export default defineEventHandler(async (event) => {
  event.context.routeId = 'stats'
  event.context.routePath = '/stats'

  try {
    const query = getQuery(event)
    const timeframe = query['timeframe']

    let apiLogger: Awaited<ReturnType<typeof createApiLogger>> | null = null
    if (process.env.DATABASE_URL) {
      const db = useDatabase()
      const globalLogger = globalThis as {
        __apiLogger?: Awaited<ReturnType<typeof createApiLogger>>
      }
      apiLogger = globalLogger.__apiLogger || null
      if (!apiLogger) {
        apiLogger = await createApiLogger(db)
        globalLogger.__apiLogger = apiLogger
      }
    }

    let cutoffISO: string | undefined

    if (typeof timeframe === 'string' && timeframe) {
      const now = new Date()
      const validUnits: Record<string, number> = {
        m: 60 * 1000, // minutes
        h: 60 * 60 * 1000, // hours
        d: 24 * 60 * 60 * 1000, // days
        w: 7 * 24 * 60 * 60 * 1000, // weeks
        M: 30 * 24 * 60 * 60 * 1000, // months
        y: 365 * 24 * 60 * 60 * 1000 // years
      }

      const match = timeframe.match(/^(\d+)([mhdwMy])$/)
      if (!match) {
        console.warn(`[ApiLogger] Invalid timeframe format: ${timeframe}.`)
        throw new Error(`Invalid timeframe format: ${timeframe}. Expected format is <number><unit> (e.g., 1h, 24h, 7d, 30d).`)
      }

      const [, valueStr, unit] = match
      const value = parseInt(valueStr as string, 10)
      const multiplier = validUnits[unit as keyof typeof validUnits]
      if (!multiplier) {
        throw new Error(`Unsupported timeframe unit: ${unit}`)
      }

      const cutoffTime = new Date(now.getTime() - value * multiplier)
      cutoffISO = cutoffTime.toISOString()
      console.log(`[ApiLogger] Calculated cutoff ISO timestamp: ${cutoffISO}`)
    } else {
      console.log(`[ApiLogger] No valid timeframe provided, querying all time`)
    }

    const baseStats = apiLogger
      ? await apiLogger.getApiStats(cutoffISO)
      : {
          total_requests: 0,
          unique_ips: 0,
          avg_response_time: 0,
          error_rate: 0,
          top_endpoints: [] as Array<{ route_id: string, count: number }>
        }

    const meta = { timeframe }

    return useFormatter(event, 200, 'Fetched stats', baseStats, meta)
  } catch (error) {
    console.error('Error fetching API stats:', error)
    const fallback = {
      total_requests: 0,
      unique_ips: 0,
      avg_response_time: 0,
      error_rate: 0,
      top_endpoints: [] as Array<{ route_id: string, count: number }>
    }
    return useFormatter(event, 200, 'Fetched stats (fallback)', fallback, {
      timeframe: getQuery(event)['timeframe']
    })
  }
})
