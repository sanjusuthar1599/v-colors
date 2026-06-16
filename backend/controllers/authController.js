import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'change-this-secret', { expiresIn: '7d' })
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' })
    res.json({ token: signToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (error) {
    next(error)
  }
}
