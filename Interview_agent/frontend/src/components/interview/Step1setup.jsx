import React, { useState } from 'react'
import { motion } from 'motion/react'
import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiUploadCloud,
  FiAlertCircle,
  FiCode,
  FiUserCheck,
} from 'react-icons/fi'
import { GiTwoCoins } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deductCoins } from '../../apis/user.api'
import api from '../../utils/axios'
import { setResume } from '../../redux/resumeSlice'
import { startInterview } from '../../apis/interview.api'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import CosmicBackground from '../ui/CosmicBackground'

export function Step1setup({ user, setUser }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { resume } = useSelector((state) => state.resume)
  const [role, setRole] = useState('')
  const [type, setType] = useState('technical')
  const [useResume, setUseResume] = useState(!!resume)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [starting, setStarting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const uploadResume = async () => {
    if (!file) {
      setErrorMsg('Please select a PDF document first.')
      return
    }
    setErrorMsg('')
    try {
      setUploading(true)
      try {
        const coinResponse = await deductCoins({ coins: 10, action: 'resume-scorer' })
        setUser((prev) => ({
          ...prev,
          interviewCoin: coinResponse?.interviewCoin,
        }))
      } catch (err) {
        setUploading(false)
        setErrorMsg('Insufficient coins to scan resume (10 coins required).')
        return
      }

      const formData = new FormData()
      formData.append('resume', file)

      const response = await api.post('/api/resume/upload', formData)
      dispatch(setResume(response?.data?.data))
      setUploading(false)
      setFile(null)
    } catch (err) {
      console.error(err)
      setErrorMsg('Failed to process and analyze resume.')
      setUploading(false)
    }
  }

  const start = async () => {
    if (!role.trim()) {
      setErrorMsg('Please specify your target role.')
      return
    }
    setErrorMsg('')
    setStarting(true)

    try {
      const response = await startInterview({ role, type, useResume, resume })

      if (response && response.interviewId) {
        try {
          const coinResponse = await deductCoins({ coins: 50, action: 'start-interview' })
          setUser((prev) => ({
            ...prev,
            interviewCoin: coinResponse?.interviewCoin,
          }))
        } catch (coinErr) {
          setStarting(false)
          setErrorMsg('Insufficient interview coins (50 coins required).')
          return
        }

        navigate(`/interview/${response.interviewId}`)
      } else {
        setStarting(false)
        setErrorMsg('Failed to initialize interview questions. Please try again.')
      }
    } catch (err) {
      console.error(err)
      setStarting(false)
      setErrorMsg(err?.message || 'Interview initialization failed.')
    }
  }

  const hasEnoughCoins = (user?.interviewCoin ?? 0) >= 50

  return (
    <div className="min-h-screen bg-[#070B14] text-[#F1F5F9] flex items-center justify-center p-3 sm:p-6 relative selection:bg-cyan-500/20 selection:text-cyan-200">
      <CosmicBackground />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-4xl bg-[#0B1220]/90 backdrop-blur-2xl border border-white/[0.1] rounded-3xl overflow-hidden grid lg:grid-cols-12 shadow-[0_0_60px_rgba(7,11,20,0.9)] relative z-10"
      >
        {/* Specular Top Rim Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

        {/* ========================================================
            LEFT PANEL: MISSION BRIEFING & CALIBRATION
            ======================================================== */}
        <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between bg-black/20">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-3 py-1.5 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              <FiArrowLeft size={13} />
              <span>Command Center</span>
            </button>

            <div className="mt-6 mb-4">
              <Badge variant="cyan" size="sm" dot className="mb-2">
                MISSION CALIBRATION
              </Badge>
              <h2 className="font-heading text-2xl font-bold text-white tracking-tight leading-snug">
                Welcome, <br />
                <span className="text-gradient-cyan-violet">{user?.name ?? 'Candidate'}</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Initialize an adaptive 6-question simulation drill. AI agents evaluate your responses across
                8 dimensions with authentic hiring pressure.
              </p>
            </div>

            {/* Calibration Capabilities */}
            <div className="space-y-2.5 my-6">
              {[
                { label: 'Role-Adaptive Questions', desc: 'Synthesized to role & experience' },
                { label: 'Speech Recognition & Audio', desc: 'Voice input with AI avatar sync' },
                { label: 'Monaco Coding Terminal', desc: 'Built-in code submission for SWE' },
                { label: '8-Metric Radar Debrief', desc: 'Comprehensive hiring manager score' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs"
                >
                  <div className="w-5 h-5 rounded-md bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300 mt-0.5">
                    <FiCheck size={12} />
                  </div>
                  <div>
                    <span className="font-medium text-slate-200 block">{item.label}</span>
                    <span className="text-slate-500 text-[11px] font-mono">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Cost Card */}
          <div className="pt-4 border-t border-white/[0.08]">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#070B14] border border-cyan-500/20">
              <div className="flex items-center gap-2">
                <GiTwoCoins className="text-cyan-300" size={17} />
                <span className="font-mono text-xs text-slate-400">Simulation Cost:</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-sm font-bold text-cyan-300">50 Coins</span>
                <span className="text-[11px] text-slate-500">
                  (Bal: {user?.interviewCoin ?? 0})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT PANEL: CONFIGURATION PARAMETERS
            ======================================================== */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/[0.08]">
              <div>
                <h3 className="font-heading text-lg font-bold text-white tracking-tight">
                  Configure Simulation
                </h3>
                <p className="text-xs text-slate-400">Set role requirements and context options.</p>
              </div>
              <Badge variant={hasEnoughCoins ? 'emerald' : 'rose'} size="sm" dot>
                {hasEnoughCoins ? 'CREDITS VERIFIED' : 'LOW BALANCE'}
              </Badge>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <FiAlertCircle size={15} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Target Role Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 tracking-wide">
                  Target Job Role <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <FiBriefcase
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={15}
                  />
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Full Stack Developer, DevOps Engineer, Product Manager"
                    className="w-full bg-[#070B14] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Interview Track Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 tracking-wide">
                  Interview Track
                </label>
                <div className="grid grid-cols-2 gap-2.5 p-1 rounded-xl bg-[#070B14] border border-white/10">
                  <button
                    type="button"
                    onClick={() => setType('technical')}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      type === 'technical'
                        ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 text-cyan-300 border border-cyan-400/35 shadow-[0_0_15px_rgba(103,232,249,0.15)] font-semibold'
                        : 'text-slate-400 hover:text-white border border-transparent'
                    }`}
                  >
                    <FiCode size={14} />
                    <span>Technical</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('hr')}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      type === 'hr'
                        ? 'bg-gradient-to-r from-violet-500/20 to-violet-500/10 text-violet-300 border border-violet-400/35 shadow-[0_0_15px_rgba(167,139,250,0.15)] font-semibold'
                        : 'text-slate-400 hover:text-white border border-transparent'
                    }`}
                  >
                    <FiUserCheck size={14} />
                    <span>HR / Behavioral</span>
                  </button>
                </div>
              </div>

              {/* Resume Context Toggle */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white flex items-center gap-2">
                      <span>Resume-Aligned Questioning</span>
                      {resume && (
                        <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                          DETECTED
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      AI tailors technical depth based on your projects and past experience.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setUseResume(!useResume)}
                    className={`relative shrink-0 w-12 h-6 rounded-full transition-colors cursor-pointer ${
                      useResume ? 'bg-cyan-400' : 'bg-slate-700'
                    }`}
                    aria-label="Toggle resume alignment"
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-slate-950 transition-all ${
                        useResume ? 'left-6.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Ready Resume Badge */}
                {resume && useResume && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 text-slate-300">
                      <FiCheckCircle className="text-emerald-400" size={14} />
                      <span className="truncate">
                        Resume profile loaded: <strong className="text-white">{resume?.suggestedRole || 'Verified'}</strong>
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-cyan-400">
                      Score: {resume?.score ?? 0}/100
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Upload New Resume Option when useResume is enabled */}
              {useResume && (
                <div className="p-4 rounded-xl bg-[#070B14] border border-dashed border-white/15 text-center">
                  <label className="cursor-pointer flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-300 mb-2">
                      <FiUploadCloud size={20} />
                    </div>
                    <span className="text-xs font-semibold text-white">
                      {resume ? 'Replace or Update Resume' : 'Upload Resume PDF'}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      Cost: 10 Coins • Supported format: PDF
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
                    <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2 text-xs">
                      <span className="text-slate-300 font-mono truncate">{file.name}</span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={uploadResume}
                        loading={uploading}
                      >
                        {uploading ? 'Analyzing...' : 'Confirm Upload'}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Launch Action */}
          <div className="mt-6 pt-4 border-t border-white/[0.08]">
            <Button
              variant="primary"
              size="lg"
              onClick={start}
              disabled={!role.trim() || starting || !hasEnoughCoins || (useResume && !resume && !file)}
              loading={starting}
              icon={FiArrowRight}
              iconPosition="right"
              className="w-full text-base"
            >
              {starting ? 'Calibrating Questions...' : 'Commence Interview Drill (50 Coins)'}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Step1setup
