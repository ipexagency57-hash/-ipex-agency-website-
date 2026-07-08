import React from 'react';
import { Tab } from '../types';
import { motion } from 'motion/react';
import { LayoutDashboard, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  applicationCount: number;
}

export default function Navbar({ activeTab, setActiveTab, applicationCount }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems: { id: Tab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'results', label: 'Results' },
    { id: 'apply', label: 'Apply' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0b1e]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => { setActiveTab('home'); setIsOpen(false); }} 
            className="flex cursor-pointer items-center gap-3 transition-transform hover:scale-[1.02]"
          >
            {/* High fidelity SVG Logo matching screenshot */}
            <svg className="h-10 w-10 sm:h-11 sm:w-11" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGrad" x1="15%" y1="85%" x2="85%" y2="15%">
                  <stop offset="0%" stopColor="#eab308" />
                  <stop offset="30%" stopColor="#f97316" />
                  <stop offset="70%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#f97316" floodOpacity="0.35" />
                  <feDropShadow dx="0" dy="0" stdDeviation="0.5" floodColor="#ef4444" floodOpacity="0.15" />
                </filter>
              </defs>
              <g filter="url(#logoGlow)">
                {/* Top Comb (Yellow/Orange to Red) */}
                <path 
                  d="M 20 58 L 20 31 L 50 16 L 66 24" 
                  stroke="url(#logoGrad)" 
                  strokeWidth="6.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M 20 40 L 44 28 L 56 34" 
                  stroke="url(#logoGrad)" 
                  strokeWidth="6.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M 20 49 L 38 40 L 46 44" 
                  stroke="url(#logoGrad)" 
                  strokeWidth="6.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                
                {/* Bottom Comb & Arrow (Orange to Red) */}
                <path 
                  d="M 38 51 C 30 51 30 69 38 69 L 50 75 L 80 60 L 80 37 L 92 31" 
                  stroke="url(#logoGrad)" 
                  strokeWidth="6.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* Filled Arrowhead */}
                <polygon 
                  points="92,31 82,28 88,40" 
                  fill="url(#logoGrad)" 
                />
                {/* Inner Loop */}
                <path 
                  d="M 46 59 C 40 59 40 69 46 69 L 50 71 L 66 63" 
                  stroke="url(#logoGrad)" 
                  strokeWidth="6.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </g>
            </svg>
            <span className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              iPex <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Agency</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="relative px-3 py-2 text-base font-medium transition-colors duration-200"
                  >
                    <span className={isActive ? "text-orange-400 font-semibold" : "text-gray-400 hover:text-white"}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Portal Access */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Portal</span>
              {applicationCount > 0 && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {applicationCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Hamburguer button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium border ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 border-transparent text-white'
                  : 'bg-white/5 border-white/10 text-white'
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Portal</span>
              {applicationCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {applicationCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-b border-white/10 bg-[#0a0b1e]/95 py-4"
        >
          <div className="space-y-1 px-4">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-400 border-l-2 border-orange-500 pl-3' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
