import React from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, 
  Twitter, 
  Link as LinkIcon, 
  Globe, 
  Coins, 
  Key, 
  ArrowDown
} from 'lucide-react';

export default function MarketingFunnel() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-950 to-[#0f1131] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group w-full max-w-2xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <h3 className="text-center font-display text-xl sm:text-2xl font-black tracking-wider text-white mb-10 uppercase">
        OnlyFans Marketing Funnel
      </h3>

      {/* Funnel Visual Stack */}
      <div className="relative w-full flex flex-col items-center gap-4">
        
        {/* Row 1: AWARENESS */}
        <motion.div 
          className="relative w-full max-w-[480px] h-28 sm:h-32 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 px-6 overflow-hidden shadow-lg hover:brightness-105 transition-all cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          {/* Funnel 3D slant borders */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-white/30" />
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-black/10" />

          {/* Left Text */}
          <div className="absolute left-4 sm:left-8 text-left max-w-[140px] sm:max-w-[180px]">
            <span className="font-mono text-[10px] font-bold tracking-widest text-amber-950/80 uppercase block">
              Stage 01
            </span>
            <h4 className="font-display text-sm sm:text-base font-black tracking-tight leading-tight uppercase">
              Awareness
            </h4>
            <span className="text-[10px] sm:text-xs font-semibold text-amber-950/70">
              (Social Media Reach)
            </span>
          </div>

          {/* Icons (TikTok, Instagram, Twitter/X) */}
          <div className="flex items-center gap-4 sm:gap-6 ml-24 sm:ml-32">
            {/* TikTok Icon (SVG) */}
            <div className="p-2 sm:p-3 rounded-xl bg-slate-950 text-white shadow-md hover:scale-110 transition-transform">
              <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.94-1.78-.22-.22-.41-.47-.59-.73v5.02c0 3.71-2.28 7.3-6.13 8.22-3.75.9-7.91-.96-9.37-4.65-1.46-3.69-.15-8.45 3.32-10.4 1.11-.62 2.37-.9 3.64-.9v4.03c-1.59.07-3.23.95-3.89 2.45-.71 1.63-.12 3.8 1.34 4.77 1.46.97 3.64.67 4.67-.82.35-.5.53-1.1.51-1.72V.02z" />
              </svg>
            </div>
            {/* Instagram */}
            <div className="p-2 sm:p-3 rounded-xl bg-slate-950 text-white shadow-md hover:scale-110 transition-transform">
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            {/* Twitter/X */}
            <div className="p-2 sm:p-3 rounded-xl bg-slate-950 text-white shadow-md hover:scale-110 transition-transform">
              <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>
        </motion.div>

        {/* Dynamic Connecting Arrow with Flow text */}
        <div className="flex items-center justify-between w-full max-w-[380px] px-4 -my-1 text-xs font-mono text-gray-500">
          <div className="flex-grow h-[1px] bg-white/5 mr-4" />
          <div className="flex items-center gap-1.5 text-amber-500 bg-amber-500/5 px-2.5 py-1 rounded-full border border-amber-500/10">
            <ArrowDown className="h-3 w-3 animate-bounce" />
            <span>Traffic Flow</span>
          </div>
          <div className="flex-grow h-[1px] bg-white/5 ml-4" />
        </div>

        {/* Row 2: INTEREST */}
        <motion.div 
          className="relative w-full max-w-[380px] h-24 sm:h-28 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-slate-950 px-6 overflow-hidden shadow-lg hover:brightness-105 transition-all cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute top-0 inset-x-0 h-[2px] bg-white/30" />
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-black/10" />

          {/* Left Text */}
          <div className="absolute left-4 sm:left-6 text-left max-w-[120px]">
            <span className="font-mono text-[10px] font-bold tracking-widest text-orange-950/80 uppercase block">
              Stage 02
            </span>
            <h4 className="font-display text-sm sm:text-base font-black tracking-tight leading-tight uppercase">
              Interest
            </h4>
            <span className="text-[10px] text-orange-950/70 leading-tight block">
              (Link in Bio / Landing)
            </span>
          </div>

          {/* Icons (Link, Web page) */}
          <div className="flex items-center gap-4 ml-24 sm:ml-28">
            {/* Link Icon */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950 text-white shadow-md hover:scale-110 transition-transform">
              <LinkIcon className="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5" />
            </div>
            {/* Website Mockup Icon */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950 text-white shadow-md hover:scale-110 transition-transform">
              <Globe className="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5" />
            </div>
          </div>
        </motion.div>

        {/* Dynamic Connecting Arrow 2 */}
        <div className="flex items-center justify-between w-full max-w-[280px] px-4 -my-1 text-xs font-mono text-gray-500">
          <div className="flex-grow h-[1px] bg-white/5 mr-4" />
          <div className="flex items-center gap-1.5 text-red-500 bg-red-500/5 px-2.5 py-1 rounded-full border border-red-500/10">
            <ArrowDown className="h-3 w-3 animate-bounce" />
            <span>Paid Subscribers</span>
          </div>
          <div className="flex-grow h-[1px] bg-white/5 ml-4" />
        </div>

        {/* Row 3: CONVERSION */}
        <motion.div 
          className="relative w-full max-w-[280px] h-20 sm:h-24 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white px-6 overflow-hidden shadow-lg hover:brightness-105 transition-all cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute top-0 inset-x-0 h-[2px] bg-white/30" />
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-black/10" />

          {/* Left Text */}
          <div className="absolute left-4 sm:left-6 text-left max-w-[100px]">
            <span className="font-mono text-[9px] font-bold tracking-widest text-red-100/80 uppercase block">
              Stage 03
            </span>
            <h4 className="font-display text-xs sm:text-sm font-black tracking-tight leading-tight uppercase">
              Conversion
            </h4>
            <span className="text-[9px] text-red-100/70">
              (OnlyFans Sub)
            </span>
          </div>

          {/* Icons (Key, Coins) */}
          <div className="flex items-center gap-3 ml-20 sm:ml-24">
            {/* Key / Lock */}
            <div className="p-1.5 sm:p-2 rounded-lg bg-slate-950 text-white shadow-md hover:scale-110 transition-transform">
              <Key className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            {/* Coins */}
            <div className="p-1.5 sm:p-2 rounded-lg bg-slate-950 text-white shadow-md hover:scale-110 transition-transform">
              <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Footer descriptor info */}
      <div className="mt-8 text-center pt-6 border-t border-white/5 w-full">
        <p className="text-xs text-gray-400 leading-relaxed max-w-md mx-auto">
          Our specialized conversion blueprint automates the flow of high-ticket audience pools across every funnel drop-off stage, maximizing your <strong className="text-white">Earnings-per-Visitor</strong> ratio.
        </p>
      </div>

    </div>
  );
}
