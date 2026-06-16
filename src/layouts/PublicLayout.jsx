import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { FaInstagram } from 'react-icons/fa'
import { FiMenu, FiShoppingCart, FiX } from 'react-icons/fi'
import { company } from '../data/companyData'
import FloatingActions from '../components/FloatingActions'
import { useCart } from '../context/CartContext'

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Products', '/products'],
  ['Manufacturing', '/manufacturing'],
  ['Gallery', '/gallery'],
  ['Buyer Network', '/export-market'],
  ['Track Order', '/track-order'],
  ['Contact', '/contact'],
]

export default function PublicLayout() {
  const [open, setOpen] = useState(false)
  const { summary } = useCart()

  useEffect(() => {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('vcolors_theme', 'light')
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
        <nav className="container flex h-[82px] items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200">
              <img src="/vcolors-logo.png" alt="V.Colors logo" className="h-14 w-14 object-contain" />
            </span>
            <span>
              <span className="block font-display text-2xl font-bold text-navy">{company.name}</span>
              <span className="text-[11px] uppercase tracking-widest text-slate-500">Since 2009 • Surat</span>
            </span>
          </Link>
          <div className="hidden items-center gap-5 lg:flex">
            {links.map(([label, path]) => (
              <NavLink key={path} to={path} className={({ isActive }) => `text-[11px] font-bold uppercase tracking-wide transition hover:text-logo-blue ${isActive ? 'text-logo-blue' : 'text-slate-700'}`}>
                {label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative grid h-12 w-12 place-items-center rounded-full border border-slate-200 text-navy transition hover:border-logo-blue hover:text-logo-blue">
              <FiShoppingCart />
              {summary.count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-logo-gradient px-1 text-[10px] font-black text-white">{summary.count}</span>}
            </Link>
            <Link to="/contact" className="hidden rounded-full bg-logo-gradient px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-xl md:inline-flex">
            Contact
            </Link>
            <button onClick={() => setOpen((value) => !value)} className="rounded-full border border-slate-200 p-3 lg:hidden">
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="border-t border-slate-200 bg-white px-6 py-5 shadow-xl lg:hidden">
            <div className="grid gap-4">
              {links.map(([label, path]) => (
                <NavLink key={path} to={path} onClick={() => setOpen(false)} className="font-semibold">
                  {label}
                </NavLink>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="rounded-full bg-logo-gradient px-5 py-3 text-center font-bold text-white">
              Contact
              </Link>
              <Link to="/cart" onClick={() => setOpen(false)} className="rounded-full bg-navy px-5 py-3 text-center font-bold text-white">
                Cart ({summary.count})
              </Link>
            </div>
          </div>
        )}
      </header>
      <Outlet />
      <footer className="bg-slate-950 text-white">
        <div className="container grid gap-10 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white">
                <img src="/vcolors-logo.png" alt="V.Colors logo" className="h-14 w-14 object-contain" />
              </span>
              <h3 className="font-display text-3xl font-bold">{company.name}</h3>
            </div>
            <p className="mt-4 max-w-xl text-slate-300">Manufacturer, exporter and supplier from Surat dealing in brocade, viscose, nylon net, poly net, garment, velvet, jacquard and embroidery fabrics.</p>
            <a
              href={company.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:opacity-90"
            >
              <FaInstagram className="text-lg" />
              Follow @v_colors_
            </a>
          </div>
          <div>
            <h4 className="font-bold text-gold">Company</h4>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              {links.slice(1, 5).map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gold">Contact</h4>
            <p className="mt-4 text-sm text-slate-300">{company.address}</p>
            <p className="mt-2 text-sm text-slate-300">{company.phone}</p>
            <p className="mt-2 text-sm text-slate-300">{company.email}</p>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/refund-policy">Refund & Return Policy</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-sm text-slate-400">© {new Date().getFullYear()} V.Colors. All rights reserved.</div>
      </footer>
      <FloatingActions />
    </div>
  )
}
