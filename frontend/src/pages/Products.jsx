import { useMemo, useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import InquiryForm from '../components/InquiryForm'
import ProductCard from '../components/ProductCard'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { categories } from '../data/companyData'
import { mediaAssets } from '../data/mediaAssets'
import { useProducts } from '../hooks/useProducts'
import { resolveMediaUrl } from '../utils/resolveMediaUrl'

export default function Products() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const { products, loading, error } = useProducts()

  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = active === 'All' || product.category === active
    const matchesQuery = `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  }), [active, products, query])

  return (
    <>
      <SEO title="Products" description="Explore V.Colors jari net embroidery fabric, embroidery fabrics, fancy fabrics, velvet fabrics, jacquard fabric and readymade laces from Surat." path="/products" />
     <section className="page-hero relative overflow-hidden h-[650px]">
  {/* Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 h-full w-full object-cover"
  >
    <source src={resolveMediaUrl(mediaAssets.company.productShowcaseVideo)} type="video/mp4" />
  </video>

  {/* Optional Dark Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="container relative z-10">
    <p className="eyebrow text-white">Products</p>
    <h1 className="font-display text-5xl font-normal leading-tight md:text-6xl w-3xl text-white">
      <span className="text-gold">V.Colors </span>Products Categories For 
      <span className="text-gold"> Textile </span>
       Buyers
    </h1>
  </div>
</section>
      <section className="section container">
        <SectionHeader title="Search And Filter Products" text="Select a V.Colors category or search by fabric name, specification, MOQ, finish or application." />
        {loading && <p className="mb-4 text-center font-semibold text-logo-blue">Loading products...</p>}
        {error && <p className="mb-4 rounded-2xl bg-logo-yellow/20 p-4 text-center text-sm font-semibold text-navy">{error}</p>}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {['All', ...categories].map((category) => (
              <button key={category} onClick={() => setActive(category)} className={`rounded-full px-5 py-3 text-sm font-bold ${active === category ? 'bg-logo-gradient text-white shadow-lg' : 'bg-slate-100 text-slate-700'}`}>{category}</button>
            ))}
          </div>
          <label className="flex min-w-[280px] items-center gap-3 rounded-full border border-slate-200 px-5 py-3">
            <FiSearch className="text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="w-full bg-transparent outline-none" />
          </label>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => <ProductCard key={product._id || product.id} product={product} onInquiry={setSelected} />)}
        </div>
      </section>
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/70 p-4 backdrop-blur">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-[2rem] bg-white p-6">
            <button onClick={() => setSelected(null)} className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-slate-100"><FiX /></button>
            <SectionHeader align="left" eyebrow="Product Inquiry" title={selected.name} text={selected.description} />
            <InquiryForm selectedProduct={selected.name} />
          </div>
        </div>
      )}
    </>
  )
}
