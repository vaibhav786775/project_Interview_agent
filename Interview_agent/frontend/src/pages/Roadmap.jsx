import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  FiChevronDown,
  FiClock,
  FiFileText,
  FiSend,
  FiX,
  FiArrowLeft,
} from 'react-icons/fi'
import { BsRocketTakeoff } from 'react-icons/bs'
import { GiTwoCoins } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { deductCoins } from '../apis/user.api'
import api from '../utils/axios'
import RoadmapResult from '../components/roadmap/RoadmapResult'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import CosmicBackground from '../components/ui/CosmicBackground'

const PACKAGE_OPTIONS = ['10 LPA', '15 LPA', '20 LPA', '30 LPA', '40 LPA']

export function Roadmap({ user, setUser }) {
  const navigate = useNavigate()
  const [historyOpen, setHistoryOpen] = useState(false)
  const [roadmap, setRoadmap] = useState(null)
  const [role, setRole] = useState('')
  const [targetPackage, setTargetPackage] = useState(PACKAGE_OPTIONS[2]) // default "20 LPA"
  const [packageOpen, setPackageOpen] = useState(false)
  const [useResume, setUseResume] = useState(false)
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [error, setError] = useState('')

  const { resume } = useSelector((state) => state.resume)

  const getAllRoadmaps = async () => {
    setHistoryLoading(true)
    try {
      const response = await api.get('/api/roadmap/all')
      if (response?.data?.data) {
        setHistory(response.data.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setHistoryLoading(false)
    }
  }

  useEffect(() => {
    getAllRoadmaps()
  }, [])

  const getRoadmapById = async (id) => {
    try {
      const response = await api.get(`/api/roadmap/${id}`)
      if (response?.data?.data) {
        setRoadmap(response.data.data)
        setHistoryOpen(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleGenerate = async () => {
    if (!role.trim() || loading) return
    setLoading(true)
    setError('')
    try {
      try {
        const coinResponse = await deductCoins({ coins: 20, action: 'roadmap-builder' })
        setUser((prev) => ({
          ...prev,
          interviewCoin: coinResponse?.interviewCoin,
        }))
      } catch (_coinErr) {
        setLoading(false)
        setError('Insufficient coins (20 required to generate a roadmap).')
        return
      }

      const response = await api.post('/api/roadmap/generate', {
        role: role.trim(),
        targetPackage,
        useResume,
        resume,
      })
      setRoadmap(response.data.data)
      getAllRoadmaps()
    } catch (err) {
      console.error('Failed to generate roadmap:', err)
      setError('Something went wrong while generating your roadmap. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-[#F1F5F9] font-sans flex flex-col relative selection:bg-cyan-500/20 selection:text-cyan-200">
      <CosmicBackground />

      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#070B14]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              <FiArrowLeft size={13} />
              <span className="hidden sm:inline">Command Center</span>
            </button>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm sm:text-base text-white">
                Skill Trajectory Engine
              </span>
              <Badge variant="cyan" size="sm" dot>
                YOUTUBE + DOCS
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate('/billing')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300 font-mono text-xs cursor-pointer"
            >
              <GiTwoCoins size={14} />
              <span>{user?.interviewCoin ?? 0} Coins</span>
            </div>

            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-slate-300 transition-colors cursor-pointer"
            >
              <FiClock size={13} />
              <span>History ({history.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 overflow-y-auto pb-36 pt-8 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!roadmap ? (
              /* Empty Initial View */
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center justify-center min-h-[55vh] text-center px-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-5 shadow-[0_0_25px_rgba(103,232,249,0.2)]">
                  <BsRocketTakeoff size={30} />
                </div>

                <Badge variant="cyan" size="sm" dot className="mb-3">
                  AI CAREER TRAJECTORY
                </Badge>

                <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                  Generate Your Career Roadmap
                </h2>

                <p className="text-slate-400 text-sm max-w-md mx-auto mb-1 leading-relaxed">
                  Enter your target role and salary tier. AI will synthesize a complete curriculum with
                  verified documentation and top-rated YouTube tutorials.
                </p>
                <p className="font-mono text-xs text-cyan-400/80 mb-6">Cost: 20 Interview Coins</p>

                {error && (
                  <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    {error}
                  </div>
                )}

                {/* Quick Role Suggestions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-lg">
                  {['Frontend Developer', 'Backend Engineer', 'DevOps Specialist', 'AI Engineer'].map(
                    (r) => (
                      <button
                        key={r}
                        onClick={() => setRole(r)}
                        className="p-3 rounded-xl bg-[#0B1220]/80 hover:bg-[#111A2B] border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-md text-center"
                      >
                        {r}
                      </button>
                    )
                  )}
                </div>
              </motion.div>
            ) : (
              /* Populated Roadmap Result View */
              <RoadmapResult roadmap={roadmap} onClear={() => setRoadmap(null)} />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Bottom Command Dock */}
      <div className="fixed bottom-0 inset-x-0 z-30 pb-4 pt-3 px-4 bg-gradient-to-t from-[#070B14] via-[#070B14]/95 to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-[#0B1220]/90 backdrop-blur-2xl border border-white/[0.12] p-3 sm:p-3.5 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(103,232,249,0.1)] flex flex-col sm:flex-row items-center gap-3">
            {/* Role Input Field */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Target Job Role (e.g. Backend Engineer)..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGenerate()
                }}
                className="w-full bg-[#070B14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-500/20 font-sans"
              />
            </div>

            {/* Compensation Benchmark Dropdown */}
            <div className="relative shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setPackageOpen(!packageOpen)}
                className="w-full sm:w-auto flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-white/10 bg-[#070B14] text-xs font-mono text-slate-200 hover:border-white/20 transition-all cursor-pointer"
              >
                <span>{targetPackage}</span>
                <FiChevronDown size={13} className="text-slate-400" />
              </button>

              <AnimatePresence>
                {packageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute bottom-full mb-2 left-0 w-full sm:w-36 rounded-xl bg-[#0B1220] border border-white/10 shadow-2xl p-1 z-50 font-mono text-xs space-y-0.5"
                  >
                    {PACKAGE_OPTIONS.map((pkg) => (
                      <button
                        key={pkg}
                        onClick={() => {
                          setTargetPackage(pkg)
                          setPackageOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                          targetPackage === pkg
                            ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                            : 'text-slate-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        {pkg}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resume Attachment Toggle */}
            {resume && (
              <button
                type="button"
                onClick={() => setUseResume(!useResume)}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer shrink-0 ${
                  useResume
                    ? 'bg-cyan-500/15 border-cyan-400/35 text-cyan-300'
                    : 'bg-[#070B14] border-white/10 text-slate-400 hover:text-white'
                }`}
                title="Personalize roadmap with parsed resume gaps"
              >
                <FiFileText size={13} />
                <span className="hidden sm:inline">Use Resume</span>
              </button>
            )}

            {/* Submit Action */}
            <Button
              variant="primary"
              size="sm"
              onClick={handleGenerate}
              disabled={!role.trim() || loading}
              loading={loading}
              icon={FiSend}
              className="w-full sm:w-auto shrink-0"
            >
              {loading ? 'Synthesizing...' : 'Generate (20 Coins)'}
            </Button>
          </div>
        </div>
      </div>

      {/* Slide-over Roadmap History Drawer */}
      <AnimatePresence>
        {historyOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHistoryOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-0 right-0 h-screen w-full max-w-sm bg-[#0B1220]/95 backdrop-blur-2xl border-l border-white/10 z-50 flex flex-col p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div className="flex items-center gap-2">
                  <FiClock className="text-cyan-400" size={16} />
                  <h3 className="font-heading font-bold text-base text-white">Roadmap Archives</h3>
                </div>
                <button
                  onClick={() => setHistoryOpen(false)}
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                >
                  <FiX size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {historyLoading ? (
                  <p className="text-xs text-slate-500 font-mono text-center py-6">
                    Loading history...
                  </p>
                ) : history.length === 0 ? (
                  <p className="text-xs text-slate-500 font-mono text-center py-6">
                    No roadmap archives recorded.
                  </p>
                ) : (
                  history.map((h) => (
                    <motion.div
                      key={h._id}
                      whileHover={{ y: -2 }}
                      onClick={() => getRoadmapById(h._id)}
                      className="p-3.5 rounded-xl bg-[#070B14] border border-white/[0.08] hover:border-cyan-400/35 transition-all cursor-pointer"
                    >
                      <h4 className="font-heading font-bold text-sm text-white truncate">
                        {h.title}
                      </h4>
                      <div className="flex items-center justify-between mt-1 text-xs font-mono text-slate-400">
                        <span className="text-cyan-300">{h.targetPackage}</span>
                        <span>{h.modules?.length || 0} modules</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Roadmap
