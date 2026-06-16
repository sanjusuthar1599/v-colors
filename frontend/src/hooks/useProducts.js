import { useEffect, useState } from 'react'
import { products as fallbackProducts } from '../data/companyData'
import { productService } from '../services/api'
import { normalizeProduct } from '../utils/productUtils'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadProducts() {
      try {
        const { data } = await productService.list()
        if (active) setProducts(data.length ? data.map(normalizeProduct) : fallbackProducts.map(normalizeProduct))
      } catch {
        if (active) setProducts(fallbackProducts.map(normalizeProduct))
        if (active) setError('Products are loading from local catalog because API is unavailable.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProducts()
    return () => {
      active = false
    }
  }, [])

  return { products, loading, error }
}
