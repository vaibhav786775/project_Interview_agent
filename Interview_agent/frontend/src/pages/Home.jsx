import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  FiMic,
  FiFileText,
  FiBarChart2,
  FiMap,
  FiCode,
  FiCheckCircle,
  FiArrowRight,
  FiCpu,
  FiLayers,
  FiCompass,
  FiMenu,
  FiX,
  FiShield,
  FiTerminal,
  FiActivity,
} from 'react-icons/fi'
import { GiArtificialHive } from 'react-icons/gi'
import LoginModel from '../components/LoginModel'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import CosmicBackground from '../components/ui/CosmicBackground'

export default function Home({ setUser }) {
  const [showLogin, setShowLogin] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-[#F1F5F9] font-sans relative selection:bg-cyan-500/20 selection:text-cyan-200">
      <CosmicBackground />

      {/* ========================================================
          1. NAVIGATION
          ======================================================== */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070B14]/75 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 p-[1px] shadow-[0_0_20px_rgba(103,232,249,0.3)]">
              <div className="w-full h-full bg-[#070B14] rounded-[11px] flex items-center justify-center transition-transform group-hover:scale-95">
                <GiArtificialHive className="text-cyan-400 group-hover:text-cyan-300 transition-colors" size={20} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white">
                Fresher<span className="text-gradient-cyan-violet">AI</span>
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] text-cyan-400/80 bg-cyan-400/10 border border-cyan-400/20 px-1.5 py-0.2 rounded-md">
                v2.0 OS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('preview')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Simulator HUD
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Workflow
            </button>
            <button
              onClick={() => scrollToSection('capabilities')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Capabilities
            </button>
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLogin(true)}
              className="text-slate-300 hover:text-white"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowLogin(true)}
              icon={FiArrowRight}
              iconPosition="right"
            >
              Start Preparing
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-white/[0.08] bg-[#070B14]/95 backdrop-blur-2xl px-5 py-5 space-y-4"
            >
              <div className="flex flex-col gap-3 font-medium text-sm text-slate-300">
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-left py-2 hover:text-cyan-300"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('preview')}
                  className="text-left py-2 hover:text-cyan-300"
                >
                  Simulator HUD
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-left py-2 hover:text-cyan-300"
                >
                  Workflow
                </button>
                <button
                  onClick={() => scrollToSection('capabilities')}
                  className="text-left py-2 hover:text-cyan-300"
                >
                  Capabilities
                </button>
              </div>
              <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2.5">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setShowLogin(true)
                  }}
                  className="w-full justify-center"
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setShowLogin(true)
                  }}
                  className="w-full justify-center"
                  icon={FiArrowRight}
                  iconPosition="right"
                >
                  Start Preparing
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================
          2. HERO SECTION
          ======================================================== */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* System Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-500/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(103,232,249,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#67E8F9]" />
              <span className="font-mono text-xs text-cyan-300 tracking-wide uppercase font-semibold">
                Multi-Agent Career Intelligence
              </span>
            </motion.div>

            {/* Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
            >
              Your Next Career Move <br className="hidden sm:inline" />
              <span className="text-gradient-cyan-violet">Starts Here.</span>
            </motion.h1>

            {/* Narrative Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-9 font-normal"
            >
              Prepare with autonomous AI agents across live speech simulations, real-time code evaluation,
              ATS resume scoring, and personalized skill trajectories.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowLogin(true)}
                icon={FiArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto text-base"
              >
                Start Preparing
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToSection('features')}
                icon={FiCompass}
                className="w-full sm:w-auto text-base"
              >
                Explore the Platform
              </Button>
            </motion.div>

            {/* Mission Key Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-400 font-mono"
            >
              <span className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded-lg">
                <FiCheckCircle className="text-cyan-400" size={13} /> Voice & Avatar Simulation
              </span>
              <span className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded-lg">
                <FiCheckCircle className="text-violet-400" size={13} /> Monaco Code Execution
              </span>
              <span className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded-lg">
                <FiCheckCircle className="text-emerald-400" size={13} /> 8-Metric Radar Debrief
              </span>
            </motion.div>
          </div>

          {/* ========================================================
              3. VISUAL CENTERPIECE (CELESTIAL ORBITAL AI CORE)
              ======================================================== */}
          <div className="relative mt-16 sm:mt-24 max-w-4xl mx-auto flex items-center justify-center">
            {/* Outer Orbital Ring */}
            <div className="relative w-[340px] sm:w-[540px] md:w-[620px] h-[340px] sm:h-[540px] md:h-[620px] rounded-full border border-cyan-500/15 flex items-center justify-center animate-orbital-slow">
              {/* Satellite Node 1: Interview Agent */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0B1220] border border-cyan-400/40 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(103,232,249,0.3)]">
                <FiMic className="text-cyan-300" size={13} />
                <span className="font-mono text-[11px] text-cyan-200">Interview Agent</span>
              </div>

              {/* Satellite Node 2: Roadmap Generator */}
              <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0B1220] border border-violet-400/40 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(167,139,250,0.3)]">
                <FiMap className="text-violet-300" size={13} />
                <span className="font-mono text-[11px] text-violet-200">Roadmap Generator</span>
              </div>
            </div>

            {/* Mid Orbital Ring (Reverse) */}
            <div className="absolute w-[260px] sm:w-[410px] md:w-[460px] h-[260px] sm:h-[410px] md:h-[460px] rounded-full border border-violet-500/20 border-dashed flex items-center justify-center animate-orbital-reverse">
              {/* Satellite Node 3: Resume ATS */}
              <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 flex items-center gap-2 bg-[#0B1220] border border-cyan-400/30 px-3 py-1.5 rounded-full shadow-[0_0_12px_rgba(103,232,249,0.25)]">
                <FiFileText className="text-cyan-300" size={13} />
                <span className="font-mono text-[11px] text-cyan-200">ATS Scorer</span>
              </div>

              {/* Satellite Node 4: Radar Analytics */}
              <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 flex items-center gap-2 bg-[#0B1220] border border-emerald-400/30 px-3 py-1.5 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.25)]">
                <FiBarChart2 className="text-emerald-300" size={13} />
                <span className="font-mono text-[11px] text-emerald-200">Radar Analytics</span>
              </div>
            </div>

            {/* Central Neural Core Node */}
            <div className="absolute w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-gradient-to-br from-[#0B1220] to-[#111A2B] border-2 border-cyan-400/40 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(103,232,249,0.35)] z-20">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-1 border border-cyan-400/30">
                <GiArtificialHive className="text-cyan-300" size={26} />
              </div>
              <span className="font-heading font-bold text-xs tracking-wider uppercase text-white">
                Fresher Core
              </span>
              <span className="font-mono text-[9px] text-cyan-400/80">ONLINE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SIMULATOR HUD / PRODUCT PREVIEW
          ======================================================== */}
      <section id="preview" className="relative z-10 py-16 sm:py-24 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <Badge variant="cyan" size="md" dot className="mb-3">
              SIMULATION COCKPIT
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Real-Time Interview Telemetry
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Every interview simulates authentic live pressure with speech synthesis, voice capture,
              and on-the-fly technical scoring.
            </p>
          </div>

          {/* Interactive Cockpit HUD Showcase */}
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-transparent shadow-[0_0_50px_rgba(7,11,20,0.9)]">
            <div className="rounded-[22px] bg-[#0B1220]/90 backdrop-blur-2xl border border-white/10 overflow-hidden">
              {/* Window Bar */}
              <div className="px-5 py-3.5 border-b border-white/[0.08] bg-black/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  <span className="ml-3 font-mono text-xs text-slate-400">
                    SESSION ID: FR-AI-4491 // FULLSTACK_SIMULATION
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE SESSION
                  </span>
                </div>
              </div>

              {/* Cockpit Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 sm:p-7">
                {/* Left: AI Avatar & Audio HUD */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="relative aspect-video rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(103,232,249,0.2)] mb-3">
                      <GiArtificialHive className="text-cyan-300" size={30} />
                    </div>
                    <span className="font-heading text-sm font-semibold text-white">AI Senior Interviewer</span>
                    <span className="font-mono text-xs text-cyan-400/80">Role: Principal Architect</span>

                    {/* Audio Waveform Simulation */}
                    <div className="absolute bottom-3 inset-x-6 flex items-center justify-center gap-1">
                      {[40, 70, 95, 45, 80, 100, 65, 30, 85, 55, 90, 40].map((h, i) => (
                        <span
                          key={i}
                          style={{ height: `${h}%` }}
                          className="w-1 bg-cyan-400/70 rounded-full animate-pulse max-h-6"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question Prompt HUD */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] text-cyan-300 uppercase">Current Question 04 / 06</span>
                      <span className="font-mono text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                        HARD // 04:32 REMAINING
                      </span>
                    </div>
                    <p className="text-sm text-slate-200 font-medium">
                      "Implement an LRU cache with O(1) get and put operations, explaining edge case handling during concurrent reads."
                    </p>
                  </div>
                </div>

                {/* Right: Code Terminal & Evaluation Radar */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  {/* Embedded Code View */}
                  <div className="rounded-2xl bg-[#070B14] border border-white/10 p-4 font-mono text-xs text-slate-300">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5 text-cyan-300">
                        <FiCode size={13} /> solution.js (Monaco Engine)
                      </span>
                      <span>JavaScript ES2024</span>
                    </div>
                    <pre className="text-slate-300 overflow-x-auto leading-relaxed">
                      <code>{`class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
}`}</code>
                    </pre>
                  </div>

                  {/* Telemetry Metrics Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                      <span className="block font-mono text-[10px] text-slate-400 uppercase">Correctness</span>
                      <span className="font-mono text-base font-bold text-cyan-300">92/100</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                      <span className="block font-mono text-[10px] text-slate-400 uppercase">Clarity</span>
                      <span className="font-mono text-base font-bold text-violet-300">88/100</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                      <span className="block font-mono text-[10px] text-slate-400 uppercase">Efficiency</span>
                      <span className="font-mono text-base font-bold text-emerald-300">95/100</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                      <span className="block font-mono text-[10px] text-slate-400 uppercase">Communication</span>
                      <span className="font-mono text-base font-bold text-amber-300">85/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. 5 CORE PILLARS / FEATURE SHOWCASE
          ======================================================== */}
      <section id="features" className="relative z-10 py-20 sm:py-28 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="violet" size="md" dot className="mb-3">
              PLATFORM ARSENAL
            </Badge>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Built for Complete Career Readiness
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Every tool is engineered with specialized AI agents working together to elevate your candidacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1: AI Interview Simulator */}
            <Card
              hoverEffect
              glow
              glowColor="cyan"
              className="lg:col-span-2 flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(103,232,249,0.2)]">
                  <FiMic className="text-cyan-300" size={22} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-cyan-400 uppercase font-semibold">Flagship Engine</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  Autonomous AI Interview Simulator
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Engage in realistic Technical and HR simulations. Features speech-to-text live transcription,
                  synchronized AI avatar speech playback, webcam feed integration, and an embedded Monaco editor for live coding challenges.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="block text-cyan-300 font-bold mb-1">Adaptive Timers</span>
                    60s to 1800s challenge clocks
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="block text-violet-300 font-bold mb-1">Dual Avatar HUD</span>
                    Male & Female Voice Synced Avatars
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="block text-emerald-300 font-bold mb-1">Monaco Editor</span>
                    Real-time in-browser coding drills
                  </div>
                </div>
              </div>
            </Card>

            {/* Pillar 2: ATS Resume Analyzer */}
            <Card hoverEffect glow glowColor="violet" className="flex flex-col justify-between">
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-400/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(167,139,250,0.2)]">
                  <FiFileText className="text-violet-300" size={22} />
                </div>
                <span className="font-mono text-xs text-violet-400 uppercase font-semibold">Document Diagnostics</span>
                <h3 className="font-heading text-xl font-bold text-white mt-1 mb-3">
                  ATS Resume Scorer & Analyzer
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Upload your resume PDF for instant AI extraction. Receive a 0–100 ATS compatibility grade,
                  highlighting strengths, gaps, missing technical skills, and role suggestions.
                </p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-xs">
                  <span className="text-slate-400">Radial Score Gauge</span>
                  <span className="text-violet-300 font-bold">0–100 Rating</span>
                </div>
              </div>
            </Card>

            {/* Pillar 3: AI Resume Builder */}
            <Card hoverEffect glow glowColor="cyan" className="flex flex-col justify-between">
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(103,232,249,0.2)]">
                  <FiLayers className="text-cyan-300" size={22} />
                </div>
                <span className="font-mono text-xs text-cyan-400 uppercase font-semibold">Standardized Format</span>
                <h3 className="font-heading text-xl font-bold text-white mt-1 mb-3">
                  AI-Guided Resume Builder
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Build ATS-compliant resumes with a guided 6-step wizard. Live document preview reflects edits
                  instantly with pixel-perfect print-to-PDF export.
                </p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-xs">
                  <span className="text-slate-400">Export Standard</span>
                  <span className="text-cyan-300 font-bold">100% ATS Safe PDF</span>
                </div>
              </div>
            </Card>

            {/* Pillar 4: Personalized Career Roadmaps */}
            <Card hoverEffect glow glowColor="emerald" className="flex flex-col justify-between">
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                  <FiMap className="text-emerald-300" size={22} />
                </div>
                <span className="font-mono text-xs text-emerald-400 uppercase font-semibold">Trajectory Engine</span>
                <h3 className="font-heading text-xl font-bold text-white mt-1 mb-3">
                  Adaptive Skill Roadmaps
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Target compensation milestones from 10 LPA to 40 LPA. Generates sequenced modules with
                  curated official documentation and top-rated YouTube video tutorials.
                </p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-xs">
                  <span className="text-slate-400">Resource Curation</span>
                  <span className="text-emerald-300 font-bold">YouTube + Docs</span>
                </div>
              </div>
            </Card>

            {/* Pillar 5: Feedback & Radar Analytics */}
            <Card hoverEffect glow glowColor="violet" className="flex flex-col justify-between">
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-400/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(167,139,250,0.2)]">
                  <FiBarChart2 className="text-violet-300" size={22} />
                </div>
                <span className="font-mono text-xs text-violet-400 uppercase font-semibold">Post-Session Debrief</span>
                <h3 className="font-heading text-xl font-bold text-white mt-1 mb-3">
                  8-Metric Radar Analytics
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Gain granular visibility into Correctness, Clarity, Relevance, Detail, Efficiency,
                  Communication, Problem Solving, and Creativity with Recharts radar spider charts.
                </p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-xs">
                  <span className="text-slate-400">Scorecard Dimensions</span>
                  <span className="text-violet-300 font-bold">8 Vectors</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. HOW-IT-WORKS SEQUENCE (4 STAGES)
          ======================================================== */}
      <section id="how-it-works" className="relative z-10 py-20 sm:py-28 border-t border-white/[0.08] bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="cyan" size="md" dot className="mb-3">
              EXECUTION PIPELINE
            </Badge>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              How the Platform Works
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              From resume upload to hiring-manager feedback in 4 streamlined stages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-[#0B1220]/70 border border-white/[0.08] flex flex-col justify-between">
              <div>
                <span className="font-mono text-2xl font-bold text-cyan-400/80 mb-4 block">01</span>
                <h4 className="font-heading text-lg font-bold text-white mb-2">Resume Calibration</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Upload your existing PDF or build one in the platform. The resume agent extracts technical competencies and skill gaps.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-[11px] text-cyan-300">
                Phase: Profile Parsing
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-[#0B1220]/70 border border-white/[0.08] flex flex-col justify-between">
              <div>
                <span className="font-mono text-2xl font-bold text-violet-400/80 mb-4 block">02</span>
                <h4 className="font-heading text-lg font-bold text-white mb-2">Adaptive Simulation</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Choose Technical or HR tracks. The interview agent drafts 6 progressive questions adjusted to your target role and resume.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-[11px] text-violet-300">
                Phase: Live Drill
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-[#0B1220]/70 border border-white/[0.08] flex flex-col justify-between">
              <div>
                <span className="font-mono text-2xl font-bold text-emerald-400/80 mb-4 block">03</span>
                <h4 className="font-heading text-lg font-bold text-white mb-2">Telemetry Evaluation</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  After each answer, the feedback agent evaluates 8 criteria, providing natural interviewer feedback and 3 targeted improvements.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-[11px] text-emerald-300">
                Phase: Real-Time Scoring
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-2xl bg-[#0B1220]/70 border border-white/[0.08] flex flex-col justify-between">
              <div>
                <span className="font-mono text-2xl font-bold text-cyan-400/80 mb-4 block">04</span>
                <h4 className="font-heading text-lg font-bold text-white mb-2">Roadmap Mastery</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Generate compensation-targeted learning modules linking official docs and ranked video tutorials to conquer identified weaknesses.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-[11px] text-cyan-300">
                Phase: Growth Trajectory
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. CAPABILITIES & ARCHITECTURE
          ======================================================== */}
      <section id="capabilities" className="relative z-10 py-20 sm:py-28 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#111A2B] to-[#070B14] border border-cyan-500/20 shadow-[0_0_60px_rgba(7,11,20,0.8)]">
            <div className="max-w-3xl">
              <Badge variant="cyan" size="md" dot className="mb-4">
                ENGINEERING STANDARDS
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white mb-5">
                Multi-Agent Architecture for High-Fidelity Feedback
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Unlike simple single-prompt wrappers, FresherAI coordinates multiple stateful AI agents:
                one for dynamic questioning, one for objective scoring, one for post-interview debriefs,
                and another for resource curation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <FiCpu className="text-cyan-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="block text-slate-100 font-bold mb-0.5">LangGraph State Orchestration</span>
                    Stateful question router and feedback pipeline
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <FiActivity className="text-violet-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="block text-slate-100 font-bold mb-0.5">Sub-Second Redis Caching</span>
                    Fast interview resume & historical analytics retrieval
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <FiShield className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="block text-slate-100 font-bold mb-0.5">Strict Cryptographic Security</span>
                    HTTP-only session cookies & HMAC verified transactions
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <FiTerminal className="text-amber-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="block text-slate-100 font-bold mb-0.5">Web Speech & WebRTC Integration</span>
                    Seamless voice recognition and video capture in browser
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. CALL TO ACTION (CTA)
          ======================================================== */}
      <section className="relative z-10 py-20 sm:py-28 border-t border-white/[0.08] bg-gradient-to-b from-[#070B14] via-[#0B1220] to-[#070B14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="cyan" size="md" dot className="mb-4">
            INSTANT ACTIVATION
          </Badge>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Ready to Master Your Next Interview?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10">
            Sign in with Google to receive your complimentary 150 starter interview coins.
            Build your resume, test your skills, and conquer live interview pressure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowLogin(true)}
              icon={FiArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto text-base"
            >
              Start Preparing Now
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. FOOTER
          ======================================================== */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#070B14] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center">
              <GiArtificialHive className="text-cyan-300" size={16} />
            </div>
            <span className="font-heading font-bold text-sm tracking-tight text-white">
              Fresher<span className="text-gradient-cyan-violet">AI</span>
            </span>
            <span className="text-slate-500 text-xs">| Career Intelligence Platform</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All Agents Operational
            </span>
          </div>

          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} FresherAI. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Authentication Modal */}
      {showLogin && <LoginModel onClose={() => setShowLogin(false)} setUser={setUser} />}
    </div>
  )
}
