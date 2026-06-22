import * as THREE from 'three'

const NAVY = 0x0b1f3a
const GOLD = 0xd4af37
const GOLD_LIGHT = 0xf0d878

function isMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 768
}

function disposeObject(obj) {
  obj.traverse((child) => {
    if (child.geometry) child.geometry.dispose()
    if (child.material) {
      if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose())
      else child.material.dispose()
    }
  })
}

export function createFabricWaveScene({ scene, camera, mouse, isMobileDevice }) {
  const group = new THREE.Group()
  const segments = isMobileDevice ? 40 : 64
  const geometry = new THREE.PlaneGeometry(14, 10, segments, segments)
  const material = new THREE.MeshBasicMaterial({
    color: GOLD,
    wireframe: true,
    transparent: true,
    opacity: 0.22,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.x = -Math.PI * 0.38
  group.add(mesh)

  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({ color: GOLD_LIGHT, size: isMobileDevice ? 0.04 : 0.06, transparent: true, opacity: 0.5 }),
  )
  const count = isMobileDevice ? 80 : 160
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 16
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4
  }
  points.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  group.add(points)

  scene.add(group)
  camera.position.z = 8

  return {
    update(time) {
      const pos = geometry.attributes.position
      for (let i = 0; i < pos.count; i += 1) {
        const x = pos.getX(i)
        const y = pos.getY(i)
        pos.setZ(i, Math.sin(x * 0.55 + time * 0.0012) * 0.35 + Math.cos(y * 0.45 + time * 0.001) * 0.28)
      }
      pos.needsUpdate = true
      group.rotation.y = mouse.x * 0.35
      group.rotation.x = mouse.y * 0.12 - 0.2
      points.rotation.y = time * 0.00008
    },
    dispose() {
      scene.remove(group)
      disposeObject(group)
    },
  }
}

export function createSwatchGridScene({ scene, camera, mouse, isMobileDevice }) {
  const group = new THREE.Group()
  const colors = [0xd4af37, 0x0b1f3a, 0xc9a227, 0x1e3a5f, 0xe8c547, 0x2a4a6b]
  const total = isMobileDevice ? 10 : 18

  for (let i = 0; i < total; i += 1) {
    const w = 0.8 + Math.random() * 0.6
    const h = 1 + Math.random() * 0.8
    const geo = new THREE.PlaneGeometry(w, h)
    const mat = new THREE.MeshBasicMaterial({
      color: colors[i % colors.length],
      transparent: true,
      opacity: 0.14 + Math.random() * 0.12,
      side: THREE.DoubleSide,
    })
    const plane = new THREE.Mesh(geo, mat)
    plane.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6)
    plane.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * 0.5)
    plane.userData = {
      rx: (Math.random() - 0.5) * 0.004,
      ry: (Math.random() - 0.5) * 0.006,
      float: Math.random() * Math.PI * 2,
    }
    group.add(plane)
  }

  scene.add(group)
  camera.position.z = 10

  return {
    update(time) {
      group.children.forEach((plane, index) => {
        plane.rotation.x += plane.userData.rx
        plane.rotation.y += plane.userData.ry
        plane.position.y += Math.sin(time * 0.001 + plane.userData.float) * 0.002
        plane.position.x += mouse.x * 0.001 * (index % 3)
      })
      group.rotation.y = mouse.x * 0.25
    },
    dispose() {
      scene.remove(group)
      disposeObject(group)
    },
  }
}

export function createThreadHelixScene({ scene, camera, mouse }) {
  const group = new THREE.Group()
  const points = []
  for (let i = 0; i <= 200; i += 1) {
    const t = i / 20
    points.push(new THREE.Vector3(Math.cos(t) * 1.8, t * 0.12 - 2, Math.sin(t) * 1.8))
  }
  const curve = new THREE.CatmullRomCurve3(points)
  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 120, 0.04, 8, false),
    new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.55 }),
  )
  group.add(tube)

  const glow = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 120, 0.08, 8, false),
    new THREE.MeshBasicMaterial({ color: GOLD_LIGHT, transparent: true, opacity: 0.12 }),
  )
  group.add(glow)

  scene.add(group)
  camera.position.set(0, 0, 6)

  return {
    update(time) {
      group.rotation.y = time * 0.00035 + mouse.x * 0.6
      group.rotation.x = mouse.y * 0.35
    },
    dispose() {
      scene.remove(group)
      disposeObject(group)
    },
  }
}

