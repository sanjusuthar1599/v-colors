import express from 'express'
import { createTestimonial, deleteTestimonial, getAllTestimonials, getTestimonials, updateTestimonial } from '../controllers/testimonialController.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

router.get('/', getTestimonials)
router.get('/all', protect, getAllTestimonials)
router.post('/', protect, createTestimonial)
router.put('/:id', protect, updateTestimonial)
router.delete('/:id', protect, deleteTestimonial)

export default router
