import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { Readable } from 'stream'
import cloudinary, { isCloudinaryConfigured } from '../config/cloudinary.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOAD_DIR = path.join(__dirname, '../uploads')

function isVideoFile(file) {
  return file.mimetype?.startsWith('video/') || /\.(mp4|webm|mov)$/i.test(file.originalname || '')
}

export async function saveFileLocally(file) {
  if (!file?.buffer) throw new Error('No file buffer to save')
  await fs.mkdir(UPLOAD_DIR, { recursive: true })
  const safeName = String(file.originalname || 'file').replace(/\s+/g, '-').replace(/[^\w.-]/g, '')
  const filename = `${Date.now()}-${safeName}`
  await fs.writeFile(path.join(UPLOAD_DIR, filename), file.buffer)
  return `/uploads/${filename}`
}

function uploadStreamToCloudinary(file, folder) {
  const resourceType = isVideoFile(file) ? 'video' : 'image'

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result.secure_url)
      },
    )

    Readable.from(file.buffer).pipe(uploadStream)
  })
}

export async function uploadFileToCloudinary(file, folder = 'v-colors') {
  if (!file?.buffer) throw new Error('No file buffer to upload')

  if (!isCloudinaryConfigured()) {
    return await saveFileLocally(file)
  }

  try {
    return await uploadStreamToCloudinary(file, folder)
  } catch (error) {
    console.error(`[upload] Cloudinary failed (${error.message}) — saving file locally instead`)
    return await saveFileLocally(file)
  }
}

export async function uploadFilesToCloudinary(files = [], folder = 'v-colors') {
  const list = Array.isArray(files) ? files : [files].filter(Boolean)
  return Promise.all(list.map((file) => uploadFileToCloudinary(file, folder)))
}
