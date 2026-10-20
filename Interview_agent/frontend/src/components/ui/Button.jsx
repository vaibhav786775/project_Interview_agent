import React from 'react'
import { motion } from 'motion/react'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none tracking-tight'

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  }

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400 text-slate-950 font-semibold shadow-[0_0_24px_rgba(103,232,249,0.35)] hover:shadow-[0_0_32px_rgba(103,232,249,0.55)] border border-cyan-200/40',
    secondary:
      'bg-slate-900/80 hover:bg-slate-800 text-slate-100 border border-white/10 hover:border-cyan-400/40 shadow-sm hover:shadow-[0_0_20px_rgba(103,232,249,0.15)]',
    outline:
      'bg-transparent border border-cyan-400/35 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(103,232,249,0.1)]',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent',
    danger:
      'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 hover:border-rose-500/50',
    glass:
      'bg-white/[0.05] backdrop-blur-xl text-white border border-white/15 hover:bg-white/[0.1] hover:border-white/25 shadow-lg',
  }

  return (
    <motion.button
      type={type}
      whileHover={!disabled && !loading ? { scale: 1.02, y: -1 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.98, y: 0 } : undefined}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0" />
      ) : Icon && iconPosition === 'left' ? (
        <span className="shrink-0">{typeof Icon === 'function' ? <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} /> : Icon}</span>
      ) : null}

      <span>{children}</span>

      {!loading && Icon && iconPosition === 'right' ? (
        <span className="shrink-0">{typeof Icon === 'function' ? <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} /> : Icon}</span>
      ) : null}
    </motion.button>
  )
}

export default Button
