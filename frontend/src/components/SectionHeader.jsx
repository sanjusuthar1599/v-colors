export default function SectionHeader({ eyebrow, title, text, align = 'center' }) {
  const centered = align === 'center'
  return (
    <div className={`mb-10 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-logo-blue">{eyebrow}</p>}
      <h2 className="font-display text-3xl leading-tight tracking-tight font-normal text-black md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-8 text-black/80 md:text-lg">{text}</p>}
    </div>
  )
} 
