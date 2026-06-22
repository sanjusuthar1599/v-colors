import { Fragment, useEffect, useMemo, useState } from 'react'
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiFilter,
  FiRefreshCw,
  FiSearch,
} from 'react-icons/fi'
import { orderService } from '../../services/api'
import { getApiErrorMessage } from '../../utils/apiError'

const PAGE_SIZE = 5
const statuses = ['placed', 'processing', 'shipped', 'delivered', 'cancelled']
const dateFilters = [
  ['all', 'All Time'],
  ['today', 'Today'],
  ['yesterday', 'Yesterday'],
  ['week', 'Last 7 Days'],
  ['month', 'This Month'],
]

const orderStatusStyles = {
  placed: 'bg-sky-100 text-sky-800 ring-sky-200',
  processing: 'bg-amber-100 text-amber-900 ring-amber-200',
  shipped: 'bg-violet-100 text-violet-800 ring-violet-200',
  delivered: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  cancelled: 'bg-red-100 text-red-800 ring-red-200',
}

const paymentStatusStyles = {
  paid: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  pending: 'bg-amber-100 text-amber-900 ring-amber-200',
  failed: 'bg-red-100 text-red-800 ring-red-200',
}

function StatusBadge({ value, stylesMap }) {
  const key = String(value || '').toLowerCase()
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide ring-1 ${stylesMap[key] || 'bg-slate-100 text-slate-700 ring-slate-200'}`}>
      {value || '—'}
    </span>
  )
}

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatShortDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function matchesDateFilter(orderDate, filter) {
  if (filter === 'all') return true
  const created = new Date(orderDate)
  const now = new Date()
  const today = startOfDay(now)

  if (filter === 'today') return startOfDay(created).getTime() === today.getTime()

  if (filter === 'yesterday') {
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    return startOfDay(created).getTime() === yesterday.getTime()
  }

  if (filter === 'week') {
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 6)
    return created >= weekAgo
  }

  if (filter === 'month') {
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
  }

  return true
}

function summarizeItems(items = []) {
  if (!items.length) return '—'
  const first = items[0]?.name || 'Item'
  return items.length === 1 ? first : `${first} +${items.length - 1} more`
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [query, setQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [expandedId, setExpandedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')
  const [error, setError] = useState('')

  async function loadOrders() {
    setLoading(true)
    setError('')
    try {
      const { data } = await orderService.list()
      setOrders(Array.isArray(data) ? data : [])
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

  useEffect(() => {
    setPage(1)
  }, [query, dateFilter, statusFilter, paymentFilter])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return orders.filter((order) => {
      if (statusFilter !== 'all' && order.orderStatus !== statusFilter) return false
      if (paymentFilter !== 'all' && order.paymentMethod !== paymentFilter) return false
      if (!matchesDateFilter(order.createdAt, dateFilter)) return false
      if (!q) return true
      const haystack = JSON.stringify(order).toLowerCase()
      return haystack.includes(q)
    })
  }, [orders, query, dateFilter, statusFilter, paymentFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const stats = useMemo(() => {
    const todayOrders = orders.filter((order) => matchesDateFilter(order.createdAt, 'today'))
    const pending = orders.filter((order) => ['placed', 'processing'].includes(order.orderStatus))
    const revenue = todayOrders.reduce((sum, order) => sum + Number(order.total || 0), 0)
    return {
      total: orders.length,
      today: todayOrders.length,
      pending: pending.length,
      revenue,
    }
  }, [orders])

  const updateStatus = async (id, orderStatus) => {
    try {
      const { data } = await orderService.update(id, { orderStatus })
      setOrders((current) => current.map((order) => (order._id === id ? data : order)))
      setToast('Order status updated successfully.')
      setTimeout(() => setToast(''), 2200)
    } catch {
      setToast('Could not update order status.')
      setTimeout(() => setToast(''), 2200)
    }
  }

  const rangeStart = filtered.length ? (safePage - 1) * PAGE_SIZE + 1 : 0
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filtered.length)

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Online Orders</p>
          <h1 className="font-display text-3xl font-bold text-navy md:text-4xl">Manage Orders</h1>
        </div>
        <button
          type="button"
          onClick={loadOrders}
          className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
        >
          <FiRefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {toast && <p className="mt-5 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-700">{toast}</p>}
      {error && <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total Orders', stats.total, 'bg-white'],
          ['Today', stats.today, 'bg-logo-blue/10'],
          ['Pending Action', stats.pending, 'bg-amber-50'],
          ['Today Revenue', `INR ${stats.revenue.toLocaleString('en-IN')}`, 'bg-emerald-50'],
        ].map(([label, value, bg]) => (
          <div key={label} className={`rounded-[1.5rem] border border-slate-200 ${bg} p-5 shadow-sm`}>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-navy">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60 md:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
          <label className="grid flex-1 gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Search</span>
            <span className="relative">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="field pl-11"
                placeholder="Order number, buyer, phone, email, city..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </span>
          </label>

          <label className="grid min-w-[150px] gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              <FiFilter /> Date
            </span>
            <select className="field capitalize" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
              {dateFilters.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>

          <label className="grid min-w-[140px] gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Status</span>
            <select className="field capitalize" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">All Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>

          <label className="grid min-w-[140px] gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Payment</span>
            <select className="field capitalize" value={paymentFilter} onChange={(event) => setPaymentFilter(event.target.value)}>
              <option value="all">All Methods</option>
              <option value="stripe">Stripe</option>
              <option value="cod">COD</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
        {loading && <div className="p-8 text-center text-slate-500">Loading orders...</div>}

        {!loading && !error && !filtered.length && (
          <div className="p-8 text-center text-slate-500">
            No orders match your filters. Try changing the date filter or search term.
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4">Order</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Items</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4">Payment</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((order) => {
                    const expanded = expandedId === order._id
                    return (
                      <Fragment key={order._id}>
                        <tr className="border-b border-slate-100 transition hover:bg-slate-50/80">
                          <td className="px-5 py-4">
                            <button
                              type="button"
                              onClick={() => setExpandedId(expanded ? null : order._id)}
                              className="inline-flex items-center gap-2 font-bold text-logo-blue"
                            >
                              {expanded ? <FiChevronUp /> : <FiChevronDown />}
                              {order.orderNumber}
                            </button>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-bold text-navy">{order.shippingAddress?.fullName}</p>
                            <p className="mt-1 text-xs text-slate-500">{order.shippingAddress?.phone}</p>
                            <p className="text-xs text-slate-500">{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                          </td>
                          <td className="max-w-[180px] px-5 py-4">
                            <p className="truncate font-medium text-slate-700" title={summarizeItems(order.items)}>
                              {summarizeItems(order.items)}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">{order.items?.length || 0} item(s)</p>
                          </td>
                          <td className="px-5 py-4 font-display text-lg font-bold text-navy">INR {order.total}</td>
                          <td className="px-5 py-4">
                            <p className="mb-2 font-semibold capitalize text-slate-700">{order.paymentMethod}</p>
                            <StatusBadge value={order.paymentStatus} stylesMap={paymentStatusStyles} />
                          </td>
                          <td className="px-5 py-4">
                            <StatusBadge value={order.orderStatus} stylesMap={orderStatusStyles} />
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-600">{formatShortDate(order.createdAt)}</td>
                          <td className="px-5 py-4">
                            <select
                              value={order.orderStatus}
                              onChange={(event) => updateStatus(order._id, event.target.value)}
                              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold capitalize text-navy outline-none focus:border-logo-blue"
                            >
                              {statuses.map((status) => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        {expanded && (
                          <tr className="border-b border-slate-100 bg-slate-50/70">
                            <td colSpan={8} className="px-5 py-5">
                              <div className="grid gap-5 lg:grid-cols-2">
                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Delivery Address</p>
                                  <p className="mt-2 text-sm leading-7 text-slate-700">
                                    {order.shippingAddress?.fullName}<br />
                                    {order.shippingAddress?.addressLine}<br />
                                    {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}<br />
                                    {order.shippingAddress?.email} • {order.shippingAddress?.phone}
                                  </p>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Order Items</p>
                                  <div className="mt-3 grid gap-2">
                                    {order.items?.map((item) => (
                                      <div key={`${order._id}-${item.name}`} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                                        <span className="font-semibold text-navy">{item.name}</span>
                                        <span className="text-xs text-slate-600">Qty {item.quantity} × INR {item.price}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <p className="mt-3 text-xs text-slate-500">Placed: {formatDate(order.createdAt)}</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 md:hidden">
              {paginated.map((order) => (
                <article key={order._id} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-logo-blue">{order.orderNumber}</p>
                      <h2 className="mt-1 font-display text-lg font-bold text-navy">{order.shippingAddress?.fullName}</h2>
                      <p className="text-xs text-slate-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <p className="font-display text-xl font-bold text-navy">INR {order.total}</p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <StatusBadge value={order.orderStatus} stylesMap={orderStatusStyles} />
                    <StatusBadge value={order.paymentStatus} stylesMap={paymentStatusStyles} />
                    <span className="inline-flex rounded-full bg-slate-200 px-3 py-1 text-[11px] font-bold uppercase text-slate-700">
                      {order.paymentMethod}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-600">{summarizeItems(order.items)}</p>
                  <p className="mt-1 text-xs text-slate-500">{order.shippingAddress?.phone} • {order.shippingAddress?.city}</p>

                  <select
                    value={order.orderStatus}
                    onChange={(event) => updateStatus(order._id, event.target.value)}
                    className="field mt-4 capitalize"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </article>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-5">
              <p className="text-sm text-slate-600">
                Showing <b className="text-navy">{rangeStart}-{rangeEnd}</b> of <b className="text-navy">{filtered.length}</b> orders
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-navy disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FiChevronLeft /> Prev
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`grid h-9 min-w-9 place-items-center rounded-full px-3 text-sm font-bold transition ${
                        pageNumber === safePage
                          ? 'bg-logo-gradient text-white shadow-md'
                          : 'border border-slate-200 text-navy hover:bg-slate-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-navy disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next <FiChevronRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
