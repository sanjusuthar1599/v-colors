import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import FabricBackdrop from './FabricBackdrop'
import FabricMarquee from './FabricMarquee'
import Reveal3D from '../interactive/Reveal3D'
import { fabricShowcaseImages } from '../../data/fabricImages'
import { getWhatsAppUrl } from '../../utils/inquiry'

export default function InquirySection() {
  return (
    <section className="relative overflow-hidden text-white">
      <FabricBackdrop images={fabricShowcaseImages.slice(2, 6)} interval={5000} overlay="dark" />

      <div className="site-section relative z-10">
        <div className="premium-container">
          <Reveal3D className="mx-auto max-w-2xl text-center">
            <p className="site-eyebrow !text-[#D4AF37]">Wholesale Inquiry</p>
            <h2 className="site-heading-light">Need Fabric For Your Business?</h2>
            <p className="site-caption-light mx-auto mt-4 max-w-lg">
              Bulk inquiry via WhatsApp — share MOQ & requirements for factory-direct pricing from Surat.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-[0.625rem] bg-[#25D366] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:brightness-110 sm:w-auto"
              >
                <FaWhatsapp className="text-xl" /> WhatsApp Quote
              </a>
              <Link to="/inquiry" className="btn-gold w-full sm:w-auto">Submit Inquiry</Link>
            </div>
          </Reveal3D>
        </div>
      </div>
    </section>
  )
}
