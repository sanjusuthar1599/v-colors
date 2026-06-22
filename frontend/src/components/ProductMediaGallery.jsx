import { useEffect, useMemo, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiPlay, FiX, FiZoomIn } from 'react-icons/fi'
import CompanyImage from './CompanyImage'
import { resolveMediaUrl } from '../utils/resolveMediaUrl'

export default function ProductMediaGallery({ product }) {
  const videoRef = useRef(null)
  const thumbStripRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const mediaItems = useMemo(() => {
    const items = []
    if (product.video) {
      items.push({ type: 'video', src: product.video, poster: product.image, label: 'Video' })
    }
    if (product.image) {
      items.push({ type: 'image', src: product.image, label: 'Fabric' })
    }
    ;(product.images || []).forEach((src, index) => {
      if (src && src !== product.image) {
        items.push({ type: 'image', src, label: `View ${index + 1}` })
      }
    })
    return items.length ? items : [{ type: 'image', src: product.image, label: 'Fabric' }]
  }, [product])

  const active = mediaItems[activeIndex] || mediaItems[0]

  useEffect(() => {
    if (active?.type !== 'video') return
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const playVideo = () => {
      video.play().catch(() => {})
    }

    playVideo()
    video.addEventListener('loadeddata', playVideo)
    return () => video.removeEventListener('loadeddata', playVideo)
  }, [active, activeIndex])

  const scrollThumbs = (direction) => {
    const strip = thumbStripRef.current
    if (!strip) return
    strip.scrollBy({ left: direction * 120, behavior: 'smooth' })
  }

  const mediaClass = 'aspect-[4/5] max-h-[520px] w-full object-cover'

  return (
    <>
      <div className="w-full">
        <div className="group relative overflow-hidden rounded-sm bg-slate-50 ring-1 ring-slate-200">
          {active.type === 'video' ? (
            <video
              ref={videoRef}
              key={active.src}
              src={resolveMediaUrl(active.src)}
              poster={resolveMediaUrl(active.poster)}
              className={`${mediaClass} bg-[#0B1F3A]`}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="auto"
            />
          ) : (
            <CompanyImage src={active.src} alt={product.name} className={mediaClass} />
          )}

          {active.type === 'image' && (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#0B1F3A] opacity-0 shadow-md transition hover:bg-white group-hover:opacity-100"
              aria-label="Zoom image"
            >
              <FiZoomIn className="text-lg" />
            </button>
          )}
        </div>

        {mediaItems.length > 1 && (
          <div className="relative mt-4">
            {mediaItems.length > 5 && (
              <button
                type="button"
                onClick={() => scrollThumbs(-1)}
                className="absolute -left-3 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#D4AF37] hover:text-[#0B1F3A]"
                aria-label="Previous thumbnails"
              >
                <FiChevronLeft />
              </button>
            )}

            <div
              ref={thumbStripRef}
              className="flex gap-2 overflow-x-auto scroll-smooth px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {mediaItems.map((item, index) => (
                <button
                  key={`${item.type}-${item.src}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-sm ring-2 transition ${
                    activeIndex === index ? 'ring-[#D4AF37]' : 'ring-transparent hover:ring-[#D4AF37]/40'
                  }`}
                >
                  {item.type === 'video' ? (
                    <>
                      <CompanyImage src={item.poster || product.image} alt="" className="h-full w-full object-cover" />
                      <span className="absolute inset-0 grid place-items-center bg-[#0B1F3A]/30">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/95 text-[#0B1F3A]">
                          <FiPlay className="ml-0.5 text-xs" />
                        </span>
                      </span>
                    </>
                  ) : (
                    <CompanyImage src={item.src} alt="" className="h-full w-full object-cover" />
                  )}
                </button>
              ))}
            </div>

            {mediaItems.length > 5 && (
              <button
                type="button"
                onClick={() => scrollThumbs(1)}
                className="absolute -right-3 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#D4AF37] hover:text-[#0B1F3A]"
                aria-label="Next thumbnails"
              >
                <FiChevronRight />
              </button>
            )}
          </div>
        )}
      </div>

      {lightboxOpen && active.type === 'image' && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close zoom"
          >
            <FiX className="text-xl" />
          </button>
          <div onClick={(event) => event.stopPropagation()}>
            <CompanyImage
              src={active.src}
              alt={product.name}
              className="max-h-[90vh] max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
