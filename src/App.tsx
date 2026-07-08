import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import ResultsView from './components/ResultsView';
import ApplyView from './components/ApplyView';
import AdminPanel from './components/AdminPanel';
import { Tab, Application } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, Shield, Heart } from 'lucide-react';

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'IPEX-2026-3829',
    fullName: 'Amelia Rose',
    email: 'amelia.rose@creators.io',
    instagram: 'amelia_rose_official',
    tiktok: 'amelia_reels',
    currentRevenue: 2500,
    hasOnlyFans: true,
    ofLink: 'https://onlyfans.com/amelia_rose_official',
    hoursPerWeek: 15,
    biggestChallenge: 'chatting',
    status: 'pending',
    dateSubmitted: '2026-07-06T14:22:00.000Z',
    notes: 'I have a solid Instagram following of 42k, but I struggle to find time to answer messages and do direct sales. My revenue has been stuck at around $2,500/mo for a long time. I need full operational chatting support!'
  },
  {
    id: 'IPEX-2026-7294',
    fullName: 'Sasha V.',
    email: 'sashav@models.net',
    instagram: 'sashav_lifestyle',
    tiktok: 'sasha_fit',
    currentRevenue: 0,
    hasOnlyFans: false,
    hoursPerWeek: 25,
    biggestChallenge: 'traffic',
    status: 'reviewing',
    dateSubmitted: '2026-07-07T09:15:30.000Z',
    notes: 'I am brand new to OnlyFans and looking to establish a professional setup. I have a fitness-focused TikTok account with 110k followers that gets highly viral traction. I want to build a highly optimized OnlyFans funnel safely, keeping my local state geo-blocked for absolute privacy.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [applications, setApplications] = useState<Application[]>([]);

  // Load and save localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ipex_applications_v1');
    if (saved) {
      try {
        setApplications(JSON.parse(saved));
      } catch (e) {
        setApplications(INITIAL_APPLICATIONS);
      }
    } else {
      setApplications(INITIAL_APPLICATIONS);
      localStorage.setItem('ipex_applications_v1', JSON.stringify(INITIAL_APPLICATIONS));
    }
  }, []);

  const saveToStorage = (updatedApps: Application[]) => {
    setApplications(updatedApps);
    localStorage.setItem('ipex_applications_v1', JSON.stringify(updatedApps));
  };

  const handleApplicationSubmit = (app: Application) => {
    const updated = [app, ...applications];
    saveToStorage(updated);
  };

  const handleUpdateStatus = (id: string, status: Application['status'], notes?: string) => {
    const updated = applications.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status,
          notes: notes !== undefined ? notes : app.notes
        };
      }
      return app;
    });
    saveToStorage(updated);
  };

  const handleDeleteApplication = (id: string) => {
    const updated = applications.filter(app => app.id !== id);
    saveToStorage(updated);
  };

  const handleAddApplication = (app: Application) => {
    const updated = [app, ...applications];
    saveToStorage(updated);
  };

  const handleResetDatabase = () => {
    saveToStorage(INITIAL_APPLICATIONS);
  };

  const handleTabChange = (tab: Tab) => {
    if (tab === 'apply') {
      window.open('https://wa.me/237652950944', '_blank');
    }
    setActiveTab(tab);
  };

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0b1e] text-white antialiased selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* Dynamic Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        applicationCount={applications.filter(a => a.status === 'pending').length}
      />

      {/* Main Viewport Content Area with sliding transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && (
              <HomeView 
                onApplyClick={() => handleTabChange('apply')} 
                onServicesClick={() => setActiveTab('services')} 
              />
            )}
            {activeTab === 'services' && (
              <ServicesView onApplyClick={() => handleTabChange('apply')} />
            )}
            {activeTab === 'results' && (
              <ResultsView onApplyClick={() => handleTabChange('apply')} />
            )}
            {activeTab === 'apply' && (
              <ApplyView 
                onApplicationSubmit={handleApplicationSubmit}
                onGoToPortal={() => setActiveTab('admin')}
              />
            )}
            {activeTab === 'admin' && (
              <AdminPanel 
                applications={applications}
                onUpdateStatus={handleUpdateStatus}
                onDeleteApplication={handleDeleteApplication}
                onAddApplication={handleAddApplication}
                onResetDatabase={handleResetDatabase}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Branding Section */}
      <footer className="border-t border-white/5 bg-[#070817] py-16 text-xs text-gray-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {/* SVG Logo icon matching screenshot */}
                <svg className="h-7 w-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="15%" y1="85%" x2="85%" y2="15%">
                      <stop offset="0%" stopColor="#eab308" />
                      <stop offset="30%" stopColor="#f97316" />
                      <stop offset="70%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                    <filter id="footerLogoGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#f97316" floodOpacity="0.35" />
                    </filter>
                  </defs>
                  <g filter="url(#footerLogoGlow)">
                    {/* Top Comb (Yellow/Orange to Red) */}
                    <path 
                      d="M 20 58 L 20 31 L 50 16 L 66 24" 
                      stroke="url(#footerLogoGrad)" 
                      strokeWidth="6.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    <path 
                      d="M 20 40 L 44 28 L 56 34" 
                      stroke="url(#footerLogoGrad)" 
                      strokeWidth="6.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    <path 
                      d="M 20 49 L 38 40 L 46 44" 
                      stroke="url(#footerLogoGrad)" 
                      strokeWidth="6.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    
                    {/* Bottom Comb & Arrow (Orange to Red) */}
                    <path 
                      d="M 38 51 C 30 51 30 69 38 69 L 50 75 L 80 60 L 80 37 L 92 31" 
                      stroke="url(#footerLogoGrad)" 
                      strokeWidth="6.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    {/* Filled Arrowhead */}
                    <polygon 
                      points="92,31 82,28 88,40" 
                      fill="url(#footerLogoGrad)" 
                    />
                    {/* Inner Loop */}
                    <path 
                      d="M 46 59 C 40 59 40 69 46 69 L 50 71 L 66 63" 
                      stroke="url(#footerLogoGrad)" 
                      strokeWidth="6.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </g>
                </svg>
                <span className="font-display text-lg font-bold tracking-tight text-white">
                  iPex <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Agency</span>
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-xs">
                Empowering world-class creators with optimized marketing channels, elite chatting operations, and premium security frameworks.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
              <ul className="space-y-2.5 font-medium">
                <li><button onClick={() => handleTabChange('home')} className="hover:text-white transition-colors">Home Landing</button></li>
                <li><button onClick={() => handleTabChange('services')} className="hover:text-white transition-colors">Agency Services</button></li>
                <li><button onClick={() => handleTabChange('results')} className="hover:text-white transition-colors">Verified Results</button></li>
                <li><button onClick={() => handleTabChange('apply')} className="hover:text-white transition-colors">Submit Application</button></li>
              </ul>
            </div>

            {/* Column 3: Legal & Standards */}
            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">Confidentiality & Compliance</h4>
              <ul className="space-y-2.5 font-medium">
                <li className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-orange-500" />
                  <span>100% Non-Disclosure Guaranteed</span>
                </li>
                <li><span>DMCA Copyright Law Protection</span></li>
                <li><span>Strict regional IP Geo-blocking</span></li>
                <li><span>Verified creator banking protocols</span></li>
              </ul>
            </div>

            {/* Column 4: Reach out */}
            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">Corporate Office</h4>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2">
                  <a 
                    href="https://wa.me/237652950944"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.216 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="font-semibold">+237 652 950 944</span>
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-300 font-medium">contact@ipexagency.io</span>
                </li>
                <li className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-300 font-medium font-mono text-xs">@ipex_agency</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright signature */}
          <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600">
            <span className="font-mono text-[10px]">
              © {new Date().getFullYear()} iPEX CREATOR GROUP S.L. ALL RIGHTS RESERVED.
            </span>
            <div className="flex items-center gap-1 text-[10px] font-mono">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
              <span>for elite OnlyFans creators.</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
