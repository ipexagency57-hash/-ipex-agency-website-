import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import ResultsView from './components/ResultsView';
import ApplyView from './components/ApplyView';
import AdminPanel from './components/AdminPanel';
import { Tab, Application, ProofScreenshot, Testimonial, SiteConfig } from './types';
import { INITIAL_PROOF_SCREENSHOTS, INITIAL_TESTIMONIALS, INITIAL_SITE_CONFIG } from './data/initialData';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, Shield, Heart, MessageSquare } from 'lucide-react';

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
  const [proofs, setProofs] = useState<ProofScreenshot[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);

  // Load and save localStorage for applications
  useEffect(() => {
    const savedApps = localStorage.getItem('ipex_applications_v1');
    if (savedApps) {
      try {
        setApplications(JSON.parse(savedApps));
      } catch (e) {
        setApplications(INITIAL_APPLICATIONS);
      }
    } else {
      setApplications(INITIAL_APPLICATIONS);
      localStorage.setItem('ipex_applications_v1', JSON.stringify(INITIAL_APPLICATIONS));
    }

    const savedProofs = localStorage.getItem('ipex_proofs_v1');
    if (savedProofs) {
      try {
        setProofs(JSON.parse(savedProofs));
      } catch (e) {
        setProofs(INITIAL_PROOF_SCREENSHOTS);
      }
    } else {
      setProofs(INITIAL_PROOF_SCREENSHOTS);
      localStorage.setItem('ipex_proofs_v1', JSON.stringify(INITIAL_PROOF_SCREENSHOTS));
    }

    const savedTestimonials = localStorage.getItem('ipex_testimonials_v1');
    if (savedTestimonials) {
      try {
        setTestimonials(JSON.parse(savedTestimonials));
      } catch (e) {
        setTestimonials(INITIAL_TESTIMONIALS);
      }
    } else {
      setTestimonials(INITIAL_TESTIMONIALS);
      localStorage.setItem('ipex_testimonials_v1', JSON.stringify(INITIAL_TESTIMONIALS));
    }

    const savedConfig = localStorage.getItem('ipex_site_config_v1');
    if (savedConfig) {
      try {
        setSiteConfig(JSON.parse(savedConfig));
      } catch (e) {
        setSiteConfig(INITIAL_SITE_CONFIG);
      }
    } else {
      setSiteConfig(INITIAL_SITE_CONFIG);
      localStorage.setItem('ipex_site_config_v1', JSON.stringify(INITIAL_SITE_CONFIG));
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
    setProofs(INITIAL_PROOF_SCREENSHOTS);
    localStorage.setItem('ipex_proofs_v1', JSON.stringify(INITIAL_PROOF_SCREENSHOTS));
    setTestimonials(INITIAL_TESTIMONIALS);
    localStorage.setItem('ipex_testimonials_v1', JSON.stringify(INITIAL_TESTIMONIALS));
    setSiteConfig(INITIAL_SITE_CONFIG);
    localStorage.setItem('ipex_site_config_v1', JSON.stringify(INITIAL_SITE_CONFIG));
  };

  // Proof Handlers
  const handleAddProof = (newProof: ProofScreenshot) => {
    const updated = [newProof, ...proofs];
    setProofs(updated);
    localStorage.setItem('ipex_proofs_v1', JSON.stringify(updated));
  };

  const handleDeleteProof = (id: string) => {
    const updated = proofs.filter(p => p.id !== id);
    setProofs(updated);
    localStorage.setItem('ipex_proofs_v1', JSON.stringify(updated));
  };

  // Testimonial Handlers
  const handleAddTestimonial = (newTestimonial: Testimonial) => {
    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('ipex_testimonials_v1', JSON.stringify(updated));
  };

  const handleDeleteTestimonial = (id: string) => {
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    localStorage.setItem('ipex_testimonials_v1', JSON.stringify(updated));
  };

  // Site Config Handler
  const handleUpdateSiteConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
    localStorage.setItem('ipex_site_config_v1', JSON.stringify(newConfig));
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
    setScrollY(0);
  }, [activeTab]);

  // Scroll position tracking for smooth background fade on home landing page
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute background opacity: 1 at top of home page, slowly fades away as user scrolls down
  const homeBgOpacity = Math.max(0, Math.min(1, 1 - scrollY / 750));

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a0b1e] text-white antialiased selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* Custom App Background Image - Restricted to Home Page with smooth scroll fade */}
      {activeTab === 'home' && homeBgOpacity > 0 && (
        <div 
          className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-150 ease-out"
          style={{ opacity: homeBgOpacity }}
        >
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-100"
            style={{ backgroundImage: `url('https://i.postimg.cc/XvFgxTxW/Grid-Art-20260801-145811711.jpg')` }}
          />
          {/* Dark gradient overlay for optimal legibility while preserving background graphics */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b1e]/55 via-[#0a0b1e]/40 to-[#0a0b1e]/60" />
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
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
                proofs={proofs}
                testimonials={testimonials}
                siteConfig={siteConfig}
              />
            )}
            {activeTab === 'services' && (
              <ServicesView onApplyClick={() => handleTabChange('apply')} />
            )}
            {activeTab === 'results' && (
              <ResultsView 
                onApplyClick={() => handleTabChange('apply')} 
                proofs={proofs}
                testimonials={testimonials}
                siteConfig={siteConfig}
              />
            )}
            {activeTab === 'apply' && (
              <ApplyView 
                onApplicationSubmit={handleApplicationSubmit}
                siteConfig={siteConfig}
              />
            )}
            {activeTab === 'admin' && (
              <AdminPanel 
                applications={applications}
                onUpdateStatus={handleUpdateStatus}
                onDeleteApplication={handleDeleteApplication}
                onAddApplication={handleAddApplication}
                onResetDatabase={handleResetDatabase}
                proofs={proofs}
                onAddProof={handleAddProof}
                onDeleteProof={handleDeleteProof}
                testimonials={testimonials}
                onAddTestimonial={handleAddTestimonial}
                onDeleteTestimonial={handleDeleteTestimonial}
                siteConfig={siteConfig}
                onUpdateSiteConfig={handleUpdateSiteConfig}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Branding Section */}
      <footer className="relative border-t border-orange-500/20 bg-gradient-to-b from-[#0a0b1e] via-[#060714] to-[#03040a] pt-16 pb-12 text-xs text-gray-400 overflow-hidden">
        {/* Glow Effects matching logo flame theme */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-xl bg-black/60 border border-orange-500/30 shadow-lg shadow-orange-500/10 flex items-center justify-center">
                  <img 
                    src="https://i.postimg.cc/Sjv8CYP6/IMG-20260722-122046.png" 
                    alt="iPex Agency Logo" 
                    className="h-8 w-auto object-contain rounded-md"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-display text-xl font-black tracking-tight text-white">
                  iPex <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-500 bg-clip-text text-transparent">Agency</span>
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-xs">
                Empowering elite content creators with viral social traffic funnels, 24/7 direct messaging sales, and ironclad legal protection.
              </p>

              {/* Quick Social Badges */}
              <div className="pt-2 flex items-center gap-2">
                <a 
                  href="https://tiktok.com/@ipex_agency" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="TikTok @ipex_agency"
                  className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-gray-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all cursor-pointer flex items-center justify-center"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.33 6.33 0 0 0 6.33-6.33V9a8.16 8.16 0 0 0 4.92 1.63V7.18a4.85 4.85 0 0 1-1-.49z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/ipex_agency" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Instagram @ipex_agency"
                  className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-gray-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all cursor-pointer flex items-center justify-center"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="https://reddit.com/r/iPexAgency" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Reddit r/iPexAgency"
                  className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-gray-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all cursor-pointer flex items-center justify-center"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.562-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-display text-xs font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span>Navigation</span>
              </h4>
              <ul className="space-y-2.5 font-medium">
                <li><button onClick={() => handleTabChange('home')} className="hover:text-orange-400 transition-colors cursor-pointer">Home Landing</button></li>
                <li><button onClick={() => handleTabChange('services')} className="hover:text-orange-400 transition-colors cursor-pointer">Agency Services</button></li>
                <li><button onClick={() => handleTabChange('results')} className="hover:text-orange-400 transition-colors cursor-pointer">Verified Results</button></li>
                <li><button onClick={() => handleTabChange('apply')} className="hover:text-orange-400 transition-colors cursor-pointer">Submit Application</button></li>
              </ul>
            </div>

            {/* Column 3: Legal & Standards */}
            <div>
              <h4 className="font-display text-xs font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-orange-400" />
                <span>Compliance & Security</span>
              </h4>
              <ul className="space-y-2.5 font-medium">
                <li className="flex items-center gap-1.5 text-white font-semibold">
                  <span>100% Non-Disclosure Guarantee</span>
                </li>
                <li className="text-gray-400">DMCA Copyright Legal Takedowns</li>
                <li className="text-gray-400">Strict Geoblocking & Privacy Controls</li>
                <li className="text-gray-400">Audited Platform Payout Records</li>
              </ul>
            </div>

            {/* Column 4: Official Social Presence & Direct Contact */}
            <div>
              <h4 className="font-display text-xs font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>Official Socials & Contact</span>
              </h4>
              <ul className="space-y-2.5">
                {/* Instagram Badge */}
                {siteConfig.instagramUrl && (
                  <li>
                    <a 
                      href={siteConfig.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-pink-500/40 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white">
                          <Instagram className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Instagram</span>
                          <span className="text-[10px] font-mono text-gray-400">{siteConfig.instagramHandle || '@ipex_agency'}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
                        Official
                      </span>
                    </a>
                  </li>
                )}

                {/* Telegram Badge */}
                {siteConfig.telegramUrl && (
                  <li>
                    <a 
                      href={siteConfig.telegramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-sky-500/40 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-sky-500 text-white">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Telegram Channel</span>
                          <span className="text-[10px] font-mono text-gray-400">{siteConfig.telegramHandle || '@ipexagency'}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                        Direct
                      </span>
                    </a>
                  </li>
                )}

                {/* Reddit Badge */}
                {siteConfig.redditUrl && (
                  <li>
                    <a 
                      href={siteConfig.redditUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-orange-500/40 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-orange-600 text-white">
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.562-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Reddit</span>
                          <span className="text-[10px] font-mono text-gray-400">{siteConfig.redditHandle || 'r/iPexAgency'}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                        Community
                      </span>
                    </a>
                  </li>
                )}

                {/* Twitter / X Badge */}
                {siteConfig.twitterUrl && (
                  <li>
                    <a 
                      href={siteConfig.twitterUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-gray-400 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-white/10 text-white flex items-center justify-center w-7 h-7">
                          <span className="text-xs font-black">X</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">X (Twitter)</span>
                          <span className="text-[10px] font-mono text-gray-400">{siteConfig.twitterHandle || '@ipex_agency'}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-gray-300 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
                        Official
                      </span>
                    </a>
                  </li>
                )}

                {/* OnlyFans Demo Account Badge */}
                {siteConfig.onlyfansUrl && (
                  <li>
                    <a 
                      href={siteConfig.onlyfansUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-sky-400 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center w-7 h-7">
                          <span className="text-xs font-black">OF</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">OnlyFans Demo</span>
                          <span className="text-[10px] font-mono text-gray-400">{siteConfig.onlyfansHandle || 'onlyfans.com/ipex_agency'}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                        Demo
                      </span>
                    </a>
                  </li>
                )}

                {/* WhatsApp & Email */}
                <li className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-white/5">
                  {siteConfig.managerWhatsapp && (
                    <a 
                      href={`https://wa.me/${siteConfig.managerWhatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-mono text-xs font-bold transition-colors"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.216 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>{siteConfig.managerWhatsapp}</span>
                    </a>
                  )}
                  <div className="flex items-center gap-1 text-gray-400 font-mono text-[10px]">
                    <Mail className="h-3 w-3 text-orange-400" />
                    <span>{siteConfig.supportEmail || siteConfig.managerEmail || 'contact@ipexagency.io'}</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright signature */}
          <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500">
            <span className="font-mono text-[10px]">
              © {new Date().getFullYear()} iPEX CREATOR GROUP S.L. ALL RIGHTS RESERVED.
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
              <span>for elite OnlyFans creators.</span>
            </div>
          </div>

        </div>
      </footer>

      </div>
    </div>
  );
}
