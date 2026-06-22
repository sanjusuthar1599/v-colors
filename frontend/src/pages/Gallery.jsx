import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiX, FiZoomIn } from 'react-icons/fi'
import CompanyImage from '../components/CompanyImage'
import PageBanner from '../components/premium/PageBanner'
import Reveal3D from '../components/interactive/Reveal3D'
import Tilt3D from '../components/interactive/Tilt3D'
import SEO from '../components/SEO'
import { mediaAssets } from '../data/mediaAssets'
import { resolveMediaUrl } from '../utils/resolveMediaUrl'
import { useGallery } from '../hooks/useGallery'

const featuredStatic = [
  { category: 'Factory', image: mediaAssets.company.aboutFactory },
  { category: 'Machinery', image: mediaAssets.company.manufacturingHero },
]

export default function Gallery() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const { items: galleryImages, loading } = useGallery()
  const categories = ['All', ...new Set(galleryImages.map((item) => item.category))]
  const images = active === 'All' ? galleryImages : galleryImages.filter((item) => item.category === active)

  return (
    <>
      <SEO title="Gallery" description="V.Colors factory, product and infrastructure gallery." path="/gallery" />
      <PageBanner
        eyebrow="Visual Tour"
        title="Factory, Products & Infrastructure"
        description="Explore our Surat manufacturing setup, fabric collections and production infrastructure."
        image={resolveMediaUrl(mediaAssets.company.galleryHero)}
        cta={{ href: '/inquiry', label: 'Book Factory Visit' }}
      />

      <section className="border-b border-slate-200 bg-white py-6">
        <div className="premium-container grid gap-4 md:grid-cols-2">
          {featuredStatic.map((item) => (
            <Tilt3D key={item.category} intensity={10}>
              <div className="group relative aspect-[16/9] overflow-hidden rounded-2xl">
                <img src={resolveMediaUrl(item.image)} alt={item.category} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/20 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Featured</p>
                  <h3 className="mt-1 font-display text-xl font-extrabold text-white">{item.category}</h3>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </section>

      <section className="site-section bg-[#FAFAFA]">
        <div className="premium-container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="site-heading">Company Gallery</h2>
              <p className="site-caption mt-2">Products, machinery, infrastructure and team presentation.</p>
            </div>
            <Link to="/products" className="inline-flex items-center gap-1 text-sm font-bold text-[#D4AF37]">
              View Fabric Catalog <FiArrowUpRight />
            </Link>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`category-pill ${active === category ? 'category-pill-active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading && <p className="py-16 text-center site-caption">Loading gallery…</p>}

          {!loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {images.map((item, index) => (
                <Reveal3D key={item.id || `${item.image}-${index}`} delay={(index % 4) * 0.05}>
                  <Tilt3D intensity={8}>
                    <button
                      type="button"
                      onClick={() => setLightbox(item.image)}
                      className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(11,31,58,0.08)] ring-1 ring-slate-100"
                    >
                      <CompanyImage src={item.image} alt={item.category} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-[#0B1F3A]/0 transition group-hover:bg-[#0B1F3A]/40" />
                      <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#0B1F3A] opacity-0 transition group-hover:opacity-100">
                        <FiZoomIn />
                      </span>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1F3A]/90 to-transparent p-5 text-left">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Gallery</p>
                        <p className="mt-1 font-display text-sm font-extrabold text-white">{item.category}</p>
                      </div>
                    </button>
                  </Tilt3D>
                </Reveal3D>
              ))}
            </div>
          )}

          {!loading && !images.length && (
            <p className="py-16 text-center site-caption">No images in this category.</p>
          )}
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#0B1F3A]/90 p-4 backdrop-blur-sm">
          <button type="button" onClick={() => setLightbox(null)} className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white text-[#0B1F3A]">
            <FiX />
          </button>
          <img src={lightbox} alt="Gallery preview" className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-2xl" />
        </div>
      )}
    </>
  )
}
