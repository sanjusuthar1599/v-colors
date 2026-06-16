import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Counter({ value, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const total = 60
    const timer = window.setInterval(() => {
      frame += 1
      setCount(Math.round((value * frame) / total))
      if (frame === total) window.clearInterval(timer)
    }, 18)
    return () => window.clearInterval(timer)
  }, [inView, value])

  return (
    <motion.div ref={ref} whileHover={{ y: -6 }} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-200/70">
      <div className="font-display text-4xl font-bold text-logo-gradient md:text-5xl">{count}+</div>
      <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-slate-500">{label}</p>
    </motion.div>
  )
}
