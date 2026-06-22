import { company } from '../data/companyData'

export function getWhatsAppUrl(message = '') {
  const text = encodeURIComponent(message || 'Hello V.Colors, I am interested in wholesale fabric inquiry. Please share catalog and MOQ details.')
  return `https://wa.me/${company.whatsapp}?text=${text}`
}

export function getProductWhatsAppUrl(product) {
  const name = product?.name || 'Fabric'
  const category = product?.category?.name || product?.category || ''
  const message = `Hello V.Colors,\n\nI am interested in bulk inquiry for:\n• Product: ${name}\n• Category: ${category}\n\nPlease share price, MOQ and availability.\n\nThank you.`
  return getWhatsAppUrl(message)
}

export function getCategoryWhatsAppUrl(categoryName) {
  const message = `Hello V.Colors,\n\nI am looking for wholesale ${categoryName}.\nPlease share catalog, MOQ and best price.\n\nThank you.`
  return getWhatsAppUrl(message)
}
