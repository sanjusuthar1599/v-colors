import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Reveal3D from '../interactive/Reveal3D'
import { fabricShowcaseImages } from '../../data/fabricImages'
import { resolveMediaUrl } from '../../utils/resolveMediaUrl'
import { useTestimonials } from '../../hooks/useTestimonials'

export default function TestimonialsSlider() {
  const { testimonials } = useTestimonials()
  const [index, setIndex] = useState(0)
  const items = testimonials.length ? testimonials : [
    { name: 'Wholesale Buyer, Gujarat', role: 'Garment Manufacturer', quote: 'Consistent embroidery quality and reliable bulk supply for our seasonal collections.' },
    { name: 'Retail Partner, Maharashtra', role: 'Boutique Owner', quote: 'Professional finishing standards — trusted for repeat wholesale orders.' },
    { name: 'Export Consultant', role: 'Textile Sourcing', quote: 'Export-ready packaging and transparent dealing from a dependable Surat partner.' },
  ]

  const active = items[index % items.length]

  return (
    <section className="site-section bg-[#FAFAFA]">
      <div className="premium-container">
        <Reveal3D className="mx-auto max-w-2xl text-center">
          <p className="site-eyebrow">Testimonials</p>
          <h2 className="site-heading">Buyer Reviews</h2>
        </Reveal3D>

        <div className="relative mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="fabric-testimonial-grid hidden sm:grid">
            {fabricShowcaseImages.slice(0, 4).map((item) => (
              <div key={item.label} className="fabric-testimonial-grid-item">
                <img src={resolveMediaUrl(item.src)} alt="" />
              </div>
            ))}
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name + index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_24px_60px_rgba(11,31,58,0.08)] md:p-12"
              >
                <span className="font-display text-5xl leading-none text-[#D4AF37]">"</span>
                <p className="site-caption mt-2 text-base leading-relaxed text-[#0B1F3A] md:text-lg">{active.quote}</p>
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <p className="font-display font-extrabold text-[#0B1F3A]">{active.name}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">{active.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button type="button" aria-label="Previous" onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)} className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-[#0B1F3A] transition hover:border-[#D4AF37]">
                <FiChevronLeft />
              </button>
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button key={i} type="button" aria-label={`Slide ${i + 1}`} onClick={() => setIndex(i)} className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-slate-300'}`} />
                ))}
              </div>
              <button type="button" aria-label="Next" onClick={() => setIndex((i) => (i + 1) % items.length)} className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-[#0B1F3A] transition hover:border-[#D4AF37]">
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
