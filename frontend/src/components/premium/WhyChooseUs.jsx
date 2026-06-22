import { FiAward, FiLayers, FiPackage, FiSettings, FiShield, FiTruck } from 'react-icons/fi'
import Counter from '../Counter'
import FabricBackdrop from './FabricBackdrop'
import FabricMarquee from './FabricMarquee'
import Reveal3D from '../interactive/Reveal3D'
import Tilt3D from '../interactive/Tilt3D'
import { fabricShowcaseImages } from '../../data/fabricImages'
import { resolveMediaUrl } from '../../utils/resolveMediaUrl'

const stats = [
  { value: 15, label: 'Years Experience', suffix: '+' },
  { value: 5000, label: 'Designs', suffix: '+' },
  { value: 1000, label: 'Buyers', suffix: '+' },
  { value: 100, label: 'Quality Check', suffix: '%' },
]

const strengths = [
  { icon: FiAward, title: 'Export Quality', desc: 'Export-grade fabric finishing for premium buyers.', image: fabricShowcaseImages[3].src },
  { icon: FiTruck, title: 'Fast Dispatch', desc: 'Structured logistics for pan-India delivery.', image: fabricShowcaseImages[4].src },
  { icon: FiSettings, title: 'Customization', desc: 'Buyer-specific designs and bulk coordination.', image: fabricShowcaseImages[5].src },
  { icon: FiPackage, title: 'Bulk Capacity', desc: 'Production setup for wholesale volume.', image: fabricShowcaseImages[6].src },
  { icon: FiLayers, title: 'MOQ Flexibility', desc: 'Flexible minimum order for growing buyers.', image: fabricShowcaseImages[7].src },
  { icon: FiShield, title: 'Fabric Expertise', desc: '15+ years of Surat textile experience.', image: fabricShowcaseImages[8].src },
]

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden text-white">
      <FabricBackdrop images={fabricShowcaseImages.slice(0, 4)} interval={4500} overlay="dark" />

      <div className="site-section relative z-10">
        <div className="premium-container">
          <Reveal3D className="mx-auto max-w-2xl text-center">
            <p className="site-eyebrow !text-[#D4AF37]">Why V.Colors</p>
            <h2 className="site-heading-light">Trusted Surat Manufacturer</h2>
            <p className="site-caption-light mx-auto mt-4 max-w-lg">
              Factory-direct wholesale supply for garment makers, wholesalers and boutique buyers.
            </p>
          </Reveal3D>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((item) => (
              <Counter key={item.label} value={item.value} label={item.label} suffix={item.suffix} variant="premium" />
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((item, index) => (
              <Reveal3D key={item.title} delay={index * 0.05}>
                <Tilt3D intensity={10}>
                  <div className="fabric-feature-card group overflow-hidden rounded-2xl border border-white/12">
                    <div className="fabric-feature-card-media">
                      <img src={resolveMediaUrl(item.image)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/95 via-[#0B1F3A]/55 to-[#0B1F3A]/20" />
                    </div>
                    <div className="relative p-5">
                      <item.icon className="text-2xl text-[#D4AF37]" />
                      <h3 className="mt-3 font-display text-base font-extrabold">{item.title}</h3>
                      <p className="site-caption-light mt-2 !text-white/70">{item.desc}</p>
                    </div>
                  </div>
                </Tilt3D>
              </Reveal3D>
            ))}
          </div>
        </div>
      </div>   
    </section>
  )
}
