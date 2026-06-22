import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CategoryPills from './CategoryPills'
import { company } from '../../data/companyData'
import { heroHdSlides } from '../../data/fabricImages'
import { getProductsCategoryUrl } from '../../utils/categoryUtils'
import { resolveMediaUrl } from '../../utils/resolveMediaUrl'

const companyFacts = [
  ['Proprietor', company.proprietor],
  ['Annual Turnover', company.annualTurnover],
  ['Legal Status', company.legalStatus],
  ['GST', company.gst],
]

export default function PremiumHero() {
  const [category, setCategory] = useState('All')
  const [slideIndex, setSlideIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((current) => (current + 1) % heroHdSlides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const activeSlide = heroHdSlides[slideIndex]

  return (
    <>
      <section className="hero-showcase relative min-h-[100svh] overflow-hidden bg-[#0B1F3A] text-white">
        <div className="absolute inset-0">
          {heroHdSlides.map((slide, index) => (
            <div
              key={slide.label}
              className={`hero-showcase-slide ${slideIndex === index ? 'hero-showcase-slide-active' : ''}`}
              aria-hidden={slideIndex !== index}
            >
              <img src={resolveMediaUrl(slide.src)} alt="" className="hero-showcase-image" />
            </div>
          ))}
          <div className="hero-showcase-overlay" />
        </div>

        <div className="premium-container relative z-10 flex min-h-[100svh] items-center pb-28 pt-28 md:pb-32 md:pt-32">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
              Established {company.established} • Surat, Gujarat
            </p>

            <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight">
              <span className="text-[#D4AF37]">{company.name}</span>
              {' '}Textile Manufacturer & Supplier From{' '}
              <span className="text-[#D4AF37]">Surat</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/82 md:text-base">
              Manufacturer, exporter and supplier of jari net embroidery fabrics, embroidery fabrics,
              fancy fabrics, cotton velvet fabric, jacquard dress material fabric and readymade laces.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn-gold">Shop Fabrics</Link>
              <Link to="/products" className="btn-white">View Catalog</Link>
              <Link to="/inquiry" className="btn-outline-light">Bulk Inquiry</Link>
            </div>

            <div className="mt-10 grid gap-4 border-t border-white/12 pt-8 sm:grid-cols-2">
              {companyFacts.map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 z-10 hidden md:block">
          <p className="text-right text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            {String(slideIndex + 1).padStart(2, '0')} / {String(heroHdSlides.length).padStart(2, '0')}
          </p>
          <p className="mt-1 text-right text-sm font-semibold text-white/80">{activeSlide.label}</p>
          <div className="mt-3 flex justify-end gap-2">
            {heroHdSlides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => setSlideIndex(index)}
                className={`hero-showcase-dot ${slideIndex === index ? 'hero-showcase-dot-active' : ''}`}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:hidden">
          {heroHdSlides.map((slide, index) => (
            <button
              key={`mobile-${slide.label}`}
              type="button"
              onClick={() => setSlideIndex(index)}
              className={`hero-showcase-dot ${slideIndex === index ? 'hero-showcase-dot-active' : ''}`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <CategoryPills
        active={category}
        onChange={(cat) => {
          setCategory(cat)
          navigate(getProductsCategoryUrl(cat))
        }}
      />
    </>
  )
}
