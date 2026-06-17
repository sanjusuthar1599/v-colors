import { resolveApiOrigin } from './apiBaseUrl'

export function resolveMediaUrl(url) {
  if (!url) return ''

  const cleaned = String(url).trim().replace(/^public\//, '/')
  if (!cleaned) return ''

  if (cleaned.startsWith('http')) return cleaned

  if (cleaned.startsWith('/uploads')) {
    const apiOrigin = resolveApiOrigin()
    return apiOrigin ? `${apiOrigin}${cleaned}` : cleaned
  }

  return cleaned
}
