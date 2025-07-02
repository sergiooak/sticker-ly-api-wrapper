import type { ApiLogEntry, ApiLogCreate } from './types'

// Use the actual Nuxt database type
type NuxtDatabase = ReturnType<typeof useDatabase>

/**
 * Database utility for API logging operations
 */
export class ApiLogger {
  private db: NuxtDatabase

  constructor(database: NuxtDatabase) {
    this.db = database
  }

  /**
   * Initialize the API logs table with proper schema
   */
  async initializeTable(): Promise<void> {
    await this.db.sql`
      CREATE EXTENSION IF NOT EXISTS pgcrypto;
    `
    await this.db.sql`
      CREATE TABLE IF NOT EXISTS api_logs (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "method" VARCHAR(10) NOT NULL,
        "route_id" TEXT NOT NULL,
        "route_path" TEXT NOT NULL,
        "full_url" TEXT NOT NULL,
        "requester_ip" VARCHAR(45) NOT NULL,
        "user_agent" TEXT,
        "referer" TEXT,
        "status_code" INTEGER NOT NULL,
        "response_time_ms" INTEGER NOT NULL,
        "error_message" TEXT,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create indexes for better query performance
    await this.db.sql`
      CREATE INDEX IF NOT EXISTS idx_api_logs_method ON api_logs(method)
    `
    await this.db.sql`
      CREATE INDEX IF NOT EXISTS idx_api_logs_route_id ON api_logs(route_id)
    `
    await this.db.sql`
      CREATE INDEX IF NOT EXISTS idx_api_logs_status_code ON api_logs(status_code)
    `
    await this.db.sql`
      CREATE INDEX IF NOT EXISTS idx_api_logs_created_at ON api_logs(created_at)
    `
    await this.db.sql`
      CREATE INDEX IF NOT EXISTS idx_api_logs_ip ON api_logs(requester_ip)
    `
  }

  /**
   * Log an API request
   */
  async logApiRequest(logData: ApiLogCreate): Promise<void> {
    try {
      await this.db.sql`
        INSERT INTO api_logs (
          method, route_id, route_path, full_url, requester_ip,
          user_agent, referer, status_code, response_time_ms,
          error_message
        ) VALUES (
          ${logData.method},
          ${logData.route_id},
          ${logData.route_path},
          ${logData.full_url},
          ${logData.requester_ip},
          ${logData.user_agent || null},
          ${logData.referer || null},
          ${logData.status_code},
          ${logData.response_time_ms},
          ${logData.error_message || null}
        )
      `
    } catch (error) {
      console.error('Failed to log API request:', error)
      // Don't throw - logging should not break the application
    }
  }

  /**
   * Get API logs with optional filtering
   */
  async getApiLogs(options: {
    limit?: number
    offset?: number
    method?: string
    status_code?: number
    since?: string
  } = {}): Promise<ApiLogEntry[]> {
    const { limit = 100, offset = 0, method, status_code, since } = options

    let query = 'SELECT * FROM api_logs WHERE 1=1'
    const params: (string | number)[] = []

    if (method) {
      query += ' AND method = ?'
      params.push(method)
    }

    if (status_code) {
      query += ' AND status_code = ?'
      params.push(status_code)
    }

    if (since) {
      query += ' AND created_at >= ?'
      params.push(since)
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const result = await this.db.prepare(query).all(...params)
    return result as ApiLogEntry[]
  }

  /**
   * Get API statistics
   */
  async getApiStats(timeframe: '1h' | '24h' | '7d' | '30d' = '24h'): Promise<{
    total_requests: number
    unique_ips: number
    avg_response_time: number
    error_rate: number
    top_endpoints: Array<{ route_id: string, count: number }>
  }> {
    try {
      // Create a cutoff timestamp for the timeframe
      const now = new Date()
      let cutoffTime: Date

      console.log(`[ApiLogger] Calculating stats for timeframe: ${timeframe}`)

      switch (timeframe) {
        case '1h':
          cutoffTime = new Date(now.getTime() - 60 * 60 * 1000)
          break
        case '24h':
          cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
          break
        case '7d':
          cutoffTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case '30d':
          cutoffTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        default:
          cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      }

      const cutoffISO = cutoffTime.toISOString()
      console.log(`[ApiLogger] Using cutoff ISO timestamp: ${cutoffISO}`)

      // Get basic stats
      console.log('[\n\nApiLogger] Querying basic stats...')
      const statsQuery = await this.db.sql`
      SELECT
        COUNT(*) as total_requests,
        COUNT(DISTINCT requester_ip) as unique_ips,
        COALESCE(AVG(response_time_ms), 0) as avg_response_time,
        COALESCE((COUNT(CASE WHEN status_code >= 400 THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0)), 0) as error_rate
      FROM api_logs
      WHERE created_at >= ${cutoffISO}
      `

      const statsResult = statsQuery.rows
      const stats = (statsResult && statsResult[0]) ?? {
        total_requests: 0,
        unique_ips: 0,
        avg_response_time: 0,
        error_rate: 0
      }

      console.log('[ApiLogger] Stats result:', stats)

      // Get top endpoints
      console.log('\n\n[ApiLogger] Querying top endpoints...')
      const topEndpointsQuery = await this.db.sql`
      SELECT route_id, COUNT(*) as count
      FROM api_logs
      WHERE created_at >= ${cutoffISO}
      GROUP BY route_id
      ORDER BY count DESC
      LIMIT 10
      `

      const topEndpointsResult = topEndpointsQuery.rows
      const topEndpoints = (topEndpointsResult && topEndpointsResult.length > 0) ? topEndpointsResult : []

      console.log('[ApiLogger] Top endpoints result:', topEndpointsResult)

      const result = {
        total_requests: Number(stats.total_requests) || 0,
        unique_ips: Number(stats.unique_ips) || 0,
        avg_response_time: Number(stats.avg_response_time) || 0,
        error_rate: Number(stats.error_rate) || 0,
        top_endpoints: topEndpoints.map(endpoint => ({
          route_id: String(endpoint.route_id),
          count: parseInt(endpoint.count as string, 10)
        }))
      }

      console.log('[ApiLogger] Final API stats result:', result)
      return result
    } catch (error) {
      console.error('Error getting API stats:', error)
      // Return default stats on error
      return {
        total_requests: 0,
        unique_ips: 0,
        avg_response_time: 0,
        error_rate: 0,
        top_endpoints: []
      }
    }
  }
}

/**
 * Create and initialize API logger instance
 */
export async function createApiLogger(database: NuxtDatabase): Promise<ApiLogger> {
  const logger = new ApiLogger(database)
  await logger.initializeTable()
  return logger
}
