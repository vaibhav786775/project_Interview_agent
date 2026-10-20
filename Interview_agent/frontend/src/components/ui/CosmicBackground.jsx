import React from 'react'

/**
 * CosmicBackground
 * Lightweight, GPU-accelerated atmospheric background with subtle starfield,
 * drifting nebula gradients, and restrained cyan/violet ambient lighting.
 * Completely pointer-events-none and layout-stable.
 */
export function CosmicBackground({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none ${className}`}
    >
      {/* 1. Base space grid */}
      <div className="absolute inset-0 bg-space-grid opacity-20" />

      {/* 2. Twinkling starfield layer */}
      <div className="absolute inset-0 bg-starfield animate-twinkle opacity-70" />

      {/* 3. Slowly drifting Cyan Nebula */}
      <div className="absolute top-[10%] -left-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-cyan-600/10 via-cyan-500/5 to-transparent blur-[140px] animate-drift-cyan" />

      {/* 4. Slowly drifting Violet Nebula */}
      <div className="absolute bottom-[10%] -right-[10%] w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-violet-600/10 via-violet-500/5 to-transparent blur-[150px] animate-drift-violet" />

      {/* 5. Central ambient depth vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#070B14]/40 to-[#070B14]/80" />
    </div>
  )
}

export default CosmicBackground
