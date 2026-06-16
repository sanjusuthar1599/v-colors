import express from 'express'
import { body } from 'express-validator'
import { createInquiry, deleteInquiry, getInquiries, updateInquiry } from '../controllers/inquiryController.js'
import { protect } from '../middlewares/auth.js'
import { validate } from './validate.js'

const router = express.Router()

router.post('/', [body('fullName').notEmpty(), body('email').isEmail(), body('phone').notEmpty()], validate, createInquiry)
router.get('/', protect, getInquiries)
router.put('/:id', protect, updateInquiry)
router.delete('/:id', protect, deleteInquiry)

export default router
