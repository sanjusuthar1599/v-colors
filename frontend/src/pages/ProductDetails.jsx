import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiCheckCircle, FiMinus, FiPlus, FiShoppingBag, FiShoppingCart, FiTruck } from 'react-icons/fi'
import CompanyImage from '../components/CompanyImage'
import ProductCard from '../components/ProductCard'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { useCart } from '../context/CartContext'
import { useProducts } from '../hooks/useProducts'
import { matchesProductParam } from '../utils/productUtils'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, getProductQuantity, updateQuantity } = useCart()
  const { products, loading } = useProducts()
  const product = products.find((item) => matchesProductParam(item, id))
  const related = product ? products.filter((item) => !matchesProductParam(item, product.id)).filter((item) => item.id !== product.id).slice(0, 3) : []
  const quantity = product ? getProductQuantity(product) : 0
  const productId = product?._id || product?.id

  const buyNow = () => {
    addToCart(product)
    navigate('/checkout')
  }

  if (loading) {
    return (
      <section className="section container">
        <div className="card text-center">
          <h1 className="font-display text-3xl font-bold text-navy">Loading product...</h1>
          <p className="mt-3 text-slate-600">Please wait while product details are loaded from MongoDB.</p>
        </div>
      </section>
    )
  }

  if (!product) {
    return (
      <>
        <SEO title="Product Not Found" description="Product not found." path="/products" />
        <section className="section container">
          <div className="card text-center">
            <h1 className="font-display text-3xl font-bold text-navy">Product not found</h1>
            <p className="mt-3 text-slate-600">This product may have been deleted or the link is incorrect.</p>
            <Link to="/products" className="mt-6 inline-block rounded-full bg-logo-gradient px-7 py-4 font-bold text-white">Back To Products</Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO title={product.name} description={product.description} path={`/products/${product.id}`} />
      <section className="section container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start !py-8">
        <div className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/80">
            {product.video ? (
              <video src={product.video} poster={product.image} className="h-[390px] w-full rounded-[1.5rem] bg-navy object-cover md:h-[455px]" controls muted playsInline />
            ) : (
              <CompanyImage src={product.image} alt={product.name} className="h-[390px] w-full rounded-[1.5rem] object-cover transition hover:scale-[1.02] md:h-[455px]" />
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[product.image, ...related.map((item) => item.image)].slice(0, 3).map((image) => <CompanyImage key={image} src={image} alt="V Colors related fabric" className="h-20 rounded-2xl border border-slate-200 object-cover shadow-sm md:h-24" />)}
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 md:p-8">
          <p className="eyebrow !mb-3">{product.category}</p>
          <h1 className="font-display text-3xl font-normal leading-tight md:text-3xl">{product.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{product.description}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-logo-yellow/20 p-4">
              <p className="text-[11px] font-black uppercase tracking-widest text-navy">Online Price</p>
              <p className="mt-1 font-display text-2xl font-black text-navy">
                {product.priceAmount ? `INR ${product.priceAmount}` : 'Price on request'}
              </p>
              {product.price && product.price !== `INR ${product.priceAmount}` && (
                <p className="text-sm font-semibold text-slate-500">{product.price}</p>
              )}
            </div>
            <div className="rounded-2xl bg-logo-blue/10 p-4">
              <p className="text-[11px] font-black uppercase tracking-widest text-logo-blue">MOQ / Delivery</p>
              <p className="mt-1 font-display text-xl font-black text-navy">{product.moq || 'Bulk available'}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-green-700"><FiTruck /> 3-5 working days</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {quantity > 0 ? (
              <div className="inline-flex items-center justify-between rounded-full bg-navy p-1 text-white shadow-lg">
                <button onClick={() => updateQuantity(productId, quantity - 1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white hover:text-navy" aria-label="Decrease quantity">
                  <FiMinus />
                </button>
                <span className="min-w-20 px-3 text-center text-sm font-black">Qty {quantity}</span>
                <button onClick={() => updateQuantity(productId, quantity + 1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white hover:text-navy" aria-label="Increase quantity">
                  <FiPlus />
                </button>
              </div>
            ) : (
              <button onClick={() => addToCart(product)} className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-xl"><FiShoppingCart /> Add To Cart</button>
            )}
            <button onClick={buyNow} className="inline-flex items-center justify-center gap-2 rounded-full bg-logo-gradient px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-xl"><FiShoppingBag /> Buy Now</button>
          </div>
          <div className="mt-5 grid gap-2 text-xs font-bold text-slate-600 sm:grid-cols-3">
            {['COD Available', 'Secure Checkout', 'Wholesale Inquiry'].map((item) => <span key={item} className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2"><FiCheckCircle className="text-green-600" /> {item}</span>)}
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60"><h2 className="font-display text-xl font-black text-navy">Specifications</h2><ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">{(product.specs.length ? product.specs : ['Category: ' + product.category, 'Bulk inquiry available', 'Latest price on request']).map((item) => <li key={item}>• {item}</li>)}</ul></div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60"><h2 className="font-display text-xl font-black text-navy">Applications</h2><ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">{(product.applications.length ? product.applications : ['Garment manufacturing', 'Wholesale supply', 'Retail fabric sourcing']).map((item) => <li key={item}>• {item}</li>)}</ul></div>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeader title="Related Products" />
        <div className="grid gap-6 md:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
        <Link to="/products" className="mt-8 inline-block rounded-full bg-navy px-7 py-4 font-bold text-white">Back To Products</Link>
      </section>
    </>
  )
}
