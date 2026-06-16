import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { FiCheckCircle, FiPackage, FiTruck } from 'react-icons/fi'
import SEO from '../components/SEO'
import { useCart } from '../context/CartContext'
import { orderService } from '../services/api'

export default function OrderSuccess() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCart()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  useEffect(() => {
    let active = true

    async function loadOrder() {
      try {
        const { data } = sessionId
          ? await orderService.confirmStripe(id, sessionId)
          : await orderService.get(id)
        if (active) setOrder(data)
      } catch {
        if (active) setOrder(null)
      }
    }

    loadOrder()
    return () => { active = false }
  }, [id, sessionId])

  return (
    <>
      <SEO title="Order Successful" description="V.Colors fabric order placed successfully." path={`/order-success/${id}`} />
      <section className="section container">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-slate-200/80 md:p-12">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-100 text-5xl text-green-600">
            <FiCheckCircle />
          </div>
          <p className="eyebrow mt-6">Order Confirmed</p>
          <h1 className="font-display text-3xl text-navy md:text-4xl">Thank You For Your Order Check Your Email For More Details and Track Your Order</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Your V.Colors order has been placed successfully. We will process it soon and expected delivery is within 3-5 working days.
          </p>

          {order && (
            <div className="mt-8 rounded-[2rem] bg-logo-gradient p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">Save This Order Number</p>
              <b className="mt-2 block font-display text-4xl">{order.orderNumber}</b>
              <p className="mt-2 text-sm text-white/85">Use this order number with your mobile number on Track Order page.</p>
            </div>
          )}

          {order && (
            <div className="mt-5 grid gap-4 rounded-[2rem] bg-slate-50 p-6 text-left md:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Order No.</p>
                <b className="text-navy">{order.orderNumber}</b>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Payment</p>
                <b className="capitalize text-navy">{order.paymentMethod} • {order.paymentStatus}</b>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Total</p>
                <b className="text-navy">INR {order.total}</b>
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-logo-blue/10 p-5 text-left">
              <FiPackage className="text-3xl text-logo-blue" />
              <h2 className="mt-3 font-display text-2xl font-bold text-navy">Order Processing</h2>
              <p className="mt-2 text-slate-600">Team will confirm stock, packing and dispatch details.</p>
            </div>
            <div className="rounded-3xl bg-logo-yellow/30 p-5 text-left">
              <FiTruck className="text-3xl text-navy" />
              <h2 className="mt-3 font-display text-2xl font-bold text-navy">3-5 Day Delivery</h2>
              <p className="mt-2 text-slate-600">Expected delivery timeline is shown to customer after order.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/track-order" className="rounded-full bg-gold px-7 py-4 font-bold text-navy">Track My Order</Link>
            <Link to="/products" className="rounded-full bg-logo-gradient px-7 py-4 font-bold text-white">Continue Shopping</Link>
            <Link to="/contact" className="rounded-full bg-navy px-7 py-4 font-bold text-white">Contact Support</Link>
          </div>
        </div>
      </section>
    </>
  )
}
