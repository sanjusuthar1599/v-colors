import mongoose from 'mongoose'

const DEFAULT_DB = 'vcolors'

let reconnectTimer = null

/** URIs without a database name connect to empty `test` on Atlas. */
export function normalizeMongoUri(rawUri) {
  const uri = rawUri || 'mongodb://127.0.0.1:27017/vcolors'
  if (!uri.includes('mongodb')) return uri

  const hasDbPath = /mongodb(\+srv)?:\/\/[^/]+\/[^/?]+/.test(uri)
  if (hasDbPath) return uri

  const queryIndex = uri.indexOf('?')
  if (queryIndex !== -1) {
    const base = uri.slice(0, queryIndex).replace(/\/$/, '')
    return `${base}/${DEFAULT_DB}${uri.slice(queryIndex)}`
  }
  return `${uri.replace(/\/$/, '')}/${DEFAULT_DB}`
}

function getMongoUri() {
  return normalizeMongoUri(process.env.MONGO_URI)
}

const options = {
  serverSelectionTimeoutMS: 10000,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  autoIndex: true,
}

const connectDB = async () => {
  const uri = getMongoUri()

  if (mongoose.connection.readyState === 1) {
    return
  }

  if (mongoose.connection.readyState === 2) {
    await new Promise((resolve, reject) => {
      mongoose.connection.once('connected', resolve)
      mongoose.connection.once('error', reject)
    })
    return
  }

  try {
    await mongoose.connect(uri, options)
    console.log(`MongoDB connected (${mongoose.connection.name} @ ${mongoose.connection.host})`)
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    if (process.env.NODE_ENV === 'production') {
      throw error
    }
    console.log('[MongoDB] Retrying in 5 seconds...')
    await new Promise((resolve) => setTimeout(resolve, 5000))
    return connectDB()
  }
}

export async function ensureDbConnected() {
  if (mongoose.connection.readyState === 1) return

  if (reconnectTimer) {
    await new Promise((resolve) => {
      const check = () => {
        if (mongoose.connection.readyState === 1) resolve()
        else setTimeout(check, 250)
      }
      check()
    })
    if (mongoose.connection.readyState === 1) return
  }

  await connectDB()
}

function scheduleReconnect() {
  if (reconnectTimer) return
  reconnectTimer = setTimeout(async () => {
    reconnectTimer = null
    try {
      await connectDB()
    } catch (error) {
      console.error('[MongoDB] reconnect failed:', error.message)
      scheduleReconnect()
    }
  }, 3000)
}

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] disconnected — scheduling reconnect')
  scheduleReconnect()
})

mongoose.connection.on('error', (error) => {
  console.error('[MongoDB] error:', error.message)
})

export default connectDB
