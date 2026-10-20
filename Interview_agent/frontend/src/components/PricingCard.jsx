import React from 'react'
import { motion } from 'motion/react'
import { FiCheck } from 'react-icons/fi'
import { GiTwoCoins } from 'react-icons/gi'
import { Button } from './ui/Button'

export function PricingCard({
  title,
  price,
  coins,
  button,
  features,
  popular,
  disabled,
  onBuy,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`relative w-full max-w-[340px] rounded-3xl overflow-hidden border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
        popular
          ? 'border-cyan-400/40 bg-gradient-to-b from-[#111A2B] via-[#0B1220] to-[#070B14] shadow-[0_0_50px_rgba(103,232,249,0.18)]'
          : 'border-white/10 bg-[#0B1220]/80 backdrop-blur-xl shadow-xl'
      }`}
    >
      {/* Specular top rim line */}
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
          popular ? 'via-cyan-400/60' : 'via-white/15'
        } to-transparent pointer-events-none`}
      />

      {popular && (
        <div className="absolute top-4 right-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-400/15 border border-cyan-400/30 px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(103,232,249,0.25)]">
            RECOMMENDED
          </span>
        </div>
      )}

      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-slate-400 block mb-1">
          {title} Package
        </span>
        <h3 className="font-heading text-2xl font-bold text-white tracking-tight">{title}</h3>

        <div className="mt-4 flex items-baseline gap-1.5">
          {price === 'Free' ? (
            <span className="font-mono text-4xl font-extrabold text-white">Free</span>
          ) : (
            <>
              <span className="font-mono text-xs text-slate-400">₹</span>
              <span className="font-mono text-4xl font-extrabold text-white">{price}</span>
              <span className="font-mono text-xs text-slate-400">INR</span>
            </>
          )}
        </div>

        {/* Coins Chip */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#070B14] border border-white/10 p-3">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
            <GiTwoCoins size={16} />
          </div>
          <div>
            <span className="font-mono text-sm font-bold text-white">{coins} Coins</span>
            <span className="block text-[10px] font-mono text-slate-400">Credited to Balance</span>
          </div>
        </div>

        {/* Feature Checkpoints */}
        <div className="mt-6 space-y-2.5">
          {features?.map((f, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                <FiCheck size={11} />
              </div>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-white/[0.08]">
        <Button
          variant={popular ? 'primary' : 'secondary'}
          size="md"
          onClick={onBuy}
          disabled={disabled}
          className="w-full text-sm font-semibold"
        >
          {button}
        </Button>
      </div>
    </motion.div>
  )
}

export default PricingCard
