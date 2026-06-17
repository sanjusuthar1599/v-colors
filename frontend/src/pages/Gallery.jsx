import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import CompanyImage from '../components/CompanyImage'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { mediaAssets } from '../data/mediaAssets'
import { useGallery } from '../hooks/useGallery'

export default function Gallery() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const { items: galleryImages, loading } = useGallery()
  const categories = ['All', ...new Set(galleryImages.map((item) => item.category))]
  const images = active === 'All' ? galleryImages : galleryImages.filter((item) => item.category === active)

  return (
    <>
      <SEO title="Gallery" description="V.Colors factory, product, machinery and team gallery." path="/gallery" />
      <section
  className="bg-hero-section relative min-h-[70vh] flex items-center overflow-hidden"
  style={{
    backgroundImage: `url('${mediaAssets.company.galleryHero}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/55"></div>

  <div className="container relative z-10">
    <p className="eyebrow text-white">Gallery</p>

    <h1 className="font-display text-5xl font-normal leading-tight md:text-6xl w-2xl text-white">
      <span className="text-gold">V.Colors</span> Product, Factory And Infrastructure
      <span className="text-gold"> Gallery</span>
    </h1>
  </div>
</section>
      <section className="section container !py-16">
        <SectionHeader title="Company Gallery" text="A visual look at textile products, fabric textures, machinery, infrastructure and team-oriented business presentation." />
        <div className="mb-8 flex flex-wrap justify-center gap-3">{categories.map((category) => <button key={category} onClick={() => setActive(category)} className={`rounded-full px-5 py-3 font-bold ${active === category ? 'bg-logo-gradient text-white shadow-lg' : 'bg-slate-100 text-slate-700'}`}>{category}</button>)}</div>
        <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
          {loading && <p className="text-center text-slate-500">Loading gallery…</p>}
          {!loading && images.map((item, index) => <button key={item.id || `${item.image}-${index}`} onClick={() => setLightbox(item.image)} className="group relative mb-6 block overflow-hidden rounded-[2rem] shadow-xl shadow-slate-200/70"><CompanyImage src={item.image} alt={`V Colors ${item.category}`} className="w-full object-cover transition duration-700 group-hover:scale-110" /><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-5 text-left font-bold text-white">{item.category}</span></button>)}
        </div>
      </section>
      {lightbox && <div className="fixed inset-0 z-50 grid place-items-center bg-navy/80 p-4 backdrop-blur"><button onClick={() => setLightbox(null)} className="absolute right-6 top-6 rounded-full bg-white p-3 text-navy"><FiX /></button><img src={lightbox} alt="Gallery" className="max-h-[86vh] rounded-[2rem] object-contain" /></div>}
    </>
  )
}
