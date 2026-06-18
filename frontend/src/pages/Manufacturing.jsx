import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { processSteps } from '../data/companyData'
import { mediaAssets } from '../data/mediaAssets'
import { resolveMediaUrl } from '../utils/resolveMediaUrl'

export default function Manufacturing() {
  return (
    <>
      <SEO title="Manufacturing Process" description="V.Colors infrastructure includes procurement, production, quality-control, warehousing, packaging, sales, marketing and transportation logistics." path="/manufacturing" />
<section
  className="bg-hero-section relative overflow-hidden py-32 h-[530px]"
  style={{
    backgroundImage: `url('${resolveMediaUrl(mediaAssets.company.manufacturingHero)}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50 h-[530px]"></div>

  <div className="container relative z-10">
    <p className="eyebrow text-white">Manufacturing</p>

    <h1 className="font-display text-5xl font-normal leading-tight md:text-6xl text-white w-3xl">
      <span className="text-gold">State-of-the-art </span>
      Infrastructure For Fabric
      <span className="text-gold"> Manufacturing</span>
    </h1>
  </div>
</section>      <section className="section container !py-16">
        <SectionHeader title="Infrastructure Workflow" text="V.Colors has various departments that support manufacturing, quality checking, packaging and timely delivery across the nation." />
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gold md:block" />
          {processSteps.map((step, index) => (
            <div key={step} className="relative mb-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg md:ml-16">
              <span className="absolute -left-[4.5rem] top-6 hidden h-12 w-12 place-items-center rounded-full bg-gold font-bold text-navy md:grid">{index + 1}</span>
              <h2 className="font-display text-2xl font-bold text-navy">{step}</h2>
              <p className="mt-2 leading-7 text-slate-600">This unit supports premium quality fabric supply in multiple specifications for textile and garment industry buyers.</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section bg-slate-50 !pt-0 !pb-16">
        <div className="container grid gap-6 md:grid-cols-3">
          {['Advanced Machinery', 'Quality Standards', 'Timely Delivery'].map((item) => <div key={item} className="card"><h2>{item}</h2><p className="mt-3">The infrastructural base is outfitted with essential machinery, tools and trained professionals for reliable fabric production and dispatch.</p></div>)}
        </div>
      </section>
    </>
  )
}
