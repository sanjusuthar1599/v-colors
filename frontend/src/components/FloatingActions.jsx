import { useEffect, useState } from 'react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FiArrowUp } from 'react-icons/fi'
import { company } from '../data/companyData'
import { getWhatsAppUrl } from '../utils/inquiry'

const SIZE = 48
const STROKE = 2.5
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function getScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  if (maxScroll <= 0) return 0
  return Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100))
}

export default function FloatingActions() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrollProgress(getScrollProgress())
      setShowTop(window.scrollY > 120)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const strokeOffset = CIRCUMFERENCE - (scrollProgress / 100) * CIRCUMFERENCE

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        aria-label="Instagram"
        href={company.instagram}
        target="_blank"
        rel="noreferrer"
        className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-2xl text-white shadow-2xl"
      >
        <FaInstagram />
      </a>

      <a
        aria-label="WhatsApp"
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noreferrer"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-2xl text-white shadow-2xl"
      >
        <FaWhatsapp />
      </a>

      {showTop && (
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg
            className="absolute inset-0 -rotate-90"
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            aria-hidden
          >
            <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth={STROKE} />
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#D4AF37"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
            />
          </svg>

          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute inset-[2.5px] grid place-items-center rounded-full bg-[#0B1F3A] text-base text-white shadow-lg"
          >
            <FiArrowUp />
          </button>
        </div>
      )}
    </div>
  )
}
