import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import inquiryRoutes from './routes/inquiryRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import testimonialRoutes from './routes/testimonialRoutes.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isDev = process.env.NODE_ENV !== 'production'

app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/api/health', (_req, res) => {
  const mongoState = mongoose.connection.readyState
  const mongoOk = mongoState === 1
  res.status(mongoOk ? 200 : 503).json({
    status: mongoOk ? 'ok' : 'degraded',
    service: 'v-colors-api',
    mongo: mongoOk ? 'connected' : 'disconnected',
  })
})

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.API_RATE_LIMIT || (isDev ? 10000 : 2000)),
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    if (isDev) return true
    if (process.env.DISABLE_RATE_LIMIT === 'true') return true
    if (req.headers.authorization?.startsWith('Bearer ')) return true
    return false
  },
  message: { message: 'Too many requests. Please wait a moment and try again.' },
})

app.use('/api', apiLimiter)
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/inquiry', inquiryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/testimonials', testimonialRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
