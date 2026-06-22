import { useEffect, useState } from 'react'
import { resolveMediaUrl } from '../../utils/resolveMediaUrl'

export default function FabricBackdrop({
  images,
  interval = 5000,
  overlay = 'dark',
  className = '',
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return undefined
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className={`fabric-backdrop ${className}`} aria-hidden="true">
      {images.map((item, slideIndex) => (
        <div
          key={`${item.label}-${slideIndex}`}
          className={`fabric-backdrop-slide ${index === slideIndex ? 'fabric-backdrop-slide-active' : ''}`}
        >
          <img src={resolveMediaUrl(item.src)} alt="" className="fabric-backdrop-image" />
        </div>
      ))}
      <div className={overlay === 'light' ? 'fabric-backdrop-overlay-light' : 'fabric-backdrop-overlay-dark'} />
    </div>
  )
}
