import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { getSceneKey } from './routeSceneMap'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function AmbientCanvas3D() {
  const containerRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    if (location.pathname === '/') return undefined
    const container = containerRef.current
    if (!container) return undefined

    const sceneKey = getSceneKey(location.pathname)
    let dispose = () => {}

    import('./sceneEngine').then(({ mountScene }) => {
      if (containerRef.current !== container) return
      dispose = mountScene(container, sceneKey)
    })

    return () => dispose()
  }, [location.pathname])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.34] motion-reduce:hidden"
      aria-hidden="true"
    />
  )
}
