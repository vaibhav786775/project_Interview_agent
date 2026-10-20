import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import {
  FiActivity,
  FiCheckCircle,
  FiLayers,
  FiTrendingUp,
  FiPlus,
  FiSidebar,
  FiArrowRight,
  FiCalendar,
  FiChevronRight,
  FiFileText,
  FiStar,
  FiMap,
  FiMic,
  FiTerminal,
} from 'react-icons/fi'
import { GiTwoCoins } from 'react-icons/gi'
import Sidebar from '../components/Sidebar'
import Statbox from '../components/Statbox'
import InterviewGraph from '../components/InterviewGraph'
import { getAllInterviews } from '../apis/interview.api'
import api from '../utils/axios'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Skeleton } from '../components/ui/Skeleton'
import CosmicBackground from '../components/ui/CosmicBackground'

export function Dashboard({ user, setUser }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [moblieOpen, setMoblieOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    totalInterviews: 0,
    totalQuestions: 0,
    completed: 0,
    averageScore: 0,
  })

  const [technicalData, setTechnicalData] = useState([])
  const [hrData, setHrData] = useState([])
  const [technicalCount, setTechnicalCount] = useState(0)
  const [hrCount, setHrCount] = useState(0)
  const [interviews, setInterviews] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const response = await getAllInterviews()
        if (response) {
          if (response.stats) setStats(response.stats)
          if (response.technicalData) setTechnicalData(response.technicalData)
          if (response.hrData) setHrData(response.hrData)
          if (typeof response.technicalCount === 'number') setTechnicalCount(response.technicalCount)
          if (typeof response.hrCount === 'number') setHrCount(response.hrCount)
          if (Array.isArray(response.interviews)) setInterviews(response.interviews)
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await api.get('/api/auth/logout')
      if (response.data.success) {
        setUser(null)
        navigate('/')
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const firstName = user?.name ? user.name.split(' ')[0] : 'Candidate'

  return (
    <div className="bg-[#070B14] min-h-screen text-[#F1F5F9] font-sans flex relative selection:bg-cyan-500/20 selection:text-cyan-200">
      <CosmicBackground />

      {/* Navigation Sidebar */}
      <Sidebar
        user={user}
        onNewInterview={() => navigate('/interview')}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        moblieOpen={moblieOpen}
        setMoblieOpen={setMoblieOpen}
      />

      {/* Main Content Area */}
      <motion.main
        className={`flex-1 min-h-screen px-3 sm:px-6 lg:px-8 py-5 transition-all duration-300 relative z-10 ${
          sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[76px]'
        }`}
      >
        {/* ========================================================
            1. TOP APP BAR / TELEMETRY STATUS
            ======================================================== */}
        <header className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMoblieOpen(true)}
              className="md:hidden w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-300 hover:text-white"
              aria-label="Open Navigation"
            >
              <FiSidebar size={16} />
            </motion.button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">
                  Command Center
                </span>
                <span className="text-slate-600 text-xs">/</span>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  Career Telemetry
                </span>
              </div>
              <h1 className="font-heading text-lg sm:text-xl font-bold text-white tracking-tight">
                Candidate Dashboard
              </h1>
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-2.5">
            {/* Real Coin Balance Telemetry Chip */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/billing')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-cyan-500/25 bg-cyan-500/10 hover:border-cyan-400/40 text-cyan-300 cursor-pointer shadow-[0_0_15px_rgba(103,232,249,0.12)] transition-all font-mono text-xs"
              title="Click to recharge interview coins"
            >
              <GiTwoCoins size={15} className="text-cyan-300" />
              <span className="font-bold text-white">{user?.interviewCoin ?? 0}</span>
              <span className="text-[10px] text-cyan-400/80 uppercase hidden sm:inline">Coins</span>
            </motion.div>

            {/* Start Interview Action */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/interview')}
              icon={FiPlus}
              className="hidden sm:inline-flex"
            >
              New Interview
            </Button>
          </div>
        </header>

        {/* ========================================================
            2. WELCOME HERO BANNER
            ======================================================== */}
        <section className="relative rounded-2xl p-6 sm:p-7 mb-7 overflow-hidden bg-gradient-to-r from-[#0B1220]/90 via-[#111A2B]/80 to-[#0B1220]/90 border border-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
          {/* Top rim specular highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="cyan" size="sm" dot>
                  AI READINESS ENGINE
                </Badge>
                <span className="text-slate-500 text-xs">•</span>
                <span className="font-mono text-xs text-slate-400">
                  {new Date().toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Welcome back, <span className="text-gradient-cyan-violet">{firstName}</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Your AI interview agents are active and calibrated. Run a simulation drill, audit your
                resume ATS score, or explore salary-targeted skill roadmaps.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/interview')}
                icon={FiArrowRight}
                iconPosition="right"
              >
                Launch Simulation
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/scorer')}
                icon={FiStar}
              >
                Scan Resume
              </Button>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. CAREER OVERVIEW (4 TELEMETRY METRIC CARDS)
            ======================================================== */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <FiActivity className="text-cyan-400" size={15} />
              <h3 className="font-heading text-sm sm:text-base font-bold text-white tracking-tight">
                Career Performance Overview
              </h3>
            </div>
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
              Live Backend Telemetry
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-28" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              <Statbox
                label="Total Interviews"
                value={stats?.totalInterviews ?? 0}
                subHighlight="All Time"
                sub="Sessions Created"
                index={0}
                icon={FiActivity}
                accentColor="cyan"
              />

              <Statbox
                label="Questions Solved"
                value={stats?.totalQuestions ?? 0}
                subHighlight="Answered"
                sub="Across All Drills"
                index={1}
                icon={FiCheckCircle}
                accentColor="emerald"
              />

              <Statbox
                label="Completed Sessions"
                value={stats?.completed ?? 0}
                subHighlight={`${stats?.totalInterviews || 0} Total`}
                sub="Finished with Reports"
                index={2}
                icon={FiLayers}
                accentColor="violet"
              />

              <Statbox
                label="Average Score"
                value={`${Math.round(stats?.averageScore || 0)}/100`}
                subHighlight="Completed Only"
                sub="Performance Grade"
                index={3}
                icon={FiTrendingUp}
                accentColor="amber"
              />
            </div>
          )}
        </div>

        {/* ========================================================
            4. QUICK ACTIONS ARSENAL
            ======================================================== */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="font-heading text-sm sm:text-base font-bold text-white tracking-tight">
              Fast Dispatch Actions
            </h3>
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
              Core Modules
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Action 1: Interview */}
            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => navigate('/interview')}
              className="p-4 rounded-2xl bg-[#0B1220]/75 hover:bg-[#111A2B] border border-white/[0.08] hover:border-cyan-400/35 transition-all duration-200 cursor-pointer group shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-300 mb-3 group-hover:scale-105 transition-transform">
                <FiMic size={18} />
              </div>
              <h4 className="font-heading font-bold text-sm text-white mb-1 flex items-center justify-between">
                <span>AI Interview</span>
                <FiArrowRight size={14} className="text-slate-500 group-hover:text-cyan-300 transition-colors" />
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Start technical or behavioral simulation with real-time feedback.
              </p>
            </motion.div>

            {/* Action 2: ATS Scorer */}
            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => navigate('/scorer')}
              className="p-4 rounded-2xl bg-[#0B1220]/75 hover:bg-[#111A2B] border border-white/[0.08] hover:border-violet-400/35 transition-all duration-200 cursor-pointer group shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-400/25 flex items-center justify-center text-violet-300 mb-3 group-hover:scale-105 transition-transform">
                <FiStar size={18} />
              </div>
              <h4 className="font-heading font-bold text-sm text-white mb-1 flex items-center justify-between">
                <span>Resume Scorer</span>
                <FiArrowRight size={14} className="text-slate-500 group-hover:text-violet-300 transition-colors" />
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Upload your resume PDF for instant ATS score and gap analysis.
              </p>
            </motion.div>

            {/* Action 3: Resume Builder */}
            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => navigate('/resume')}
              className="p-4 rounded-2xl bg-[#0B1220]/75 hover:bg-[#111A2B] border border-white/[0.08] hover:border-emerald-400/35 transition-all duration-200 cursor-pointer group shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300 mb-3 group-hover:scale-105 transition-transform">
                <FiFileText size={18} />
              </div>
              <h4 className="font-heading font-bold text-sm text-white mb-1 flex items-center justify-between">
                <span>Resume Builder</span>
                <FiArrowRight size={14} className="text-slate-500 group-hover:text-emerald-300 transition-colors" />
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Draft ATS-optimized resumes with our step-by-step wizard.
              </p>
            </motion.div>

            {/* Action 4: Skill Roadmap */}
            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => navigate('/roadmap')}
              className="p-4 rounded-2xl bg-[#0B1220]/75 hover:bg-[#111A2B] border border-white/[0.08] hover:border-amber-400/35 transition-all duration-200 cursor-pointer group shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/25 flex items-center justify-center text-amber-300 mb-3 group-hover:scale-105 transition-transform">
                <FiMap size={18} />
              </div>
              <h4 className="font-heading font-bold text-sm text-white mb-1 flex items-center justify-between">
                <span>Skill Roadmap</span>
                <FiArrowRight size={14} className="text-slate-500 group-hover:text-amber-300 transition-colors" />
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Generate curated curricula with YouTube and documentation links.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ========================================================
            5. PERFORMANCE ANALYTICS (RADAR TELEMETRY)
            ======================================================== */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-white tracking-tight">
                Competency Radar Analysis
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                8-dimensional breakdown evaluated by AI feedback agents.
              </p>
            </div>
            <Badge variant="cyan" size="sm" dot>
              AI DIAGNOSTICS
            </Badge>
          </div>

          <InterviewGraph
            technicalData={technicalData}
            technicalCount={technicalCount}
            hrData={hrData}
            hrCount={hrCount}
          />
        </section>

        {/* ========================================================
            6. RECENT INTERVIEWS ACTIVITY LOG
            ======================================================== */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-white tracking-tight">
                Mission Log & Interview Sessions
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                History of completed and active simulation drills.
              </p>
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              {interviews.length} {interviews.length === 1 ? 'Record' : 'Records'}
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : interviews.length === 0 ? (
            /* Empty State */
            <div className="rounded-2xl bg-[#0B1220]/75 border border-white/[0.08] p-8 sm:p-10 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-300 mb-4 shadow-[0_0_20px_rgba(103,232,249,0.15)]">
                <FiTerminal size={26} />
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">
                No Interview Missions Recorded
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                You haven't initiated any AI interview simulations yet. Launch a session to begin
                generating performance telemetry and radar analytics.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/interview')}
                icon={FiArrowRight}
                iconPosition="right"
              >
                Launch Your First Interview
              </Button>
            </div>
          ) : (
            /* Populated Interview Records List */
            <div className="space-y-2.5">
              {interviews.slice(0, 6).map((item) => {
                const isCompleted = item.status === 'completed'
                const formattedDate = item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'Recent'

                return (
                  <motion.div
                    key={item._id}
                    whileHover={{ y: -2 }}
                    className="p-4 sm:p-4.5 rounded-2xl bg-[#0B1220]/75 hover:bg-[#111A2B] border border-white/[0.08] hover:border-white/15 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                          item.type === 'technical'
                            ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300'
                            : 'bg-violet-500/10 border-violet-400/30 text-violet-300'
                        }`}
                      >
                        <FiMic size={18} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4 className="font-heading font-bold text-sm text-white truncate">
                            {item.role || 'Software Engineer'}
                          </h4>
                          <span
                            className={`font-mono text-[10px] px-2 py-0.5 rounded-full border uppercase ${
                              item.type === 'technical'
                                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20'
                                : 'bg-violet-500/10 text-violet-300 border-violet-400/20'
                            }`}
                          >
                            {item.type}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                          <span className="flex items-center gap-1">
                            <FiCalendar size={12} /> {formattedDate}
                          </span>
                          <span>•</span>
                          <span>{item.questions?.length || 0} Questions</span>
                          {item.useResume && (
                            <>
                              <span>•</span>
                              <span className="text-cyan-400/80">Resume-Aligned</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right side: Score & Action button */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                      <div className="text-left sm:text-right">
                        <span className="block font-mono text-[10px] text-slate-500 uppercase">
                          {isCompleted ? 'Final Score' : 'Status'}
                        </span>
                        {isCompleted ? (
                          <span className="font-mono text-base font-bold text-cyan-300">
                            {item.overallScore ?? 0}
                            <span className="text-[10px] text-slate-500">/100</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-amber-300 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            In Progress
                          </span>
                        )}
                      </div>

                      <Button
                        variant={isCompleted ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() =>
                          navigate(
                            isCompleted
                              ? `/interview/${item._id}/report`
                              : `/interview/${item._id}`
                          )
                        }
                        icon={FiChevronRight}
                        iconPosition="right"
                      >
                        {isCompleted ? 'View Debrief' : 'Resume'}
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </section>
      </motion.main>
    </div>
  )
}

export default Dashboard
