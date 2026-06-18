const LIVE_CLIENT_URL = 'https://v-colors-fabric.onrender.com'
const LIVE_API_URL = 'https://v-colors-2.onrender.com'
const LOCAL_CLIENT_URL = 'http://localhost:5173'

function normalizeUrl(value) {
  return String(value || '').trim().replace(/\/$/, '')
}

/** Frontend site URL — Stripe redirects, email links, etc. */
export function getClientUrl() {
  const fromEnv = normalizeUrl(process.env.CLIENT_URL)
  if (fromEnv) return fromEnv
  if (process.env.NODE_ENV === 'production') return LIVE_CLIENT_URL
  return LOCAL_CLIENT_URL
}

/** Public backend URL — uploaded media in emails/API responses. */
export function getApiPublicUrl(req) {
  const fromEnv = normalizeUrl(process.env.API_PUBLIC_URL)
  if (fromEnv) return fromEnv
  if (req?.protocol && req.get?.('host')) {
    return normalizeUrl(`${req.protocol}://${req.get('host')}`)
  }
  if (process.env.NODE_ENV === 'production') return LIVE_API_URL
  return normalizeUrl(`http://localhost:${process.env.PORT || 5000}`)
}
