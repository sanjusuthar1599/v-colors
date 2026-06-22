import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mediaAssets } from '../../data/mediaAssets'
import { resolveMediaUrl } from '../../utils/resolveMediaUrl'

const galleryItems = [
  { label: 'Factory Floor', image: mediaAssets.company.aboutFactory, span: 'md:col-span-2 md:row-span-2' },
  { label: 'Machines', image: mediaAssets.company.manufacturingHero, span: '' },
  { label: 'Warehouse', image: mediaAssets.company.galleryHero, span: '' },
  { label: 'Quality Control', image: mediaAssets.products.embroideryFabric, span: '' },
  { label: 'Packaging', image: mediaAssets.products.velvetFabric, span: 'md:col-span-2' },
  { label: 'Showroom', image: mediaAssets.company.heroSlides[0], span: '' },
]

export default function InfrastructureGallery() {
  return (
    <section className="site-section bg-[#FAFAFA]">
      <div className="premium-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="site-eyebrow">Infrastructure</p>
            <h2 className="site-heading">Factory & Infrastructure</h2>
            <p className="site-caption mt-3">Manufacturing setup, warehousing and quality control in Surat.</p>
          </div>
          <Link to="/gallery" className="text-sm font-bold text-[#D4AF37] transition hover:text-[#0B1F3A]">View Gallery →</Link>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[260px] md:grid-cols-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(11,31,58,0.08)] ${item.span}`}
            >
              <img src={resolveMediaUrl(item.image)} alt={item.label} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/85 to-transparent" />
              <p className="absolute bottom-5 left-5 font-display text-xs font-bold uppercase tracking-[0.18em] text-white">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
