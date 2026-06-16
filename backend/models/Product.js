import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  categoryName: String,
  description: { type: String, required: true },
  priceAmount: { type: Number, min: 0 },
  price: String,
  images: [String],
  video: String,
  videos: [String],
  specifications: [String],
  applications: [String],
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
