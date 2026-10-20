import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { GiArtificialHive, GiTwoCoins } from 'react-icons/gi'
import {
  FiFileText,
  FiLogOut,
  FiMap,
  FiPlus,
  FiSidebar,
  FiStar,
  FiActivity,
  FiCreditCard,
  FiMic,
  FiChevronLeft,
} from 'react-icons/fi'
import { FaCirclePlus } from 'react-icons/fa6'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  {
    icon: <FiActivity size={16} />,
    label: 'Command Center',
    path: '/dashboard',
    badge: 'Live',
  },
  {
    icon: <FiMic size={16} />,
    label: 'AI Simulator',
    path: '/interview',
  },
  {
    icon: <FiFileText size={16} />,
    label: 'Resume Builder',
    path: '/resume',
  },
  {
    icon: <FiStar size={16} />,
    label: 'ATS Scorer',
    path: '/scorer',
  },
  {
    icon: <FiMap size={16} />,
    label: 'Skill Roadmap',
    path: '/roadmap',
  },
  {
    icon: <FiCreditCard size={16} />,
    label: 'Billing & Plans',
    path: '/billing',
  },
]

export function Sidebar({
  user,
  onNewInterview,
  onLogout,
  sidebarOpen,
  setSidebarOpen,
  moblieOpen,
  setMoblieOpen,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const avatar = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U'

  const inner = (
    <div className="flex flex-col h-full bg-[#0B1220]/95 backdrop-blur-2xl text-slate-200 select-none">
      {/* Top Header / Branding */}
      <div
        className={`px-3.5 h-16 border-b border-white/[0.08] shrink-0 flex items-center ${
          sidebarOpen ? 'justify-between' : 'justify-center'
        }`}
      >
        {sidebarOpen && (
          <div
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 p-[1px] shadow-[0_0_15px_rgba(103,232,249,0.3)] shrink-0">
              <div className="w-full h-full bg-[#070B14] rounded-[11px] flex items-center justify-center transition-transform group-hover:scale-95">
                <GiArtificialHive className="text-cyan-400" size={17} />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col"
            >
              <span className="font-heading font-bold text-sm tracking-tight text-white whitespace-nowrap">
                Fresher<span className="text-gradient-cyan-violet">AI</span>
              </span>
              <span className="font-mono text-[9px] text-cyan-400/80 tracking-widest uppercase">
                Command OS
              </span>
            </motion.div>
          </div>
        )}

        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="cursor-pointer hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors shrink-0"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <FiChevronLeft size={16} /> : <FiSidebar size={16} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMoblieOpen(!moblieOpen)}
            className="cursor-pointer md:hidden flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors shrink-0"
            aria-label="Toggle Mobile Sidebar"
          >
            <FiSidebar size={16} />
          </motion.button>
        </div>
      </div>

      {/* Primary CTA / Launch Action */}
      <div className="px-3 pt-3.5 pb-2 shrink-0">
        <motion.button
          onClick={onNewInterview}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400 text-slate-950 font-semibold rounded-xl py-2.5 transition-all shadow-[0_0_20px_rgba(103,232,249,0.25)] hover:shadow-[0_0_28px_rgba(103,232,249,0.45)] cursor-pointer ${
            sidebarOpen ? 'px-3' : 'justify-center px-0'
          }`}
        >
          <FiPlus size={15} className="shrink-0 stroke-[2.5]" />
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="text-xs font-heading font-bold tracking-tight whitespace-nowrap"
              >
                New AI Interview
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Navigation Group Header */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="px-4 pt-3 pb-1.5 flex items-center justify-between"
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Platform Modules
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 px-2.5 flex-1 overflow-y-auto py-1">
        {NAV_ITEMS.map((nav, i) => {
          const isActive = location.pathname === nav.path
          return (
            <motion.button
              key={i}
              onClick={() => {
                navigate(nav.path)
                setMoblieOpen(false)
              }}
              whileHover={{ x: sidebarOpen ? 3 : 0 }}
              transition={{ duration: 0.12 }}
              className={`flex items-center gap-3 rounded-xl py-2.5 transition-all text-xs font-medium cursor-pointer ${
                sidebarOpen ? 'px-3 justify-between' : 'justify-center px-0'
              } ${
                isActive
                  ? 'bg-cyan-500/15 border border-cyan-400/35 text-cyan-200 shadow-[0_0_15px_rgba(103,232,249,0.15)] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`shrink-0 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`}>
                  {nav.icon}
                </span>

                {sidebarOpen && (
                  <span className="whitespace-nowrap truncate tracking-tight">{nav.label}</span>
                )}
              </div>

              {sidebarOpen && nav.badge && (
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-md bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                  {nav.badge}
                </span>
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Bottom Telemetry: Coin Balance & User Account */}
      <div className="border-t border-white/[0.08] p-3 shrink-0 bg-black/30">
        <AnimatePresence mode="wait">
          {sidebarOpen ? (
            <motion.div
              key="expanded-coins"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => navigate('/billing')}
              className="group flex cursor-pointer items-center justify-between gap-2.5 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 hover:border-cyan-400/40 px-3 py-2 mb-3 transition-all shadow-[0_0_20px_rgba(7,11,20,0.8)]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center shrink-0">
                  <GiTwoCoins size={16} className="text-cyan-300" />
                </div>

                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                    Interview Coins
                  </span>
                  <span className="font-mono text-sm font-bold text-white tabular-nums">
                    {user?.interviewCoin ?? 0}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center text-cyan-300 group-hover:text-cyan-200 transition-colors">
                <FaCirclePlus size={15} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-coins"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => navigate('/billing')}
              className="flex flex-col items-center justify-center p-2 mb-3 rounded-xl border border-cyan-500/20 bg-cyan-500/10 hover:border-cyan-400/40 cursor-pointer text-cyan-300 group"
              title={`${user?.interviewCoin ?? 0} Coins • Click to recharge`}
            >
              <GiTwoCoins size={16} className="group-hover:scale-110 transition-transform" />
              <span className="font-mono text-[10px] font-bold text-white mt-0.5 tabular-nums">
                {user?.interviewCoin ?? 0}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Profile Mini Bar */}
        <div className={`flex items-center gap-2.5 ${sidebarOpen ? '' : 'justify-center'}`}>
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/15 flex items-center justify-center shrink-0">
            <span className="text-white font-mono font-bold text-xs">{avatar}</span>
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0B1220]" />
          </div>

          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-white text-xs font-medium truncate">
                  {user?.name ?? 'Candidate'}
                </p>
                <p className="text-slate-500 text-[10px] font-mono truncate">
                  {user?.email ?? 'verified'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {sidebarOpen && (
              <motion.button
                onClick={onLogout}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.15 }}
                className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-white/[0.06] cursor-pointer"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <FiLogOut size={14} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 76 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="hidden md:flex fixed top-0 left-0 h-screen border-r border-white/[0.08] flex-col z-40 overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
      >
        {inner}
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {moblieOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMoblieOpen(false)}
            className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      {/* Mobile Slide-over Drawer */}
      <AnimatePresence>
        {moblieOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed top-0 left-0 h-screen w-[280px] max-w-[85vw] border-r border-white/[0.08] flex flex-col z-50 md:hidden overflow-hidden shadow-2xl"
          >
            {inner}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
