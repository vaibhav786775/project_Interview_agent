import React, { useState } from 'react'
import { FiArrowLeft, FiShield } from 'react-icons/fi'
import { GiTwoCoins } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import PricingCard from '../components/PricingCard'
import api from '../utils/axios'
import { Badge } from '../components/ui/Badge'
import CosmicBackground from '../components/ui/CosmicBackground'

const plan = [
  {
    title: 'Free',
    price: 'Free',
    coins: 150,
    button: 'Starter Allocation Claimed',
    popular: false,
    disabled: true,
    features: [
      '150 Complimentary Coins',
      'AI Resume Builder Access',
      'ATS Resume Scorer Audits',
      'Career Roadmap Generator',
    ],
  },
  {
    title: 'Starter',
    price: '199',
    coins: 300,
    button: 'Recharge Now (₹199)',
    popular: true,
    disabled: false,
    features: [
      '300 Interview Coins (+6 Simulations)',
      'Unlimited ATS Resume Scans',
      'Unlimited Career Roadmaps',
      'Fast ChatGroq LLM Generation',
    ],
  },
]

export function Billing({ user, setUser }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handlePayment = async (selectedPlan) => {
    if (selectedPlan.disabled) return
    try {
      setLoading(true)
      const result = await api.post('/api/billing/create', {
        planId: selectedPlan.title.toLowerCase(),
      })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.order.amount,
        currency: result.data.order.currency,
        name: 'FresherAI',
        description: `${selectedPlan.title} - ${selectedPlan.coins} Interview Coins`,
        order_id: result.data.order.id,

        handler: async function (response) {
          try {
            await api.post('/api/billing/verify', response)

            const coinRes = await api.post('/api/auth/add-coins', {
              coins: selectedPlan.coins,
            })

            setUser((prev) => ({
              ...prev,
              interviewCoin: coinRes.data.interviewCoin,
            }))

            alert('Payment Verified & Coins Credited Successfully! 🎉')
            navigate('/dashboard')
          } catch (error) {
            console.error('Payment verification failed:', error)
            alert(
              error?.response?.data?.message ||
                'Payment verification failed. Please contact support.'
            )
          } finally {
            setLoading(false)
          }
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (resp) {
        setLoading(false)
        alert(resp.error?.description || 'Payment cancelled or failed.')
      })
      rzp.open()
    } catch (error) {
      console.error(error)
      setLoading(false)
      alert(error?.response?.data?.message || 'Failed to initialize payment gateway order.')
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
            <span className="font-heading font-bold text-sm sm:text-base text-white">
              Billing & Coin Reactor
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300 font-mono text-xs">
            <GiTwoCoins size={14} />
            <span>Balance: {user?.interviewCoin ?? 0} Coins</span>
          </div>
        </div>
      </header>

      {/* Main Billing Showcase */}
      <main className="flex-1 py-12 sm:py-16 px-4 relative z-10 flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="cyan" size="md" dot className="mb-3">
            TRANSPARENT RECHARGE
          </Badge>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Fuel Your Interview Journey
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every new candidate begins with 150 free coins. Top up your balance anytime for uninterrupted
            access to AI simulations and resume audits.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-3xl mb-12">
          {plan.map((p) => (
            <PricingCard
              key={p.title}
              title={p.title}
              price={p.price}
              coins={p.coins}
              button={p.button}
              popular={p.popular}
              disabled={p.disabled || loading}
              features={p.features}
              onBuy={() => handlePayment(p)}
            />
          ))}
        </div>

        {/* Payment Security Assurance */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
          <FiShield className="text-cyan-400" size={14} />
          <span>Encrypted Razorpay Checkout • Instant Balance Sync • 100% Secure</span>
        </div>
      </main>
    </div>
  )
}

export default Billing
