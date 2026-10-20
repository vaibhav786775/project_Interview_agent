import React, { forwardRef } from 'react'

export const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    containerClassName = '',
    type = 'text',
    disabled = false,
    ...props
  },
  ref
) {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-xs font-medium text-slate-300 mb-1.5 tracking-wide">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            {typeof Icon === 'function' ? <Icon size={16} /> : Icon}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={`w-full bg-[#0B1220]/80 border ${
            error
              ? 'border-rose-500/50 focus:border-rose-400 focus:ring-rose-500/20'
              : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-500/20'
          } rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-200 focus:ring-2 focus:bg-[#111A2B] disabled:opacity-50 disabled:cursor-not-allowed ${
            Icon && iconPosition === 'left' ? 'pl-10' : ''
          } ${Icon && iconPosition === 'right' ? 'pr-10' : ''} ${className}`}
          {...props}
        />

        {Icon && iconPosition === 'right' && (
          <div className="absolute right-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            {typeof Icon === 'function' ? <Icon size={16} /> : Icon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400 mt-1.5">{helperText}</p>
      ) : null}
    </div>
  )
})

export default Input
