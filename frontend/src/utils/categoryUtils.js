import { mediaAssets } from '../data/mediaAssets'

export const categoryCatalog = [
  { label: 'Embroidery Fabrics', filter: 'Embroidery Fabrics', slug: 'embroidery-fabrics', image: mediaAssets.products.embroideryFabric },
  { label: 'Jari Net Fabrics', filter: 'Jari Net Embroidery Fabric', slug: 'jari-net-fabrics', image: mediaAssets.products.nylonNetFabric },
  { label: 'Velvet Fabrics', filter: 'Velvet Fabrics', slug: 'velvet-fabrics', image: mediaAssets.products.velvetFabric },
  { label: 'Jacquard Fabrics', filter: 'Jacquard Fabric', slug: 'jacquard-fabrics', image: mediaAssets.products.jacquardFabric },
  { label: 'Fancy Fabrics', filter: 'Fancy Fabrics', slug: 'fancy-fabrics', image: mediaAssets.products.digitalPrintFabric },
  { label: 'Readymade Laces', filter: 'Readymade Laces', slug: 'readymade-laces', image: mediaAssets.products.fancyLace },
]

const aliasMap = Object.fromEntries(
  categoryCatalog.flatMap((item) => [
    [item.label.toLowerCase(), item.filter],
    [item.filter.toLowerCase(), item.filter],
    [item.slug, item.filter],
  ]),
)

function normalizeCategory(value = '') {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function resolveCategoryFilter(value = '') {
  const normalized = normalizeCategory(value)
  if (!normalized || normalized === 'all') return 'All'
  if (aliasMap[normalized]) return aliasMap[normalized]

  const match = categoryCatalog.find(
    (item) =>
      normalizeCategory(item.label) === normalized ||
      normalizeCategory(item.filter) === normalized ||
      item.slug === normalized,
  )
  return match?.filter || value.trim()
}

export function getProductsCategoryUrl(category = 'All') {
  const resolved = resolveCategoryFilter(category)
  if (!resolved || resolved === 'All') return '/products'
  return `/products?category=${encodeURIComponent(resolved)}`
}

export function productMatchesCategory(productCategory = '', selectedCategory = 'All') {
  if (!selectedCategory || selectedCategory === 'All') return true

  const resolved = resolveCategoryFilter(selectedCategory)
  const productValue = productCategory?.name || productCategory || ''

  if (productValue === resolved) return true

  const productNorm = normalizeCategory(productValue)
  const selectedNorm = normalizeCategory(resolved)
  if (productNorm === selectedNorm) return true
  if (productNorm.includes(selectedNorm) || selectedNorm.includes(productNorm)) return true

  return productNorm.replace(/ fabrics?$/, '') === selectedNorm.replace(/ fabrics?$/, '')
}
