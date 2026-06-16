import { useState } from 'react'

export default function CompanyImage({ src, alt, className = '', fallbackClassName = '' }) {
  const [missing, setMissing] = useState(false)

  if (!src || missing) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-logo-blue/10 p-6 text-center text-navy shadow-inner ${fallbackClassName || className}`}>
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,rgba(212,175,55,.35)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div>
          <p className="relative mx-auto grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200"><img src="/vcolors-logo.png" alt="" className="h-12 w-12 object-contain" /></p>
          <p className="relative mt-4 font-display text-lg font-bold">V.Colors Product Image</p>
          <p className="relative mt-2 text-sm text-slate-600">{alt}</p>
          <p className="relative mt-3 break-all text-xs font-semibold text-logo-blue">{src}</p>
        </div>
      </div>
    )
  }

  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setMissing(true)} />
}
