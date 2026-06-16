import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  companyName: String,
  email: { type: String, required: true },
  phone: { type: String, required: true },
  productInterested: String,
  quantity: String,
  message: String,
  status: { type: String, default: 'new' },
}, { timestamps: true })

export default mongoose.model('Inquiry', inquirySchema)
