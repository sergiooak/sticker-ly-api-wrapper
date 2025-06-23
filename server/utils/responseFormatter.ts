export function useFormatter(success: boolean, message: string, data: unknown, errors?: unknown): Record<string, unknown> {
  return {
    status: success ? 'success' : 'error',
    message,
    data,
    errors,
    timestamp: new Date().toISOString()
  }
}
