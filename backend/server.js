import './utils/loadEnv.js'
import app from './app.js'
import connectDB from './config/db.js'

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`V Colors API running on port ${PORT}`)
  })
})
