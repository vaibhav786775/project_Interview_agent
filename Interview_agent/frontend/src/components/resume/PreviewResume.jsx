import React, { useEffect, useRef, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import DownloadBtn from './DownloadBtn'
import ATSTemplate from './ATSTemplate'
import CosmicBackground from '../ui/CosmicBackground'

export function PreviewResume({ data, onBack, user, setUser }) {
  const resumeRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 640) {
        setScale(0.44)
      } else if (window.innerWidth < 768) {
        setScale(0.6)
      } else if (window.innerWidth < 1024) {
        setScale(0.75)
      } else {
        setScale(0.92)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <div className="min-h-screen bg-[#070B14] text-[#F1F5F9] font-sans flex flex-col relative">
      <CosmicBackground />
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#070B14]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              <FiArrowLeft size={14} />
              <span>Back to Editor</span>
            </button>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <span className="font-heading font-bold text-sm sm:text-base text-white">
              Document Preview & Print Studio
            </span>
          </div>

          <div className="flex items-center gap-3">
            <DownloadBtn docRef={resumeRef} user={user} setUser={setUser} />
          </div>
        </div>
      </header>

      {/* Viewport for Resume */}
      <main className="flex-1 overflow-auto bg-[#070B14] py-8 sm:py-12 px-4 flex justify-center items-start">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
          className="transition-transform duration-200"
        >
          <div
            ref={resumeRef}
            className="rounded-lg bg-white text-[#0A0A0A] shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_30px_rgba(103,232,249,0.1)] overflow-hidden"
          >
            <ATSTemplate data={data} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default PreviewResume
