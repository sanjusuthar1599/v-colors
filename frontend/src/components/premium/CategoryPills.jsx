import { useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const defaultCategories = [
  'All',
  'Embroidery Fabrics',
  'Jari Net Fabrics',
  'Velvet Fabrics',
  'Jacquard Fabrics',
  'Fancy Fabrics',
  'Readymade Laces',
  'Garment Fabrics',
]

export default function CategoryPills({ categories = defaultCategories, active, onChange }) {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' })
  }

  return (
    <div className="border-y border-slate-200 bg-white">
      <div className="premium-container flex items-center gap-2 py-3">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous categories" className="hidden h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-[#D4AF37] hover:text-[#0B1F3A] sm:grid">
          <FiChevronLeft className="text-sm" />
        </button>

        <div ref={scrollRef} className="flex flex-1 gap-2 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => {
            const isActive = active === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onChange?.(cat)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-[11px] font-semibold transition ${
                  isActive
                    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0B1F3A]'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-[#D4AF37]/50'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <button type="button" onClick={() => scroll(1)} aria-label="Next categories" className="hidden h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-[#D4AF37] hover:text-[#0B1F3A] sm:grid">
          <FiChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  )
}
