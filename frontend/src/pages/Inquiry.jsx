import InquiryForm from '../components/InquiryForm'
import PageBanner from '../components/premium/PageBanner'
import Reveal3D from '../components/interactive/Reveal3D'
import SEO from '../components/SEO'
import { mediaAssets } from '../data/mediaAssets'
import { resolveMediaUrl } from '../utils/resolveMediaUrl'

export default function Inquiry() {
  return (
    <>
      <SEO title="Inquiry" description="Request wholesale fabric quote from V.Colors Surat." path="/inquiry" />
      <PageBanner eyebrow="Inquiry" title="Request Fabric Quote" description="Share category, MOQ & delivery location for factory-direct pricing." image={resolveMediaUrl(mediaAssets.company.heroSlides[0])} />
      <section className="site-section bg-[#FAFAFA]">
        <div className="premium-container mx-auto max-w-2xl">
          <p className="site-caption mb-6 text-center">Factory-direct pricing · WhatsApp response available</p>
          <Reveal3D>
            <div className="site-card !p-6 md:!p-8">
              <InquiryForm />
            </div>
          </Reveal3D>
        </div>
      </section>
    </>
  )
}
