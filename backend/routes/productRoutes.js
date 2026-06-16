import express from 'express'
import { body } from 'express-validator'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js'
import { protect } from '../middlewares/auth.js'
import { upload } from '../middlewares/upload.js'
import { validate } from './validate.js'

const router = express.Router()

router.route('/')
  .get(getProducts)
  .post(protect, upload.fields([{ name: 'images', maxCount: 8 }, { name: 'video', maxCount: 1 }]), [body('name').notEmpty(), body('description').notEmpty()], validate, createProduct)

router.route('/:id')
  .put(protect, upload.fields([{ name: 'images', maxCount: 8 }, { name: 'video', maxCount: 1 }]), updateProduct)
  .delete(protect, deleteProduct)

export default router
