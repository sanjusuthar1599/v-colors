import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { FiArrowLeft, FiPhone } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import ProductMediaGallery from '../components/ProductMediaGallery'
import Reveal3D from '../components/interactive/Reveal3D'
import Tilt3D from '../components/interactive/Tilt3D'
import SEO from '../components/SEO'
import { company } from '../data/companyData'
import { useProducts } from '../hooks/useProducts'
import { getProductWhatsAppUrl } from '../utils/inquiry'
import { matchesProductParam } from '../utils/productUtils'

function getProductCode(product) {
  const id = String(product._id || product.id || '000000')
  return `VC-${id.slice(-6).toUpperCase()}`
}

export default function ProductDetails() {
  const { id } = useParams()
  const { products, loading } = useProducts()
  const product = products.find((item) => matchesProductParam(item, id))
  const related = product ? products.filter((item) => !matchesProductParam(item, product.id)).slice(0, 3) : []
  const [activeTab, setActiveTab] = useState('description')

  const specs = product?.specs?.length ? product.specs : ['Premium textile grade', 'Bulk supply available', 'Export quality finishing']
  const applications = product?.applications?.length ? product.applications : ['Garment manufacturing', 'Wholesale supply', 'Retail sourcing']

  if (loading) {
    return (
      <section className="site-section premium-container">
        <p className="text-center site-caption">Loading fabric details...</p>
      </section>
    )
  }

  if (!product) {
    return (
      <>
        <SEO title="Product Not Found" description="Product not found." path="/products" />
        <section className="site-section premium-container text-center">
          <h1 className="site-heading">Product not found</h1>
          <Link to="/products" className="btn-gold mt-6 inline-flex">Back To Catalog</Link>
        </section>
      </>
    )
  }

  const detailRows = [
    ['Fabric Type', product.category],
    ['Material', product.material || 'On inquiry'],
    ['Width', product.width || 'Standard wholesale widths'],
    ['MOQ', product.moq || '30 meter'],
    ['Lead Time', product.leadTime || '7 to 15 days'],
    ['Product Code', getProductCode(product)],
  ]

  return (
    <>
      <SEO title={product.name} description={product.description} path={`/products/${product.id}`} />

      <section className="border-b border-slate-100 bg-white py-3">
        <div className="premium-container flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link to="/products" className="inline-flex items-center gap-1.5 font-medium transition hover:text-[#0B1F3A]">
            <FiArrowLeft className="text-xs" /> Products
          </Link>
          <span>/</span>
          <span className="text-[#D4AF37]">{product.category}</span>
        </div>
      </section>

      <section className="bg-white py-8 lg:py-12">
        <div className="premium-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start xl:gap-14">
            <Reveal3D>
              <Tilt3D intensity={9}>
                <ProductMediaGallery product={product} />
              </Tilt3D>
            </Reveal3D>

            <Reveal3D delay={0.08} className="min-w-0 pt-1">
              <h1 className="font-display text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-snug tracking-tight text-[#1a1a1a]">
                {product.name}
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600">{product.description}</p>

              <div className="mt-7 flex items-stretch gap-3">
                <a
                  href={getProductWhatsAppUrl(product)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-sm bg-[#25D366] px-6 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-105"
                >
                  <FaWhatsapp className="text-lg" />
                  Inquiry Now
                </a>
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="inline-flex w-12 shrink-0 items-center justify-center rounded-sm border border-slate-200 text-[#0B1F3A] transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  aria-label="Call sales team"
                >
                  <FiPhone className="text-lg" />
                </a>
              </div>

              <p className="mt-6 text-sm text-slate-700">
                <span className="font-semibold text-[#0B1F3A]">Categories:</span>{' '}
                <Link to="/products" className="font-medium text-[#D4AF37] transition hover:text-[#0B1F3A]">
                  {product.category}
                </Link>
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 pt-6 text-xs text-slate-500">
                <span>MOQ: <strong className="text-[#0B1F3A]">{product.moq || '30 meter'}</strong></span>
                <span>Lead Time: <strong className="text-[#0B1F3A]">{product.leadTime || '7 to 15 days'}</strong></span>
                <span>Code: <strong className="text-[#0B1F3A]">{getProductCode(product)}</strong></span>
              </div>
            </Reveal3D>
          </div>

          <Reveal3D className="mt-12 lg:mt-16">
            <div className="flex border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('description')}
                className={`px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.12em] transition ${
                  activeTab === 'description'
                    ? 'bg-[#D4AF37] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.12em] transition ${
                  activeTab === 'info'
                    ? 'bg-[#D4AF37] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Additional Info
              </button>
            </div>

            <div className="py-8">
              {activeTab === 'description' ? (
                <div className="max-w-3xl space-y-6 text-sm leading-7 text-slate-600">
                  <p>{product.description}</p>
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-[#0B1F3A]">Specifications</h3>
                      <ul className="space-y-2">
                        {specs.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-[#0B1F3A]">Applications</h3>
                      <ul className="space-y-2">
                        {applications.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl overflow-hidden rounded-sm ring-1 ring-slate-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {detailRows.map(([label, value]) => (
                        <tr key={label} className="border-b border-slate-100 last:border-0">
                          <th className="w-40 bg-slate-50 px-5 py-3.5 text-left font-semibold text-[#0B1F3A]">{label}</th>
                          <td className="px-5 py-3.5 text-slate-600">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Reveal3D>
        </div>
      </section>

      {related.length > 0 && (
        <section className="site-section border-t border-slate-200 bg-[#FAFAFA]">
          <div className="premium-container">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="site-eyebrow">More Fabrics</p>
                <h2 className="site-heading">Related Fabrics</h2>
              </div>
              <Link to="/products" className="text-sm font-bold text-[#D4AF37]">View Full Catalog →</Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id || item._id} product={item} tilt3d />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
