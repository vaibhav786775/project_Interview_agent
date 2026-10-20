import React from 'react'

export function Badge({
  children,
  variant = 'cyan',
  size = 'md',
  dot = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center font-mono font-medium rounded-full tracking-wide select-none transition-colors'

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  }

  const variantStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/25 shadow-[0_0_12px_rgba(103,232,249,0.15)]',
    violet: 'bg-violet-500/10 text-violet-300 border border-violet-400/25 shadow-[0_0_12px_rgba(167,139,250,0.15)]',
    emerald: 'bg-emerald-500/10 text-emerald-300 border border-emerald-400/25 shadow-[0_0_12px_rgba(52,211,153,0.15)]',
    rose: 'bg-rose-500/10 text-rose-300 border border-rose-400/25 shadow-[0_0_12px_rgba(251,113,133,0.15)]',
    amber: 'bg-amber-500/10 text-amber-300 border border-amber-400/25 shadow-[0_0_12px_rgba(251,191,36,0.15)]',
    neutral: 'bg-slate-800/80 text-slate-300 border border-white/10',
    outline: 'bg-transparent text-slate-300 border border-white/15',
  }

  const dotColors = {
    cyan: 'bg-cyan-400 shadow-[0_0_8px_#67E8F9]',
    violet: 'bg-violet-400 shadow-[0_0_8px_#A78BFA]',
    emerald: 'bg-emerald-400 shadow-[0_0_8px_#34D399]',
    rose: 'bg-rose-400 shadow-[0_0_8px_#FB7185]',
    amber: 'bg-amber-400 shadow-[0_0_8px_#FBBF24]',
    neutral: 'bg-slate-400',
    outline: 'bg-cyan-400',
  }

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.cyan
      } ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            dotColors[variant] || dotColors.cyan
          } animate-pulse`}
        />
      )}
      {Icon && <span className="shrink-0">{typeof Icon === 'function' ? <Icon size={12} /> : Icon}</span>}
      <span>{children}</span>
    </span>
  )
}

export default Badge
