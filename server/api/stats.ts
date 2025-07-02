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

    const stats = await apiLogger.getApiStats(cutoffISO)

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
