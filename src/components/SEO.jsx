import { useEffect } from 'react'

const siteUrl = 'https://vcolors.in'

export default function SEO({ title = 'V Colors', description = 'Premium textile manufacturer and exporter from Surat, Gujarat, India.', path = '/' }) {
  useEffect(() => {
    document.title = `${title} | V Colors`
    const tags = {
      description,
      'og:title': `${title} | V Colors`,
      'og:description': description,
      'og:type': 'website',
      'og:url': `${siteUrl}${path}`,
      'twitter:card': 'summary_large_image',
    }

    Object.entries(tags).forEach(([name, content]) => {
      const selector = name.startsWith('og:') ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let tag = document.head.querySelector(selector)
      if (!tag) {
        tag = document.createElement('meta')
        if (name.startsWith('og:')) tag.setAttribute('property', name)
        else tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    })
  }, [description, path, title])

  return (
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'V Colors',
        url: siteUrl,
        address: 'Surat, Gujarat, India',
        industry: 'Textile Manufacturing',
      })}
    </script>
  )
}
