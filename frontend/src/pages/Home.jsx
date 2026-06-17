import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCreditCard, FiGlobe, FiMessageCircle, FiPackage, FiShield, FiShoppingBag, FiTruck, FiX } from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import Counter from '../components/Counter'
import ProductCard from '../components/ProductCard'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { categories, company, exportMarkets, processSteps, stats } from '../data/companyData'
import { mediaAssets } from '../data/mediaAssets'
import { useEffect, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useTestimonials } from '../hooks/useTestimonials'
import { resolveMediaUrl } from '../utils/resolveMediaUrl'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categorySlide, setCategorySlide] = useState(0)
  const [showAnnouncement, setShowAnnouncement] = useState(true)
  const { products } = useProducts()
  const { testimonials } = useTestimonials()

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) =>
      (prev + 1) % mediaAssets.company.heroSlides.length
    );
  }, 4000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    setCategorySlide((prev) => (prev + 1) % categories.length)
  }, 2000)

  return () => clearInterval(interval)
}, [])

const categoryCards = categories.map((category) => {
  const categoryProducts = products.filter((product) => product.category === category)
  const product = categoryProducts[0] || products.find((item) => item.category?.toLowerCase().includes(category.toLowerCase().split(' ')[0]))
  return {
    name: category,
    image: product?.image || mediaAssets.products.embroideryFabricFallback,
    count: categoryProducts.length || 1,
  }
})

