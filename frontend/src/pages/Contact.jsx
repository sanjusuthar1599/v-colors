import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import InquiryForm from '../components/InquiryForm'
import PageBanner from '../components/premium/PageBanner'
import Reveal3D from '../components/interactive/Reveal3D'
import Tilt3D from '../components/interactive/Tilt3D'
import SEO from '../components/SEO'
import { company } from '../data/companyData'
import { mediaAssets } from '../data/mediaAssets'
import { getWhatsAppUrl } from '../utils/inquiry'
import { resolveMediaUrl } from '../utils/resolveMediaUrl'

export default function Contact() {
  return (
    <>
      <SEO title="Contact" description="V.Colors Surat — wholesale fabric inquiry." path="/contact" />
{/* 
      <PageBanner
        eyebrow="Contact"
        title="Bulk Fabric Inquiry"
        description="WhatsApp, call or form — factory-direct pricing from Surat."
        image={resolveMediaUrl(mediaAssets.company.heroSlides[0])}
      /> */}

      <section className="site-section bg-[#FAFAFA]">
        <div className="premium-container grid gap-10 lg:grid-cols-2">
          <Reveal3D>
            <div>
              <p className="site-eyebrow">Sales Contact</p>
              <h2 className="site-heading">Talk To Our Team</h2>
              <p className="site-caption mt-3">Wholesale orders only — share fabric type, MOQ & delivery location.</p>

              <div className="mt-8 grid gap-4">
                <Tilt3D intensity={10}>
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="site-card flex items-center gap-4 transition hover:ring-[#D4AF37]">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#D4AF37]/15 text-[#0B1F3A]"><FiPhone className="text-xl" /></span>
                <span>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Call Sales</p>
                  <p className="mt-1 font-display text-base font-extrabold text-[#0B1F3A]">{company.phone}</p>
                </span>
                  </a>
                </Tilt3D>

                <Tilt3D intensity={10}>
                  <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl bg-[#25D366] p-5 text-white transition hover:brightness-110">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15"><FaWhatsapp className="text-2xl" /></span>
                <span>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/80">WhatsApp</p>
                  <p className="mt-1 font-display text-base font-extrabold">Bulk Order Inquiry</p>
                </span>
                  </a>
                </Tilt3D>

                <Tilt3D intensity={8}>
                  <div className="site-card flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#D4AF37]/15 text-[#0B1F3A]"><FiMapPin className="text-xl" /></span>
                <span>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Address</p>
                  <p className="site-caption mt-2">{company.address}</p>
                </span>
                  </div>
                </Tilt3D>

                <Tilt3D intensity={8}>
                  <div className="site-card flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#D4AF37]/15 text-[#0B1F3A]"><FiMail className="text-xl" /></span>
                <span>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Email</p>
                  <p className="site-caption mt-1">{company.email}</p>
                </span>
                  </div>
                </Tilt3D>

                <Tilt3D intensity={8}>
                  <a href={company.instagram} target="_blank" rel="noreferrer" className="site-card flex items-center gap-4 transition hover:ring-[#dd2a7b]">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white"><FaInstagram className="text-xl" /></span>
                <span>
                  <p className="font-display font-extrabold text-[#0B1F3A]">Instagram</p>
                  <p className="site-caption">@v_colors_</p>
                </span>
                  </a>
                </Tilt3D>
              </div>

              <div className="mt-6 rounded-2xl bg-[#0B1F3A] p-6 text-white">
                <h3 className="font-display text-lg font-extrabold">Business Profile</h3>
                <div className="site-caption-light mt-4 space-y-2">
                  <p><strong className="text-white">Proprietor:</strong> {company.proprietor}</p>
                  <p><strong className="text-white">GST:</strong> {company.gst}</p>
                  <p><strong className="text-white">Established:</strong> {company.established}</p>
                </div>
              </div>
            </div>
          </Reveal3D>

          <Reveal3D delay={0.1}>
            <div className="site-card !p-6 md:!p-8">
              <h3 className="font-display text-xl font-extrabold text-[#0B1F3A]">Wholesale Inquiry Form</h3>
              <p className="site-caption mt-2">Fabric type, MOQ & delivery location</p>
              <div className="mt-6"><InquiryForm type="contact" /></div>
            </div>
          </Reveal3D>
        </div>
      </section>

      <section className="site-section bg-white pb-16">
        <div className="premium-container">
          <p className="site-eyebrow">Location</p>
          <h2 className="site-heading">Visit Our Surat Showroom</h2>
          <iframe
            title="V.Colors map"
            className="mt-6 h-[360px] w-full rounded-2xl border-0 shadow-[0_24px_60px_rgba(11,31,58,0.1)] md:h-[420px]"
            loading="lazy"
            src="https://www.google.com/maps?q=Aastha%20Textile%20Tower%20Ring%20Road%20Surat%20Gujarat%20395002&output=embed"
          />
        </div>
      </section>
    </>
  )
}
