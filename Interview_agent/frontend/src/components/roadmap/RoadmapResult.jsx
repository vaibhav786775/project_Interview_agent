import React from 'react'
import { motion } from 'motion/react'
import { FiCheckCircle, FiClock, FiMap, FiTarget, FiX } from 'react-icons/fi'
import ModuleCard from './ModuleCard'
import { Badge } from '../ui/Badge'

export function RoadmapResult({ roadmap, onClear }) {
  if (!roadmap) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Roadmap Overview Meta Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-[#0B1220]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

        <div className="relative flex items-start justify-between mb-5">
          <div>
            <Badge variant="cyan" size="sm" dot className="mb-2">
              ACTIVE TRAJECTORY
            </Badge>
            <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
              {roadmap.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
              Compensation Benchmark:{' '}
              <span className="text-cyan-300 font-bold">{roadmap.targetPackage}</span>
            </p>
          </div>

          <button
            onClick={onClear}
            className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close view"
            aria-label="Close view"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* 3 Telemetry Stats */}
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: FiTarget, label: 'Difficulty Tier', value: roadmap.level },
            { icon: FiClock, label: 'Estimated Timeline', value: roadmap.duration },
            {
              icon: FiCheckCircle,
              label: 'Curriculum Nodes',
              value: `${roadmap.modules?.length || 0} Modules`,
            },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl p-3.5 bg-[#070B14] border border-white/[0.08] flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-300 shrink-0">
                <Icon size={15} />
              </div>
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                  {label}
                </span>
                <span className="font-mono text-sm font-bold text-white">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Curriculum Module Sequence */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiMap className="text-cyan-400" size={15} />
            <h3 className="font-heading text-base font-bold text-white tracking-tight">
              Sequenced Curriculum Modules
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-400">
            {roadmap.modules?.length || 0} Total Units
          </span>
        </div>

        <div className="space-y-3">
          {roadmap.modules?.map((m, i) => (
            <ModuleCard key={m.title || i} mod={m} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default RoadmapResult
