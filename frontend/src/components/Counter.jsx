import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Counter({ value, label, suffix = '+', variant = 'default' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const total = 50
    const timer = window.setInterval(() => {
      frame += 1
      setCount(Math.round((value * frame) / total))
      if (frame === total) window.clearInterval(timer)
    }, 20)
    return () => window.clearInterval(timer)
  }, [inView, value])

  if (variant === 'premium') {
    return (
      <motion.div ref={ref} whileHover={{ y: -4 }} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm md:p-6">
        <div className="font-display text-3xl font-extrabold text-[#D4AF37] md:text-4xl">
          {count}{suffix}
        </div>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">{label}</p>
      </motion.div>
    )
  }

  return (
    <motion.div ref={ref} whileHover={{ y: -6 }} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-200/70">
      <div className="font-display text-4xl font-bold text-[#D4AF37] md:text-5xl">{count}{suffix}</div>
      <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-slate-500">{label}</p>
    </motion.div>
  )
}
