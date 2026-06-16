import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FiGrid, FiImage, FiInbox, FiLogOut, FiMail, FiPackage, FiShoppingBag, FiStar } from 'react-icons/fi'

const links = [
  ['Dashboard', '/admin', FiGrid],
  ['Products', '/admin/products', FiPackage],
  ['Orders', '/admin/orders', FiShoppingBag],
  ['Inquiries', '/admin/inquiries', FiInbox],
  ['Contact Messages', '/admin/contact', FiMail],
  ['Gallery', '/admin/gallery', FiImage],
  ['Testimonials', '/admin/testimonials', FiStar],
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('vcolors_token')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white p-6 lg:block">
        <h1 className="font-display text-2xl font-bold text-navy">V Colors Admin</h1>
        <nav className="mt-10 grid gap-2">
          {links.map(([label, path, Icon]) => (
            <NavLink key={path} end={path === '/admin'} to={path} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold ${isActive ? 'bg-logo-gradient text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-2 rounded-2xl bg-navy px-4 py-3 font-bold text-white">
          <FiLogOut /> Logout
        </button>
      </aside>
      <main className="lg:pl-72">
        <div className="border-b border-slate-200 bg-white p-4 lg:hidden">
          <div className="flex flex-wrap gap-2">
            {links.map(([label, path]) => <NavLink key={path} to={path} className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold">{label}</NavLink>)}
            <button onClick={logout} className="rounded-full bg-navy px-3 py-2 text-sm font-semibold text-white">Logout</button>
          </div>
        </div>
        <div className="container py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
