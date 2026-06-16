import { useEffect, useState } from 'react'
import { testimonials as fallbackTestimonials } from '../data/companyData'
import { testimonialService } from '../services/api'

export function useTestimonials() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadTestimonials() {
      try {
        const { data } = await testimonialService.list()
        if (active) setItems(data.length ? data : fallbackTestimonials)
      } catch {
        if (active) setItems(fallbackTestimonials)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadTestimonials()
    return () => { active = false }
  }, [])

  return { testimonials: items, loading }
}
