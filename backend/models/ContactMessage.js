import mongoose from 'mongoose'

const contactMessageSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  companyName: String,
  email: { type: String, required: true },
  phone: { type: String, required: true },
  productRequirement: String,
  message: String,
}, { timestamps: true })

export default mongoose.model('ContactMessage', contactMessageSchema)
