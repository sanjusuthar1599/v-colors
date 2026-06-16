import multer from 'multer'
import path from 'path'

const memoryStorage = multer.memoryStorage()

const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'backend/uploads'),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`),
})

function fileFilter(_req, file, cb) {
  const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.webm', '.mov']
  cb(null, allowed.includes(path.extname(file.originalname).toLowerCase()))
}

const useMemory = Boolean(process.env.CLOUDINARY_CLOUD_NAME)

export const upload = multer({
  storage: useMemory ? memoryStorage : diskStorage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
})
