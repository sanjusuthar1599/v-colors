import mongoose from 'mongoose'

const DEFAULT_DB = 'vcolors'

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
}

const connectDB = async () => {
  const uri = getMongoUri()

  if (mongoose.connection.readyState === 1) {
    console.log(`MongoDB already connected (${mongoose.connection.name} @ ${mongoose.connection.host})`)
    return
  }

  try {
    await mongoose.connect(uri, options)
    console.log(`MongoDB connected (${mongoose.connection.name} @ ${mongoose.connection.host})`)
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    }
    console.log('[MongoDB] Retrying in 5 seconds...')
    await new Promise((resolve) => setTimeout(resolve, 5000))
    return connectDB()
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] disconnected')
})

mongoose.connection.on('error', (error) => {
  console.error('[MongoDB] error:', error.message)
})

export default connectDB
