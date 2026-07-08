import React from 'react';
import { motion } from 'motion/react';

export default function GrowthChart() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-950 to-[#0c0d28] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group w-full max-w-lg mx-auto">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <h3 className="text-center font-display text-xl sm:text-2xl font-black tracking-wider text-white mb-6 uppercase">
        Compounding Growth Curve
      </h3>

      {/* Main SVG Graphic representing the Upward Growth Chart */}
      <div className="relative w-full h-56 sm:h-64 flex items-center justify-center">
        <svg 
          className="w-full h-full overflow-visible filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]" 
          viewBox="0 0 320 220" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Golden bar gradients */}
            <linearGradient id="goldBarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            {/* Glowing Arrow Gradient */}
            <linearGradient id="goldArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>

            {/* Drop shadow filter for arrow */}
            <filter id="arrowGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#f59e0b" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Grid back lines */}
          {[40, 80, 120, 160].map((y, idx) => (
            <line 
              key={idx} 
              x1="20" 
              y1={y} 
              x2="300" 
              y2={y} 
              stroke="rgba(255, 255, 255, 0.05)" 
              strokeWidth="1.5" 
              strokeDasharray="4,4" 
            />
          ))}

          {/* 5 Golden Upward Bars */}
          {/* Bar 1 */}
          <rect 
            x="40" 
            y="170" 
            width="28" 
            height="30" 
            rx="4" 
            fill="url(#goldBarGrad)" 
            className="transition-all duration-300 hover:brightness-110 cursor-pointer"
          />
          {/* Bar 2 */}
          <rect 
            x="95" 
            y="140" 
            width="28" 
            height="60" 
            rx="4" 
            fill="url(#goldBarGrad)" 
            className="transition-all duration-300 hover:brightness-110 cursor-pointer"
          />
          {/* Bar 3 */}
          <rect 
            x="150" 
            y="110" 
            width="28" 
            height="90" 
            rx="4" 
            fill="url(#goldBarGrad)" 
            className="transition-all duration-300 hover:brightness-110 cursor-pointer"
          />
          {/* Bar 4 */}
          <rect 
            x="205" 
            y="75" 
            width="28" 
            height="125" 
            rx="4" 
            fill="url(#goldBarGrad)" 
            className="transition-all duration-300 hover:brightness-110 cursor-pointer"
          />
          {/* Bar 5 */}
          <rect 
            x="260" 
            y="40" 
            width="28" 
            height="160" 
            rx="4" 
            fill="url(#goldBarGrad)" 
            className="transition-all duration-300 hover:brightness-110 cursor-pointer"
          />

          {/* Base bottom line */}
          <line x1="20" y1="200" x2="300" y2="200" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />

          {/* Zigzagging Golden Arrow Upward */}
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            d="M 54 165 L 109 130 L 164 100 L 219 65 L 274 30 L 285 42 M 274 30 L 261 24" 
            stroke="url(#goldArrowGrad)" 
            strokeWidth="7.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#arrowGlow)"
          />

          {/* Glowing Arrowhead tip dot */}
          <circle cx="274" cy="30" r="5" fill="#ffffff" />
        </svg>

        {/* Floating text stats in chart area */}
        <div className="absolute top-8 left-12 bg-black/60 border border-white/5 px-2.5 py-1 rounded-md text-[10px] font-mono text-amber-400">
          MONTH 1: BASELINE
        </div>
        <div className="absolute top-2 right-12 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md text-[10px] font-mono text-white font-bold">
          MONTH 5: TOP 0.1%
        </div>
      </div>

      {/* Footer text */}
      <div className="mt-4 text-center">
        <span className="font-display text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 uppercase tracking-widest">
          Exponential Yield
        </span>
        <p className="text-xs text-gray-500 font-mono mt-1 tracking-wide">
          COMPOUNDED TRAFFIC SYSTEM • ZERO PLATEAUS
        </p>
      </div>
    </div>
  );
}
