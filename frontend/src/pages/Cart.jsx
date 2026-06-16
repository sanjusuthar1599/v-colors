import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from 'react-icons/fi'
import CompanyImage from '../components/CompanyImage'
import SEO from '../components/SEO'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, summary } = useCart()

  return (
    <>
      <SEO title="Cart" description="Review V.Colors fabric cart and place an online order." path="/cart" />
      <section className="section container grid gap-8 lg:grid-cols-[1.3fr_0.7fr] !py-16">
        <div className="grid gap-5">
          {!items.length && (
            <div className="card text-center">
              <FiShoppingBag className="mx-auto text-5xl text-logo-blue" />
              <h2 className="mt-4">Your cart is empty</h2>
              <p className="mt-2 text-slate-600">Explore V.Colors fabric range and add products for online order.</p>
              <Link to="/products" className="mt-6 inline-flex rounded-full bg-logo-gradient px-7 py-4 font-bold text-white">Browse Products</Link>
            </div>
          )}

          {items.map((item) => (
            <div key={item.id} className="grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/70 md:grid-cols-[150px_1fr_auto]">
              <CompanyImage src={item.image} alt={item.name} className="h-36 w-full rounded-3xl object-cover" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-logo-blue">{item.category}</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-navy">{item.name}</h2>
                <p className="mt-2 font-bold text-slate-600">INR {item.priceAmount} / piece</p>
                <div className="mt-4 inline-flex items-center rounded-full border border-slate-200 bg-slate-50">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-3"><FiMinus /></button>
                  <span className="px-4 font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-3"><FiPlus /></button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 md:block md:text-right">
                <p className="font-display text-2xl font-bold text-navy">INR {item.priceAmount * item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
                  <FiTrash2 /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/80">
          <h2 className="font-display text-3xl font-bold text-navy">Order Summary</h2>
          <div className="mt-6 grid gap-3 text-slate-600">
            <p className="flex justify-between"><span>Subtotal</span><b>INR {summary.subtotal}</b></p>
            <p className="flex justify-between"><span>Shipping</span><b>{summary.shippingCharge ? `INR ${summary.shippingCharge}` : 'Free'}</b></p>
            <p className="border-t border-slate-200 pt-4 text-lg flex justify-between text-navy"><span>Total</span><b>INR {summary.total}</b></p>
          </div>
          <p className="mt-5 rounded-2xl bg-logo-blue/10 p-4 text-sm font-semibold text-logo-blue">Expected delivery: 3-5 working days after order confirmation.</p>
          <Link to="/checkout" className={`mt-6 flex justify-center rounded-full px-7 py-4 font-bold text-white ${items.length ? 'bg-logo-gradient' : 'pointer-events-none bg-slate-300'}`}>Proceed To Checkout</Link>
        </aside>
      </section>
    </>
  )
}
