import React from 'react'
import { motion } from 'motion/react'

export function Card({
  children,
  className = '',
  hoverEffect = false,
  glow = false,
  glowColor = 'cyan',
  variant = 'default',
  selected = false,
  onClick,
  ...props
}) {
  const glowStyles = {
    cyan: 'hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(103,232,249,0.18)]',
    violet: 'hover:border-violet-400/40 hover:shadow-[0_0_30px_rgba(167,139,250,0.18)]',
    emerald: 'hover:border-emerald-400/40 hover:shadow-[0_0_30px_rgba(52,211,153,0.18)]',
  }

  const selectedStyles = {
    cyan: 'border-cyan-400/50 shadow-[0_0_30px_rgba(103,232,249,0.25)] ring-1 ring-cyan-400/30 bg-[#0B1220]/95',
    violet: 'border-violet-400/50 shadow-[0_0_30px_rgba(167,139,250,0.25)] ring-1 ring-violet-400/30 bg-[#0B1220]/95',
    emerald: 'border-emerald-400/50 shadow-[0_0_30px_rgba(52,211,153,0.25)] ring-1 ring-emerald-400/30 bg-[#0B1220]/95',
  }

  const variantStyles = {
    default: 'bg-[#0B1220]/75 backdrop-blur-xl border border-white/[0.08]',
    elevated: 'bg-[#111A2B]/85 backdrop-blur-2xl border border-white/[0.12] shadow-xl',
    subtle: 'bg-white/[0.03] backdrop-blur-lg border border-white/[0.06]',
  }

  const Component = hoverEffect ? motion.div : 'div'
  const motionProps = hoverEffect
    ? {
        whileHover: { y: -3 },
        transition: { duration: 0.2, ease: 'easeOut' },
      }
    : {}

  return (
    <Component
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
        variantStyles[variant] || variantStyles.default
      } ${selected ? selectedStyles[glowColor] || selectedStyles.cyan : ''} ${
        hoverEffect && glow && !selected ? glowStyles[glowColor] : ''
      } ${className}`}
      {...motionProps}
      {...props}
    >
      {/* Subtle top rim specular highlight */}
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
        selected ? 'via-cyan-400/60' : 'via-white/20'
      } to-transparent pointer-events-none`} />
      {children}
    </Component>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-5 pb-3 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`font-heading text-lg font-bold text-slate-100 tracking-tight ${className}`}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className = '' }) {
  return <p className={`text-xs text-slate-400 mt-1 leading-relaxed ${className}`}>{children}</p>
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-5 pt-0 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`p-5 pt-3 border-t border-white/[0.06] bg-black/20 flex items-center ${className}`}>
      {children}
    </div>
  )
}

export default Card
