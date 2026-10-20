import React, { useState } from 'react'
import { FiX, FiShield, FiCpu } from "react-icons/fi"
import { motion, AnimatePresence } from "motion/react"
import { FcGoogle } from "react-icons/fc"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import api from '../utils/axios'

function LoginModel({ onClose, setUser }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGoogleAuth = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await signInWithPopup(auth, provider)
      const token = await result.user.getIdToken()

      const response = await api.post("/api/auth/login", { token })

      if (response?.data?.user) {
        setUser(response.data.user)
      }
      onClose()
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.message || err?.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xl px-4">
        {/* Backdrop dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-md bg-[#0B1220]/90 backdrop-blur-2xl border border-cyan-500/25 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(7,11,20,0.9),0_0_30px_rgba(103,232,249,0.15)] z-10"
        >
          {/* Specular top rim line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />

          {/* Ambient radial glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-7 sm:p-8">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Close"
            >
              <FiX size={18} />
            </button>

            {/* AI Core badge */}
            <div className="flex justify-center mb-5">
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 flex items-center justify-center shadow-[0_0_25px_rgba(103,232,249,0.25)]">
                <FiCpu className="text-cyan-300" size={26} />
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
                </span>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-white mb-2">
                Initialize <span className="text-gradient-cyan-violet">FresherAI</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                Authenticate with your credentials to access neural interview simulations & telemetry analytics.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <motion.button
                onClick={handleGoogleAuth}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-white/15 bg-white/[0.07] hover:bg-white/[0.12] hover:border-cyan-400/40 text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(103,232,249,0.15)] disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                ) : (
                  <FcGoogle size={20} />
                )}
                <span>{loading ? "Authenticating session..." : "Continue with Google"}</span>
              </motion.button>
            </div>
          </div>

          <div className="relative border-t border-white/[0.08] bg-black/40 px-6 py-4 flex items-center justify-center gap-2 text-slate-400 text-xs">
            <FiShield className="text-cyan-400" size={14} />
            <span>Encrypted Authentication & Session Telemetry</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default LoginModel
