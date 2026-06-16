import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  image: String,
  categoryName: String,
  price: { type: Number, required: true, default: 0 },
  quantity: { type: Number, required: true, min: 1 },
}, { _id: false })

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, default: 'India' },
}, { _id: false })

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, index: true },
  items: [orderItemSchema],
  shippingAddress: addressSchema,
  subtotal: { type: Number, required: true, default: 0 },
  shippingCharge: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
  paymentMethod: { type: String, enum: ['cod', 'stripe'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  orderStatus: { type: String, enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'placed' },
  stripeSessionId: String,
  customerMessageSent: { type: Boolean, default: false },
  notes: String,
}, { timestamps: true })

orderSchema.pre('save', function createOrderNumber() {
  if (!this.orderNumber) {
    this.orderNumber = `VC-${Date.now().toString().slice(-8)}`
  }
})

export default mongoose.model('Order', orderSchema)
