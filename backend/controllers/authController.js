import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { ensureDbConnected } from '../config/db.js'

function signToken(user) {
  const secret = process.env.JWT_SECRET
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET is not configured')
  }
  return jwt.sign({ id: user._id, role: user.role }, secret || 'change-this-secret', { expiresIn: '7d' })
}

function isDbConnectionError(error) {
  return ['MongoServerSelectionError', 'MongoNotConnectedError', 'MongoNetworkError'].includes(error?.name)
}

export async function login(req, res, next) {
  try {
    await ensureDbConnected()

    const { email, password } = req.body
    const user = await User.findOne({ email: email?.toLowerCase()?.trim() })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    if (isDbConnectionError(error)) {
      return res.status(503).json({
        message: 'Database is waking up. Please wait a few seconds and try again.',
      })
    }
    next(error)
  }
}
