import { FiGlobe, FiScissors, FiShoppingBag, FiStar, FiUsers } from 'react-icons/fi'
import Reveal3D from '../interactive/Reveal3D'
import Tilt3D from '../interactive/Tilt3D'
import { fabricShowcaseImages } from '../../data/fabricImages'
import { resolveMediaUrl } from '../../utils/resolveMediaUrl'

const industries = [
  { title: 'Garment Industry', desc: 'Bulk supply for ethnic & ready-to-wear manufacturers.', icon: FiScissors, image: fabricShowcaseImages[3].src },
  { title: 'Fashion Brands', desc: 'Premium textures for designer collections.', icon: FiStar, image: fabricShowcaseImages[5].src },
  { title: 'Wholesalers', desc: 'Wide range with competitive MOQ.', icon: FiShoppingBag, image: fabricShowcaseImages[4].src },
  { title: 'Retailers', desc: 'Curated rolls for retail counters.', icon: FiUsers, image: fabricShowcaseImages[6].src },
  { title: 'Export Houses', desc: 'Export-quality finishing standards.', icon: FiGlobe, image: fabricShowcaseImages[0].src },
  { title: 'Boutiques', desc: 'Fancy & embroidery for boutique buyers.', icon: FiStar, image: fabricShowcaseImages[7].src },
]

export default function IndustriesGrid() {
  return (
    <section className="site-section bg-[#FAFAFA]">
      <div className="premium-container">
        <Reveal3D className="mx-auto max-w-2xl text-center">
          <p className="site-eyebrow">Industries</p>
          <h2 className="site-heading">Industries We Serve</h2>
          <p className="site-caption mt-3">Trusted by B2B textile buyers across India.</p>
        </Reveal3D>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((item, index) => (
            <Reveal3D key={item.title} delay={index * 0.05}>
              <Tilt3D intensity={9}>
                <article className="fabric-industry-card group overflow-hidden rounded-2xl">
                  <img src={resolveMediaUrl(item.image)} alt="" className="fabric-industry-card-bg" />
                  <div className="fabric-industry-card-overlay" />
                  <div className="relative p-6">
                    <item.icon className="text-2xl text-[#D4AF37]" />
                    <h3 className="mt-4 font-display text-lg font-extrabold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/75">{item.desc}</p>
                  </div>
                </article>
              </Tilt3D>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  )
}
