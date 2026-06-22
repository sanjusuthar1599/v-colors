import { Link } from 'react-router-dom'
import { FiAward, FiCheckCircle, FiTarget, FiEye } from 'react-icons/fi'
import PageBanner from '../components/premium/PageBanner'
import Reveal3D from '../components/interactive/Reveal3D'
import Tilt3D from '../components/interactive/Tilt3D'
import SEO from '../components/SEO'
import { company } from '../data/companyData'
import { mediaAssets } from '../data/mediaAssets'
import { resolveMediaUrl } from '../utils/resolveMediaUrl'

const milestones = [
  { year: '2009', title: 'Founded in Surat', desc: 'Started as a textile manufacturing unit on Ring Road.' },
  { year: '2014', title: 'Expanded Collections', desc: 'Added jacquard, velvet and fancy fabric lines.' },
  { year: '2017', title: 'GST Registered', desc: 'Formal B2B workflows and wholesale supply structure.' },
  { year: '2024', title: 'Digital Catalog', desc: 'Online fabric catalog and nationwide buyer reach.' },
]

const strengths = [
  'Export-quality embroidery & jacquard fabrics',
  'Factory-direct wholesale pricing from Surat',
  'Flexible MOQ for wholesalers & garment makers',
  'Pan-India dispatch with quality inspection',
]

const mosaic = [
  mediaAssets.products.embroideryFabric,
  mediaAssets.company.aboutFactory,
  mediaAssets.products.velvetFabric,
  mediaAssets.products.jacquardFabric,
]

export default function About() {
  return (
    <>
      <SEO title="About V.Colors" description="Surat textile manufacturer since 2009." path="/about" />
      <PageBanner
        eyebrow="Our Story"
        title="We Build Trust Through Premium Fabrics"
        description="Surat-based manufacturer of embroidery, jari net, jacquard, velvet and garment fabrics for wholesale buyers since 2009."
        image={resolveMediaUrl(mediaAssets.company.aboutFactory)}
        cta={{ href: '/inquiry', label: 'Request Quote' }}
      />

      <section className="border-b border-slate-200 bg-white py-6">
        <div className="premium-container grid grid-cols-2 gap-4 md:grid-cols-4">
          {[['15+', 'Years'], ['5000+', 'Designs'], ['1000+', 'Buyers'], ['Pan India', 'Supply']].map(([v, l], index) => (
            <Reveal3D key={l} delay={index * 0.05}>
              <Tilt3D intensity={10}>
                <div className="rounded-xl bg-[#FAFAFA] px-4 py-5 text-center ring-1 ring-slate-100">
                  <p className="font-display text-2xl font-extrabold text-[#D4AF37]">{v}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{l}</p>
                </div>
              </Tilt3D>
            </Reveal3D>
          ))}
        </div>
      </section>

      <section className="site-section bg-[#FAFAFA]">
        <div className="premium-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-3">
            {mosaic.map((src, i) => (
              <img
                key={src}
                src={resolveMediaUrl(src)}
                alt=""
                className={`rounded-2xl object-cover shadow-lg ring-1 ring-slate-200 ${i === 1 ? 'row-span-2 h-full min-h-[280px]' : 'aspect-square'}`}
              />
            ))}
          </div>

          <div>
            <p className="site-eyebrow">Corporate Profile</p>
            <h2 className="site-heading">B2B Textile Manufacturer From Surat</h2>
            <p className="site-caption mt-4">
              {company.name} is led by {company.proprietor} and supplies premium fabrics to wholesalers, garment manufacturers and boutique buyers across India.
            </p>
            <ul className="mt-6 space-y-3">
              {strengths.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#0B1F3A]">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-[#D4AF37]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[['Established', company.established], ['Turnover', company.annualTurnover], ['Legal Status', company.legalStatus], ['Team', company.employees]].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">{k}</p>
                  <p className="mt-1 font-display text-base font-extrabold text-[#0B1F3A]">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-[#0B1F3A] text-white">
        <div className="premium-container grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-white/5 p-8">
            <Reveal3D>
              <Tilt3D intensity={11}>
                <div>
                  <FiEye className="text-3xl text-[#D4AF37]" />
                  <h3 className="mt-4 font-display text-xl font-extrabold">Our Vision</h3>
                  <p className="site-caption-light mt-3">To be India&apos;s most trusted premium textile manufacturing partner for wholesalers and export buyers.</p>
                </div>
              </Tilt3D>
            </Reveal3D>
          </div>
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-white/5 p-8">
            <Reveal3D delay={0.08}>
              <Tilt3D intensity={11}>
                <div>
                  <FiTarget className="text-3xl text-[#D4AF37]" />
                  <h3 className="mt-4 font-display text-xl font-extrabold">Our Mission</h3>
                  <p className="site-caption-light mt-3">Deliver export-quality fabrics through disciplined manufacturing and transparent B2B dealing.</p>
                </div>
              </Tilt3D>
            </Reveal3D>
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="premium-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="site-eyebrow">Journey</p>
              <h2 className="site-heading">Company Timeline Since 2009</h2>
            </div>
            <Link to="/manufacturing" className="text-sm font-bold text-[#D4AF37]">See Manufacturing →</Link>
          </div>

          <div className="relative border-l-2 border-[#D4AF37]/40 pl-8 md:pl-10">
            {milestones.map((item) => (
              <div key={item.year} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[calc(1rem+5px)] top-1 grid h-4 w-4 rounded-full border-2 border-[#D4AF37] bg-white md:-left-[calc(1.25rem+5px)]" />
                <span className="font-display text-2xl font-extrabold text-[#D4AF37]">{item.year}</span>
                <h3 className="mt-1 font-display text-lg font-extrabold text-[#0B1F3A]">{item.title}</h3>
                <p className="site-caption mt-2 max-w-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section bg-[#FAFAFA]">
        <div className="premium-container rounded-2xl bg-[#0B1F3A] px-8 py-12 text-center text-white md:px-16">
          <FiAward className="mx-auto text-4xl text-[#D4AF37]" />
          <h2 className="mt-4 font-display text-2xl font-extrabold md:text-3xl">Partner With V.Colors</h2>
          <p className="site-caption-light mx-auto mt-3 max-w-lg">Wholesale pricing, fabric sampling and bulk supply from Surat.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/inquiry" className="btn-gold">Start Inquiry</Link>
            <Link to="/products" className="btn-outline-light">View Catalog</Link>
          </div>
        </div>
      </section>
    </>
  )
}
