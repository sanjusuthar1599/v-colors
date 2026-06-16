import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { company } from '../data/companyData'

export default function TermsOfService() {
  return (
    <>
      <SEO title="Terms of Service" description="V.Colors terms and conditions for using the website and placing orders." path="/terms" />
      <section className="section container max-w-4xl">
        <SectionHeader align="left" title="Terms of Service" text={`Last updated: ${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`} />
        <div className="mt-8 grid gap-6 text-slate-600 leading-7">
          <p>By using the {company.name} website, you agree to these terms. Please read them before placing an order.</p>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Products & Pricing</h2>
            <p className="mt-2">Product images, videos and prices are for reference. Final price, MOQ and availability may be confirmed before dispatch. Fabric shades may vary slightly due to screen display and batch production.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Orders</h2>
            <p className="mt-2">Orders are confirmed after successful submission. Cash on Delivery and online payment options are shown at checkout. We reserve the right to cancel orders with incorrect information or suspected fraud.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Delivery</h2>
            <p className="mt-2">Expected delivery is within 3–5 working days for standard orders unless otherwise agreed. Delays due to logistics or force majeure are not our liability beyond reasonable effort to fulfill.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Intellectual Property</h2>
            <p className="mt-2">Website content, logos, product media and text belong to {company.name}. Unauthorized reproduction is prohibited.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Contact</h2>
            <p className="mt-2">Questions about these terms: {company.email}</p>
          </div>
        </div>
      </section>
    </>
  )
}
