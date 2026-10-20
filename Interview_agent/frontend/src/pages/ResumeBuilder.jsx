import React, { useState } from 'react'
import {
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiCheck,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import ResumeForm from '../components/resume/ResumeForm'
import initialData from '../components/resume/initialData'
import PreviewResume from '../components/resume/PreviewResume'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import CosmicBackground from '../components/ui/CosmicBackground'

const STEPS = [
  { step: 1, title: 'Personal Information', subtitle: 'Basic contact details & online profiles' },
  { step: 2, title: 'Professional Summary', subtitle: 'Executive overview & technical focus' },
  { step: 3, title: 'Technical Skills', subtitle: 'Languages, frameworks, databases & tooling' },
  { step: 4, title: 'Work Experience', subtitle: 'Employment history, impact & responsibilities' },
  { step: 5, title: 'Featured Projects', subtitle: 'Engineering builds & technical accomplishments' },
  { step: 6, title: 'Education Background', subtitle: 'Degrees, institutions, academic metrics' },
]

const TOTAL_STEPS = STEPS.length

export function ResumeBuilder({ user, setUser }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState(initialData)
  const [showPreview, setShowPreview] = useState(false)
  const navigate = useNavigate()

  const progressPct = (currentStep / TOTAL_STEPS) * 100
  const activeStep = STEPS.find((s) => s.step === currentStep) || STEPS[0]
  const isLastStep = currentStep === TOTAL_STEPS

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep((p) => p - 1)
  }

  const goNext = () => {
    if (currentStep < TOTAL_STEPS) setCurrentStep((p) => p + 1)
  }

  if (showPreview) {
    return (
      <PreviewResume
        data={data}
        user={user}
        setUser={setUser}
        onBack={() => setShowPreview(false)}
      />
    )
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
                ATS Resume Studio
              </span>
              <Badge variant="cyan" size="sm" dot>
                STANDARDIZED
              </Badge>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowPreview(true)}
            icon={FiEye}
          >
            Preview Document
          </Button>
        </div>
      </header>

      {/* Main Form Studio */}
      <main className="flex-1 px-4 py-8 sm:py-10 relative z-10">
        <div className="mx-auto w-full max-w-3xl">
          {/* Progress Tracker Card */}
          <div className="mb-6 rounded-2xl bg-[#0B1220]/80 backdrop-blur-xl border border-white/10 p-5 shadow-lg relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest font-semibold">
                STEP {currentStep} OF {TOTAL_STEPS} // {activeStep.title}
              </span>
              <span className="font-mono text-xs text-slate-400">
                {Math.round(progressPct)}% Complete
              </span>
            </div>

            {/* Glowing progress line */}
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden mb-4 border border-white/[0.06]">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(103,232,249,0.5)]"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Step Pills */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
              {STEPS.map((s) => (
                <button
                  key={s.step}
                  onClick={() => setCurrentStep(s.step)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                    s.step === currentStep
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                      : s.step < currentStep
                      ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                      : 'text-slate-500 bg-white/[0.02] border border-transparent hover:text-slate-300'
                  }`}
                >
                  {s.step < currentStep ? (
                    <FiCheck size={11} className="text-emerald-400" />
                  ) : (
                    <span>0{s.step}</span>
                  )}
                  <span className="hidden md:inline">{s.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Step Body Card */}
          <div className="rounded-3xl bg-[#0B1220]/85 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            <div className="mb-6 pb-4 border-b border-white/[0.08]">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeStep.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                {activeStep.subtitle}
              </p>
            </div>

            {/* Dynamic Step Content */}
            <ResumeForm step={currentStep} data={data} setData={setData} />

            {/* Navigation Footer Controls */}
            <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                size="md"
                onClick={goPrev}
                disabled={currentStep === 1}
                icon={FiArrowLeft}
              >
                Previous Step
              </Button>

              <div className="flex items-center gap-2">
                {isLastStep ? (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setShowPreview(true)}
                    icon={FiEye}
                  >
                    Preview & Export PDF
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={goNext}
                    icon={FiArrowRight}
                    iconPosition="right"
                  >
                    Next Step
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ResumeBuilder
