import express from 'express'
import { body } from 'express-validator'
import { createCategory, getCategories } from '../controllers/categoryController.js'
import { protect } from '../middlewares/auth.js'
import { validate } from './validate.js'

const router = express.Router()

router.get('/', getCategories)
router.post('/', protect, [body('name').notEmpty()], validate, createCategory)

export default router
