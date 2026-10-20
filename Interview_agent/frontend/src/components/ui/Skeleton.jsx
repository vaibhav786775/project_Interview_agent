import React from 'react'

export function Skeleton({ className = '', variant = 'rectangular', ...props }) {
  const variantStyles = {
    rectangular: 'rounded-xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4 w-full',
  }

  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-slate-800/60 via-slate-700/30 to-slate-800/60 border border-white/[0.04] ${
        variantStyles[variant] || variantStyles.rectangular
      } ${className}`}
      {...props}
    />
  )
}

export default Skeleton
