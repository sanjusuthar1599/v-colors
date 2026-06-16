import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema({
  title: String,
  category: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model('Gallery', gallerySchema)
