import dotenv from 'dotenv'

dotenv.config()

const { default: app } = await import('./backend/app.js')
const { default: connectDB } = await import('./backend/config/db.js')

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`V Colors API running on port ${PORT}`)
  })
})
