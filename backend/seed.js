import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Category from './models/Category.js'
import Product from './models/Product.js'
import User from './models/User.js'
import { resolveImageUrl } from './utils/resolveImageUrl.js'
import { categories, products } from '../src/data/companyData.js'

dotenv.config()

const categoryNames = categories

await connectDB()

const adminEmail = process.env.ADMIN_EMAIL || 'admin@vcolors.in'
let admin = await User.findOne({ email: adminEmail })
if (!admin) {
  admin = new User({ name: 'V Colors Admin', email: adminEmail, password: process.env.ADMIN_PASSWORD || 'admin123', role: 'admin' })
  await admin.save()
}

for (const name of categoryNames) {
  await Category.findOneAndUpdate(
    { name },
    { name, slug: name.toLowerCase().replace(/\s+/g, '-'), description: `${name} category` },
    { upsert: true },
  )
}

function parseCatalogPrice(product) {
  const match = String(product.price || '').replace(/,/g, '').match(/\d+/)
  const priceAmount = match ? Number(match[0]) : undefined
  const price = product.price || (priceAmount ? `INR ${priceAmount}` : undefined)
  return { priceAmount, price }
}

for (const product of products) {
  const slug = product.id || product.name.toLowerCase().replace(/\s+/g, '-')
  const { priceAmount, price } = parseCatalogPrice(product)
  await Product.findOneAndUpdate(
    { slug },
    {
      name: product.name,
      slug,
      categoryName: product.category,
      description: product.description,
      images: [product.image].filter(Boolean),
      specifications: product.specs || [],
      applications: product.applications || [],
      priceAmount,
      price,
      isFeatured: true,
    },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
  )
}

const productsWithPageUrls = await Product.find({
  images: { $elemMatch: { $regex: /(tradeindia\.com\/products|indiamart\.com\/proddetail)/i } },
})

for (const product of productsWithPageUrls) {
  product.images = await Promise.all(product.images.map((image) => resolveImageUrl(image)))
  await product.save()
}

console.log('Seed complete')
process.exit(0)
