import AnimatedSection from '../components/AnimatedSection'
import CompanyImage from '../components/CompanyImage'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { company } from '../data/companyData'
import { mediaAssets } from '../data/mediaAssets'

const values = ['State-of-the-art Infrastructure', 'Experienced Team', 'Client Centric Approach', 'Ethical Business Policies']
const timeline = ['Established in Surat in 2009', "GST registered in Jul'17", 'Expanded net, velvet, jacquard and garment fabric range', 'Serving wholesale, retail and garment industry buyers']
const team = ['Procurement agents', 'Designers', 'Quality controllers', 'Warehousing & packaging experts', 'Sales and marketing executives']

export default function About() {
  return (
    <>
      <SEO title="About Us" description="Learn about V.Colors, a Surat based manufacturer, exporter and supplier of brocade, viscose, nylon net, poly net, garment and jacquard fabrics." path="/about" />
<section className="about-hero relative overflow-hidden min-h-[700px]">
  {/* Background Image */}
  <img
    src="/media/gallery/herosection4.png"
    alt="V Colors Store"
    className="h-[700px] w-full object-cover"
  />

  {/* Dark Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#020b1f]/95 via-[#020b1f]/80 to-transparent" />

  {/* Content */}
  <div className="absolute inset-0 flex items-start">
    <div className="about-hero-content max-w-[800px] pl-10 md:pl-44 pt-20 md:pt-16">
      
      <p className="mb-4 text-[14px] font-semibold tracking-[8px] text-[#d4a53a] uppercase">
        About Us
      </p>

      <h2 className="font-serif text-white text-5xl md:text-7xl leading-none">
        Crafting Quality
      </h2>

      <h2 className="font-serif text-[#d4a53a] text-5xl md:text-7xl leading-none mt-2">
        Since 2009
      </h2>

      <div className="mt-8 h-[2px] w-24 bg-[#d4a53a]" />

      <p className="mt-8 text-white/85 text-base md:text-lg leading-9">
        V-Colors is a trusted name in the world of fancy fabrics.
        Based in Surat, we specialize in delivering premium quality
        fabrics that blend innovation, elegance, and durability.
        Our commitment to excellence and customer satisfaction
        has helped us build long-lasting relationships across
        the textile industry.
      </p>

      <button
        className="
          mt-10
          border
          border-[#d4a53a]
          px-8
          py-4
          text-sm
          font-semibold
          uppercase
          tracking-wide
          text-[#d4a53a]
          transition-all
          duration-300
          hover:bg-[#d4a53a]
          hover:text-[#020b1f]
        "
      >
        Know More About Us →
      </button>
    </div>
  </div>
</section>
      <AnimatedSection className="section container grid gap-10 lg:grid-cols-2 !pb-0">
        <div>
          <SectionHeader align="left" eyebrow="Company Story" title="Established Textile Supplier Since 2009" text="Incorporated in 2009, V.Colors is engaged in manufacturing, exporting and supplying brocade fabrics, viscose fabrics, nylon net fabrics, poly net fabrics, garment fabrics and jacquard fabrics from Surat, Gujarat." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ['Proprietor', company.proprietor],
              ['Legal Status', company.legalStatus],
              ['Annual Turnover', company.annualTurnover],
              ['Employees', company.employees],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">{label}</p>
                <p className="mt-2 font-semibold text-navy">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <CompanyImage src={mediaAssets.company.aboutFactory} alt="Real V Colors factory infrastructure" className="h-full min-h-[420px] rounded-[2rem] object-cover shadow-2xl" />
      </AnimatedSection>
      <section className="section bg-slate-50">
        <div className="container grid gap-6 md:grid-cols-2">
          <div className="card"><h2>Mission</h2><p>To manufacture and supply optimum quality fabrics in various specifications with reliable quality-control, warehousing, packaging and timely delivery.</p></div>
          <div className="card"><h2>Vision</h2><p>To remain a trusted Surat textile partner for wholesalers, retailers and garment manufacturers through transparent business dealings and a wide product line.</p></div>
        </div>
      </section>
      <section className="section container !py-0">
        <SectionHeader eyebrow="Core Values" title="How We Work" />
        <div className="grid gap-5 md:grid-cols-4">{values.map((value) => <div key={value} className="rounded-3xl bg-navy p-6 text-center font-bold text-white shadow-xl">{value}</div>)}</div>
      </section>
      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeader eyebrow="Timeline" title="Company Growth" />
          <div className="grid gap-4 md:grid-cols-4">{timeline.map((item, index) => <div key={item} className="card"><span className="text-gold">0{index + 1}</span><p className="mt-3 font-semibold">{item}</p></div>)}</div>
        </div>
      </section>
      <section className="section container !pt-0">
        <SectionHeader eyebrow="Our Team" title="Professional Team Supporting Quality Fabric Supply" text="V.Colors is backed by professionals who support manufacturing, designing, quality control, warehousing, packaging, sales and marketing." />
        <div className="grid gap-4 md:grid-cols-5">
          {team.map((item) => <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-center font-semibold text-navy shadow-sm">{item}</div>)}
        </div>
      </section>
    </>
  )
}
