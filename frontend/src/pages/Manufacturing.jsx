import { Link } from 'react-router-dom'
import { FiBox, FiCheckCircle, FiPackage, FiSettings, FiShield, FiTruck } from 'react-icons/fi'
import PageBanner from '../components/premium/PageBanner'
import Reveal3D from '../components/interactive/Reveal3D'
import Tilt3D from '../components/interactive/Tilt3D'
import SEO from '../components/SEO'
import { mediaAssets } from '../data/mediaAssets'
import { resolveMediaUrl } from '../utils/resolveMediaUrl'

const processSteps = [
  { title: 'Procurement', desc: 'Premium raw materials from verified suppliers.', icon: FiBox },
  { title: 'Production', desc: 'Embroidery, weaving & finishing on modern machinery.', icon: FiSettings },
  { title: 'Quality Check', desc: '4-point inspection for texture and consistency.', icon: FiCheckCircle },
  { title: 'Warehousing', desc: 'Organized storage preserving fabric quality.', icon: FiShield },
  { title: 'Packaging', desc: 'Export-grade roll and polypack packaging.', icon: FiPackage },
  { title: 'Dispatch', desc: 'Pan-India logistics with timely delivery.', icon: FiTruck },
]

const capabilities = [
  'Modern embroidery & weaving machinery',
  'Multi-stage quality inspection system',
  'Export-grade packaging standards',
  'Bulk order production capacity',
  'Custom design & color coordination',
  'Pan-India wholesale dispatch',
]

const galleryPreview = [
  { label: 'Factory Floor', image: mediaAssets.company.aboutFactory },
  { label: 'Machinery', image: mediaAssets.company.manufacturingHero },
  { label: 'Warehouse', image: mediaAssets.company.galleryHero },
  { label: 'Quality Control', image: mediaAssets.products.embroideryFabric },
]

export default function Manufacturing() {
  return (
    <>
      <SEO title="Manufacturing" description="V.Colors manufacturing — Surat textile production." path="/manufacturing" />
      <PageBanner
        eyebrow="Manufacturing Excellence"
        title="State-Of-The-Art Fabric Production"
        description="From raw material procurement to final dispatch — disciplined B2B workflow built for wholesale reliability."
        image={resolveMediaUrl(mediaAssets.company.manufacturingHero)}
        cta={{ href: '/inquiry', label: 'Factory Inquiry' }}
      />

      <section className="border-b border-slate-200 bg-white py-6">
        <div className="premium-container grid grid-cols-2 gap-4 md:grid-cols-4">
          {[['Procurement', 'Premium Materials'], ['Production', 'Modern Machines'], ['Quality', 'Export Grade'], ['Dispatch', 'Pan India']].map(([t, s]) => (
            <div key={t} className="rounded-xl bg-[#FAFAFA] px-4 py-4 text-center ring-1 ring-slate-100">
              <p className="font-display text-sm font-extrabold text-[#0B1F3A]">{t}</p>
              <p className="mt-1 text-xs text-slate-500">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="site-section bg-[#FAFAFA]">
        <div className="premium-container">
          <div className="mb-10 text-center">
            <p className="site-eyebrow">Our Process</p>
            <h2 className="site-heading">From Loom To Buyer</h2>
            <p className="site-caption mx-auto mt-3 max-w-2xl">Six-stage manufacturing workflow ensuring consistent quality for wholesale buyers.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal3D key={step.title} delay={index * 0.05}>
                <Tilt3D intensity={11}>
                  <div className="site-card relative overflow-hidden !p-6">
                    <span className="absolute right-4 top-4 font-display text-3xl font-extrabold text-[#D4AF37]/20">0{index + 1}</span>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#0B1F3A] text-[#D4AF37]">
                      <step.icon className="text-xl" />
                    </div>
                    <h3 className="mt-5 font-display text-base font-extrabold uppercase tracking-wide text-[#0B1F3A]">{step.title}</h3>
                    <p className="site-caption mt-2">{step.desc}</p>
                  </div>
                </Tilt3D>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="premium-container grid gap-10 lg:grid-cols-2 lg:items-center">
          <img
            src={resolveMediaUrl(mediaAssets.company.aboutFactory)}
            alt="V.Colors factory"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_32px_80px_rgba(11,31,58,0.1)] ring-1 ring-slate-100"
          />
          <div>
            <p className="site-eyebrow">Factory Setup</p>
            <h2 className="site-heading">Precision At Every Stage</h2>
            <p className="site-caption mt-4">
              Our Surat infrastructure integrates production, quality inspection, warehousing and logistics for reliable B2B supply.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {capabilities.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-lg bg-[#FAFAFA] p-3 text-sm text-[#0B1F3A] ring-1 ring-slate-100">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-[#D4AF37]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="site-section bg-[#0B1F3A] text-white">
        <div className="premium-container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="site-eyebrow !text-[#D4AF37]">Infrastructure</p>
              <h2 className="site-heading-light">Inside Our Factory</h2>
            </div>
            <Link to="/gallery" className="text-sm font-bold text-[#D4AF37]">Full Gallery →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryPreview.map((item) => (
              <Tilt3D key={item.label} intensity={9}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-xl">
                  <img src={resolveMediaUrl(item.image)} alt={item.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <p className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-wider">{item.label}</p>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section bg-[#FAFAFA]">
        <div className="premium-container rounded-2xl border border-slate-200 bg-white px-8 py-12 text-center shadow-sm md:px-16">
          <h2 className="site-heading">Schedule A Factory Discussion</h2>
          <p className="site-caption mx-auto mt-3 max-w-lg">Discuss MOQ, fabric specifications and production timelines with our Surat team.</p>
          <Link to="/inquiry" className="btn-gold mt-8 inline-flex">Contact Manufacturing Team</Link>
        </div>
      </section>
    </>
  )
}
