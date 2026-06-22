import { resolveMediaUrl } from '../../utils/resolveMediaUrl'

export default function FabricMarquee({ images, speed = 'slow' }) {
  const track = [...images, ...images]

  return (
    <div className="fabric-marquee" aria-hidden="true">
      <div className={`fabric-marquee-track ${speed === 'fast' ? 'fabric-marquee-fast' : ''}`}>
        {track.map((item, index) => (
          <div key={`${item.label}-${index}`} className="fabric-marquee-item">
            <img src={resolveMediaUrl(item.src)} alt="" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
