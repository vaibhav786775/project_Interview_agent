import React from 'react'
import { motion } from 'motion/react'

export function Statbox({
  label,
  value,
  sub,
  subHighlight,
  index = 0,
  icon: Icon,
  accentColor = 'cyan',
}) {
  const accentStyles = {
    cyan: {
      border: 'hover:border-cyan-400/35 hover:shadow-[0_0_25px_rgba(103,232,249,0.18)]',
      iconBg: 'bg-cyan-500/10 border-cyan-400/25 text-cyan-300',
      pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20',
      valueColor: 'text-white',
    },
    violet: {
      border: 'hover:border-violet-400/35 hover:shadow-[0_0_25px_rgba(167,139,250,0.18)]',
      iconBg: 'bg-violet-500/10 border-violet-400/25 text-violet-300',
      pill: 'bg-violet-500/10 text-violet-300 border-violet-400/20',
      valueColor: 'text-white',
    },
    emerald: {
      border: 'hover:border-emerald-400/35 hover:shadow-[0_0_25px_rgba(52,211,153,0.18)]',
      iconBg: 'bg-emerald-500/10 border-emerald-400/25 text-emerald-300',
      pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20',
      valueColor: 'text-white',
    },
    amber: {
      border: 'hover:border-amber-400/35 hover:shadow-[0_0_25px_rgba(251,191,36,0.18)]',
      iconBg: 'bg-amber-500/10 border-amber-400/25 text-amber-300',
      pill: 'bg-amber-500/10 text-amber-300 border-amber-400/20',
      valueColor: 'text-white',
    },
  }

  const currentAccent = accentStyles[accentColor] || accentStyles.cyan

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className={`relative overflow-hidden bg-[#0B1220]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 ${currentAccent.border}`}
    >
      {/* Specular top rim line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-wider">
            {label}
          </span>
          {Icon && (
            <div
              className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${currentAccent.iconBg}`}
            >
              {typeof Icon === 'function' ? <Icon size={14} /> : Icon}
            </div>
          )}
        </div>

        <p className={`font-mono text-2xl sm:text-3xl font-bold tracking-tight ${currentAccent.valueColor}`}>
          {value ?? 0}
        </p>
      </div>

      {sub && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.06] flex-wrap text-xs">
          {subHighlight && (
            <span
              className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded-md border ${currentAccent.pill}`}
            >
              {subHighlight}
            </span>
          )}
          <span className="text-slate-400 text-[11px] truncate">{sub}</span>
        </div>
      )}
    </motion.div>
  )
}

export default Statbox
