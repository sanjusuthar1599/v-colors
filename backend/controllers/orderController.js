import Stripe from 'stripe'
import mongoose from 'mongoose'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { buildOrderConfirmationEmail } from '../utils/orderEmailTemplate.js'
import { sendMail } from '../utils/sendMail.js'
import { sendSms } from '../utils/sendSms.js'

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null

function parsePrice(product) {
  if (typeof product?.priceAmount === 'number' && product.priceAmount > 0) return product.priceAmount
  const value = product?.priceAmount || product?.price || product?.priceText
  if (typeof value === 'number' && value > 0) return value
  const match = String(value || '').match(/\d+/)
  return match ? Number(match[0]) : 0
}

async function notifyCustomer(order) {
  if (order.customerMessageSent) return

  const customerEmail = order.shippingAddress?.email
  const smsMessage = `Your V.Colors order ${order.orderNumber} has been placed successfully. Expected delivery within 3-5 working days. Thank you for shopping with V.Colors.`
  const emailHtml = buildOrderConfirmationEmail(order)
  const emailSubject = `V.Colors Order ${order.orderNumber} Confirmed`

  await Promise.allSettled([
    sendSms({ to: order.shippingAddress.phone, message: smsMessage }),
    sendMail({
      to: customerEmail,
      subject: emailSubject,
      html: emailHtml,
      text: `Your V.Colors order ${order.orderNumber} is confirmed. Total: INR ${order.total}. Expected delivery within 3-5 working days.`,
    }),
    process.env.MAIL_TO ? sendMail({
      to: process.env.MAIL_TO,
      subject: `New Order ${order.orderNumber}`,
      html: emailHtml,
      text: `New order ${order.orderNumber} from ${customerEmail}. Total INR ${order.total}.`,
    }) : Promise.resolve(),
  ])

  order.customerMessageSent = true
  await order.save()
}

export async function createOrder(req, res, next) {
  try {
    const { items = [], shippingAddress, paymentMethod = 'cod', notes = '' } = req.body
    if (!items.length) return res.status(422).json({ message: 'Cart is empty' })
    if (!shippingAddress?.fullName || !shippingAddress?.email || !shippingAddress?.phone || !shippingAddress?.addressLine) {
      return res.status(422).json({ message: 'Shipping address is required' })
    }

    const productIds = items.map((item) => item.productId || item._id || item.id).filter((id) => mongoose.Types.ObjectId.isValid(id))
    const products = await Product.find({ _id: { $in: productIds } })
    const orderItems = items.map((item) => {
      const product = products.find((entry) => String(entry._id) === String(item.productId || item._id || item.id))
      const quantity = Math.max(Number(item.quantity || 1), 1)
      const price = product ? parsePrice(product) : Number(item.price || 299)
      return {
        product: product?._id,
        name: product?.name || item.name,
        image: product?.images?.[0] || item.image,
        categoryName: product?.categoryName || item.category,
        price,
        quantity,
      }
    })

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shippingCharge = subtotal >= 999 ? 0 : 99
    const total = subtotal + shippingCharge

    if (paymentMethod === 'stripe' && !stripe) {
      return res.status(503).json({ message: 'Stripe is not configured yet. Add STRIPE_SECRET_KEY or choose Cash On Delivery.' })
    }

    const order = await Order.create({
      items: orderItems,
      shippingAddress,
      subtotal,
      shippingCharge,
      total,
      paymentMethod,
      notes,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
    })

    if (paymentMethod === 'stripe' && stripe) {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: shippingAddress.email,
        line_items: orderItems.map((item) => ({
          price_data: {
            currency: 'inr',
            product_data: { name: item.name, images: item.image?.startsWith('http') ? [item.image] : [] },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/order-success/${order._id}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/checkout?cancelled=true`,
        metadata: { orderId: String(order._id) },
      })
      order.stripeSessionId = session.id
      await order.save()
      return res.status(201).json({ order, checkoutUrl: session.url })
    }

    await notifyCustomer(order)
    res.status(201).json({ order, message: 'Order placed successfully. Delivery expected within 3-5 working days.' })
  } catch (error) {
    next(error)
  }
}

export async function getOrders(_req, res, next) {
  try {
    res.json(await Order.find().sort('-createdAt'))
  } catch (error) {
    next(error)
  }
}

export async function getOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (error) {
    next(error)
  }
}

export async function trackOrder(req, res, next) {
  try {
    const orderNumber = String(req.body.orderNumber || '').trim().toUpperCase()
    const phone = String(req.body.phone || '').trim()
    if (!orderNumber || !phone) return res.status(422).json({ message: 'Order number and phone number are required' })

    const order = await Order.findOne({ orderNumber, 'shippingAddress.phone': phone })
    if (!order) return res.status(404).json({ message: 'Order not found. Please check order number and phone number.' })
    res.json(order)
  } catch (error) {
    next(error)
  }
}

export async function updateOrder(req, res, next) {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (error) {
    next(error)
  }
}

export async function confirmStripeOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    if (req.query.session_id && stripe) {
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id)
      if (session.payment_status === 'paid') order.paymentStatus = 'paid'
    }
    if (!order.customerMessageSent) await notifyCustomer(order)
    res.json(order)
  } catch (error) {
    next(error)
  }
}
