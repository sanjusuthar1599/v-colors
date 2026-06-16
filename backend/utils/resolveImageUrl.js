const directImagePattern = /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i

export async function resolveImageUrl(imageUrl) {
  if (!imageUrl) return ''
  if (directImagePattern.test(imageUrl) || imageUrl.includes('images.unsplash.com') || imageUrl.includes('5.imimg.com')) {
    return imageUrl
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })
    const html = await response.text()
    const patterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
      /"(https?:\/\/[^"]+\.(?:jpg|jpeg|png|webp)(?:\?[^"]*)?)"/i,
      /(https?:\/\/5\.imimg\.com\/[^"'\s]+?\.(?:jpg|jpeg|png|webp))/i,
    ]

    for (const pattern of patterns) {
      const match = html.match(pattern)
      if (match?.[1]) return match[1].replaceAll('\\/', '/')
    }
  } catch {
    return imageUrl
  }

  return imageUrl
}
