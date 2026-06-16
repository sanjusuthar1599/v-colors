import express from 'express'
import { body } from 'express-validator'
import { login } from '../controllers/authController.js'
import { validate } from './validate.js'

const router = express.Router()

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
], validate, login)

export default router
