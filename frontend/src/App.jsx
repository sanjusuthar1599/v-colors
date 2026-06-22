import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import ToastHost from './components/ToastHost'
import { useScrollTop } from './hooks/useScrollTop'
import AdminLayout from './layouts/AdminLayout'
import PublicLayout from './layouts/PublicLayout'
import About from './pages/About'
import Contact from './pages/Contact'
import ExportMarket from './pages/ExportMarket'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Inquiry from './pages/Inquiry'
import Manufacturing from './pages/Manufacturing'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import TermsOfService from './pages/TermsOfService'
import AdminContact from './pages/admin/AdminContact'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminGallery from './pages/admin/AdminGallery'
import AdminInquiries from './pages/admin/AdminInquiries'
import AdminLogin from './pages/admin/AdminLogin'
import AdminOrders from './pages/admin/AdminOrders'
import AdminProducts from './pages/admin/AdminProducts'
import AdminTestimonials from './pages/admin/AdminTestimonials'

function RouteScroll() {
  useScrollTop()
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastHost />
      <RouteScroll />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="manufacturing" element={<Manufacturing />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="export-market" element={<ExportMarket />} />
          <Route path="contact" element={<Contact />} />
          <Route path="inquiry" element={<Inquiry />} />
          <Route path="cart" element={<Navigate to="/inquiry" replace />} />
          <Route path="checkout" element={<Navigate to="/inquiry" replace />} />
          <Route path="order-success/:id" element={<Navigate to="/inquiry" replace />} />
          <Route path="track-order" element={<Navigate to="/inquiry" replace />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
        </Route>
        <Route path="admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="contact" element={<AdminContact />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
