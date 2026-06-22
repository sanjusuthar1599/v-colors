import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { FiArrowUpRight, FiClock, FiLayers } from 'react-icons/fi'
import Tilt3D from './interactive/Tilt3D'
import CompanyImage from './CompanyImage'
import { getProductPath } from '../utils/productUtils'
import { getProductWhatsAppUrl } from '../utils/inquiry'

function getProductCode(product) {
  const id = String(product._id || product.id || '000000')
  return `VC-${id.slice(-6).toUpperCase()}`
}

export default function ProductCard({ product, variant = 'catalog', tilt3d = false }) {
  const productPath = getProductPath(product)
  const moq = product.moq || '30 meter'
  const lead = product.leadTime || '7 to 15 days'

  const card = (
    <article className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-md">
      <Link to={productPath} className="group relative block overflow-hidden">
        {product.video ? (
          <video src={product.video} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]" autoPlay muted loop playsInline poster={product.image} />
        ) : (
          <CompanyImage src={product.image || product.images?.[0]} alt={product.name} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        )}

        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1">
          <span className="export-badge">Export Quality</span>
          <span className="product-code-badge">{getProductCode(product)}</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-10 opacity-0 transition group-hover:opacity-100">
          <span className="text-[11px] font-semibold text-white">View Details</span>
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#D4AF37]">Bulk Ready</span>
        </div>
      </Link>

      <div className="p-3.5">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] font-semibold leading-snug text-[#0B1F3A]">
          {product.name}
        </h3>

        <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1">
            <FiLayers className="text-[#D4AF37]" /> MOQ: {moq}
          </span>
          <span className="inline-flex items-center gap-1">
            <FiClock className="text-[#D4AF37]" /> Lead: {lead}
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          <Link to={productPath} className="btn-sample">
            View Sample <FiArrowUpRight className="text-xs" />
          </Link>
          <a href={getProductWhatsAppUrl(product)} target="_blank" rel="noreferrer" className="btn-bulk-quote">
            <FaWhatsapp className="text-sm" /> Bulk Quote
          </a>
        </div>
      </div>
    </article>
  )

  return tilt3d ? <Tilt3D intensity={10}>{card}</Tilt3D> : card
}