export function createGoldenDustScene({ scene, camera, mouse, isMobileDevice }) {
  const count = isMobileDevice ? 120 : 280
  const positions = new Float32Array(count * 3)
  const baseY = new Float32Array(count)
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 18
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14
    baseY[i] = positions[i * 3 + 1]
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: GOLD, size: isMobileDevice ? 0.05 : 0.07, transparent: true, opacity: 0.45 }),
  )
  scene.add(points)
  camera.position.z = 9

  return {
    update(time) {
      points.rotation.y = time * 0.00012 + mouse.x * 0.3
      points.rotation.x = mouse.y * 0.15
      const pos = geometry.attributes.position
      for (let i = 0; i < count; i += 1) {
        pos.setY(i, baseY[i] + Math.sin(time * 0.001 + i) * 0.25)
      }
      pos.needsUpdate = true
    },
    dispose() {
      scene.remove(points)
      disposeObject(points)
    },
  }
}

export function createWeaveLoomScene({ scene, camera, mouse }) {
  const group = new THREE.Group()
  const material = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.35 })

  for (let i = 0; i < 14; i += 1) {
    const y = (i - 7) * 0.55
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-7, y, 0),
      new THREE.Vector3(7, y, 0),
    ])
    const line = new THREE.Line(geo, material.clone())
    line.userData.offset = i * 0.4
    group.add(line)
  }

  for (let i = 0; i < 18; i += 1) {
    const x = (i - 9) * 0.55
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, -4, 0),
      new THREE.Vector3(x, 4, 0),
    ])
    const line = new THREE.Line(geo, material.clone())
    line.userData.offset = i * 0.3
    group.add(line)
  }

  scene.add(group)
  camera.position.z = 8

  return {
    update(time) {
      group.children.forEach((line, index) => {
        const wave = Math.sin(time * 0.0015 + line.userData.offset) * 0.15
        line.position.z = wave
        if (index < 14) line.position.y = Math.sin(time * 0.001 + index) * 0.08
      })
      group.rotation.y = mouse.x * 0.2
      group.rotation.x = mouse.y * 0.1
    },
    dispose() {
      scene.remove(group)
      disposeObject(group)
    },
  }
}

export function createFrameCubesScene({ scene, camera, mouse, isMobileDevice }) {
  const group = new THREE.Group()
  const total = isMobileDevice ? 6 : 10

  for (let i = 0; i < total; i += 1) {
    const size = 0.8 + Math.random() * 0.9
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(size, size * 0.7, 0.08),
      new THREE.MeshBasicMaterial({ color: i % 2 ? GOLD : NAVY, wireframe: true, transparent: true, opacity: 0.35 }),
    )
    cube.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5)
    cube.userData = { rx: (Math.random() - 0.5) * 0.008, ry: (Math.random() - 0.5) * 0.01 }
    group.add(cube)
  }

  scene.add(group)
  camera.position.z = 10

  return {
    update(time) {
      group.children.forEach((cube) => {
        cube.rotation.x += cube.userData.rx
        cube.rotation.y += cube.userData.ry
        cube.position.y += Math.sin(time * 0.001 + cube.position.x) * 0.001
      })
      group.rotation.y = mouse.x * 0.35
    },
    dispose() {
      scene.remove(group)
      disposeObject(group)
    },
  }
}

export function createWireGlobeScene({ scene, camera, mouse }) {
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(2.8, 24, 24),
    new THREE.MeshBasicMaterial({ color: GOLD, wireframe: true, transparent: true, opacity: 0.28 }),
  )
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.6, 0.015, 8, 64),
    new THREE.MeshBasicMaterial({ color: GOLD_LIGHT, transparent: true, opacity: 0.35 }),
  )
  ring.rotation.x = Math.PI * 0.45
  scene.add(globe, ring)
  camera.position.z = 8

  return {
    update(time) {
      globe.rotation.y = time * 0.00025 + mouse.x * 0.5
      globe.rotation.x = mouse.y * 0.25
      ring.rotation.z = time * 0.0004
    },
    dispose() {
      scene.remove(globe, ring)
      disposeObject(globe)
      disposeObject(ring)
    },
  }
}

