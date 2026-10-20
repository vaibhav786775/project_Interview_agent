import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export function Timer({ timeLeft, totalTime }) {
  const percentage = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0
  const isLowTime = timeLeft <= 15

  return (
    <div
      className={`w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center shrink-0 rounded-full transition-all duration-300 ${
        isLowTime ? 'shadow-[0_0_20px_rgba(251,113,133,0.3)]' : 'shadow-[0_0_15px_rgba(103,232,249,0.15)]'
      }`}
    >
      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: '22px',
          pathColor: isLowTime ? '#FB7185' : '#67E8F9',
          textColor: isLowTime ? '#FB7185' : '#F1F5F9',
          trailColor: 'rgba(255, 255, 255, 0.08)',
          strokeLinecap: 'round',
          pathTransition: 'stroke-dashoffset 0.5s ease 0s',
        })}
        className="font-mono tabular-nums font-bold select-none"
      />
    </div>
  )
}

export default Timer
