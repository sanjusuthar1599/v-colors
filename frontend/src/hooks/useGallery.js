import { useEffect, useState } from 'react'
import { galleryImages as fallbackImages } from '../data/companyData'
import { galleryService } from '../services/api'
import { resolveMediaUrl } from '../utils/resolveMediaUrl'

export function useGallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadGallery() {
      try {
        const { data } = await galleryService.list()
        const normalized = data.map((item) => ({
          id: item._id,
          image: resolveMediaUrl(item.image),
          category: item.category || item.title || 'Gallery',
        }))
        if (active) setItems(normalized.length ? normalized : fallbackImages)
      } catch {
        if (active) setItems(fallbackImages)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadGallery()
    return () => { active = false }
  }, [])

  return { items, loading }
}