export function createInquiryPulseScene({ scene, camera, mouse }) {
  const group = new THREE.Group()
  const rings = []

  for (let i = 0; i < 4; i += 1) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.2 + i * 0.6, 0.025, 8, 48),
      new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.35 - i * 0.06 }),
    )
    ring.userData.phase = i * 1.2
    rings.push(ring)
    group.add(ring)
  }

  scene.add(group)
  camera.position.z = 8

  return {
    update(time) {
      rings.forEach((ring) => {
        const pulse = (Math.sin(time * 0.002 + ring.userData.phase) + 1) * 0.5
        ring.scale.setScalar(0.85 + pulse * 0.35)
        ring.material.opacity = 0.15 + pulse * 0.25
        ring.rotation.x = Math.PI * 0.35 + mouse.y * 0.3
        ring.rotation.y = mouse.x * 0.4
      })
    },
    dispose() {
      scene.remove(group)
      disposeObject(group)
    },
  }
}

export function createExportRoutesScene({ scene, camera, mouse }) {
  const group = new THREE.Group()
  const material = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.4 })

  const hubs = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(3, 1.5, -1),
    new THREE.Vector3(-3.5, -0.5, 1),
    new THREE.Vector3(2, -2, 2),
    new THREE.Vector3(-2, 2.5, -2),
  ]

  hubs.slice(1).forEach((point) => {
    const mid = point.clone().lerp(hubs[0], 0.5)
    mid.y += 1.5
    const curve = new THREE.QuadraticBezierCurve3(hubs[0], mid, point)
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(32)), material.clone())
    group.add(line)
  })

  hubs.forEach((point, index) => {
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(index === 0 ? 0.12 : 0.08, 8, 8),
      new THREE.MeshBasicMaterial({ color: index === 0 ? GOLD_LIGHT : GOLD, transparent: true, opacity: 0.7 }),
    )
    dot.position.copy(point)
    group.add(dot)
  })

  scene.add(group)
  camera.position.z = 9

  return {
    update(time) {
      group.rotation.y = time * 0.0002 + mouse.x * 0.35
      group.rotation.x = mouse.y * 0.2
    },
    dispose() {
      scene.remove(group)
      disposeObject(group)
    },
  }
}

export function createDocFloatScene({ scene, camera, mouse }) {
  const group = new THREE.Group()

  for (let i = 0; i < 5; i += 1) {
    const sheet = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 1.9),
      new THREE.MeshBasicMaterial({ color: NAVY, transparent: true, opacity: 0.08, side: THREE.DoubleSide }),
    )
    sheet.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4)
    sheet.rotation.set(Math.random() * 0.4, Math.random() * Math.PI, Math.random() * 0.2)
    sheet.userData = { phase: Math.random() * Math.PI * 2 }
    group.add(sheet)
  }

  scene.add(group)
  camera.position.z = 9

  return {
    update(time) {
      group.children.forEach((sheet) => {
        sheet.rotation.z = Math.sin(time * 0.0008 + sheet.userData.phase) * 0.15
        sheet.position.y += Math.sin(time * 0.001 + sheet.userData.phase) * 0.002
      })
      group.rotation.y = mouse.x * 0.25
    },
    dispose() {
      scene.remove(group)
      disposeObject(group)
    },
  }
}

export const sceneFactories = {
  fabricWave: createFabricWaveScene,
  swatchGrid: createSwatchGridScene,
  threadHelix: createThreadHelixScene,
  goldenDust: createGoldenDustScene,
  weaveLoom: createWeaveLoomScene,
  frameCubes: createFrameCubesScene,
  wireGlobe: createWireGlobeScene,
  inquiryPulse: createInquiryPulseScene,
  exportRoutes: createExportRoutesScene,
  docFloat: createDocFloatScene,
}

export { isMobile }
