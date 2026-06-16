import Gallery from '../models/Gallery.js'
import { uploadFileToCloudinary } from '../utils/uploadToCloudinary.js'

async function resolveGalleryImage(req) {
  if (!req.file) return req.body.image
  return await uploadFileToCloudinary(req.file, 'v-colors/gallery')
}

export async function getGallery(_req, res, next) {
  try {
    res.json(await Gallery.find().sort('-createdAt'))
  } catch (error) { next(error) }
}

export async function createGalleryItem(req, res, next) {
  try {
    const image = await resolveGalleryImage(req)
    const item = await Gallery.create({ ...req.body, image })
    res.status(201).json(item)
  } catch (error) { next(error) }
}

export async function deleteGalleryItem(req, res, next) {
  try {
    await Gallery.findByIdAndDelete(req.params.id)
    res.json({ message: 'Gallery image deleted' })
  } catch (error) { next(error) }
}
