import { useEffect, useState } from 'react'
import { fabricShowcaseImages } from '../../data/fabricImages'
import { resolveMediaUrl } from '../../utils/resolveMediaUrl'

const flipCards = [
  { position: 'fabric-flip-card-1', front: fabricShowcaseImages[0], back: fabricShowcaseImages[4], delay: 0 },
  { position: 'fabric-flip-card-2', front: fabricShowcaseImages[1], back: fabricShowcaseImages[5], delay: 1100 },
  { position: 'fabric-flip-card-3', front: fabricShowcaseImages[2], back: fabricShowcaseImages[6], delay: 2200 },
  { position: 'fabric-flip-card-4', front: fabricShowcaseImages[3], back: fabricShowcaseImages[7], delay: 3300 },
]

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function FlipCard({ front, back, position, delay }) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    let intervalId
    const timeoutId = setTimeout(() => {
      setFlipped((current) => !current)
      intervalId = setInterval(() => {
        setFlipped((current) => !current)
      }, 4200)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [delay])

  return (
    <div className={`fabric-flip-card ${position}`}>
      <div className={`fabric-flip-inner ${flipped ? 'is-flipped' : ''}`}>
        <div className="fabric-flip-face fabric-flip-front">
          <img src={resolveMediaUrl(front.src)} alt={front.label} />
          <span>{front.label}</span>
          <div className="fabric-flip-shine" />
        </div>
        <div className="fabric-flip-face fabric-flip-back">
          <img src={resolveMediaUrl(back.src)} alt={back.label} />
          <span>{back.label}</span>
          <div className="fabric-flip-shine" />
        </div>
      </div>
      <div className="fabric-flip-glow" aria-hidden="true" />
    </div>
  )
}

export default function FabricFlipStack() {
  return (
    <div className="fabric-flip-stack" aria-label="Fabric showcase">
      {flipCards.map((card) => (
        <FlipCard
          key={card.position}
          front={card.front}
          back={card.back}
          position={card.position}
          delay={card.delay}
        />
      ))}
    </div>
  )
}
