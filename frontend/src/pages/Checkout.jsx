import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiAlertCircle, FiCreditCard, FiMapPin, FiTruck, FiX } from 'react-icons/fi'
import SEO from '../components/SEO'
import { useCart } from '../context/CartContext'
import { orderService } from '../services/api'
import { showToast } from '../utils/toast'

const initialAddress = {
  fullName: '',
  email: '',
  phone: '',
  addressLine: '',
  city: '',
  state: 'Gujarat',
  pincode: '',
  country: 'India',
}

export default function Checkout() {
  const navigate = useNavigate()
  const { items, summary, clearCart } = useCart()
  const [shippingAddress, setShippingAddress] = useState(initialAddress)
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [showCodModal, setShowCodModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  const openCodUnavailableModal = (event) => {
    event.preventDefault()
    setShowCodModal(true)
  }

  const chooseOnlinePayment = () => {
    setPaymentMethod('stripe')
    setShowCodModal(false)
  }

  const updateAddress = (event) => {
    setShippingAddress((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submitOrder = async (event) => {
    event.preventDefault()
    if (!items.length) return navigate('/products')
    if (paymentMethod === 'cod') {
      setShowCodModal(true)
      return
    }
    setSaving(true)
    setToast('')
    try {
      const { data } = await orderService.create({ items, shippingAddress, paymentMethod })
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
        return
      }
      clearCart()
      showToast({ title: 'Order placed successfully', message: 'Expected delivery within 3-5 working days.', type: 'success' })
      navigate(`/order-success/${data.order._id}`)
    } catch (error) {
      const message = error.response?.data?.message || 'Order could not be placed. Please check details and try again.'
      setToast(message)
      showToast({ title: 'Order failed', message, type: 'info' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <SEO title="Checkout" description="Place V.Colors online fabric order with address and payment method." path="/checkout" />
      {/* <section className="page-hero">
        <div className="container relative">
          <p className="eyebrow">Secure Checkout</p>
          <h1>Place Your Fabric Order</h1>
          <p>Save address, choose payment method and receive order confirmation with 3-5 working day delivery message.</p>
        </div>
      </section> */}

      <section className="section container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] !py-16">
        <form onSubmit={submitOrder} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/80 md:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-logo-gradient text-white"><FiMapPin /></span>
            <div>
              <h2 className="font-display text-3xl font-bold text-navy">Delivery Address</h2>
              <p className="text-sm text-slate-500">This address will be saved with your order.</p>
            </div>
          </div>

          {toast && <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">{toast}</p>}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ['fullName', 'Full Name'],
              ['email', 'Email'],
              ['phone', 'Mobile Number'],
              ['city', 'City'],
              ['state', 'State'],
              ['pincode', 'Pincode'],
            ].map(([name, label]) => (
              <label key={name} className="grid gap-2 text-sm font-bold text-slate-700">
                {label}
                <input required name={name} value={shippingAddress[name]} onChange={updateAddress} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-logo-blue" />
              </label>
            ))}
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Complete Address
              <textarea required name="addressLine" value={shippingAddress.addressLine} onChange={updateAddress} rows="4" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-logo-blue" />
            </label>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-2xl font-bold text-navy">Payment Method</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={openCodUnavailableModal}
                className="relative cursor-pointer rounded-3xl border border-slate-200 p-5 text-left transition hover:border-logo-blue/40 hover:bg-slate-50"
              >
                <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-800">
                  Unavailable
                </span>
                <FiTruck className="text-3xl text-logo-blue" />
                <b className="mt-3 block text-navy">Cash On Delivery</b>
                <span className="text-sm text-slate-600">Pay when your fabric order is delivered.</span>
              </button>
              <label className={`cursor-pointer rounded-3xl border p-5 ${paymentMethod === 'stripe' ? 'border-logo-blue bg-logo-blue/10' : 'border-slate-200'}`}>
                <input type="radio" name="paymentMethod" value="stripe" checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} className="sr-only" />
                <FiCreditCard className="text-3xl text-logo-blue" />
                <b className="mt-3 block text-navy">Online Payment</b>
                <span className="text-sm text-slate-600">Stripe checkout activates after secret key setup.</span>
              </label>
            </div>
          </div>

          <button disabled={saving || !items.length} className="mt-8 w-full rounded-full bg-logo-gradient px-7 py-4 font-bold text-white disabled:bg-slate-300">
            {saving ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        <aside className="h-fit rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="font-display text-3xl font-bold text-navy">Your Items</h2>
          <div className="mt-6 grid gap-4">
            {!items.length && <Link to="/products" className="rounded-2xl bg-white p-4 text-center font-bold text-logo-blue">Cart empty, browse products</Link>}
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-navy">{item.name}</h3>
                  <p className="text-sm text-slate-500">Qty {item.quantity} x INR {item.priceAmount}</p>
                </div>
                <b>INR {item.priceAmount * item.quantity}</b>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 border-t border-slate-200 pt-6 text-slate-600">
            <p className="flex justify-between"><span>Subtotal</span><b>INR {summary.subtotal}</b></p>
            <p className="flex justify-between"><span>Shipping</span><b>{summary.shippingCharge ? `INR ${summary.shippingCharge}` : 'Free'}</b></p>
            <p className="flex justify-between text-xl text-navy"><span>Total</span><b>INR {summary.total}</b></p>
          </div>
          <p className="mt-5 rounded-2xl bg-logo-yellow/30 p-4 text-sm font-bold text-navy">Order success message: Your order has been placed successfully. Expected delivery within 3-5 working days.</p>
        </aside>
      </section>

      <AnimatePresence>
        {showCodModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.button
              type="button"
              aria-label="Close popup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCodModal(false)}
              className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cod-unavailable-title"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-300/70"
            >
              <div className="bg-logo-gradient px-8 py-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                    <FiTruck className="text-3xl" />
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCodModal(false)}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
                    aria-label="Close"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
                <h3 id="cod-unavailable-title" className="mt-5 font-display text-2xl font-bold">
                  Cash On Delivery Unavailable
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/90">
                  Currently we are not accepting Cash on Delivery orders.
                </p>
              </div>

              <div className="px-8 py-7">
                <div className="flex gap-3 rounded-2xl bg-amber-50 p-4 text-amber-900">
                  <FiAlertCircle className="mt-0.5 shrink-0 text-xl text-amber-600" />
                  <p className="text-sm leading-6">
                    Please use <b>Online Payment</b> to place your order. COD will be enabled again soon.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setShowCodModal(false)}
                    className="rounded-full border border-slate-200 px-5 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={chooseOnlinePayment}
                    className="rounded-full bg-logo-gradient px-5 py-3.5 font-bold text-white shadow-lg transition hover:opacity-95"
                  >
                    Use Online Payment
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
