import { useEffect, useState } from 'react'
import { FiImage, FiInbox, FiMail, FiPackage, FiShoppingBag, FiStar } from 'react-icons/fi'
import { galleryService, inquiryService, orderService, productService, testimonialService } from '../../services/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    inquiries: 0,
    gallery: 0,
    testimonials: 0,
  })

  useEffect(() => {
    async function loadStats() {
      try {
        const [products, orders, inquiries, gallery, testimonials] = await Promise.all([
          productService.list(),
          orderService.list(),
          inquiryService.list(),
          galleryService.list(),
          testimonialService.listAll(),
        ])
        setStats({
          products: products.data.length,
          orders: orders.data.length,
          inquiries: inquiries.data.length,
          gallery: gallery.data.length,
          testimonials: testimonials.data.length,
        })
      } catch {
        setStats({ products: 0, orders: 0, inquiries: 0, gallery: 0, testimonials: 0 })
      }
    }
    loadStats()
  }, [])

  const cards = [
    ['Listed Products', stats.products, FiPackage],
    ['Online Orders', stats.orders, FiShoppingBag],
    ['Inquiries', stats.inquiries, FiInbox],
    ['Gallery Images', stats.gallery, FiImage],
    ['Testimonials', stats.testimonials, FiStar],
  ]

  return (
    <>
      <h1 className="font-display text-4xl font-bold text-navy">Dashboard</h1>
      <p className="mt-2 text-slate-500">Live counts from your MongoDB database.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-5">
        {cards.map(([label, value, Icon]) => (
          <div key={label} className="card">
            <Icon className="text-3xl text-gold" />
            <div className="mt-5 font-display text-4xl font-bold text-purple">{value}</div>
            <p className="font-semibold text-slate-500">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <FiMail className="text-3xl text-logo-blue" />
          <h2 className="mt-4">Contact Messages</h2>
          <p className="mt-3 text-slate-500">Review messages from the Contact page in the Contact Messages section.</p>
        </div>
        <div className="card">
          <FiShoppingBag className="text-3xl text-logo-blue" />
          <h2 className="mt-4">Order Management</h2>
          <p className="mt-3 text-slate-500">Review COD and Stripe orders, delivery address, payment status and delivery status.</p>
        </div>
      </div>
    </>
  )
}
