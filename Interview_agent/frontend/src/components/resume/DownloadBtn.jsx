import React, { useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import { useReactToPrint } from 'react-to-print'
import { deductCoins } from '../../apis/user.api'

export function DownloadBtn({ docRef, user, setUser }) {
  const [loading, setLoading] = useState(false)

  const handlePdf = useReactToPrint({
    contentRef: docRef,
    documentTitle: 'FresherAI_Report',
  })

  const handleDownload = async () => {
    try {
      setLoading(true)
      const coinResponse = await deductCoins({ coins: 10, action: 'download-pdf' })

      await handlePdf()
      setUser((prev) => ({
        ...prev,
        interviewCoin: coinResponse?.interviewCoin,
      }))
    } catch (error) {
      if (error?.response?.status === 403) {
        alert('Insufficient Interview Coins (10 required to download PDF).')
      } else {
        alert(error?.response?.data?.message || 'Failed to generate PDF document.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400 hover:from-cyan-300 hover:to-violet-300 text-slate-950 font-semibold px-3.5 py-2 text-xs transition-all shadow-[0_0_15px_rgba(103,232,249,0.25)] hover:shadow-[0_0_22px_rgba(103,232,249,0.45)] cursor-pointer disabled:opacity-50"
    >
      {loading ? (
        <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
      ) : (
        <FiDownload size={14} className="stroke-[2.5]" />
      )}
      <span>{loading ? 'Preparing...' : 'Export PDF (10 Coins)'}</span>
    </button>
  )
}

export default DownloadBtn
