import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiAlertCircle,
  FiUploadCloud,
  FiUser,
  FiZap,
  FiArrowLeft,
  FiFileText,
  FiCompass,
  FiRefreshCw,
  FiCheckCircle,
} from 'react-icons/fi'
import { GiTwoCoins } from 'react-icons/gi'
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts'
import { useDispatch, useSelector } from 'react-redux'
import api from '../utils/axios'
import { setResume } from '../redux/resumeSlice'
import { deductCoins } from '../apis/user.api'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import CosmicBackground from '../components/ui/CosmicBackground'

const ScoreRing = ({ score }) => {
  const color = score >= 75 ? '#67E8F9' : score >= 50 ? '#FBBF24' : '#FB7185'
  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <RadialBarChart
        width={112}
        height={112}
        cx={56}
        cy={56}
        innerRadius={38}
        outerRadius={52}
        startAngle={90}
        endAngle={-270}
        data={[{ value: score, fill: color }]}
        barSize={8}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar
          background={{ fill: 'rgba(255,255,255,0.08)' }}
          dataKey="value"
          cornerRadius={8}
          isAnimationActive={true}
          animationDuration={800}
        />
      </RadialBarChart>

      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-mono text-xl font-bold text-white leading-none tabular-nums">{score}</span>
        <span className="font-mono text-[10px] text-slate-400 mt-0.5">/100</span>
      </div>
    </div>
  )
}

