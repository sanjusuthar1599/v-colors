import { useEffect, useState } from 'react'
import { FiCheckCircle, FiInfo, FiShoppingBag, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const icons = {
  success: FiCheckCircle,
  cart: FiShoppingBag,
  info: FiInfo,
}

export default function ToastHost() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const onToast = (event) => {
      const id = Date.now() + Math.random()
      const toast = { id, type: 'success', ...event.detail }
      setToasts((current) => [toast, ...current].slice(0, 4))
      setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3200)
    }

    window.addEventListener('vcolors:toast', onToast)
    return () => window.removeEventListener('vcolors:toast', onToast)
  }, [])

  return (
    <div className="fixed right-4 top-24 z-[9999] grid w-[min(380px,calc(100vw-2rem))] gap-3">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || FiCheckCircle
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/95 p-4 shadow-2xl shadow-slate-300/70 backdrop-blur-xl"
            >
              <div className="flex gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-logo-gradient text-xl text-white shadow-lg">
                  <Icon />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-sm font-black text-navy">{toast.title}</h3>
                  {toast.message && <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">{toast.message}</p>}
                </div>
                <button onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200">
                  <FiX />
                </button>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
                <motion.div initial={{ width: '100%' }} animate={{ width: '0%' }} transition={{ duration: 3.2, ease: 'linear' }} className="h-full bg-logo-gradient" />
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
