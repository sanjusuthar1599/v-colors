/** Ensures API calls always target `/api/...` whether env is `/api` or a full backend URL. */
export function resolveApiBaseUrl() {
  const raw = (import.meta.env.VITE_API_URL || '/api').trim()

  if (!raw || raw === '/api') return '/api'

  if (raw.startsWith('http')) {
    const normalized = raw.replace(/\/+$/, '')
    return normalized.endsWith('/api') ? normalized : `${normalized}/api`
  }

  if (raw.startsWith('/')) {
    return raw.endsWith('/api') ? raw.replace(/\/+$/, '') || '/api' : `${raw.replace(/\/+$/, '')}/api`
  }

  return `/${raw.replace(/\/+$/, '')}`
}

export function resolveApiOrigin() {
  const base = resolveApiBaseUrl()
  if (base.startsWith('http')) return base.replace(/\/api$/, '')
  return ''
}
