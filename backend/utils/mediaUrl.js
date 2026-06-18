import { getApiPublicUrl } from './appUrls.js'

export function normalizeMediaPath(url) {
  if (!url) return ''
  const value = String(url).trim()
  if (!value) return ''
  if (value.startsWith('public/')) return `/${value.replace(/^public\/+/, '')}`
  return value
}

export function getApiBaseUrl(req) {
  return getApiPublicUrl(req)
}

export function resolveApiMediaUrl(url, req) {
  const normalized = normalizeMediaPath(url)
  if (!normalized) return ''
  if (normalized.startsWith('http')) return normalized
  if (normalized.startsWith('/uploads')) return `${getApiBaseUrl(req)}${normalized}`
  return normalized
}
