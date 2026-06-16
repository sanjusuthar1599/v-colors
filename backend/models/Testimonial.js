import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  quote: { type: String, required: true },
  image: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Testimonial', testimonialSchema)
