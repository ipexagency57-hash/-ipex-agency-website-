import React from 'react';
import { motion } from 'motion/react';

export default function PrivacyShield() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-950 to-[#0e102e] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/15 transition-colors duration-500" />
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/15 transition-colors duration-500" />

      {/* Title */}
      <h3 className="text-center font-display text-xl sm:text-2xl font-black tracking-wider text-white mb-8 uppercase">
        Data Privacy Protection
      </h3>

      {/* Shield Container */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Glow behind the shield */}
        <div className="absolute inset-4 rounded-full bg-orange-500/5 blur-xl group-hover:scale-110 transition-transform duration-700" />

        {/* High-fidelity Shield SVG matching screenshot */}
        <svg 
          className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
          viewBox="0 0 200 220" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Shield Gradients */}
            <linearGradient id="shieldOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <linearGradient id="shieldInnerLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            <linearGradient id="shieldInnerRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>

            {/* Lock Gradients */}
            <linearGradient id="lockBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            <linearGradient id="lockShackle" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>

          {/* Outer Shield Border */}
          <path 
            d="M 100 10 C 135 10, 175 25, 175 45 C 175 105, 150 170, 100 205 C 50 170, 25 105, 25 45 C 25 25, 65 10, 100 10 Z" 
            stroke="url(#shieldOuterGrad)" 
            strokeWidth="8" 
            fill="#090a16" 
            strokeLinejoin="round"
          />

          {/* Inner Shield (Divided Left/Right) */}
          <g>
            {/* Left Side (White/Silver Gradient) */}
            <path 
              d="M 100 22 C 125 22, 160 33, 160 48 C 160 98, 140 152, 100 188 L 100 22 Z" 
              fill="url(#shieldInnerLeft)" 
              opacity="0.9"
            />
            
            {/* Right Side (Orange/Red Gradient) */}
            <path 
              d="M 100 22 L 100 188 C 60 152, 40 98, 40 48 C 40 33, 75 22, 100 22 Z" 
              fill="url(#shieldInnerRight)" 
            />
          </g>

          {/* Shackle (Arch) of the Lock */}
          <path 
            d="M 75 105 L 75 88 C 75 72, 125 72, 125 88 L 125 105" 
            stroke="url(#lockShackle)" 
            strokeWidth="11" 
            strokeLinecap="round" 
            fill="none"
          />

          {/* Lock Body */}
          <rect 
            x="64" 
            y="100" 
            width="72" 
            height="55" 
            rx="12" 
            fill="url(#lockBody)" 
            stroke="#1e293b" 
            strokeWidth="3.5"
            className="filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
          />

          {/* Lock Keyhole */}
          <circle cx="100" cy="120" r="6" fill="#0f172a" />
          <path d="M 97 122 L 103 122 L 105 138 L 95 138 Z" fill="#0f172a" />
        </svg>

        {/* Lock micro animation loop */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Subtitle / Secure Label */}
      <div className="mt-8 text-center">
        <span className="font-display text-lg sm:text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-orange-400 to-white uppercase filter drop-shadow-sm">
          Secure & Anonymous
        </span>
        <p className="text-xs text-gray-500 font-mono mt-2 tracking-wide">
          ACTIVE REGIONAL SHIELD • 100% EXCLUSIVITY
        </p>
      </div>
    </div>
  );
}
