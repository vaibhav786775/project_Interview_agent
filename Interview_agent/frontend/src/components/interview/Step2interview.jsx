import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
  FiCamera,
  FiCameraOff,
  FiCode,
  FiMic,
  FiMicOff,
  FiSend,
  FiUser,
  FiCheck,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import maleVideo from '../../assets/male-ai.mp4'
import femaleVideo from '../../assets/female-ai.mp4'
import CodeEditor from './CodeEditor'
import Timer from './Timer'
import { submitAnswer } from '../../apis/interview.api'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import CosmicBackground from '../ui/CosmicBackground'

export function Step2interview({ interviewData, user }) {
  const navigate = useNavigate()

  // ── State ──
  const [question, setQuestion] = useState(interviewData.question)
  const [currentIndex, setCurrentIndex] = useState(interviewData.currentQuestion || 0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(interviewData.question?.timer || 60)
  const [timerActive, setTimerActive] = useState(true)

  // UI toggles
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(false)
  const [codeOpen, setCodeOpen] = useState(false)

  // Speech
  const [isAIPlaying, setIsAIPlaying] = useState(false)
  const [subtitle, setSubtitle] = useState('')
  const [selectedVoice, setSelectedVoice] = useState(null)
  const [voiceGender, setVoiceGender] = useState('female')
  const [introSpoken, setIntroSpoken] = useState(false)

  // Refs
  const aiVideoRef = useRef(null)
  const userVideoRef = useRef(null)
  const recognitionRef = useRef(null)
  const streamRef = useRef(null)

  const videoSource = voiceGender === 'female' ? femaleVideo : maleVideo
  const totalQuestions = interviewData.totalQuestions || 6
  const progress = ((currentIndex + 1) / totalQuestions) * 100

  // ── Speech Recognition Setup ──
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) return
    const rec = new window.webkitSpeechRecognition()
    rec.lang = 'en-US'
    rec.continuous = true
    rec.interimResults = false
    rec.onresult = (e) => {
      const t = e.results[e.results.length - 1][0].transcript
      setAnswer((prev) => prev + ' ' + t)
    }
    recognitionRef.current = rec
  }, [])

  const startMic = () => {
    try {
      recognitionRef.current?.start()
    } catch (e) {
      // Ignored if already started
    }
  }

  const stopMic = () => {
    try {
      recognitionRef.current?.stop()
    } catch (e) {
      // Ignored if already stopped
    }
  }

  const toggleMic = () => {
    if (micOn) {
      stopMic()
    } else {
      startMic()
    }
    setMicOn(!micOn)
  }

  const toggleCamera = async () => {
    if (cameraOn) {
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
      setCameraOn(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        streamRef.current = stream
        setCameraOn(true)
        setTimeout(() => {
          if (userVideoRef.current) userVideoRef.current.srcObject = stream
        }, 100)
      } catch (error) {
        setCameraOn(false)
      }
    }
  }

  const handleSubmitCode = (code) => {
    setAnswer((prev) => {
      const separator = prev.trim() ? '\n\n--- Code ---\n' : '--- Code ---\n'
      return prev + separator + code
    })
    setCodeOpen(false)
  }

  // ── Timer Countdown ──
  useEffect(() => {
    if (timeLeft <= 0 || !timerActive) return
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000)
    return () => clearInterval(t)
  }, [timeLeft, timerActive])

  // ── Speech Synthesis Voice Discovery ──
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (!voices.length) return
      const female = voices.find((v) => /zira|samantha|female/i.test(v.name))
      const male = voices.find((v) => /david|mark|male/i.test(v.name))
      if (female) {
        setSelectedVoice(female)
        setVoiceGender('female')
      } else if (male) {
        setSelectedVoice(male)
        setVoiceGender('male')
      } else {
        setSelectedVoice(voices[0])
        setVoiceGender('female')
      }
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  const speakText = (text) =>
    new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice || !text?.trim()) {
        resolve()
        return
      }

      window.speechSynthesis.cancel()

      setTimeout(() => {
        const utter = new SpeechSynthesisUtterance(
          text.replace(/,/g, ', ... ').replace(/\./g, '. ... ')
        )
        utter.voice = selectedVoice
        utter.rate = 0.92
        utter.pitch = 1.05
        utter.volume = 1
        utter.onstart = () => {
          setIsAIPlaying(true)
          stopMic()
          aiVideoRef.current?.play()
        }
        utter.onend = () => {
          aiVideoRef.current?.pause()
          setIsAIPlaying(false)
          if (micOn) startMic()
          setTimeout(() => {
            setSubtitle('')
            resolve()
          }, 300)
        }
        setSubtitle(text)
        window.speechSynthesis.speak(utter)
      }, 150)
    })

  // ── Initial Introduction ──
  useEffect(() => {
    if (!selectedVoice || introSpoken) return
    const runIntro = async () => {
      setIntroSpoken(true)
      await new Promise((r) => setTimeout(r, 1200))
      const candidateName = user?.name ? user.name.split(' ')[0] : 'Candidate'
      await speakText(`Welcome ${candidateName}! Let's begin your interview.`)
      await new Promise((r) => setTimeout(r, 900))
      await speakText(interviewData.question.question)
    }
    runIntro()
  }, [selectedVoice])

  // ── Update on New Question ──
  useEffect(() => {
    setQuestion(interviewData.question)
    setCurrentIndex(interviewData.currentQuestion)
    setTimeLeft(interviewData.question?.timer || 60)
  }, [interviewData])

  useEffect(() => {
    if (!selectedVoice || !introSpoken) return
    const speakQuestion = async () => {
      await new Promise((r) => setTimeout(r, 900))
      await speakText(question.question)
    }
    speakQuestion()
  }, [question])

  useEffect(() => {
    setTimeLeft(question.timer || 60)
    setTimerActive(true)
  }, [question])

  // ── Auto-submit on Timer Expiry ──
  useEffect(() => {
    if (timeLeft !== 0) return
    const autoSubmit = async () => {
      await speakText('Time is up. Submitting your answer now.')
      const finalAnswer = answer.trim() || 'No answer provided. Time over.'
      setLoading(true)

      const res = await submitAnswer({
        interviewId: interviewData.interviewId,
        answer: finalAnswer,
      })

      if (res?.completed) {
        setFeedback(res.feedback)
        await new Promise((r) => setTimeout(r, 700))
        await speakText(
          res.feedback?.feedback ||
            'Great job! Your interview is complete. Preparing your report now.'
        )
        setLoading(false)
        navigate(`/interview/${interviewData.interviewId}/report`)
        return
      }

      if (res) {
        setFeedback(res.feedback)
        await new Promise((r) => setTimeout(r, 700))
        await speakText(
          res.feedback?.feedback || "Noted your answer. Let's move to the next question."
        )
        setLoading(false)
        setQuestion(res.question)
        setCurrentIndex(res.currentQuestion)
        setAnswer('')
        setFeedback(null)
      }
    }

    autoSubmit()
  }, [timeLeft])

  // ── Manual Answer Submission ──
  const submit = async () => {
    if (!answer.trim() || loading) return

    setTimerActive(false)
    setLoading(true)

    const res = await submitAnswer({
      interviewId: interviewData.interviewId,
      answer,
    })

    if (res?.completed) {
      setFeedback(res.feedback)
      await new Promise((r) => setTimeout(r, 700))
      await speakText(
        res.feedback?.feedback ||
          'Great job! Your interview is complete. Preparing your report now.'
      )
      setLoading(false)
      navigate(`/interview/${interviewData.interviewId}/report`)
      return
    }

    if (res) {
      setFeedback(res.feedback)
      await new Promise((r) => setTimeout(r, 700))
      await speakText(
        res.feedback?.feedback || "Noted your answer. Let's move to the next question."
      )
      setLoading(false)
      setQuestion(res.question)
      setCurrentIndex(res.currentQuestion)
      setAnswer('')
      setFeedback(null)
    }
  }

  const difficultyBadgeColor = {
    easy: 'emerald',
    medium: 'amber',
    hard: 'rose',
  }[question?.difficulty?.toLowerCase()] || 'cyan'

  return (
    <div className="min-h-screen bg-[#070B14] text-[#F1F5F9] flex items-center justify-center p-3 sm:p-5 relative selection:bg-cyan-500/20 selection:text-cyan-200">
      <CosmicBackground />

      {codeOpen && (
        <CodeEditor onClose={() => setCodeOpen(false)} onSubmitCode={handleSubmitCode} />
      )}

      {/* Main Simulation Terminal Shell */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-6xl bg-[#0B1220]/90 backdrop-blur-2xl border border-white/[0.12] rounded-3xl overflow-hidden shadow-[0_0_70px_rgba(7,11,20,0.95)] grid lg:grid-cols-12 relative z-10"
      >
        {/* Specular top rim line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

        {/* ========================================================
            LEFT COLUMN: INTERVIEWER HUD & AUDIO TRANSCRIPTION
            ======================================================== */}
        <div className="lg:col-span-5 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between gap-4 bg-black/30">
          <div>
            {/* Top Bar Status */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
                <span className="font-mono text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                  SIMULATION ACTIVE
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">
                QUESTION {currentIndex + 1} OF {totalQuestions}
              </span>
            </div>

            {/* AI Avatar Video HUD */}
            <div className="relative rounded-2xl overflow-hidden bg-black/80 aspect-video border border-white/10 shadow-lg">
              <video
                src={videoSource}
                ref={aiVideoRef}
                muted
                playsInline
                preload="auto"
                loop
                className="w-full h-full object-cover"
              />

              {/* Subtitle / Speech overlay */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                {isAIPlaying ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-end gap-0.5 h-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1 bg-cyan-400 rounded-full"
                          animate={{ height: ['4px', '14px', '4px'] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-cyan-300 font-medium">AI Speaking...</span>
                  </div>
                ) : (
                  <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Interviewer Listening for Response
                  </span>
                )}

                {subtitle && (
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2 italic font-sans leading-relaxed">
                    "{subtitle}"
                  </p>
                )}
              </div>
            </div>

            {/* Candidate Webcam Feed Preview */}
            <div className="mt-3 relative rounded-xl overflow-hidden bg-black/60 border border-white/10 h-28 flex items-center justify-center">
              {cameraOn ? (
                <video
                  ref={userVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover mirror"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500 gap-1">
                  <FiUser size={22} />
                  <span className="font-mono text-[10px]">Webcam Off</span>
                </div>
              )}

              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-300">
                {user?.name?.split(' ')[0] ?? 'Candidate'}
              </div>
            </div>
          </div>

          {/* AV Control Hardware Toggles */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMic}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  micOn
                    ? 'bg-cyan-500/15 border-cyan-400/35 text-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.2)]'
                    : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                }`}
                title={micOn ? 'Microphone On' : 'Microphone Muted'}
              >
                {micOn ? <FiMic size={16} /> : <FiMicOff size={16} />}
              </button>

              <button
                type="button"
                onClick={toggleCamera}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  cameraOn
                    ? 'bg-cyan-500/15 border-cyan-400/35 text-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.2)]'
                    : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
                }`}
                title={cameraOn ? 'Webcam Active' : 'Webcam Off'}
              >
                {cameraOn ? <FiCamera size={16} /> : <FiCameraOff size={16} />}
              </button>

              <button
                type="button"
                onClick={() => setCodeOpen(true)}
                className="px-3 py-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-cyan-400/30 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <FiCode size={14} />
                <span>Code Editor</span>
              </button>
            </div>

            {/* Question Progress Bar */}
            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] text-slate-400">
                {Math.round(progress)}% Progress
              </span>
              <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: QUESTION COCKPIT & TRANSCRIPT EDITOR
            ======================================================== */}
        <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between bg-[#0B1220]/70">
          <div>
            {/* Header: Difficulty & Countdown Clock */}
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Badge variant={difficultyBadgeColor} size="md" dot>
                  {question?.difficulty?.toUpperCase() || 'EASY'} LEVEL
                </Badge>
                <span className="font-mono text-xs text-slate-500">
                  Target: {interviewData.role || 'Software Engineer'}
                </span>
              </div>

              {/* Countdown Timer Component */}
              <Timer timeLeft={timeLeft} totalTime={question?.timer || 60} />
            </div>

            {/* Active Question Prompt Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#070B14] border border-white/10 mb-5 shadow-inner">
              <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block mb-2 font-semibold">
                INTERVIEW QUESTION {currentIndex + 1}
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-white leading-relaxed">
                {question?.question}
              </h3>
            </div>

            {/* Answer Transcription / Input Area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <span>Candidate Response</span>
                  {micOn ? (
                    isAIPlaying ? (
                      <span className="font-mono text-[10px] text-amber-300 flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        (Mic Paused — AI Speaking)
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-cyan-300 flex items-center gap-1 bg-cyan-500/10 border border-cyan-400/20 px-2 py-0.5 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        (Live Voice Transcription Active)
                      </span>
                    )
                  ) : (
                    <span className="font-mono text-[10px] text-rose-300 flex items-center gap-1 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      (Microphone Muted)
                    </span>
                  )}
                </label>
                <span className="font-mono text-[10px] text-slate-500">
                  {answer.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>

              <div className="relative">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Speak your answer aloud via microphone, or type and edit your response here..."
                  rows={6}
                  className="w-full bg-[#070B14] border border-white/10 rounded-2xl p-4 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all font-sans resize-none"
                />
              </div>
            </div>

            {/* Real-time Per-Question Feedback Pill */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/25"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FiCheck className="text-cyan-400" size={14} />
                  <span className="font-mono text-xs font-bold text-cyan-300 uppercase">
                    Interviewer Assessment ({feedback.score ?? 0}/100)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {feedback.feedback}
                </p>
              </motion.div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-slate-500 hidden sm:inline">
              Answer will auto-submit when the countdown expires.
            </span>

            <Button
              variant="primary"
              size="md"
              onClick={submit}
              disabled={!answer.trim() || loading}
              loading={loading}
              icon={FiSend}
              iconPosition="right"
              className="ml-auto"
            >
              {loading ? 'Evaluating...' : 'Submit Response'}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Step2interview
