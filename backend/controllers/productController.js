import slugify from 'slugify'
import Product from '../models/Product.js'
import { resolveImageUrl } from '../utils/resolveImageUrl.js'
import { uploadFilesToCloudinary } from '../utils/uploadToCloudinary.js'

async function resolveUploadedFiles(files = []) {
  if (!files.length) return []
  return await uploadFilesToCloudinary(files)
}

async function normalizeProductPayload(body, files = {}) {
  const fileGroups = Array.isArray(files) ? { images: files } : files
  const uploadedImages = await resolveUploadedFiles(fileGroups.images || [])
  const uploadedVideos = await resolveUploadedFiles(fileGroups.video || [])
  const bodyImages = Array.isArray(body.images) ? body.images : body.images ? [body.images] : []
  const singleImage = body.image ? [await resolveImageUrl(body.image)] : []
  const bodyVideos = Array.isArray(body.videos) ? body.videos : body.videos ? [body.videos] : []
  const singleVideo = body.video ? [body.video] : []
  const videos = [...uploadedVideos, ...bodyVideos, ...singleVideo].filter(Boolean)
  const categoryIsObjectId = /^[a-f\d]{24}$/i.test(body.category || '')

  const parsedAmount = Number(body.priceAmount)
  const priceAmount = Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : undefined
  const priceLabel = String(body.price || '').trim()
  const price = priceLabel || (priceAmount ? `INR ${priceAmount}` : undefined)

  return {
    ...body,
    category: categoryIsObjectId ? body.category : undefined,
    categoryName: body.categoryName || (!categoryIsObjectId ? body.category : undefined),
    slug: body.slug || slugify(body.name, { lower: true, strict: true }),
    priceAmount,
    price,
    images: [...uploadedImages, ...bodyImages, ...singleImage].filter(Boolean),
    video: videos[0],
    videos,
    specifications: Array.isArray(body.specifications) ? body.specifications : body.specifications ? String(body.specifications).split('\n').filter(Boolean) : [],
    applications: Array.isArray(body.applications) ? body.applications : body.applications ? String(body.applications).split('\n').filter(Boolean) : [],
  }
}

export async function getProducts(_req, res, next) {
  try {
    const products = await Product.find().populate('category').sort('-createdAt')
    res.json(products)
  } catch (error) { next(error) }
}

export async function createProduct(req, res, next) {
  try {
    const product = await Product.create(await normalizeProductPayload(req.body, req.files || []))
    res.status(201).json(product)
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(422).json({ message: 'Product with this name already exists. Use a different product name.' })
    }
    next(error)
  }
}

export async function updateProduct(req, res, next) {
  try {
    const payload = await normalizeProductPayload(req.body, req.files || [])
    if (!payload.images.length) delete payload.images
    if (!payload.videos.length) {
      delete payload.video
      delete payload.videos
    }
    const product = await Product.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(422).json({ message: 'Product with this name already exists. Use a different product name.' })
    }
    next(error)
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (error) { next(error) }
}
