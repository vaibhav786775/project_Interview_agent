import React, { useRef } from 'react'
import { motion } from 'motion/react'
import {
  FiArrowLeft,
  FiAward,
  FiCheck,
  FiTarget,
  FiTrendingUp,
  FiX,
  FiActivity,
  FiFileText,
  FiCompass,
  FiCheckCircle,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import DownloadBtn from '../resume/DownloadBtn'
import CosmicBackground from '../ui/CosmicBackground'

export function Step3report({ report, user, setUser }) {
  const navigate = useNavigate()
  const reportRef = useRef(null)

  return (
    <div className="min-h-screen bg-[#070B14] text-[#F1F5F9] font-sans p-3 sm:p-6 lg:p-8 relative selection:bg-cyan-500/20 selection:text-cyan-200">
      <CosmicBackground />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-5xl mx-auto rounded-3xl bg-[#0B1220]/90 backdrop-blur-2xl border border-white/[0.1] overflow-hidden shadow-[0_0_60px_rgba(7,11,20,0.9)] relative z-10"
      >
        {/* Specular Top Rim Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

        {/* ========================================================
            HEADER BAR & ACTIONS
            ======================================================== */}
        <div className="px-6 sm:px-8 py-5 border-b border-white/[0.08] bg-black/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-3 py-1.5 text-xs text-slate-300 transition-colors cursor-pointer mb-2.5"
            >
              <FiArrowLeft size={13} />
              <span>Back to Command Center</span>
            </button>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Post-Mission Debriefing Report
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Target Role: <strong className="text-cyan-300">{report?.role || 'Candidate'}</strong> • AI Multi-Agent Evaluation
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <DownloadBtn docRef={reportRef} user={user} setUser={setUser} />

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-300 font-mono text-xs">
              <FiAward className="text-emerald-400" size={16} />
              <span>MISSION COMPLETED</span>
            </div>
          </div>
        </div>

        {/* Printable Debrief Body */}
        <div className="p-6 sm:p-8 space-y-6" ref={reportRef}>
          {/* ========================================================
              1. THREE KEY PERFORMANCE METRIC CARDS
              ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Score Card */}
            <div className="rounded-2xl bg-[#070B14] border border-white/10 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400 uppercase">Overall Rating</span>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                  <FiTarget size={16} />
                </div>
              </div>
              <div className="mt-4">
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white">
                  {report?.overallScore ?? 0}
                </span>
                <span className="font-mono text-sm text-slate-500"> / 100</span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-cyan-400">
                Grade: {report?.overallScore >= 80 ? 'Interview Ready' : report?.overallScore >= 60 ? 'Competent' : 'Needs Preparation'}
              </div>
            </div>

            {/* Questions Answered */}
            <div className="rounded-2xl bg-[#070B14] border border-white/10 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400 uppercase">Questions Solved</span>
                <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-400/30 flex items-center justify-center text-violet-300">
                  <FiTrendingUp size={16} />
                </div>
              </div>
              <div className="mt-4">
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white">
                  {report?.questions?.length || 0}
                </span>
                <span className="font-mono text-sm text-slate-500"> Drills</span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-violet-400">
                Track: {report?.type?.toUpperCase() || 'TECHNICAL'}
              </div>
            </div>

            {/* Mission Status */}
            <div className="rounded-2xl bg-[#070B14] border border-white/10 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400 uppercase">Session Status</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <FiCheckCircle size={16} />
                </div>
              </div>
              <div className="mt-4">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400">
                  VERIFIED
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-emerald-400">
                Full Transcript Analyzed
              </div>
            </div>
          </div>

          {/* ========================================================
              2. EXECUTIVE SUMMARY
              ======================================================== */}
          <div className="rounded-2xl bg-[#070B14] border border-white/10 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <FiActivity className="text-cyan-400" size={16} />
              <h3 className="font-heading text-base font-bold text-white tracking-tight">
                Senior Interviewer Assessment Summary
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 font-sans">
              {report?.summary || 'No summary available.'}
            </p>
          </div>

          {/* ========================================================
              3. STRENGTHS & AREAS TO IMPROVE
              ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="rounded-2xl bg-[#070B14] border border-emerald-500/25 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <FiCheck size={14} />
                </div>
                <h3 className="font-heading text-base font-bold text-white">Demonstrated Strengths</h3>
              </div>
              <div className="space-y-2.5">
                {report?.strengths?.length > 0 ? (
                  report.strengths.map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-xs text-slate-200"
                    >
                      <FiCheck className="text-emerald-400 shrink-0 mt-0.5" size={13} />
                      <span className="leading-relaxed">{s}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-xs">No strengths documented.</p>
                )}
              </div>
            </div>

            {/* Weaknesses / Improvements */}
            <div className="rounded-2xl bg-[#070B14] border border-rose-500/25 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-300">
                  <FiX size={14} />
                </div>
                <h3 className="font-heading text-base font-bold text-white">Areas to Strengthen</h3>
              </div>
              <div className="space-y-2.5">
                {report?.weaknesses?.length > 0 ? (
                  report.weaknesses.map((w, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/5 border border-rose-500/15 text-xs text-slate-200"
                    >
                      <FiX className="text-rose-400 shrink-0 mt-0.5" size={13} />
                      <span className="leading-relaxed">{w}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-xs">No specific weaknesses identified.</p>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================
              4. STRATEGIC RECOMMENDATIONS
              ======================================================== */}
          <div className="rounded-2xl bg-[#070B14] border border-white/10 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiCompass className="text-violet-400" size={16} />
              <h3 className="font-heading text-base font-bold text-white tracking-tight">
                Actionable Strategic Recommendations
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report?.recommendations?.length > 0 ? (
                report.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300"
                  >
                    <span className="w-5 h-5 rounded-md bg-violet-500/20 text-violet-300 flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{rec}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-xs">No recommendations recorded.</p>
              )}
            </div>
          </div>

          {/* ========================================================
              5. QUESTION-BY-QUESTION DRILLDOWN
              ======================================================== */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white tracking-tight mb-4 flex items-center gap-2">
              <FiFileText className="text-cyan-400" />
              Question Transcript & Metric Analysis
            </h3>

            <div className="space-y-4">
              {report?.questions?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-[#070B14] border border-white/10 p-5 sm:p-6 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <span className="font-mono text-xs text-cyan-300 uppercase font-semibold">
                      Question {index + 1}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      Score: <strong className="text-white">{item.feedback?.score ?? 0}/100</strong>
                    </span>
                  </div>

                  {/* Question Prompt */}
                  <h4 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                    {item.question}
                  </h4>

                  {/* Candidate Answer */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-xs text-slate-300">
                    <span className="block text-[10px] text-slate-500 uppercase mb-1">
                      Candidate Answer:
                    </span>
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {item.userAnswer || 'No response recorded.'}
                    </p>
                  </div>

                  {/* 4 Telemetry Scores */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
                      <span className="block text-[10px] text-slate-500 uppercase">Clarity</span>
                      <span className="font-bold text-cyan-300">{item.feedback?.clarity ?? 0}%</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
                      <span className="block text-[10px] text-slate-500 uppercase">Relevance</span>
                      <span className="font-bold text-violet-300">{item.feedback?.relevance ?? 0}%</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
                      <span className="block text-[10px] text-slate-500 uppercase">Communication</span>
                      <span className="font-bold text-emerald-300">{item.feedback?.communication ?? 0}%</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
                      <span className="block text-[10px] text-slate-500 uppercase">Problem Solving</span>
                      <span className="font-bold text-amber-300">{item.feedback?.problemSolving ?? 0}%</span>
                    </div>
                  </div>

                  {/* Interviewer Comment */}
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-xs text-slate-200">
                    <span className="font-mono text-[10px] text-cyan-300 uppercase block mb-1 font-bold">
                      Interviewer Comment:
                    </span>
                    <p className="leading-relaxed">{item.feedback?.feedback || 'N/A'}</p>
                  </div>

                  {/* Improvements List */}
                  {item.feedback?.improvements?.length > 0 && (
                    <div className="pt-2">
                      <span className="font-mono text-[11px] text-slate-400 uppercase block mb-2">
                        Suggested Improvements:
                      </span>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {item.feedback.improvements.map((imp, impIdx) => (
                          <span
                            key={impIdx}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-300"
                          >
                            • {imp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Step3report
