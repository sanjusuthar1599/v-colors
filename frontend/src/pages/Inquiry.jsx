import InquiryForm from '../components/InquiryForm'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'

export default function Inquiry() {
  return (
    <>
      <SEO title="Inquiry" description="Request latest price for V.Colors textile products from Surat." path="/inquiry" />
      <section className="page-hero"><div className="container"><p className="eyebrow">Lead Generation</p><h1 className="page-title">Request A Fabric Quote</h1></div></section>
      <section className="section container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader align="left" title="Tell Us What You Need" text="Send product category, quantity, application and delivery location. The team can respond with latest price, MOQ and availability details." />
        <InquiryForm />
      </section>
    </>
  )
}
