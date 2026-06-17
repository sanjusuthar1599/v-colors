import { mediaAssets } from '../data/mediaAssets'

import { resolveMediaUrl } from './resolveMediaUrl'

const categoryImages = [
  ['jari', mediaAssets.products.embroideryFabric, mediaAssets.products.embroideryFabricFallback],
  ['embroidery', mediaAssets.products.nylonNetFabric, mediaAssets.products.nylonNetFabricFallback],
  ['jacquard', mediaAssets.products.jacquardFabric, mediaAssets.products.jacquardFabricFallback],
  ['velvet', mediaAssets.products.velvetFabric, mediaAssets.products.velvetFabricFallback],
  ['fancy', mediaAssets.products.digitalPrintFabric, mediaAssets.products.digitalPrintFabricFallback],
  ['lace', mediaAssets.products.fancyLace, mediaAssets.products.fancyLaceFallback],
]

function getDefaultImage(category = '') {
  const match = categoryImages.find(([key]) => category.toLowerCase().includes(key))
  return resolveMediaUrl(match?.[1] || match?.[2] || mediaAssets.products.embroideryFabricFallback)
}

function getUsableImage(image, category) {
  if (!image) return getDefaultImage(category)
  if (image.includes('tradeindia.com/products') || image.includes('indiamart.com/proddetail')) {
    return getDefaultImage(category)
  }
  return resolveMediaUrl(image)
}

function resolvePriceAmount(product) {
  if (typeof product.priceAmount === 'number' && product.priceAmount > 0) return product.priceAmount
  if (typeof product.price === 'number' && product.price > 0) return product.price
  const match = String(product.price || '').replace(/,/g, '').match(/\d+/)
  return match ? Number(match[0]) : null
}

export function normalizeProduct(product) {
  const id = product._id || product.id || product.slug || product.name
  const category = product.category?.name || product.categoryName || product.category || 'New Items'
  const image = getUsableImage(product.image || product.images?.[0], category)
  const priceAmount = resolvePriceAmount(product)
  const videos = product.videos || (product.video ? [product.video] : [])

  return {
    ...product,
    id,
    category,
    image,
    video: resolveMediaUrl(product.video || videos[0] || ''),
    videos: videos.map(resolveMediaUrl),
    priceAmount,
    priceLabel: product.price || (priceAmount ? `INR ${priceAmount}` : 'Price on request'),
    specs: product.specs || product.specifications || [],
    applications: product.applications || [],
  }
}

export function getProductPath(product) {
  return `/products/${product.slug || product._id || product.id}`
}

export function matchesProductParam(product, param) {
  return [product.id, product._id, product.slug].filter(Boolean).some((value) => String(value) === String(param))
}

export function mergeProducts(apiProducts, fallbackProducts) {
  const normalizedApi = apiProducts.map(normalizeProduct)
  const existing = new Set(normalizedApi.map((product) => product.slug || product.id || product.name))
  const fallback = fallbackProducts.filter((product) => !existing.has(product.slug || product.id || product.name)).map(normalizeProduct)
  return [...normalizedApi, ...fallback]
}
