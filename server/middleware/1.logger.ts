import { createApiLogger } from '../utils/apiLogger'
import type { ApiLogCreate } from '../utils/types'

let apiLogger: Awaited<ReturnType<typeof createApiLogger>> | null = null

export default defineEventHandler(async (event) => {
  const { req, res } = event.node
  const db = useDatabase()

  // Initialize API logger if not already done
  if (!apiLogger) {
    apiLogger = await createApiLogger(db)
  }

  // Capture request start time and basic info
  const startTime = Date.now()
  const method = req.method || 'UNKNOWN'
  const fullUrl = getRequestURL(event).toString()
  const routePath = getRequestURL(event).pathname

  // Get requester information
  const requesterIP = (req.headers['x-forwarded-for'] as string)
    || (req.socket.remoteAddress as string)
    || 'unknown'
  const userAgent = req.headers['user-agent'] as string | undefined
  const referer = req.headers.referer as string | undefined

  // Get request size if available
  // Store context for later use
  event.context.startTime = startTime
  event.context.requestInfo = {
    method,
    fullUrl,
    routePath,
    requesterIP,
    userAgent,
    referer
  }

  // After response is finished, log to database and console
  res.once('finish', async () => {
    try {
      const duration = Date.now() - startTime
      const routeId = event.context.routeId
      const statusCode = res.statusCode

      // Determine if this was an error
      const isError = statusCode >= 400
      const errorMessage = isError ? `HTTP ${statusCode}` : undefined

      const routesIdsToIgnore = ['stats', 'logs']

      // Only log to database if routeId is present (not chafed)
      if (routeId && !routesIdsToIgnore.includes(routeId)) {
        const logEntry: ApiLogCreate = {
          method,
          route_id: routeId,
          route_path: routePath,
          full_url: fullUrl,
          requester_ip: requesterIP,
          user_agent: userAgent,
          referer,
          status_code: statusCode,
          response_time_ms: duration,
          error_message: errorMessage
        }

        // Log to database
        await apiLogger?.logApiRequest(logEntry)
      }

      const timestamp = new Date().toISOString()
      // Log to console
      console.log(`[${timestamp}] ${method} ${routePath} - ${statusCode} ${duration}ms - IP: ${requesterIP} - User-Agent: ${userAgent || 'unknown'} - Referer: ${referer || 'none'}`)
    } catch (error) {
      console.error('Error in logging middleware:', error)
    }
  })
})
