import { createApiLogger } from '../utils/apiLogger'
import type { ApiLogCreate } from '../utils/types'

let apiLogger: Awaited<ReturnType<typeof createApiLogger>> | null = null

export default defineEventHandler(async (event) => {
  const { req, res } = event.node
  const db = useDatabase()

  if (!apiLogger) apiLogger = await createApiLogger(db)

  const startTime = Date.now()
  const method = req.method || 'UNKNOWN'
  const url = getRequestURL(event)
  const routePath = url.pathname
  const requesterIP = (req.headers['x-forwarded-for'] as string) || (req.socket.remoteAddress as string) || 'unknown'
  const userAgent = req.headers['user-agent'] as string | undefined
  const referer = req.headers.referer as string | undefined

  event.context.startTime = startTime
  event.context.requestInfo = { method, fullUrl: url.toString(), routePath, requesterIP, userAgent, referer }

  res.once('finish', async () => {
    try {
      const duration = Date.now() - startTime
      const routeId = event.context.routeId
      const statusCode = res.statusCode
      if (routeId && !['stats', 'logs'].includes(routeId)) {
        const logEntry: ApiLogCreate = {
          method,
          route_id: routeId,
          route_path: routePath,
          full_url: url.toString(),
          requester_ip: requesterIP,
          user_agent: userAgent,
          referer,
          status_code: statusCode,
          response_time_ms: duration,
          error_message: statusCode >= 400 ? `HTTP ${statusCode}` : undefined
        }
        await apiLogger?.logApiRequest(logEntry)
        console.log(`[${new Date().toISOString()}] ${method} ${routePath} - ${statusCode} ${duration}ms - IP: ${requesterIP} - User-Agent: ${userAgent || 'unknown'} - Referer: ${referer || 'none'}`)
      }
    } catch (error) {
      console.error('Error in logging middleware:', error)
    }
  })
})
