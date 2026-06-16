import { useState } from 'react'
import { FiCheckCircle, FiPackage, FiSearch, FiTruck } from 'react-icons/fi'
import SEO from '../components/SEO'
import { orderService } from '../services/api'

const steps = ['placed', 'processing', 'shipped', 'delivered']

export default function TrackOrder() {
  const [form, setForm] = useState({ orderNumber: '', phone: '' })
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setOrder(null)
    try {
      const { data } = await orderService.track(form)
      setOrder(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Order not found. Please check details and try again.')
    } finally {
      setLoading(false)
    }
  }

  const activeIndex = Math.max(steps.indexOf(order?.orderStatus), 0)

  return (
    <>
      <SEO title="Track Order" description="Track your V.Colors fabric order using order number and mobile number." path="/track-order" />
      <section className="section container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] !py-8">
        <form onSubmit={submit} className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/80 md:p-8">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-logo-gradient text-2xl text-white">
            <FiSearch />
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold text-navy">Find Your Order</h2>
          <p className="mt-2 text-slate-600">Use the order number shown after checkout or received in confirmation message.</p>

          {error && <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}

          <label className="mt-6 grid gap-2 text-sm font-bold text-slate-700">
            Order Number
            <input name="orderNumber" value={form.orderNumber} onChange={updateForm} placeholder="Example: VC-04197747" className="rounded-2xl border border-slate-200 px-4 py-3 uppercase outline-none focus:border-logo-blue" required />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
            Mobile Number
            <input name="phone" value={form.phone} onChange={updateForm} placeholder="Enter checkout mobile number" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-logo-blue" required />
          </label>
          <button disabled={loading} className="mt-6 w-full rounded-full bg-logo-gradient px-7 py-4 font-bold text-white disabled:bg-slate-300">
            {loading ? 'Checking Order...' : 'Show My Order'}
          </button>
        </form>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 md:p-8">
          {!order && (
            <div className="grid min-h-[420px] place-items-center text-center">
              <div>
                <FiPackage className="mx-auto text-6xl text-logo-blue" />
                <h2 className="mt-5 font-display text-3xl font-bold text-navy">Order details will show here</h2>
                <p className="mt-3 max-w-xl text-slate-600">Customer can check order status anytime without admin login.</p>
              </div>
            </div>
          )}

          {order && (
            <div>
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-logo-blue">{order.orderNumber}</p>
                  <h2 className="mt-2 font-display text-3xl font-bold text-navy">Hello, {order.shippingAddress.fullName}</h2>
                  <p className="mt-2 text-slate-600">Your order is <b className="capitalize text-navy">{order.orderStatus}</b>.</p>
                </div>
                <div className="rounded-3xl bg-white p-4 text-right shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Total</p>
                  <b className="font-display text-3xl text-navy">INR {order.total}</b>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-4">
                {steps.map((step, index) => (
                  <div key={step} className={`rounded-3xl p-4 ${index <= activeIndex ? 'bg-logo-gradient text-white' : 'bg-white text-slate-500'}`}>
                    <FiCheckCircle className="text-2xl" />
                    <b className="mt-3 block capitalize">{step}</b>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-logo-yellow/30 p-5 text-navy">
                <div className="flex items-center gap-3">
                  <FiTruck className="text-3xl" />
                  <div>
                    <h3 className="font-display text-2xl font-bold">Expected Delivery: 3-5 Working Days</h3>
                    <p className="text-sm">We will process your order soon and contact you if any confirmation is needed.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                {order.items.map((item) => (
                  <div key={`${order._id}-${item.name}`} className="flex gap-4 rounded-3xl bg-white p-4 shadow-sm">
                    {item.image && <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />}
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-navy">{item.name}</h3>
                      <p className="text-sm text-slate-500">Qty {item.quantity} x INR {item.price}</p>
                    </div>
                    <b className="text-navy">INR {item.quantity * item.price}</b>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 rounded-3xl bg-white p-5 text-sm text-slate-600 md:grid-cols-2">
                <div>
                  <p className="font-bold text-navy">Delivery Address</p>
                  <p className="mt-2">{order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                </div>
                <div>
                  <p className="font-bold text-navy">Payment</p>
                  <p className="mt-2 capitalize">{order.paymentMethod} • {order.paymentStatus}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
