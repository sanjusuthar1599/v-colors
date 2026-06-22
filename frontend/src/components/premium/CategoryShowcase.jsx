import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import { categoryCatalog, getProductsCategoryUrl } from '../../utils/categoryUtils'
import { getCategoryWhatsAppUrl } from '../../utils/inquiry'
import { resolveMediaUrl } from '../../utils/resolveMediaUrl'

export default function CategoryShowcase() {
  return (
    <section className="premium-section bg-[#FAFAFA]">
      <div className="premium-container">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Product Categories</p>
            <h2 className="premium-heading text-[clamp(2rem,4vw,3.25rem)]">Wholesale Fabric Collections</h2>
            <p className="premium-subtext mt-4 max-w-xl">
              Browse by category and send bulk inquiry — factory-direct pricing, MOQ flexibility and pan-India dispatch.
            </p>
          </div>
          <Link to="/products" className="btn-dark">View Full Catalog</Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categoryCatalog.map((cat, index) => {
            const categoryUrl = getProductsCategoryUrl(cat.filter)

            return (
              <motion.article
                key={cat.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.08, duration: 0.65 }}
                className="group relative overflow-hidden rounded-[1.75rem] bg-[#0B1F3A] shadow-[0_30px_80px_rgba(11,31,58,0.12)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={resolveMediaUrl(cat.image)}
                    alt={cat.label}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/95 via-[#0B1F3A]/35 to-transparent transition group-hover:from-[#0B1F3A]/98" />

                  <Link
                    to={categoryUrl}
                    className="absolute inset-0 z-[5]"
                    aria-label={`Browse ${cat.label}`}
                  />

                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-7 pointer-events-none">
                    <h3 className="font-display text-2xl font-extrabold text-white drop-shadow-sm">{cat.label}</h3>
                    <p className="mt-2 text-sm text-white/75 drop-shadow-sm">Bulk orders • Custom MOQ • Export quality</p>

                    <div className="pointer-events-auto mt-5 flex flex-wrap gap-2">
                      <Link
                        to={categoryUrl}
                        className="inline-flex items-center gap-1 rounded-full bg-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur transition hover:bg-[#D4AF37] hover:text-[#0B1F3A]"
                      >
                        View Collection <FiArrowUpRight />
                      </Link>
                      <a
                        href={getCategoryWhatsAppUrl(cat.label)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-[#25D366] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <FaWhatsapp /> Request Quote
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
