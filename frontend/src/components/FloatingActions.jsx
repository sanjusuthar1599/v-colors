import { useEffect, useState } from 'react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FiArrowUp } from 'react-icons/fi'
import { company } from '../data/companyData'

export default function FloatingActions() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a aria-label="Instagram" href={company.instagram} target="_blank" rel="noreferrer" className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-2xl text-white shadow-2xl transition hover:scale-105">
        <FaInstagram />
      </a>
      <a aria-label="WhatsApp" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" className="grid h-14 w-14 place-items-center rounded-full bg-green-500 text-2xl text-white shadow-2xl transition hover:scale-105">
        <FaWhatsapp />
      </a>
      {visible && (
        <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="grid h-14 w-14 place-items-center rounded-full bg-navy text-white shadow-2xl">
          <FiArrowUp />
        </button>
      )}
    </div>
  )
}