const Tag = ({ text, color = 'cyan' }) => {
  const styles = {
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/25',
    violet: 'bg-violet-500/10 text-violet-300 border-violet-400/25',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-400/25',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/25',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-400/25',
  }
  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-lg border font-mono tracking-tight ${
        styles[color] || styles.cyan
      }`}
    >
      {text}
    </span>
  )
}

export function Scorer({ user, setUser }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { resume } = useSelector((state) => state.resume)

  const uploadResume = async () => {
    if (!file) {
      setErrorMsg('Please select a PDF document first.')
      return
    }
    setErrorMsg('')
    try {
      setLoading(true)

      try {
        const coinResponse = await deductCoins({ coins: 10, action: 'resume-scorer' })
        setUser((prev) => ({
          ...prev,
          interviewCoin: coinResponse?.interviewCoin,
        }))
      } catch (coinErr) {
        setLoading(false)
        setErrorMsg('Insufficient interview coins (10 coins required).')
        return
      }

      const formData = new FormData()
      formData.append('resume', file)

      const response = await api.post('/api/resume/upload', formData)
      dispatch(setResume(response?.data?.data))
      setLoading(false)
      setFile(null)
    } catch (error) {
      console.error(error)
      setErrorMsg('Failed to process and analyze resume.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-[#F1F5F9] font-sans relative selection:bg-cyan-500/20 selection:text-cyan-200">
      <CosmicBackground />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070B14]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              <FiArrowLeft size={13} />
              <span className="hidden sm:inline">Command Center</span>
            </button>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <span className="font-heading font-bold text-base text-white">
              ATS Resume Analyzer
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate('/billing')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300 font-mono text-xs cursor-pointer"
            >
              <GiTwoCoins size={14} />
              <span>{user?.interviewCoin ?? 0} Coins</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {!resume ? (
          /* ========================================================
             UPLOAD DROPZONE STATE
             ======================================================== */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="cyan" size="md" dot className="mb-3">
                RESUME DIAGNOSTICS
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                ATS Compatibility Audit
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Upload your resume PDF for comprehensive parsing, 0–100 scoring, strength & weakness detection,
                and missing keyword analysis.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <FiAlertCircle size={15} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="p-8 sm:p-12 rounded-3xl bg-[#0B1220]/80 backdrop-blur-2xl border-2 border-dashed border-white/15 hover:border-cyan-400/40 transition-all text-center relative shadow-2xl">
              <label className="cursor-pointer flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-4 shadow-[0_0_25px_rgba(103,232,249,0.2)]">
                  <FiUploadCloud size={30} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-1">
                  Choose or Drop your Resume PDF
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto mb-4 leading-relaxed">
                  Fast ATS extraction with ChatGroq LLM intelligence. Cost: 10 Interview Coins.
                </p>
                <span className="font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-400/20 px-3 py-1 rounded-full">
                  Format: .PDF only
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) setFile(e.target.files[0])
                  }}
                />
              </label>

              {file && (
                <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FiFileText className="text-cyan-400 shrink-0" size={18} />
                    <span className="font-mono text-xs text-white truncate">{file.name}</span>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={uploadResume}
                    loading={loading}
                    className="w-full sm:w-auto"
                  >
                    {loading ? 'Analyzing...' : 'Scan Resume (10 Coins)'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ========================================================
             ANALYTICS RESULT STATE
             ======================================================== */
          <div className="space-y-6">
            {/* Header / Re-upload action */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/[0.08]">
              <div>
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block mb-0.5">
                  AUDITED PROFILE
                </span>
                <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
                  {resume?.name || 'Candidate Resume'}
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {resume?.email || 'email'} • {resume?.phone || 'phone'}
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => dispatch(setResume(null))}
                icon={FiRefreshCw}
              >
                Scan Another Resume
              </Button>
            </div>

            {/* Score Showcase Hero */}
            <div className="rounded-3xl bg-[#0B1220]/85 backdrop-blur-2xl border border-white/10 p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

              <ScoreRing score={resume?.score ?? 0} />

              <div className="flex-1 text-center sm:text-left">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  ATS Alignment Rating
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-white mb-1.5">
                  {resume.score >= 75
                    ? 'Strong ATS Compatibility'
                    : resume.score >= 50
                    ? 'Moderate Alignment'
                    : 'Requires Critical Improvements'}
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-2 font-mono text-xs text-cyan-300">
                  <FiUser size={13} />
                  <span>Suggested Role: <strong>{resume?.suggestedRole || 'Software Engineer'}</strong></span>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            {resume.summary && (
              <div className="rounded-2xl bg-[#0B1220]/75 border border-white/[0.08] p-5 sm:p-6">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider block mb-2 font-semibold">
                  Professional Summary
                </span>
                <p className="text-sm leading-relaxed text-slate-300 font-sans">{resume.summary}</p>
              </div>
            )}

            {/* Strengths & Weaknesses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Strengths */}
              <div className="rounded-2xl bg-[#0B1220]/75 border border-emerald-500/20 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FiCheckCircle className="text-emerald-400" size={16} />
                  <h4 className="font-heading text-base font-bold text-white">Identified Strengths</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resume.strengths?.length > 0 ? (
                    resume.strengths.map((str, i) => <Tag key={i} text={str} color="emerald" />)
                  ) : (
                    <span className="text-slate-500 text-xs">No specific strengths parsed.</span>
                  )}
                </div>
              </div>

              {/* Weaknesses */}
              <div className="rounded-2xl bg-[#0B1220]/75 border border-rose-500/20 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FiAlertCircle className="text-rose-400" size={16} />
                  <h4 className="font-heading text-base font-bold text-white">ATS Vulnerabilities</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resume.weaknesses?.length > 0 ? (
                    resume.weaknesses.map((w, i) => <Tag key={i} text={w} color="rose" />)
                  ) : (
                    <span className="text-slate-500 text-xs">No vulnerabilities noted.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Missing Technical Skills */}
            <div className="rounded-2xl bg-[#0B1220]/75 border border-amber-500/20 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <FiZap className="text-amber-400" size={16} />
                <h4 className="font-heading text-base font-bold text-white">
                  Missing Skills for {resume.suggestedRole || 'Target Role'}
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume.missingSkills?.length > 0 ? (
                  resume.missingSkills.map((ms, i) => <Tag key={i} text={ms} color="amber" />)
                ) : (
                  <span className="text-slate-500 text-xs">All key skills present.</span>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="rounded-2xl bg-[#0B1220]/75 border border-white/[0.08] p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <FiCompass className="text-cyan-400" size={16} />
                <h4 className="font-heading text-base font-bold text-white">Actionable ATS Recommendations</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {resume.recommendations?.length > 0 ? (
                  resume.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{rec}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-slate-500">No recommendations available.</span>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Scorer