const activeCategory = categoryCards[categorySlide] || categoryCards[0]
const showcaseVideo = mediaAssets.company.productShowcaseVideo
const videoCards = (products.filter((product) => product.video).length ? products.filter((product) => product.video) : categoryCards).slice(0, 8).map((item, index) => ({
  title: item.name,
  category: item.category || 'V.Colors Fabric',
  video: item.video || showcaseVideo,
  poster: item.image || mediaAssets.products.embroideryFabricFallback,
  price: item.priceAmount ? `INR ${item.priceAmount}` : index % 2 === 0 ? 'Wholesale' : 'Inquiry',
}))

  return (
    <>
      <SEO title="Textile Manufacturer in Surat" description="V.Colors is a Surat based manufacturer, exporter and supplier of jari net embroidery fabrics, embroidery fabrics, fancy fabrics, velvet fabrics, jacquard fabric and readymade laces." />
      {showAnnouncement && (
        <div className="announcement-bar relative bg-logo-gradient px-12 py-3 text-center text-xs font-black uppercase tracking-[0.25em] text-white">
          Cash On Delivery Available • Online Orders • Expected Delivery In 3-5 Working Days
          <button onClick={() => setShowAnnouncement(false)} className="absolute right-4 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white hover:text-navy" aria-label="Close announcement">
            <FiX />
          </button>
        </div>
      )}
      <section className="home-hero relative overflow-hidden bg-navy text-white">
        <div className="home-hero-bg absolute inset-0 bg-navy">
{mediaAssets.company.heroSlides.map((image, index) => (
  <motion.img
    key={image}
    src={resolveMediaUrl(image)}
    alt={`Slide ${index + 1}`}
    className="absolute inset-0 h-full w-full object-cover"
    initial={false}
    animate={{
      opacity: currentSlide === index ? 1 : 0,
      scale: currentSlide === index ? 1 : 1.05,
    }}
    transition={{
      opacity: { duration: 1 },
      scale: { duration: 4 },
    }}
  />
))}
<div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/35 to-transparent" />
<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,154,46,0.08),transparent_60%)]" />
        </div>
        <div className="home-hero-content container relative flex min-h-[720px] items-center py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl w-full">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-gold">Established 2009 • Surat, Gujarat</p>
            <h1 className="font-display text-5xl font-normal leading-tight md:text-6xl"> 
            <span className="text-[#d4a53a]">V.Colors </span>
               Textile Manufacturer & Supplier From 
               <span className="text-[#d4a53a]"> Surat</span>
               </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">Manufacturer, exporter and supplier of jari net embroidery fabrics, embroidery fabrics, fancy fabrics, cotton velvet fabric, jacquard dress material fabric and readymade laces.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products" className="rounded-full bg-gold px-7 py-4 font-bold text-navy shadow-xl transition hover:bg-white">Shop Fabrics</Link>
              <Link to="/cart" className="rounded-full bg-white px-7 py-4 font-bold text-navy shadow-xl transition hover:bg-gold">View Cart</Link>
              <Link to="/inquiry" className="rounded-full border border-white/50 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white hover:text-navy">Bulk Inquiry</Link>
            </div>
            <div className="company-grid mt-8 grid gap-3 text-sm text-slate-200 sm:grid-cols-2 w-[60%]">
              <span>Proprietor: {company.proprietor}</span>
              <span>Legal Status: {company.legalStatus}</span>
              <span>Annual Turnover: {company.annualTurnover}</span>
              <span>GST: {company.gst}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatedSection className="section container !pt-16 !pb-0">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            [FiShoppingBag, 'Online Ordering', 'Add fabrics to cart and checkout with saved address.'],
            [FiTruck, 'COD Available', 'Cash on delivery option for easy purchase flow.'],
            [FiCreditCard, 'Stripe Ready', 'Online card checkout works after Stripe key setup.'],
            [FiMessageCircle, 'Inquiry Support', 'WhatsApp and form inquiry remain available for bulk buyers.'],
          ].map(([Icon, title, text]) => (
            <div key={title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
              <Icon className="text-4xl text-logo-blue" />
              <h3 className="mt-4 font-display text-xl font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section container !pt-16 !pb-0">
        <SectionHeader eyebrow="About V.Colors" title="Brocade, Viscose, Nylon Net, Poly Net, Garment And Jacquard Fabrics" text="V.Colors has a state-of-the-art infrastructural base in Surat with procurement, production, quality-control, warehousing, packaging, sales, marketing and logistics units." />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [FiShield, 'Quality Controlled', 'Fabrics are designed and woven as per quality standards for textile and garment industry use.'],
            [FiTruck, 'Timely Delivery', 'Sales and marketing representatives support on-time delivery across the nation.'],
            [FiGlobe, 'Wide Product Line', 'Jari net embroidery, embroidery fabrics, fancy fabrics, velvet fabrics, jacquard fabric and laces.'],
          ].map(([Icon, title, text]) => (
            <div key={title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/70">
              <Icon className="text-4xl text-logo-blue" />
              <h3 className="mt-5 font-display text-2xl font-bold text-navy">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section container !pt-16 !pb-0">
        <div className="mb-6 flex items-center gap-3 pl-1">
          <span
            className="h-10 w-10 shrink-0 opacity-80"
            style={{
              backgroundImage: 'linear-gradient(rgba(53,211,106,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(53,211,106,.45) 1px, transparent 1px)',
              backgroundSize: '8px 8px',
            }}
            aria-hidden
          />
          <h2 className="font-serif text-[1.65rem] italic tracking-wide text-[#2d3a2f] md:text-[2rem]">Browse By Videos</h2>
        </div>

        <div className="-mx-2 flex gap-4 overflow-x-auto px-2 pb-4 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden">
          {videoCards.map((video, index) => (
            <Link
              key={`${video.title}-${index}`}
              to="/products"
              className="group relative w-[220px] shrink-0 overflow-hidden rounded-xl bg-black shadow-sm transition hover:shadow-lg sm:w-[178px] md:w-[250px]"
            >
              <div className="relative aspect-[9/16] w-full">
                <video
                  src={resolveMediaUrl(video.video)}
                  poster={video.poster}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

                {index % 3 === 1 && (
                  <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 rounded-lg bg-black/55 px-3 py-2 text-center backdrop-blur-sm">
                    <p className="font-serif text-[11px] italic leading-snug text-white drop-shadow-md">
                      {video.title.length > 42 ? `${video.title.slice(0, 42)}...` : video.title}
                    </p>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/80 px-2 py-2">
                  <img src={resolveMediaUrl(video.poster)} alt="" className="h-9 w-9 shrink-0 rounded-md object-cover ring-1 ring-white/20" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[9px] font-semibold leading-tight text-white">{video.title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[9px] font-bold text-white">
                      <span>{video.price}</span>
                      <span className="text-[8px] opacity-90">INR</span>
                      <span aria-hidden>🇮🇳</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-1 pl-1 text-[10px] font-medium text-slate-400">Powered by V.Colors</p>
      </AnimatedSection>

      <AnimatedSection className="section container !pt-16 !pb-0">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <SectionHeader align="left" eyebrow="Our Categories" title="V.Colors Fabric Categories" text="Quickly explore the fabric categories V.Colors supplies for wholesale, retail and garment buyers." />
          <Link to="/products" className="rounded-full bg-logo-gradient px-5 py-3 text-sm font-bold text-white shadow-lg">View All</Link>
        </div>
        <div className="group relative h-[360px] overflow-hidden rounded-[28px]">
  <motion.img
    key={activeCategory?.name}
    src={resolveMediaUrl(activeCategory?.image)}
    alt={activeCategory?.name}
    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
    initial={{ opacity: 0, scale: 1.08 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
  />

  <div className="absolute inset-0 bg-gradient-to-r from-[#04163d]/95 via-[#04163d]/65 to-[#04163d]/10" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_35%)]" />

  <div className="absolute left-6 top-6">
    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
      <div className="h-2 w-2 rounded-full bg-gold" />

      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
        Auto changes every 2 seconds
      </span>
    </div>
  </div>

  <div className="absolute right-6 top-6 flex gap-2">
    {categoryCards.map((category, index) => (
      <button
        key={category.name}
        onClick={() => setCategorySlide(index)}
        className={`rounded-full transition-all duration-300 ${
          index === categorySlide
            ? "h-2.5 w-10 bg-gold"
            : "h-2.5 w-2.5 bg-white/50"
        }`}
      />
    ))}
  </div>

  <div className="absolute bottom-0 left-0 p-7 md:p-8">
    <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-navy shadow-xl">
      {activeCategory?.count} Products
    </span>

    <h3 className="mt-4 max-w-2xl font-display text-4xl font-black leading-[1.05] text-white md:text-5xl">
      {activeCategory?.name}
    </h3>

    <p className="mt-4 max-w-lg text-sm leading-7 text-white/75">
      Discover premium-quality fabrics designed for wholesalers,
      garment manufacturers, and retail buyers.
    </p>

    <Link
      to="/products"
      className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy transition-all duration-300 hover:scale-105 hover:bg-white"
    >
      Browse Collection

      <FiArrowRight />
    </Link>
  </div>
</div>
      </AnimatedSection>

      <AnimatedSection className="section bg-slate-50">
        <div className="container">
          <SectionHeader eyebrow="Shop Online" title="Add Fabrics To Cart Or Send Bulk Inquiry" text="Browse V.Colors fabric range, add products to cart, place online order or request latest wholesale quote." />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section container !py-0">
        <SectionHeader eyebrow="Business Value" title="How This Website Helps V.Colors Get More Buyers" text="The website works like a 24/7 digital showroom for wholesalers, retailers and garment manufacturers." />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [FiMessageCircle, 'More Direct Inquiries', 'Inquiry forms and WhatsApp CTA help buyers send requirements without calling first.'],
            [FiPackage, 'Product Catalog Online', 'Fabric categories, product details, MOQ and applications make buyer decision faster.'],
            [FiShield, 'Trust & Professional Image', 'Company facts, address, GST profile and infrastructure sections improve buyer confidence.'],
          ].map(([Icon, title, text]) => (
            <div key={title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-logo-gradient text-2xl text-white">
                <Icon />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-navy">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section container !pt-16 !pb-0">
        <SectionHeader eyebrow="Infrastructure Process" title="Procurement To Dispatch Workflow" text="The company infrastructure includes procurement, production, quality-control, warehousing, packaging, sales, marketing and transportation logistics." />
        <div className="grid gap-4 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step} className="rounded-3xl bg-gradient-to-br from-navy to-purple p-6 text-white shadow-xl">
              <span className="text-sm font-bold text-gold">0{index + 1}</span>
              <h3 className="mt-4 font-display text-xl font-bold">{step}</h3>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <section className="section bg-[radial-gradient(circle_at_top_left,rgba(237,30,143,.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(21,159,232,.14),transparent_38%),#ffffff]">
        <div className="container grid gap-6 md:grid-cols-4">
          {stats.map((item) => <Counter key={item.label} value={item.value} label={item.label} />)}
        </div>
      </section>

      <AnimatedSection className="section container !pt-0 !pb-16">
        <SectionHeader eyebrow="Buyer Segments" title="Serving Textile And Garment Buyers" />
        <div className="grid gap-4 md:grid-cols-6">
          {exportMarkets.map((market) => <div key={market} className="rounded-3xl border border-slate-200 bg-white p-6 text-center font-display text-xl font-bold text-navy shadow-sm">{market}</div>)}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section bg-navy text-white">
        <div className="container">
       <div className="mb-12 text-center">
  <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-[#d4a53a]">
    Company Strengths
  </p>

  <h2 className="text-4xl font-bold text-white md:text-5xl">
    Why Buyers Choose V.Colors
  </h2>

  <p className="mx-auto mt-4 max-w-3xl text-lg text-white/80">
    Reference-based strengths listed across public company profiles.
  </p>
</div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item._id || item.name} className="rounded-[2rem] border border-white/10 bg-white/10 p-7 backdrop-blur">
                <p className="leading-8 text-slate-100">“{item.quote}”</p>
                <h4 className="mt-6 font-bold text-gold">{item.name}</h4>
                <p className="text-sm text-slate-300">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <section className="section container ">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-purple to-navy p-10 text-white shadow-2xl md:p-14">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Have a fabric requirement?</h2>
          <p className="mt-4 max-w-2xl text-slate-200">Share fabric type, quantity, application and delivery location. V.Colors can support wholesale, retail and garment industry requirements.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-bold text-navy">
            Contact <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  )
}
