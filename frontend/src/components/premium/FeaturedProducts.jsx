import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import ProductCard from '../ProductCard'
import { useProducts } from '../../hooks/useProducts'

export default function FeaturedProducts({ title = 'Featured Fabrics', limit = 6, category = 'All' }) {
  const { products, loading } = useProducts()
  const [activeCat, setActiveCat] = useState(category)

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category).filter(Boolean))]
    return ['All', ...cats]
  }, [products])

  const filtered = products
    .filter((p) => activeCat === 'All' || p.category === activeCat)
    .slice(0, limit)

  return (
    <section className="compact-section bg-white">
      <div className="premium-container">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="section-title">{activeCat === 'All' ? title : activeCat}</h2>
            <p className="section-meta mt-1">Showing top {limit} designs · Bulk orders accepted</p>
          </div>
          <Link to="/products" className="inline-flex items-center gap-1 text-xs font-bold text-[#D4AF37] hover:text-[#0B1F3A]">
            Full Catalog <FiArrowUpRight />
          </Link>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCat(cat)}
              className={`category-pill ${activeCat === cat ? 'category-pill-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && <p className="py-8 text-center text-xs text-slate-400">Loading...</p>}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id || product._id} product={product} tilt3d />
          ))}
        </div>
      </div>
    </section>
  )
}
