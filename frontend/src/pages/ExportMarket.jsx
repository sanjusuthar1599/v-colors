import { FiMapPin } from 'react-icons/fi'
import Counter from '../components/Counter'
import PageBanner from '../components/premium/PageBanner'
import Reveal3D from '../components/interactive/Reveal3D'
import Tilt3D from '../components/interactive/Tilt3D'
import SEO from '../components/SEO'
import { exportMarkets } from '../data/companyData'
import { mediaAssets } from '../data/mediaAssets'
import { resolveMediaUrl } from '../utils/resolveMediaUrl'

export default function ExportMarket() {
  return (
    <>
      <SEO title="Buyer Network" description="V.Colors serves wholesale and garment industry buyers across India." path="/export-market" />
      <PageBanner
        eyebrow="Buyer Network"
        title="Supplying Fabrics To Industry Buyers"
        description="Wholesale, retail and garment industry segments across India."
        image={resolveMediaUrl(mediaAssets.company.buyerNetworkHero)}
      />

      <section className="site-section bg-[#FAFAFA]">
        <div className="premium-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="site-heading">Domestic Market & Buyer Segments</h2>
            <p className="site-caption mt-3">Serving textile, garment, wholesale and retail buyers nationwide.</p>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(11,31,58,0.08)] md:p-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {exportMarkets.map((market, index) => (
                <Reveal3D key={market} delay={index * 0.04}>
                  <Tilt3D intensity={10}>
                    <div className="site-card flex items-center gap-3 !p-5">
                      <FiMapPin className="text-xl text-[#D4AF37]" />
                      <span className="font-display text-lg font-bold text-[#0B1F3A]">{market}</span>
                    </div>
                  </Tilt3D>
                </Reveal3D>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Counter value={17} label="Years Since 2009" />
            <Counter value={47} label="Listed Products" />
            <Counter value={10} label="Team Members" />
          </div>
        </div>
      </section>
    </>
  )
}
