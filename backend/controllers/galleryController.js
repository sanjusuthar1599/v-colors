import Gallery from '../models/Gallery.js'
import { normalizeMediaPath, resolveApiMediaUrl } from '../utils/mediaUrl.js'
import { uploadFileToCloudinary } from '../utils/uploadToCloudinary.js'

function serializeGalleryItem(item, req) {
  const doc = typeof item.toObject === 'function' ? item.toObject() : item
  return { ...doc, image: resolveApiMediaUrl(doc.image, req) }
}

async function resolveGalleryImage(req) {
  if (!req.file) return normalizeMediaPath(req.body.image)
  return await uploadFileToCloudinary(req.file, 'v-colors/gallery')
}

export async function getGallery(req, res, next) {
  try {
    const items = await Gallery.find().sort('-createdAt')
    res.json(items.map((item) => serializeGalleryItem(item, req)))
  } catch (error) { next(error) }
}

export async function createGalleryItem(req, res, next) {
  try {
    const image = await resolveGalleryImage(req)
    const item = await Gallery.create({ ...req.body, image })
    res.status(201).json(serializeGalleryItem(item, req))
  } catch (error) { next(error) }
}

export async function deleteGalleryItem(req, res, next) {
  try {
    await Gallery.findByIdAndDelete(req.params.id)
    res.json({ message: 'Gallery image deleted' })
  } catch (error) { next(error) }
}
