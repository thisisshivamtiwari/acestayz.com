import React from 'react'
import { motion, Variants } from 'framer-motion'

export const brandBlue = '#4B9CD3'

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export function AnimatedInView({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Section({ title, children, subtitle, id }: { title?: string; subtitle?: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold" style={{ color: brandBlue }}>{title}</h2>
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  )
}

export function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        'backdrop-blur-md bg-white/30 border border-white/50 shadow-lg rounded-2xl ' +
        'transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl ' +
        'dark:bg-white/20 ' + (className ?? '')
      }
      style={{ outline: '1px solid rgba(255,255,255,0.2)' }}
    >
      {children}
    </div>
  )
}

export function PrimaryButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={`rounded-xl px-4 py-2 font-semibold text-white hover:opacity-95 transition shadow-md ${className ?? ''}`}
      style={{ backgroundColor: brandBlue }}
    >
      {children}
    </button>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: '#E6F1FA', color: brandBlue }}>{children}</span>
  )
}

export default {}


