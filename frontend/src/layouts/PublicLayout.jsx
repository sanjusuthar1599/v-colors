import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { FiMenu, FiPhone, FiSearch, FiX } from 'react-icons/fi'
import AmbientCanvas3D from '../components/ambient/AmbientCanvas3D'
import { company } from '../data/companyData'
import FloatingActions from '../components/FloatingActions'
import { getWhatsAppUrl } from '../utils/inquiry'

const links = [
  ['Home', '/'],
  ['Products', '/products'],
  ['About', '/about'],
  ['Manufacturing', '/manufacturing'],
  ['Gallery', '/gallery'],
  ['Contact', '/contact'],
]

const footerLinks = {
  Company: [['About', '/about'], ['Manufacturing', '/manufacturing'], ['Gallery', '/gallery'], ['Contact', '/contact']],
  Inquiry: [['Request Quote', '/inquiry'], ['Catalog', '/products'], ['WhatsApp', getWhatsAppUrl()]],
}

export default function PublicLayout() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const headerSolid = !isHome || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const navClass = (isActive) => {
    if (headerSolid) {
      return `text-xs font-semibold uppercase tracking-[0.12em] transition hover:text-[#D4AF37] ${isActive ? 'text-[#D4AF37]' : 'text-slate-600'}`
    }
    return `text-xs font-semibold uppercase tracking-[0.12em] transition hover:text-[#D4AF37] ${isActive ? 'text-[#D4AF37]' : 'text-white/88'}`
  }

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-[#111827]">
      <AmbientCanvas3D />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          headerSolid
            ? 'border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md'
            : 'border-b border-white/10 bg-[#0B1F3A]/20 backdrop-blur-md'
        }`}
      >
        <nav className="premium-container flex h-[76px] items-center justify-between gap-4 md:h-[84px]">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img src="/vcolors-logo.png" alt="V.Colors" className="h-11 w-11 shrink-0 object-contain md:h-12 md:w-12" />
            <span className="min-w-0">
              <span className={`block truncate font-display text-base font-extrabold tracking-tight md:text-lg ${headerSolid ? 'text-[#0B1F3A]' : 'text-white'}`}>
                {company.name.toUpperCase()}
              </span>
              <span className={`hidden text-[10px] uppercase tracking-[0.2em] sm:block ${headerSolid ? 'text-slate-400' : 'text-white/65'}`}>
                Premium Fabrics • Surat Since 2009
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map(([label, path]) => (
              <NavLink key={path} to={path} className={({ isActive }) => navClass(isActive)}>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => navigate('/products')}
              aria-label="Search products"
              className={`grid h-10 w-10 place-items-center rounded-full transition ${
                headerSolid
                  ? 'text-slate-500 hover:bg-slate-100 hover:text-[#0B1F3A]'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FiSearch className="text-lg" />
            </button>
            <a
              href={`tel:${company.phone.replace(/\s/g, '')}`}
              className={`hidden h-10 w-10 place-items-center rounded-full md:grid ${
                headerSolid
                  ? 'border border-slate-200 text-slate-500 hover:text-[#0B1F3A]'
                  : 'border border-white/20 text-white/85 hover:bg-white/10 hover:text-white'
              }`}
              aria-label="Call"
            >
              <FiPhone />
            </a>
            <Link to="/inquiry" className="btn-gold !hidden md:!inline-flex">Get Quote</Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${
                headerSolid
                  ? 'border border-slate-200 text-slate-600'
                  : 'border border-white/20 text-white'
              }`}
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>

        {open && (
          <div className={`border-t px-5 py-5 lg:hidden ${headerSolid ? 'border-slate-100 bg-white' : 'border-white/10 bg-[#0B1F3A]/95'}`}>
            <div className="grid gap-1">
              {links.map(([label, path]) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wide ${
                    headerSolid ? 'text-slate-700 hover:bg-slate-50' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </NavLink>
              ))}
              <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center justify-center gap-2 rounded-[0.625rem] bg-[#25D366] px-5 py-3.5 text-sm font-bold uppercase text-white">
                <FaWhatsapp /> WhatsApp Inquiry
              </a>
              <Link to="/inquiry" onClick={() => setOpen(false)} className="btn-gold mt-3 w-full">Request Quote</Link>
            </div>
          </div>
        )}
      </header>

      <div className={`relative z-10 ${isHome ? '' : 'pt-[76px] md:pt-[84px]'}`}>
        <Outlet />
      </div>

      <footer className="relative z-10 border-t border-slate-200 bg-white">
        <div className="premium-container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <img src="/vcolors-logo.png" alt="" className="h-12 w-12 object-contain" />
              <div>
                <h3 className="font-display text-xl font-extrabold text-[#0B1F3A]">{company.name}</h3>
                <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">Wholesale Textile Manufacturer</p>
              </div>
            </div>
            <p className="site-caption mt-4 max-w-md">
              Surat-based B2B fabric supplier since 2009. Bulk orders via inquiry — no online checkout.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#0B1F3A]">{title}</h4>
              <div className="mt-4 grid gap-2.5">
                {items.map(([label, path]) => (
                  path.startsWith('http') ? (
                    <a key={path} href={path} target="_blank" rel="noreferrer" className="site-caption transition hover:text-[#D4AF37]">{label}</a>
                  ) : (
                    <Link key={path} to={path} className="site-caption transition hover:text-[#D4AF37]">{label}</Link>
                  )
                ))}
              </div>
            </div>
          ))}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#0B1F3A]">Contact</h4>
            <p className="site-caption mt-4 leading-6">{company.address}</p>
            <p className="site-caption mt-2">{company.email}</p>
            <p className="mt-3 text-xs text-slate-400">GST: {company.gst}</p>
          </div>
        </div>
        <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} V.Colors • Made in Surat, India
        </div>
      </footer>
      <FloatingActions />
    </div>
  )
}
