import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 36, rotateX: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Reveal3D({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 900 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
