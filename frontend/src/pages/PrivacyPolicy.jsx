import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { company } from '../data/companyData'

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title="Privacy Policy" description="V.Colors privacy policy for website visitors and customers." path="/privacy-policy" />
      <section className="section container max-w-4xl">
        <SectionHeader align="left" title="Privacy Policy" text={`Last updated: ${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`} />
        <div className="prose prose-slate mt-8 grid gap-6 text-slate-600 leading-7">
          <p>{company.name} respects your privacy. This policy explains how we collect, use and protect your information when you use our website or place an order.</p>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Information We Collect</h2>
            <p className="mt-2">Name, email, phone number, company name, delivery address, product inquiries, order details and messages you submit through our forms.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">How We Use Your Information</h2>
            <p className="mt-2">To process orders, respond to inquiries, send order confirmations, improve our services and communicate about your fabric requirements.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Data Storage</h2>
            <p className="mt-2">Order and inquiry data is stored securely in our database. Images and videos may be stored on Cloudinary for product display.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Third-Party Services</h2>
            <p className="mt-2">We may use payment processors (Stripe), email services (SMTP), SMS (Twilio) and media hosting (Cloudinary) to operate the website.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Contact</h2>
            <p className="mt-2">For privacy questions, email {company.email} or visit our Contact page.</p>
          </div>
        </div>
      </section>
    </>
  )
}
