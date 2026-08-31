import React from 'react';
import { Tab } from '../types';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  applicationCount?: number;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
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
            <img 
              src="https://i.postimg.cc/Sjv8CYP6/IMG-20260722-122046.png" 
              alt="iPex Agency Logo" 
              className="h-10 w-auto object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
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
                    className="relative px-3 py-2 text-base font-medium transition-colors duration-200 cursor-pointer"
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

            {/* Quick Apply CTA */}
            <button
              onClick={() => setActiveTab('apply')}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20 hover:opacity-90"
            >
              <span>Apply Now</span>
            </button>
          </div>

          {/* Mobile Hamburger button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
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
