import SEO from '../components/SEO'
import FeaturedProducts from '../components/premium/FeaturedProducts'
import CategoryShowcase from '../components/premium/CategoryShowcase'
import InfrastructureGallery from '../components/premium/InfrastructureGallery'
import IndustriesGrid from '../components/premium/IndustriesGrid'
import InquirySection from '../components/premium/InquirySection'
import PremiumHero from '../components/premium/PremiumHero'
import ProcessTimeline from '../components/premium/ProcessTimeline'
import TestimonialsSlider from '../components/premium/TestimonialsSlider'
import WhyChooseUs from '../components/premium/WhyChooseUs'

export default function Home() {
  return (
    <>
      <SEO
        title="Premium Textile Manufacturer in Surat"
        description="V.Colors — B2B textile manufacturer. Embroidery, jacquard, velvet fabrics. Bulk quote on WhatsApp."
      />
      <PremiumHero />
      <FeaturedProducts title="Wholesale Fabric Collection" limit={8} />
      <CategoryShowcase />
      <WhyChooseUs />
      <ProcessTimeline />
      <InfrastructureGallery />
      <IndustriesGrid />
      <TestimonialsSlider />
      <InquirySection />
    </>
  )
}
