import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { FiArrowUpRight, FiSearch } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import CategoryPills from '../components/premium/CategoryPills'
import FabricBackdrop from '../components/premium/FabricBackdrop'
import SEO from '../components/SEO'
import { fabricSlideImages } from '../data/fabricImages'
import { productMatchesCategory, resolveCategoryFilter } from '../utils/categoryUtils'

import { useProducts } from '../hooks/useProducts'

export default function Products() {
  const { products, loading, error } = useProducts()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(resolveCategoryFilter(searchParams.get('category') || 'All'))

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
    setCategory(resolveCategoryFilter(searchParams.get('category') || 'All'))
  }, [searchParams])

  const categories = useMemo(() => ['All', ...new Set(products.map((p) => p.category).filter(Boolean))], [products])

  const handleCategoryChange = (nextCategory) => {
    const resolved = resolveCategoryFilter(nextCategory)
    setCategory(resolved)

    const params = new URLSearchParams(searchParams)
    if (resolved === 'All') params.delete('category')
    else params.set('category', resolved)

    const search = params.toString()
    navigate(search ? `/products?${search}` : '/products', { replace: true })
  }

  const filtered = products.filter((product) => {
    const matchCat = productMatchesCategory(product.category, category)
    const matchQuery = !query || JSON.stringify(product).toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  })

  return (
    <>
      <SEO title="Fabric Catalog" description="V.Colors wholesale fabric catalog — embroidery, jacquard, velvet fabrics. Bulk quote on WhatsApp." path="/products" />

      <section className="relative overflow-hidden border-b border-slate-200 py-8 text-white md:py-10">
        <FabricBackdrop images={fabricSlideImages} interval={5000} overlay="dark" />
        <div className="premium-container relative z-10">
          <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold">Fabric Catalog</h1>
          <p className="mt-2 text-sm text-white/75">Wholesale B2B supply · Factory direct from Surat</p>
          <div className="relative mt-5 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              className="w-full rounded-lg border border-white/15 bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white outline-none backdrop-blur placeholder:text-white/45 focus:border-[#D4AF37]"
              placeholder="Search fabrics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <CategoryPills categories={categories} active={category} onChange={handleCategoryChange} />

      <section className="compact-section bg-[#FAFAFA]">
        <div className="premium-container">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="section-title">{category === 'All' ? 'All Fabrics' : category}</h2>
              <p className="section-meta mt-1">{filtered.length} designs · Bulk orders accepted</p>
            </div>
            <Link to="/inquiry" className="inline-flex items-center gap-1 text-xs font-bold text-[#D4AF37]">
              Request Quote <FiArrowUpRight />
            </Link>
          </div>

          {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-600">{error}</p>}
          {loading && <p className="py-10 text-center text-xs text-slate-400">Loading catalog...</p>}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id || product._id} product={product} tilt3d />
            ))}
          </div>

          {!loading && !filtered.length && (
            <p className="py-12 text-center text-xs text-slate-400">No fabrics found.</p>
          )}
        </div>
      </section>
    </>
  )
}
