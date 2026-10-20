import React from 'react'
import { motion } from 'motion/react'
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { FiCode, FiUserCheck, FiActivity } from 'react-icons/fi'

function CustomTooltip({ active, payload }) {
  if (active && payload?.length) {
    const data = payload[0]
    return (
      <div className="bg-[#0B1220]/95 backdrop-blur-xl border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50">
        <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
          {data?.payload?.skill}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-base font-bold text-cyan-300">{data?.value}</span>
          <span className="text-[10px] text-slate-500">/ 100</span>
        </div>
      </div>
    )
  }
  return null
}

function RadarCard({ title, data, color, icon: Icon, count, index }) {
  const hasData = Array.isArray(data) && data.some((d) => (d.score || 0) > 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 + index * 0.1 }}
      className="relative overflow-hidden bg-[#0B1220]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-white/15 transition-all duration-300"
    >
      {/* Specular top rim line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && (
            <div
              className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${
                color === '#67E8F9'
                  ? 'bg-cyan-500/10 border-cyan-400/25 text-cyan-300'
                  : 'bg-violet-500/10 border-violet-400/25 text-violet-300'
              }`}
            >
              <Icon size={14} />
            </div>
          )}
          <h4 className="font-heading text-sm sm:text-base font-bold text-white tracking-tight">
            {title}
          </h4>
        </div>
        <span className="font-mono text-[11px] text-slate-400 bg-white/[0.04] border border-white/[0.06] px-2.5 py-0.5 rounded-full">
          {count ?? 0} Completed
        </span>
      </div>

      {/* Radar Chart Body */}
      <div className="relative py-2">
        <ResponsiveContainer width="100%" height={230}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="rgba(255, 255, 255, 0.08)" gridType="circle" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{
                fill: 'rgba(241, 245, 249, 0.6)',
                fontSize: 10,
                fontFamily: 'JetBrains Mono',
                fontWeight: 500,
              }}
            />
            <Radar
              name={title}
              dataKey="score"
              stroke={color}
              fill={color}
              fillOpacity={0.2}
              strokeWidth={2}
              dot={{ r: 3, fill: color, strokeWidth: 0 }}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>

        {!hasData && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B1220]/60 backdrop-blur-[2px] rounded-xl text-center px-4">
            <FiActivity className="text-slate-500 mb-2" size={22} />
            <p className="font-mono text-xs text-slate-400">Telemetry Pending</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Complete your first {title.toLowerCase()} to activate radar metrics.
            </p>
          </div>
        )}
      </div>

      {/* Subtitle / Legend */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          8 Competency Vectors
        </span>
        <span>Scale 0-100</span>
      </div>
    </motion.div>
  )
}

export function InterviewGraph({ technicalData, hrData, technicalCount, hrCount }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <RadarCard
        title="Technical Competency Radar"
        data={technicalData}
        color="#67E8F9"
        glowColor="rgba(103, 232, 249, 0.2)"
        icon={FiCode}
        count={technicalCount}
        index={0}
      />
      <RadarCard
        title="HR & Behavioral Radar"
        data={hrData}
        color="#A78BFA"
        glowColor="rgba(167, 139, 250, 0.2)"
        icon={FiUserCheck}
        count={hrCount}
        index={1}
      />
    </div>
  )
}

export default InterviewGraph
