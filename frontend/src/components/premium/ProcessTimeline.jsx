import { Link } from 'react-router-dom'
import { FiBox, FiCheckCircle, FiPackage, FiSettings, FiTruck } from 'react-icons/fi'
import FabricFlipStack from './FabricFlipStack'
import FabricMarquee from './FabricMarquee'
import Reveal3D from '../interactive/Reveal3D'
import Tilt3D from '../interactive/Tilt3D'
import { fabricShowcaseImages } from '../../data/fabricImages'

const steps = [
  { title: 'Procurement', desc: 'Premium raw materials from verified suppliers.', icon: FiBox },
  { title: 'Production', desc: 'Embroidery, weaving & finishing on modern machinery.', icon: FiSettings },
  { title: 'Quality Check', desc: 'Batch inspection for texture and consistency.', icon: FiCheckCircle },
  { title: 'Packaging', desc: 'Export-grade roll and polypack packaging.', icon: FiPackage },
  { title: 'Dispatch', desc: 'Pan-India logistics with timely delivery.', icon: FiTruck },
]

export default function ProcessTimeline() {
  return (
    <section className="site-section bg-white">
      <div className="premium-container">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-10">
          <div className="mb-2 flex flex-wrap items-end justify-between gap-4 lg:col-start-1 lg:row-start-1 lg:mb-0">
            <div>
              <p className="site-eyebrow">Manufacturing</p>
              <h2 className="site-heading">Manufacturing Process</h2>
              <p className="site-caption mt-3">Procurement to dispatch — export-ready B2B workflow.</p>
            </div>
            <Link to="/manufacturing" className="text-sm font-bold text-[#D4AF37] transition hover:text-[#0B1F3A]">Learn More →</Link>
          </div>

          <Reveal3D delay={0.08} className="mx-auto w-full max-w-[380px] lg:col-start-2 lg:row-span-2 lg:max-w-none lg:self-center">
            <FabricFlipStack />
          </Reveal3D>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-start-1 lg:row-start-2">
            {steps.map((step, index) => (
              <Reveal3D key={step.title} delay={index * 0.05}>
                <Tilt3D intensity={8}>
                  <div className="site-card text-center !p-5">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#0B1F3A] text-[#D4AF37]">
                      <step.icon className="text-lg" />
                    </div>
                    <h3 className="mt-4 font-display text-sm font-extrabold uppercase tracking-wide text-[#0B1F3A]">{step.title}</h3>
                    <p className="site-caption mt-2">{step.desc}</p>
                  </div>
                </Tilt3D>
              </Reveal3D>
            ))}
          </div>
        </div>
      </div>
      <FabricMarquee images={fabricShowcaseImages.slice(0, 6)} speed="fast" />
    </section>
  )
}
