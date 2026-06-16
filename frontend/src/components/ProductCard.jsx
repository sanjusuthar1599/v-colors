import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi'
import CompanyImage from './CompanyImage'
import { FaWhatsapp } from 'react-icons/fa'
import { company } from '../data/companyData'
import { getProductPath } from '../utils/productUtils'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart, getProductQuantity, updateQuantity } = useCart()
  const quantity = getProductQuantity(product)
  const productId = product._id || product.id
  const hasPrice = typeof product.priceAmount === 'number' && product.priceAmount > 0

  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-lg shadow-slate-200/70 transition hover:border-logo-blue/30 hover:shadow-2xl"
    >
      <Link to={getProductPath(product)} className="relative block overflow-hidden">
        {product.video ? (
          <video src={product.video} className="h-52 w-full object-cover transition duration-700 group-hover:scale-110" autoPlay muted loop playsInline poster={product.image} />
        ) : (
          <CompanyImage src={product.image || product.images?.[0]} alt={product.name} className="h-52 w-full object-cover transition duration-700 group-hover:scale-110" />
        )}
        {product.video && <span className="absolute right-3 top-3 rounded-full bg-navy/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">Video</span>}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-black text-navy shadow-md">
          {hasPrice ? `INR ${product.priceAmount}` : 'Price on request'}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-5">
          <p className="line-clamp-1 text-sm font-bold text-white">{product.name}</p>
        </div>
      </Link>
      <div className="p-4">
        <span className="rounded-full bg-logo-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-logo-blue">{product.category?.name || product.category}</span>
        <h3 className="mt-3 line-clamp-1 font-display text-lg font-bold text-navy">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">{product.description}</p>
        {(product.price || product.moq) && (
          <div className="mt-3 grid gap-2 text-[11px] font-bold text-slate-600 sm:grid-cols-2">
            {product.price && <span className="rounded-full bg-logo-yellow/20 px-3 py-2 text-navy">{product.price}</span>}
            {product.moq && <span className="rounded-full bg-logo-blue/10 px-3 py-2">MOQ: {product.moq}</span>}
          </div>
        )}
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {hasPrice && quantity > 0 ? (
            <div className="inline-flex items-center justify-between rounded-full bg-navy p-1 text-white shadow-lg">
              <button onClick={() => updateQuantity(productId, quantity - 1)} className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition hover:bg-white hover:text-navy" aria-label="Decrease quantity">
                <FiMinus />
              </button>
              <span className="min-w-10 px-2 text-center text-xs font-black">Qty {quantity}</span>
              <button onClick={() => updateQuantity(productId, quantity + 1)} className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition hover:bg-white hover:text-navy" aria-label="Increase quantity">
                <FiPlus />
              </button>
            </div>
          ) : hasPrice ? (
            <button onClick={() => addToCart(product)} className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-4 py-2.5 text-xs font-bold text-white transition hover:shadow-lg">
              <FiShoppingCart /> Add To Cart
            </button>
          ) : (
            <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-500">Price on request</span>
          )}
          <a href={`https://wa.me/${company.whatsapp}`} className="flex items-center justify-center gap-2 rounded-full bg-logo-gradient px-4 py-2.5 text-xs font-bold text-white transition hover:shadow-lg">
           <FaWhatsapp className="text-lg"/> Inquiry
          </a>
        </div>
        <div className="mt-3 flex justify-end">
          <Link to={getProductPath(product)} className="flex items-center gap-1 text-xs font-bold text-logo-blue">
            Details <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
