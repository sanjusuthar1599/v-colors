import './utils/loadEnv.js'
import mongoose from 'mongoose'
import app from './app.js'
import connectDB from './config/db.js'
import { ensureAdminUser } from './utils/ensureAdmin.js'

const PORT = process.env.PORT || 5000
let serverStarted = false

mongoose.connection.on('connected', async () => {
  try {
    await ensureAdminUser()
  } catch (error) {
    console.error('[admin] verify failed after reconnect:', error.message)
  }
})

async function startServer() {
  try {
    await connectDB()
    await ensureAdminUser()
    console.log('[admin] Admin account verified')

    if (!serverStarted) {
      app.listen(PORT, () => {
        console.log(`V Colors API running on port ${PORT}`)
      })
      serverStarted = true
    }
  } catch (error) {
    console.error('Server startup failed:', error.message)
    if (process.env.NODE_ENV === 'production') {
      setTimeout(startServer, 5000)
      return
    }
    process.exit(1)
  }
}

startServer()
