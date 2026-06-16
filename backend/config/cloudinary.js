import { v2 as cloudinary } from 'cloudinary'

function applyCloudinaryUrl(url) {
  const match = String(url).match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/)
  if (!match) return false
  cloudinary.config({
    cloud_name: match[3],
    api_key: match[1],
    api_secret: match[2],
    secure: true,
  })
  return true
}

const { CLOUDINARY_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

if (CLOUDINARY_URL && applyCloudinaryUrl(CLOUDINARY_URL)) {
  console.log('[Cloudinary] configured from CLOUDINARY_URL')
} else if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  })
  console.log(`[Cloudinary] configured for cloud: ${CLOUDINARY_CLOUD_NAME}`)
}

export function isCloudinaryConfigured() {
  return Boolean(cloudinary.config().cloud_name && cloudinary.config().api_key && cloudinary.config().api_secret)
}

export default cloudinary
