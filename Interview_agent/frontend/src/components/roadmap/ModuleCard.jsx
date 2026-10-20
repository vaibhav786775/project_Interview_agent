import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  FiBookOpen,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiYoutube,
  FiExternalLink,
} from 'react-icons/fi'

const difficultyConfig = {
  Easy: {
    color: '#34D399',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  },
  Medium: {
    color: '#A78BFA',
    badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
  },
  Hard: {
    color: '#FB7185',
    badge: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
  },
}

export function ModuleCard({ mod, index }) {
  const [open, setOpen] = useState(false)
  const diff = difficultyConfig[mod.difficulty] || difficultyConfig.Medium

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -2 }}
      onClick={() => setOpen(!open)}
      className="relative overflow-hidden bg-[#0B1220]/80 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-400/30 rounded-2xl cursor-pointer select-none shadow-[0_8px_25px_rgba(0,0,0,0.35)] transition-all"
    >
      {/* Specular top rim line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Module Title Bar */}
      <div className="relative flex items-center gap-3.5 p-4 sm:p-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold bg-[#070B14] border border-white/10 shrink-0"
          style={{ color: diff.color }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-heading text-sm sm:text-base font-bold text-white truncate">
            {mod.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <FiClock size={11} className="text-slate-500" />
            <span className="font-mono text-xs text-slate-400">{mod.duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border hidden sm:inline-block ${diff.badge}`}>
            {mod.difficulty}
          </span>
          <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-400">
            {open ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          </div>
        </div>
      </div>

      {/* Expanded Module Details */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden bg-[#070B14]/80 border-t border-white/[0.06]"
          >
            <div className="p-4 sm:p-5 pt-3">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-sans">
                {mod.description}
              </p>

              <div className="flex items-center gap-2.5 flex-wrap">
                {mod.youtube && (
                  <a
                    href={mod.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-xs font-mono px-3.5 py-2 rounded-xl border border-rose-500/30 text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 hover:border-rose-500/50 transition-all shadow-sm"
                  >
                    <FiYoutube size={14} className="text-rose-400" />
                    <span>Watch Ranked Tutorial</span>
                    <FiExternalLink size={11} className="opacity-70" />
                  </a>
                )}

                {mod.article && (
                  <a
                    href={mod.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-xs font-mono px-3.5 py-2 rounded-xl border border-cyan-500/30 text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all shadow-sm"
                  >
                    <FiBookOpen size={14} className="text-cyan-400" />
                    <span>Official Documentation</span>
                    <FiExternalLink size={11} className="opacity-70" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ModuleCard
