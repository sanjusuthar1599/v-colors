import express from 'express'
import { body } from 'express-validator'
import { createContactMessage, deleteContactMessage, getContactMessages } from '../controllers/contactController.js'
import { protect } from '../middlewares/auth.js'
import { validate } from './validate.js'

const router = express.Router()

router.post('/', [body('fullName').notEmpty(), body('email').isEmail(), body('phone').notEmpty()], validate, createContactMessage)
router.get('/', protect, getContactMessages)
router.delete('/:id', protect, deleteContactMessage)

export default router
