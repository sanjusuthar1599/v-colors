import { FiMapPin } from 'react-icons/fi'
import Counter from '../components/Counter'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { exportMarkets } from '../data/companyData'

export default function ExportMarket() {
  return (
    <>
      <SEO title="Buyer Network" description="V.Colors serves wholesale, retail and garment industry buyers with fabric supply across India." path="/export-market" />
      <section
  className="bg-hero-section relative min-h-[70vh] flex items-center overflow-hidden"
  style={{
    backgroundImage: "url('/media/gallery/buyernetwork.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/55"></div>

  {/* Content */}
  <div className="container relative z-10">
    <p className="eyebrow text-white">Buyer Network</p>

    <h1 className="font-display text-5xl font-normal leading-tight md:text-6xl w-2xl text-white">
      <span className="text-gold">Supplying </span>
      Fabrics To Wholesale, Retail And Garment
      <span className="text-gold"> Industry</span> Buyers
    </h1>
  </div>
</section>
      <section className="section container !py-16">
        <SectionHeader title="Domestic Market & Buyer Segments" text="Public B2B listings mention All India as the main domestic market with buyers from textile, garment, wholesale and retail segments." />
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 text-navy shadow-2xl shadow-slate-200/70 md:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(237,30,143,.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(21,159,232,.16),transparent_35%)]" />
          <div className="relative grid gap-5 md:grid-cols-3">
            {exportMarkets.map((market) => <div key={market} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur"><FiMapPin className="text-logo-blue" /> <span className="font-display text-2xl font-bold">{market}</span></div>)}
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Counter value={17} label="Years Since 2009" />
          <Counter value={47} label="Listed Products" />
          <Counter value={10} label="Team Members" />
        </div>
      </section>
    </>
  )
}
