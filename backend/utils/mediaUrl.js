export function normalizeMediaPath(url) {
  if (!url) return ''
  const value = String(url).trim()
  if (!value) return ''
  if (value.startsWith('public/')) return `/${value.replace(/^public\/+/, '')}`
  return value
}

export function getApiBaseUrl(req) {
  return (process.env.API_PUBLIC_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '')
}

export function resolveApiMediaUrl(url, req) {
  const normalized = normalizeMediaPath(url)
  if (!normalized) return ''
  if (normalized.startsWith('http')) return normalized
  if (normalized.startsWith('/uploads')) return `${getApiBaseUrl(req)}${normalized}`
  return normalized
}
