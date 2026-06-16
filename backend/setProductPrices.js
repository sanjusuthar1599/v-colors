import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Product from './models/Product.js'

dotenv.config()

const categoryDefaults = {
  'Jari Net Embroidery Fabric': { priceAmount: 290, price: 'INR 290 / Meter' },
  'Embroidery Fabrics': { priceAmount: 320, price: 'INR 320 / Meter' },
  'Fancy Fabrics': { priceAmount: 550, price: 'INR 550 / Meter' },
  'Velvet Fabrics': { priceAmount: 420, price: 'INR 420 / Meter' },
  'Jacquard Fabric': { priceAmount: 380, price: 'INR 380 / Meter' },
  'Readymade Laces': { priceAmount: 199, price: 'INR 199 / Piece' },
  'Garment Fabrics': { priceAmount: 450, price: 'INR 450 / Meter' },
  'New Items': { priceAmount: 399, price: 'INR 399 / Meter' },
}

function priceForProduct(product) {
  const name = String(product.name || '').toLowerCase()
  const category = product.categoryName || product.category?.name || 'Garment Fabrics'

  if (/silk|kasturi/i.test(name)) return { priceAmount: 599, price: 'INR 599 / Meter' }
  if (/chiffon|georgette/i.test(name)) return { priceAmount: 399, price: 'INR 399 / Meter' }
  if (/sequence|sequin/i.test(name)) return { priceAmount: 599, price: 'INR 599 / Meter' }
  if (/velvet/i.test(name)) return { priceAmount: 420, price: 'INR 420 / Meter' }
  if (/jacquard/i.test(name)) return { priceAmount: 380, price: 'INR 380 / Meter' }
  if (/jari net|jari-net/i.test(name)) return { priceAmount: 290, price: 'INR 290 / Meter' }
  if (/lace/i.test(name)) return { priceAmount: 199, price: 'INR 199 / Piece' }
  if (/net embroidery|embroidery net/i.test(name)) return { priceAmount: 300, price: 'INR 300 / Meter' }
  if (/organza/i.test(name)) return { priceAmount: 480, price: 'INR 480 / Meter' }
  if (/net/i.test(name) && /embroid/i.test(name)) return { priceAmount: 320, price: 'INR 320 / Meter' }

  return categoryDefaults[category] || { priceAmount: 350, price: 'INR 350 / Meter' }
}

await connectDB()

const products = await Product.find()
let updated = 0

for (const product of products) {
  const { priceAmount, price } = priceForProduct(product)
  product.priceAmount = priceAmount
  product.price = price
  await product.save()
  updated += 1
  console.log(`✓ ${product.name} → INR ${priceAmount} (${categoryDefaults[product.categoryName]?.price || price})`)
}

console.log(`\nUpdated ${updated} products with market-based prices.`)
process.exit(0)
