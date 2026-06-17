const DEFAULT_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://v-colors-frontend.onrender.com',
]

function normalizeOrigin(value) {
  return String(value || '').trim().replace(/\/$/, '')
}

export function getAllowedOrigins() {
  const origins = new Set(DEFAULT_ORIGINS.map(normalizeOrigin))

  const clientUrl = normalizeOrigin(process.env.CLIENT_URL)
  if (clientUrl) origins.add(clientUrl)

  const extra = process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGINS || ''
  for (const item of extra.split(',')) {
    const origin = normalizeOrigin(item)
    if (origin) origins.add(origin)
  }

  return [...origins]
}

export function createCorsOptions() {
  const allowedOrigins = getAllowedOrigins()

  return {
    origin(origin, callback) {
      if (!origin) return callback(null, true)

      const normalized = normalizeOrigin(origin)
      if (allowedOrigins.includes(normalized)) {
        return callback(null, true)
      }

      callback(null, false)
    },
    credentials: true,
  }
}
