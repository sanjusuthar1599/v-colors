import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export default function PageBanner({ eyebrow, title, description, image, video, poster, children, cta }) {
  return (
    <section className="page-banner relative overflow-hidden bg-[#0B1F3A]">
      {video ? (
        <>
          <video autoPlay muted loop playsInline poster={poster || image} className="absolute inset-0 h-full w-full object-cover">
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/94 via-[#0B1F3A]/80 to-[#0B1F3A]/55" />
        </>
      ) : image ? (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/93 via-[#0B1F3A]/78 to-[#0B1F3A]/50" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] to-[#152a4a]" />
      )}

      <div className="premium-container relative z-10 flex w-full items-end py-16 md:min-h-[420px] md:items-center md:py-20">
        <div className="max-w-3xl">
          {eyebrow && <p className="site-eyebrow !text-[#D4AF37]">{eyebrow}</p>}
          <h1 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight text-white">{title}</h1>
          {description && <p className="site-caption-light mt-4 max-w-2xl">{description}</p>}
          {cta && (
            <Link to={cta.href} className="btn-gold mt-8 inline-flex">
              {cta.label} <FiArrowRight />
            </Link>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
