import express from 'express'
import { body } from 'express-validator'
import { confirmStripeOrder, createOrder, getOrder, getOrders, trackOrder, updateOrder } from '../controllers/orderController.js'
import { protect } from '../middlewares/auth.js'
import { validate } from './validate.js'

const router = express.Router()

router.post('/', [
  body('items').isArray({ min: 1 }),
  body('shippingAddress.fullName').notEmpty(),
  body('shippingAddress.email').isEmail(),
  body('shippingAddress.phone').notEmpty(),
  body('shippingAddress.addressLine').notEmpty(),
], validate, createOrder)

router.get('/', protect, getOrders)
router.post('/track', [
  body('orderNumber').notEmpty(),
  body('phone').notEmpty(),
], validate, trackOrder)
router.get('/:id', getOrder)
router.put('/:id', protect, updateOrder)
router.post('/:id/confirm-stripe', confirmStripeOrder)

export default router
