export function getSceneKey(pathname) {
  if (pathname === '/') return 'fabricWave'
  if (pathname.startsWith('/products/')) return 'threadHelix'
  if (pathname === '/products') return 'swatchGrid'
  if (pathname === '/about') return 'goldenDust'
  if (pathname === '/manufacturing') return 'weaveLoom'
  if (pathname === '/gallery') return 'frameCubes'
  if (pathname === '/contact') return 'wireGlobe'
  if (pathname === '/inquiry') return 'inquiryPulse'
  if (pathname === '/export-market') return 'exportRoutes'
  if (pathname.includes('policy') || pathname === '/terms') return 'docFloat'
  return 'goldenDust'
}

export const sceneLabels = {
  fabricWave: 'Flowing Fabric',
  swatchGrid: 'Fabric Swatches',
  threadHelix: 'Golden Thread',
  goldenDust: 'Golden Particles',
  weaveLoom: 'Weaving Loom',
  frameCubes: 'Gallery Frames',
  wireGlobe: 'Global Reach',
  inquiryPulse: 'Inquiry Pulse',
  exportRoutes: 'Export Routes',
  docFloat: 'Documents',
}
