import * as THREE from 'three'
import { sceneFactories, isMobile } from './scenes'

export function mountScene(container, sceneKey) {
  const mobile = isMobile()
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: 'high-performance' })
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2))
  container.appendChild(renderer.domElement)

  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
  let running = true
  let rafId = 0
  let sceneImpl = null

  const factory = sceneFactories[sceneKey] || sceneFactories.goldenDust
  sceneImpl = factory({ scene, camera, mouse, isMobileDevice: mobile })

  const resize = () => {
    const { clientWidth, clientHeight } = container
    if (!clientWidth || !clientHeight) return
    camera.aspect = clientWidth / clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(clientWidth, clientHeight, false)
  }

  const onMouseMove = (event) => {
    mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 2
    mouse.targetY = (event.clientY / window.innerHeight - 0.5) * 2
  }

  const onVisibility = () => {
    running = document.visibilityState === 'visible'
    if (running) animate()
  }

  const animate = (time = 0) => {
    if (!running) return
    mouse.x += (mouse.targetX - mouse.x) * 0.06
    mouse.y += (mouse.targetY - mouse.y) * 0.06
    sceneImpl?.update(time)
    renderer.render(scene, camera)
    rafId = requestAnimationFrame(animate)
  }

  resize()
  animate()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('visibilitychange', onVisibility)

  return () => {
    running = false
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('visibilitychange', onVisibility)
    sceneImpl?.dispose()
    renderer.dispose()
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement)
    }
  }
}
