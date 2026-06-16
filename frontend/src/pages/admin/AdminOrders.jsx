import { useEffect, useMemo, useState } from 'react'
import { FiRefreshCw, FiTruck } from 'react-icons/fi'
import { orderService } from '../../services/api'
import { getApiErrorMessage } from '../../utils/apiError'

const statuses = ['placed', 'processing', 'shipped', 'delivered', 'cancelled']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')
  const [error, setError] = useState('')

  async function loadOrders() {
    setLoading(true)
    setError('')
    try {
      const { data } = await orderService.list()
      setOrders(data)
    } catch (err) {
      setOrders([])
      setError(getApiErrorMessage(err, 'Unable to load orders. Please refresh or login again.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const filtered = useMemo(() => orders.filter((order) => JSON.stringify(order).toLowerCase().includes(query.toLowerCase())), [orders, query])

  const updateStatus = async (id, orderStatus) => {
    const { data } = await orderService.update(id, { orderStatus })
    setOrders((current) => current.map((order) => order._id === id ? data : order))
    setToast('Order status updated successfully.')
    setTimeout(() => setToast(''), 2200)
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Online Orders</p>
          <h1 className="font-display text-4xl font-bold text-navy">Manage Orders</h1>
        </div>
        <button onClick={loadOrders} className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 font-bold text-white">
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {toast && <p className="mt-5 rounded-2xl bg-green-50 p-4 font-bold text-green-700">{toast}</p>}
      {error && <p className="mt-5 rounded-2xl bg-red-50 p-4 font-bold text-red-600">{error}</p>}

      <input className="field mt-8 max-w-lg" placeholder="Search order number, buyer, phone, city..." value={query} onChange={(event) => setQuery(event.target.value)} />

      <div className="mt-8 grid gap-5">
        {loading && <div className="card">Loading orders...</div>}
        {!loading && !error && !filtered.length && <div className="card">No orders found yet. Place a Cash on Delivery or Stripe order from frontend, then click Refresh.</div>}
        {filtered.map((order) => (
          <div key={order._id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-logo-blue">{order.orderNumber}</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-navy">{order.shippingAddress.fullName}</h2>
                <p className="text-slate-500">{order.shippingAddress.phone} • {order.shippingAddress.email}</p>
                <p className="mt-2 text-sm text-slate-600">{order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl font-bold text-navy">INR {order.total}</p>
                <p className="text-sm capitalize text-slate-500">{order.paymentMethod} • {order.paymentStatus}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {order.items.map((item) => (
                <div key={`${order._id}-${item.name}`} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <span className="font-semibold text-navy">{item.name}</span>
                  <span className="text-sm text-slate-600">Qty {item.quantity} x INR {item.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-logo-blue/10 px-4 py-2 text-sm font-bold text-logo-blue">
                <FiTruck /> Expected delivery: 3-5 working days
              </div>
              <select value={order.orderStatus} onChange={(event) => updateStatus(order._id, event.target.value)} className="rounded-full border border-slate-200 px-4 py-3 font-bold capitalize text-navy">
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
