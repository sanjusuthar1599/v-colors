import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { company } from '../data/companyData'

export default function RefundPolicy() {
  return (
    <>
      <SEO title="Refund & Return Policy" description="V.Colors refund, return and cancellation policy for fabric orders." path="/refund-policy" />
      <section className="section container max-w-4xl">
        <SectionHeader align="left" title="Refund & Return Policy" text={`Last updated: ${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`} />
        <div className="mt-8 grid gap-6 text-slate-600 leading-7">
          <p>{company.name} aims for quality fabrics and fair dealing. Please review this policy before ordering.</p>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Fabric Quality</h2>
            <p className="mt-2">If you receive damaged or defective fabric, contact us within 48 hours of delivery with photos and order number. We will review and offer replacement or adjustment where appropriate.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Returns</h2>
            <p className="mt-2">Due to the nature of textile goods, cut fabrics and custom orders may not be returnable. Bulk B2B orders are handled case-by-case. Contact our team before returning any goods.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Cancellations</h2>
            <p className="mt-2">Orders can be cancelled before dispatch. Once shipped, cancellation may not be possible. Contact us immediately with your order number.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Refunds</h2>
            <p className="mt-2">Approved refunds for online payments are processed within 7–10 business days to the original payment method. COD refunds are handled via bank transfer or agreed method.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Contact</h2>
            <p className="mt-2">For returns or refunds: {company.email} or WhatsApp via our website.</p>
          </div>
        </div>
      </section>
    </>
  )
}
