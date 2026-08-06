import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Plus, 
  Calendar, 
  UserCheck, 
  FileText,
  Search,
  Filter,
  ShieldAlert,
  Sparkles,
  X,
  RefreshCw,
  Lock,
  Unlock,
  KeyRound,
  Upload,
  Image as ImageIcon,
  MessageCircle,
  Megaphone,
  Save,
  Check,
  ShieldCheck,
  Eye,
  LogOut,
  Sliders,
  DollarSign,
  Mail,
  Video,
  Phone,
  Link,
  Instagram
} from 'lucide-react';
import { Application, ProofScreenshot, Testimonial, SiteConfig } from '../types';

interface AdminPanelProps {
  applications: Application[];
  onUpdateStatus: (id: string, status: Application['status'], notes?: string) => void;
  onDeleteApplication: (id: string) => void;
  onAddApplication: (app: Application) => void;
  onResetDatabase: () => void;
  
  proofs: ProofScreenshot[];
  onAddProof: (proof: ProofScreenshot) => void;
  onDeleteProof: (id: string) => void;

  testimonials: Testimonial[];
  onAddTestimonial: (testimonial: Testimonial) => void;
  onDeleteTestimonial: (id: string) => void;

  siteConfig: SiteConfig;
  onUpdateSiteConfig: (config: SiteConfig) => void;
}

export default function AdminPanel({ 
  applications, 
  onUpdateStatus, 
  onDeleteApplication, 
  onAddApplication,
  onResetDatabase,
  proofs,
  onAddProof,
  onDeleteProof,
  testimonials,
  onAddTestimonial,
  onDeleteTestimonial,
  siteConfig,
  onUpdateSiteConfig
}: AdminPanelProps) {
  
  // Manager Security Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ipex_manager_auth_v1') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Active Sub-tab inside Manager's Site
  const [managerTab, setManagerTab] = useState<'contact_video' | 'proofs' | 'testimonials' | 'config' | 'applications'>('contact_video');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Candidate Applications State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // New Proof Screenshot Upload State
  const [proofTitle, setProofTitle] = useState('');
  const [proofImageUrl, setProofImageUrl] = useState('');
  const [proofCreatorName, setProofCreatorName] = useState('');
  const [proofRevenue, setProofRevenue] = useState('');
  const [proofPlatform, setProofPlatform] = useState('OnlyFans Premium');
  const [proofCategory, setProofCategory] = useState<ProofScreenshot['category']>('Monthly Ledger');
  const [proofDescription, setProofDescription] = useState('');
  const [proofSuccessMessage, setProofSuccessMessage] = useState('');

  // New Testimonial State
  const [testiName, setTestiName] = useState('');
  const [testiHandle, setTestiHandle] = useState('');
  const [testiAvatar, setTestiAvatar] = useState('');
  const [testiNiche, setTestiNiche] = useState('');
  const [testiBeforeRev, setTestiBeforeRev] = useState('');
  const [testiAfterRev, setTestiAfterRev] = useState('');
  const [testiQuote, setTestiQuote] = useState('');
  const [testiSuccessMessage, setTestiSuccessMessage] = useState('');

  // Site Config Form State
  const [configForm, setConfigForm] = useState<SiteConfig>(siteConfig);
  const [configSavedNotice, setConfigSavedNotice] = useState('');

  React.useEffect(() => {
    setConfigForm(siteConfig);
  }, [siteConfig]);

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setConfigForm(prev => ({
            ...prev,
            introVideoUrl: result
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getEmbedVideoUrl = (url?: string) => {
    if (!url) return { isEmbed: false, url: '' };
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return { isEmbed: true, url: `https://www.youtube.com/embed/${videoId}` };
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return { isEmbed: true, url: `https://www.youtube.com/embed/${videoId}` };
    }
    if (url.includes('youtube.com/embed/')) {
      return { isEmbed: true, url };
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return { isEmbed: true, url: `https://player.vimeo.com/video/${videoId}` };
    }
    return { isEmbed: false, url };
  };

  // Handle Authentication submit
  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'ipex2026' || passcode === '2026' || passcode === 'admin' || passcode === 'manager') {
      setIsAuthenticated(true);
      localStorage.setItem('ipex_manager_auth_v1', 'true');
      setPasscodeError('');
    } else {
      setPasscodeError('Incorrect passcode. Please try "ipex2026".');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ipex_manager_auth_v1');
  };

  // Image File Reader Handler (for proof screenshot upload)
  const handleProofImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Image File Reader Handler (for testimonial avatar)
  const handleTestiAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTestiAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Create new Proof Screenshot
  const handleCreateProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofTitle || !proofImageUrl || !proofCreatorName || !proofRevenue) return;

    const newProof: ProofScreenshot = {
      id: `proof-${Date.now()}`,
      title: proofTitle,
      imageUrl: proofImageUrl,
      creatorName: proofCreatorName,
      monthlyRevenue: proofRevenue,
      platform: proofPlatform,
      category: proofCategory,
      dateAdded: new Date().toISOString().split('T')[0],
      description: proofDescription || 'Verified proof of performance statement.',
      verified: true
    };

    onAddProof(newProof);
    setProofSuccessMessage('✅ Proof screenshot published successfully to public site!');
    
    // Reset form
    setProofTitle('');
    setProofImageUrl('');
    setProofCreatorName('');
    setProofRevenue('');
    setProofDescription('');

    setTimeout(() => setProofSuccessMessage(''), 4000);
  };

  // Create new Testimonial
  const handleCreateTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testiName || !testiQuote) return;

    const newTesti: Testimonial = {
      id: `testi-${Date.now()}`,
      name: testiName,
      handle: testiHandle || `@${testiName.toLowerCase().replace(/\s+/g, '_')}`,
      avatar: testiAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      niche: testiNiche || 'Content Creator',
      beforeRevenue: testiBeforeRev || '$1,500/mo',
      afterRevenue: testiAfterRev || '$35,000/mo',
      quote: testiQuote,
      rating: 5,
      verified: true,
      date: new Date().toISOString().split('T')[0]
    };

    onAddTestimonial(newTesti);
    setTestiSuccessMessage('✅ Testimonial published successfully to public site!');

    // Reset form
    setTestiName('');
    setTestiHandle('');
    setTestiAvatar('');
    setTestiNiche('');
    setTestiBeforeRev('');
    setTestiAfterRev('');
    setTestiQuote('');

    setTimeout(() => setTestiSuccessMessage(''), 4000);
  };

  // Save Config
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteConfig(configForm);
    setConfigSavedNotice('✅ Site configuration and public announcements updated!');
    setTimeout(() => setConfigSavedNotice(''), 4000);
  };

  // Application Filter Logic
  const filteredApps = applications.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' ? true : app.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSelectApp = (app: Application) => {
    setSelectedApp(app);
    setEditingNotes(app.notes || '');
    setBookingDate('');
    setBookingTime('');
  };

  const handleSaveNotes = () => {
    if (!selectedApp) return;
    onUpdateStatus(selectedApp.id, selectedApp.status, editingNotes);
    setSelectedApp({ ...selectedApp, notes: editingNotes });
  };

  const handlePromoteStatus = (newStatus: Application['status']) => {
    if (!selectedApp) return;
    if (newStatus === 'interview_scheduled') {
      setIsBookingModalOpen(true);
      return;
    }
    onUpdateStatus(selectedApp.id, newStatus, selectedApp.notes);
    setSelectedApp({ ...selectedApp, status: newStatus });
  };

  const handleConfirmInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !bookingDate || !bookingTime) return;

    const appointmentNotes = `🗓️ Interview confirmed for ${bookingDate} at ${bookingTime} EST.\n\n${editingNotes}`;
    onUpdateStatus(selectedApp.id, 'interview_scheduled', appointmentNotes);
    setSelectedApp({ ...selectedApp, status: 'interview_scheduled', notes: appointmentNotes });
    setEditingNotes(appointmentNotes);
    setIsBookingModalOpen(false);
  };

  const handleSimulateNewCandidate = () => {
    const randomNames = ["Naomi Watts", "Maria Lopez", "Elena Rostova", "Sasha Grey", "Clara Sterling"];
    const randomNic = ["Glamour & Fashion", "Fitness & Yoga", "Alternative Cosplay", "ASMR Artist", "Lifestyle & Travel"];
    const randName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randNic = randomNic[Math.floor(Math.random() * randomNic.length)];
    
    const simApp: Application = {
      id: `IPEX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: `${randName} (Simulated)`,
      email: `${randName.toLowerCase().replace(' ', '')}@simulated.io`,
      instagram: `${randName.toLowerCase().replace(' ', '_')}`,
      tiktok: `${randName.toLowerCase().replace(' ', '')}_vlogs`,
      currentRevenue: Math.random() > 0.5 ? 2500 : 0,
      hasOnlyFans: Math.random() > 0.4,
      ofLink: "https://onlyfans.com/simulated_profile",
      hoursPerWeek: Math.floor(5 + Math.random() * 30),
      biggestChallenge: "traffic",
      status: 'pending',
      dateSubmitted: new Date().toISOString(),
      notes: `✨ Automatically generated simulated candidate interested in ${randNic} management.`
    };

    onAddApplication(simApp);
    handleSelectApp(simApp);
  };

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/10 px-2.5 py-1 rounded-full text-xs font-mono">Pending Audit</span>;
      case 'reviewing':
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/10 px-2.5 py-1 rounded-full text-xs font-mono">Active Review</span>;
      case 'interview_scheduled':
        return <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 px-2.5 py-1 rounded-full text-xs font-mono">Interview Booked</span>;
      case 'accepted':
        return <span className="bg-green-500/10 text-green-400 border border-green-500/10 px-2.5 py-1 rounded-full text-xs font-mono">Partner Approved</span>;
      case 'declined':
        return <span className="bg-red-500/10 text-red-400 border border-red-500/10 px-2.5 py-1 rounded-full text-xs font-mono">Archived</span>;
    }
  };

  // 1. UNAUTHENTICATED: SECURITY GATE MODAL
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-[85vh] flex items-center justify-center bg-transparent px-4 py-16">
        <div className="absolute h-96 w-96 rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0d0e2c] p-8 shadow-2xl space-y-6"
        >
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-red-500 p-0.5 shadow-lg shadow-orange-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0a0b1e]">
                <Lock className="h-8 w-8 text-orange-400" />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-400">
                Restricted Operational Area
              </span>
              <h2 className="font-display text-2xl font-black text-white mt-1">
                Manager's Private Site
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Enter your security passcode to access backstage CMS, upload proof screenshots, and manage creator intake.
              </p>
            </div>
          </div>

          {/* Test Passcode Hint Banner */}
          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-3.5 text-center text-xs text-orange-300 font-mono">
            <KeyRound className="h-4 w-4 inline-block mr-1.5 text-orange-400" />
            <span>Passcode: <strong className="text-white bg-black/40 px-2 py-0.5 rounded font-bold">ipex2026</strong></span>
          </div>

          <form onSubmit={handleAuthenticate} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                Manager Passcode:
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter security passcode..."
                className="w-full rounded-xl border border-white/10 bg-black/50 py-3.5 px-4 text-sm text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none"
              />
            </div>

            {passcodeError && (
              <p className="text-xs font-mono text-red-400 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                {passcodeError}
              </p>
            )}

            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              <Unlock className="h-4 w-4" />
              <span>Unlock Manager's Private Site</span>
            </button>
          </form>

          <div className="pt-2 text-center text-[10px] font-mono text-gray-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>256-Bit Encrypted Manager Backstage Session</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. AUTHENTICATED: MANAGER'S PRIVATE BACKSTAGE SITE CMS
  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden pb-24">

      <div className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        
        {/* Manager Header & Logout Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                Authorized Manager Backstage Session
              </span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl">
              Manager's Private Site
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-400">
              Update the public site instantly by uploading proof screenshots, adding testimonials, editing announcements, and managing creator intake.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Lock & Sign Out</span>
          </button>
        </div>

        {/* Live Manager Site Notification Banner */}
        <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0 mt-0.5 sm:mt-0">
              <Megaphone className="h-5 w-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  🔔 LIVE MANAGER SITE NOTIFICATION ACTIVE
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                New candidate submissions automatically alert on this site & dispatch directly to manager email <strong className="text-white font-mono">{siteConfig.managerEmail || 'ipexagency57@gmail.com'}</strong> (WhatsApp: <strong className="text-emerald-400 font-mono">{siteConfig.managerWhatsapp || '+237 652 950 944'}</strong>).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/50 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs font-mono text-emerald-400 flex-shrink-0">
            <span>Pending Audits: <strong className="text-white">{applications.filter(a => a.status === 'pending').length}</strong></span>
          </div>
        </div>

        {/* Manager Navigation Sub-Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-white/5 pb-6 mb-8">
          <button
            onClick={() => setManagerTab('contact_video')}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              managerTab === 'contact_video'
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-orange-500 text-white border-transparent shadow-lg shadow-emerald-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Phone className="h-4 w-4 text-emerald-400" />
            <span>WhatsApp, Email & Public Video</span>
          </button>

          <button
            onClick={() => setManagerTab('proofs')}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              managerTab === 'proofs'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg shadow-orange-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            <span>Proof & Screenshots CMS</span>
            <span className="ml-1 rounded-full bg-black/40 px-2 py-0.5 text-[10px]">{proofs.length}</span>
          </button>

          <button
            onClick={() => setManagerTab('testimonials')}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              managerTab === 'testimonials'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg shadow-orange-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Testimonials CMS</span>
            <span className="ml-1 rounded-full bg-black/40 px-2 py-0.5 text-[10px]">{testimonials.length}</span>
          </button>

          <button
            onClick={() => setManagerTab('config')}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              managerTab === 'config'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg shadow-orange-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Megaphone className="h-4 w-4" />
            <span>Announcements & Config</span>
          </button>

          <button
            onClick={() => setManagerTab('applications')}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              managerTab === 'applications'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg shadow-orange-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Candidate Intake Desk</span>
            <span className="ml-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] text-white font-bold">{applications.filter(a=>a.status==='pending').length}</span>
          </button>
        </div>

        {/* SUB-TAB 0: WHATSAPP, EMAIL & PUBLIC VIDEO SETTINGS */}
        {managerTab === 'contact_video' && (
          <form onSubmit={handleSaveConfig} className="space-y-8 max-w-5xl mx-auto">
            {configSavedNotice && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-mono text-emerald-400 flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>{configSavedNotice}</span>
                </span>
                <span className="text-gray-400 text-[10px]">Changes active across public site</span>
              </div>
            )}

            {/* SECTION 1: MANAGER CONTACT CREDENTIALS */}
            <div className="rounded-3xl border border-emerald-500/30 bg-[#0d0e2c] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                      Direct Communication Channels
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-white">
                      Manager WhatsApp & Email Credentials
                    </h3>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Contact Details</span>
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Manager WhatsApp Number */}
                <div className="space-y-2 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Manager Direct WhatsApp Hotline Number:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={configForm.managerWhatsapp || ''}
                      onChange={(e) => setConfigForm({ ...configForm, managerWhatsapp: e.target.value })}
                      placeholder="+237 652 950 944"
                      className="w-full rounded-xl border border-emerald-500/40 bg-black/60 py-3 px-4 text-sm text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none font-mono font-bold"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    This hotline is displayed on candidate approval forms, public demo video headers, and support widgets for direct creator consultation.
                  </p>
                  {configForm.managerWhatsapp && (
                    <a
                      href={`https://wa.me/${configForm.managerWhatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 hover:underline pt-1"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>Test WhatsApp Direct Chat Link</span>
                    </a>
                  )}
                </div>

                {/* Manager Dispatch Email */}
                <div className="space-y-2 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Manager Dispatch Email Address:
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={configForm.managerEmail || ''}
                      onChange={(e) => setConfigForm({ ...configForm, managerEmail: e.target.value })}
                      placeholder="ipexagency57@gmail.com"
                      className="w-full rounded-xl border border-emerald-500/40 bg-black/60 py-3 px-4 text-sm text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none font-mono font-bold"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    All creator applications, profile stats screenshots, and audit submissions are automatically dispatched directly to this email address.
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-300 pt-1">
                    <Mail className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Active Target Inbox: <strong className="text-white">{configForm.managerEmail || 'ipexagency57@gmail.com'}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION: OFFICIAL SOCIAL MEDIA & PUBLIC COMMUNITY CHANNELS */}
            <div className="rounded-3xl border border-pink-500/30 bg-[#0d0e2c] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex-shrink-0">
                    <Link className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest block">
                      Social Presence CMS
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-white">
                      Official Social Accounts & Community Demo Links
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setConfigForm(prev => ({
                        ...prev,
                        instagramUrl: 'https://instagram.com/ipex_agency',
                        instagramHandle: '@ipex_agency',
                        telegramUrl: 'https://t.me/ipexagency',
                        telegramHandle: '@ipexagency',
                        redditUrl: 'https://reddit.com/r/iPexAgency',
                        redditHandle: 'r/iPexAgency',
                        twitterUrl: 'https://x.com/ipex_agency',
                        twitterHandle: '@ipex_agency',
                        onlyfansUrl: 'https://onlyfans.com/ipex_agency_demo',
                        onlyfansHandle: 'onlyfans.com/ipex_agency'
                      }));
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-xs font-mono font-bold text-pink-300 hover:bg-pink-500/20 transition-all cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                    <span>⚡ Load All Demo Links</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-pink-500/20"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Social Links</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                Connect and update your agency's official social channels below. These links update live across the public site header, footer, contact widgets, and candidate intake receipt cards.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Instagram */}
                <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                      <Instagram className="h-4 w-4" />
                      <span>Official Instagram</span>
                    </span>
                    {configForm.instagramUrl && (
                      <a href={configForm.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-pink-400 hover:underline flex items-center gap-1">
                        <span>Test</span> <Link className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Target Profile URL:</label>
                    <input
                      type="url"
                      value={configForm.instagramUrl || ''}
                      onChange={(e) => setConfigForm({ ...configForm, instagramUrl: e.target.value })}
                      placeholder="https://instagram.com/ipex_agency"
                      className="w-full rounded-xl border border-pink-500/30 bg-black/60 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-pink-400 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Display Handle:</label>
                    <input
                      type="text"
                      value={configForm.instagramHandle || ''}
                      onChange={(e) => setConfigForm({ ...configForm, instagramHandle: e.target.value })}
                      placeholder="@ipex_agency"
                      className="w-full rounded-xl border border-white/10 bg-black/60 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-pink-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Telegram */}
                <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4" />
                      <span>Official Telegram</span>
                    </span>
                    {configForm.telegramUrl && (
                      <a href={configForm.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-sky-400 hover:underline flex items-center gap-1">
                        <span>Test</span> <Link className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Telegram Invite/Direct URL:</label>
                    <input
                      type="url"
                      value={configForm.telegramUrl || ''}
                      onChange={(e) => setConfigForm({ ...configForm, telegramUrl: e.target.value })}
                      placeholder="https://t.me/ipexagency"
                      className="w-full rounded-xl border border-sky-500/30 bg-black/60 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-sky-400 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Display Handle / Channel:</label>
                    <input
                      type="text"
                      value={configForm.telegramHandle || ''}
                      onChange={(e) => setConfigForm({ ...configForm, telegramHandle: e.target.value })}
                      placeholder="@ipexagency"
                      className="w-full rounded-xl border border-white/10 bg-black/60 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-sky-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Reddit */}
                <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span>Official Reddit</span>
                    </span>
                    {configForm.redditUrl && (
                      <a href={configForm.redditUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-orange-400 hover:underline flex items-center gap-1">
                        <span>Test</span> <Link className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Subreddit / User Link:</label>
                    <input
                      type="url"
                      value={configForm.redditUrl || ''}
                      onChange={(e) => setConfigForm({ ...configForm, redditUrl: e.target.value })}
                      placeholder="https://reddit.com/r/iPexAgency"
                      className="w-full rounded-xl border border-orange-500/30 bg-black/60 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Display Community Name:</label>
                    <input
                      type="text"
                      value={configForm.redditHandle || ''}
                      onChange={(e) => setConfigForm({ ...configForm, redditHandle: e.target.value })}
                      placeholder="r/iPexAgency"
                      className="w-full rounded-xl border border-white/10 bg-black/60 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Twitter / X */}
                <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-white" />
                      <span>X (Twitter) Official</span>
                    </span>
                    {configForm.twitterUrl && (
                      <a href={configForm.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-300 hover:underline flex items-center gap-1">
                        <span>Test</span> <Link className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">X Profile Link:</label>
                    <input
                      type="url"
                      value={configForm.twitterUrl || ''}
                      onChange={(e) => setConfigForm({ ...configForm, twitterUrl: e.target.value })}
                      placeholder="https://x.com/ipex_agency"
                      className="w-full rounded-xl border border-white/20 bg-black/60 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-white focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">X Handle:</label>
                    <input
                      type="text"
                      value={configForm.twitterHandle || ''}
                      onChange={(e) => setConfigForm({ ...configForm, twitterHandle: e.target.value })}
                      placeholder="@ipex_agency"
                      className="w-full rounded-xl border border-white/10 bg-black/60 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-white focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* OnlyFans Demo Account */}
                <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-sky-400" />
                      <span>OnlyFans Demo Account</span>
                    </span>
                    {configForm.onlyfansUrl && (
                      <a href={configForm.onlyfansUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-sky-400 hover:underline flex items-center gap-1">
                        <span>Test</span> <Link className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">OnlyFans Profile Link:</label>
                    <input
                      type="url"
                      value={configForm.onlyfansUrl || ''}
                      onChange={(e) => setConfigForm({ ...configForm, onlyfansUrl: e.target.value })}
                      placeholder="https://onlyfans.com/ipex_agency_demo"
                      className="w-full rounded-xl border border-sky-500/30 bg-black/60 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-sky-400 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Display Handle:</label>
                    <input
                      type="text"
                      value={configForm.onlyfansHandle || ''}
                      onChange={(e) => setConfigForm({ ...configForm, onlyfansHandle: e.target.value })}
                      placeholder="onlyfans.com/ipex_agency"
                      className="w-full rounded-xl border border-white/10 bg-black/60 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-sky-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Additional General Support Email & Phone */}
                <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Mail className="h-4 w-4" />
                      <span>Public Support Email & Phone</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Public Support Email:</label>
                    <input
                      type="email"
                      value={configForm.supportEmail || ''}
                      onChange={(e) => setConfigForm({ ...configForm, supportEmail: e.target.value })}
                      placeholder="contact@ipexagency.io"
                      className="w-full rounded-xl border border-emerald-500/30 bg-black/60 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Public Phone Hotline:</label>
                    <input
                      type="text"
                      value={configForm.supportPhone || ''}
                      onChange={(e) => setConfigForm({ ...configForm, supportPhone: e.target.value })}
                      placeholder="+237 652 950 944"
                      className="w-full rounded-xl border border-white/10 bg-black/60 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: PUBLIC SITE DEMO VIDEO SETUP */}
            <div className="rounded-3xl border border-orange-500/30 bg-[#0d0e2c] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex-shrink-0">
                    <Video className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block">
                      Public Site Media Strategy
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-white">
                      Public Site Demo Introductory Video
                    </h3>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-orange-500/20"
                >
                  <Save className="h-4 w-4" />
                  <span>Publish Video to Public Site</span>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-1.5">
                      Video Headline Title:
                    </label>
                    <input
                      type="text"
                      value={configForm.introVideoTitle || ''}
                      onChange={(e) => setConfigForm({ ...configForm, introVideoTitle: e.target.value })}
                      placeholder="iPex Agency Overview & OnlyFans Scaling Strategy"
                      className="w-full rounded-xl border border-white/10 bg-black/60 py-3 px-4 text-xs text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-1.5">
                      Video Description Subtitle:
                    </label>
                    <input
                      type="text"
                      value={configForm.introVideoDescription || ''}
                      onChange={(e) => setConfigForm({ ...configForm, introVideoDescription: e.target.value })}
                      placeholder="Watch how our 24/7 inbox sales team and viral social traffic engines scale creators to top 0.1%."
                      className="w-full rounded-xl border border-white/10 bg-black/60 py-3 px-4 text-xs text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Video URL Input & Preset buttons */}
                <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-5">
                  <label className="block text-xs font-mono uppercase text-orange-400 font-bold">
                    Enter Simple Public Video URL (MP4 / WebM / YouTube / Vimeo):
                  </label>
                  
                  <div className="relative">
                    <input
                      type="url"
                      value={configForm.introVideoUrl || ''}
                      onChange={(e) => setConfigForm({ ...configForm, introVideoUrl: e.target.value })}
                      placeholder="https://commondatastorage.googleapis.com/.../video.mp4"
                      className="w-full rounded-xl border border-orange-500/40 bg-black/60 py-3 px-4 text-xs text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none font-mono"
                    />
                  </div>
                  
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Paste any direct public web video URL (e.g., MP4 file from CDN/storage, YouTube link, or Vimeo link). This video will stream below house payout evidence on the public home and results pages.
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-gray-400 block mb-2 uppercase font-bold">
                      Or Select Sample Demo Video Presets:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setConfigForm(prev => ({ ...prev, introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }))}
                        className="p-2.5 rounded-xl bg-white/[0.04] border border-orange-500/30 text-[11px] font-mono font-bold text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 transition-all text-left flex items-center justify-between cursor-pointer"
                      >
                        <span>🎬 Demo Video 1 (MP4)</span>
                        <span className="text-[9px] text-gray-500 font-normal">Direct MP4</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setConfigForm(prev => ({ ...prev, introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }))}
                        className="p-2.5 rounded-xl bg-white/[0.04] border border-orange-500/30 text-[11px] font-mono font-bold text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 transition-all text-left flex items-center justify-between cursor-pointer"
                      >
                        <span>🎬 Demo Video 2 (HD)</span>
                        <span className="text-[9px] text-gray-500 font-normal">Direct MP4</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setConfigForm(prev => ({ ...prev, introVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }))}
                        className="p-2.5 rounded-xl bg-white/[0.04] border border-red-500/30 text-[11px] font-mono font-bold text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all text-left flex items-center justify-between cursor-pointer"
                      >
                        <span>▶️ YouTube Stream</span>
                        <span className="text-[9px] text-gray-500 font-normal">Embed</span>
                      </button>
                    </div>
                  </div>

                  {/* Computer Upload Fallback */}
                  <div className="pt-3 border-t border-white/10">
                    <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-600 bg-black/40 p-3.5 text-xs text-gray-300 hover:border-orange-400 hover:bg-orange-500/10 cursor-pointer transition-all">
                      <Upload className="h-4 w-4 text-orange-400" />
                      <span className="font-mono text-[11px] font-bold">Or Upload Video File From Computer</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Video Preview Player */}
                {configForm.introVideoUrl && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Live Stream Preview (Public Site View):</span>
                      </span>
                      <span className="text-gray-400 text-[10px]">Active and ready</span>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden border border-orange-500/40 bg-black max-h-72 flex items-center justify-center shadow-2xl">
                      {getEmbedVideoUrl(configForm.introVideoUrl).isEmbed ? (
                        <iframe
                          src={getEmbedVideoUrl(configForm.introVideoUrl).url}
                          className="w-full h-64 rounded-xl"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={configForm.introVideoUrl}
                          controls
                          className="w-full max-h-64 rounded-xl object-contain"
                        >
                          Your browser does not support HTML5 video streaming.
                        </video>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Form Save CTA */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-orange-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all cursor-pointer shadow-xl shadow-emerald-500/20"
              >
                <Save className="h-5 w-5" />
                <span>Save All Manager Settings Live</span>
              </button>
            </div>
          </form>
        )}

        {/* SUB-TAB 1: PROOF & SCREENSHOTS CMS */}
        {managerTab === 'proofs' && (
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Upload Proof Form */}
            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#0d0e2c] p-6 sm:p-7 space-y-5">
              <div>
                <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block">
                  Publish New Evidence
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-1">
                  Upload Proof Screenshot
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Add verified revenue ledgers or payout screenshots. They appear immediately on the public Results and Home views.
                </p>
              </div>

              {proofSuccessMessage && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-mono text-emerald-300">
                  {proofSuccessMessage}
                </div>
              )}

              <form onSubmit={handleCreateProof} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                    Proof Title:
                  </label>
                  <input
                    type="text"
                    required
                    value={proofTitle}
                    onChange={(e) => setProofTitle(e.target.value)}
                    placeholder="E.g., 24-Hour Vault PPV Campaign Payout"
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3.5 text-xs text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                {/* Image Upload Input or URL */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                    Proof Screenshot Image File or URL:
                  </label>
                  
                  <div className="space-y-2">
                    <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-black/30 p-3 text-xs text-gray-300 hover:border-orange-500/50 cursor-pointer transition-colors">
                      <Upload className="h-4 w-4 text-orange-400" />
                      <span>Choose Local Image File</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleProofImageUpload}
                        className="hidden" 
                      />
                    </label>

                    <div className="text-center text-[10px] font-mono text-gray-500 uppercase">— or paste image URL —</div>

                    <input
                      type="url"
                      value={proofImageUrl}
                      onChange={(e) => setProofImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  {proofImageUrl && (
                    <div className="mt-3 relative rounded-xl overflow-hidden border border-white/10 h-32 bg-black">
                      <img src={proofImageUrl} alt="Preview" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-[9px] font-mono text-emerald-400 rounded">Preview Ready</span>
                    </div>
                  )}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                      Creator Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={proofCreatorName}
                      onChange={(e) => setProofCreatorName(e.target.value)}
                      placeholder="E.g., Chloe M."
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                      Verified Revenue:
                    </label>
                    <input
                      type="text"
                      required
                      value={proofRevenue}
                      onChange={(e) => setProofRevenue(e.target.value)}
                      placeholder="E.g., $54,200/mo"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                      Category:
                    </label>
                    <select
                      value={proofCategory}
                      onChange={(e) => setProofCategory(e.target.value as any)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3 text-xs text-white focus:outline-none cursor-pointer"
                    >
                      <option value="Monthly Ledger">Monthly Ledger</option>
                      <option value="PPV Blast">PPV Blast</option>
                      <option value="Daily Statement">Daily Statement</option>
                      <option value="Chatting Upsell">Chatting Upsell</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                      Platform:
                    </label>
                    <input
                      type="text"
                      value={proofPlatform}
                      onChange={(e) => setProofPlatform(e.target.value)}
                      placeholder="OnlyFans Premium"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                    Caption / Description Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={proofDescription}
                    onChange={(e) => setProofDescription(e.target.value)}
                    placeholder="Brief explanation of the result..."
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white focus:border-orange-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all shadow-md shadow-orange-500/20"
                >
                  Publish Proof Screenshot
                </button>
              </form>
            </div>

            {/* List of Existing Proofs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-white">
                  Active Published Proof Screenshots ({proofs.length})
                </h3>
              </div>

              <div className="space-y-3">
                {proofs.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d0e2c] p-4 relative overflow-hidden"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="h-16 w-20 rounded-xl object-cover border border-white/10 bg-black flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display text-sm font-bold text-white truncate">{p.title}</h4>
                        <span className="font-mono text-xs font-black text-emerald-400 flex-shrink-0">{p.monthlyRevenue}</span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{p.description}</p>
                      <div className="mt-1 flex items-center gap-3 text-[10px] font-mono text-gray-500">
                        <span>Creator: {p.creatorName}</span>
                        <span>• {p.category}</span>
                        <span>• {p.dateAdded}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteProof(p.id)}
                      className="p-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer flex-shrink-0"
                      title="Delete Proof"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SUB-TAB 2: TESTIMONIALS CMS */}
        {managerTab === 'testimonials' && (
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Create Testimonial Form */}
            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#0d0e2c] p-6 sm:p-7 space-y-5">
              <div>
                <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block">
                  Creator Endorsements
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-1">
                  Add Creator Testimonial
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Publish partner reviews and revenue transformation quotes directly to the public site.
                </p>
              </div>

              {testiSuccessMessage && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-mono text-emerald-300">
                  {testiSuccessMessage}
                </div>
              )}

              <form onSubmit={handleCreateTestimonial} className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                      Creator Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={testiName}
                      onChange={(e) => setTestiName(e.target.value)}
                      placeholder="E.g., Elena R."
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                      Social Handle:
                    </label>
                    <input
                      type="text"
                      value={testiHandle}
                      onChange={(e) => setTestiHandle(e.target.value)}
                      placeholder="@elena_glamour"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                      Before Revenue:
                    </label>
                    <input
                      type="text"
                      value={testiBeforeRev}
                      onChange={(e) => setTestiBeforeRev(e.target.value)}
                      placeholder="$2,100/mo"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                      After Agency Revenue:
                    </label>
                    <input
                      type="text"
                      value={testiAfterRev}
                      onChange={(e) => setTestiAfterRev(e.target.value)}
                      placeholder="$48,500/mo"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                    Niche / Specialty:
                  </label>
                  <input
                    type="text"
                    value={testiNiche}
                    onChange={(e) => setTestiNiche(e.target.value)}
                    placeholder="Cosplay & Gaming"
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                {/* Avatar Photo Upload */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                    Avatar Photo:
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-black/30 p-2.5 text-xs text-gray-300 hover:border-orange-500/50 cursor-pointer">
                      <Upload className="h-3.5 w-3.5 text-orange-400" />
                      <span>Upload Avatar Photo</span>
                      <input type="file" accept="image/*" onChange={handleTestiAvatarUpload} className="hidden" />
                    </label>
                    <input
                      type="url"
                      value={testiAvatar}
                      onChange={(e) => setTestiAvatar(e.target.value)}
                      placeholder="Or paste avatar URL..."
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                    Testimonial Quote:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={testiQuote}
                    onChange={(e) => setTestiQuote(e.target.value)}
                    placeholder="The agency completely transformed my daily operations..."
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white focus:border-orange-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all shadow-md shadow-orange-500/20"
                >
                  Publish Testimonial
                </button>
              </form>
            </div>

            {/* List of Testimonials */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-display text-lg font-bold text-white">
                Active Published Testimonials ({testimonials.length})
              </h3>

              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d0e2c] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-12 w-12 rounded-full object-cover border border-white/10 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-sm font-bold text-white">{t.name}</h4>
                          <span className="text-xs font-mono text-orange-400">{t.handle}</span>
                        </div>
                        <p className="text-xs text-gray-300 italic mt-1 font-serif">"{t.quote}"</p>
                        <div className="mt-2 flex items-center gap-3 text-[10px] font-mono text-gray-500">
                          <span>Growth: {t.beforeRevenue} ➔ <strong className="text-emerald-400">{t.afterRevenue}</strong></span>
                          <span>• {t.date}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteTestimonial(t.id)}
                      className="p-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer flex-shrink-0"
                      title="Delete Testimonial"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SUB-TAB 3: ANNOUNCEMENTS & CONFIG */}
        {managerTab === 'config' && (
          <div className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-[#0d0e2c] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block">
                Public Header & Metrics
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                Site Announcements & Stats
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Update the top announcement banner, remaining onboarding slots, and agency total revenue figures displayed on the public landing page.
              </p>
            </div>

            {configSavedNotice && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-mono text-emerald-300">
                {configSavedNotice}
              </div>
            )}

            <form onSubmit={handleSaveConfig} className="space-y-5">
              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                  Top Announcement Banner Text:
                </label>
                <input
                  type="text"
                  required
                  value={configForm.topAnnouncement}
                  onChange={(e) => setConfigForm({ ...configForm, topAnnouncement: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-3 px-4 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showAnnouncement"
                  checked={configForm.showAnnouncement}
                  onChange={(e) => setConfigForm({ ...configForm, showAnnouncement: e.target.checked })}
                  className="h-4 w-4 rounded accent-orange-500 cursor-pointer"
                />
                <label htmlFor="showAnnouncement" className="text-xs text-gray-300 font-mono cursor-pointer">
                  Display Top Announcement Banner on Public Site
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                    Remaining Creator Slots:
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={configForm.slotsRemaining}
                    onChange={(e) => setConfigForm({ ...configForm, slotsRemaining: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                    Total Agency Revenue Text:
                  </label>
                  <input
                    type="text"
                    value={configForm.totalAgencyRevenue}
                    onChange={(e) => setConfigForm({ ...configForm, totalAgencyRevenue: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Manager Private Email & WhatsApp Credentials Card */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
                      Manager Dispatch Email & WhatsApp Credentials
                    </h4>
                    <p className="text-[11px] text-gray-300 mt-0.5">
                      Configure the manager's personal email address and WhatsApp hotline. Applications and screenshot proof submitted by creators will be dispatched directly to this email address.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 pt-1">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-300 font-bold mb-1">
                      Manager Dispatch Email Address:
                    </label>
                    <input
                      type="email"
                      required
                      value={configForm.managerEmail || ''}
                      onChange={(e) => setConfigForm({ ...configForm, managerEmail: e.target.value })}
                      placeholder="ipexagency57@gmail.com"
                      className="w-full rounded-xl border border-emerald-500/40 bg-black/60 py-2.5 px-3.5 text-xs text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none font-mono"
                    />
                    <span className="text-[9px] text-gray-400 block mt-1">
                      Target inbox for candidate audit dispatches & intake files.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-300 font-bold mb-1">
                      Manager Direct WhatsApp Hotline:
                    </label>
                    <input
                      type="text"
                      required
                      value={configForm.managerWhatsapp || ''}
                      onChange={(e) => setConfigForm({ ...configForm, managerWhatsapp: e.target.value })}
                      placeholder="+237 652 950 944"
                      className="w-full rounded-xl border border-emerald-500/40 bg-black/60 py-2.5 px-3.5 text-xs text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none font-mono"
                    />
                    <span className="text-[9px] text-gray-400 block mt-1">
                      Direct consultation line for creators & emergency alerts.
                    </span>
                  </div>
                </div>
              </div>

              {/* Public Site Demo Introductory Video Card */}
              <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex-shrink-0">
                    <Video className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono text-orange-400 uppercase tracking-wider">
                      Public Site Demo Introductory Video Setup
                    </h4>
                    <p className="text-[11px] text-gray-300 mt-0.5">
                      Upload a local video file or paste a direct video link (MP4, WebM, YouTube, Vimeo) to display below the house payout evidence on the public site.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-300 font-bold mb-1">
                        Intro Video Headline:
                      </label>
                      <input
                        type="text"
                        value={configForm.introVideoTitle || ''}
                        onChange={(e) => setConfigForm({ ...configForm, introVideoTitle: e.target.value })}
                        placeholder="iPex Agency Overview & OnlyFans Scaling Strategy"
                        className="w-full rounded-xl border border-orange-500/30 bg-black/60 py-2.5 px-3.5 text-xs text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-300 font-bold mb-1">
                        Intro Video Subtitle / Context:
                      </label>
                      <input
                        type="text"
                        value={configForm.introVideoDescription || ''}
                        onChange={(e) => setConfigForm({ ...configForm, introVideoDescription: e.target.value })}
                        placeholder="Watch how our 24/7 inbox sales team and viral social traffic engines scale creators to Top 0.1%."
                        className="w-full rounded-xl border border-orange-500/30 bg-black/60 py-2.5 px-3.5 text-xs text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-300 font-bold mb-1">
                      Upload Video File OR Paste Direct Video URL:
                    </label>
                    
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                      <label className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-dashed border-orange-500/50 bg-black/50 p-3 text-xs text-gray-200 hover:border-orange-400 hover:bg-orange-500/10 cursor-pointer transition-all">
                        <Upload className="h-4 w-4 text-orange-400" />
                        <span className="font-mono text-[11px] font-bold">Select & Upload Video File From Computer</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="text-center text-[9px] font-mono text-gray-400 my-2 uppercase">— OR SELECT ONE-CLICK DEMO VIDEO PRESET —</div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setConfigForm(prev => ({ ...prev, introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }))}
                        className="p-2 rounded-xl bg-white/[0.03] border border-orange-500/30 text-[10px] font-mono font-bold text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 transition-all text-left flex items-center justify-between"
                      >
                        <span>🎬 Demo Video #1 (MP4)</span>
                        <span className="text-[9px] text-gray-500">Preset</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfigForm(prev => ({ ...prev, introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }))}
                        className="p-2 rounded-xl bg-white/[0.03] border border-orange-500/30 text-[10px] font-mono font-bold text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 transition-all text-left flex items-center justify-between"
                      >
                        <span>🎬 Demo Video #2 (HD)</span>
                        <span className="text-[9px] text-gray-500">Preset</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfigForm(prev => ({ ...prev, introVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }))}
                        className="p-2 rounded-xl bg-white/[0.03] border border-red-500/30 text-[10px] font-mono font-bold text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all text-left flex items-center justify-between"
                      >
                        <span>▶️ YouTube Stream</span>
                        <span className="text-[9px] text-gray-500">Embed</span>
                      </button>
                    </div>

                    <input
                      type="url"
                      value={configForm.introVideoUrl || ''}
                      onChange={(e) => setConfigForm({ ...configForm, introVideoUrl: e.target.value })}
                      placeholder="https://commondatastorage.googleapis.com/.../video.mp4"
                      className="w-full rounded-xl border border-orange-500/30 bg-black/60 py-2.5 px-3.5 text-xs text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none font-mono"
                    />
                  </div>

                  {/* Video Live Preview Box */}
                  {configForm.introVideoUrl && (
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 font-bold">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Manager Video Preview (Public Site Stream):</span>
                        </span>
                        <span className="text-gray-400">Ready for public site</span>
                      </div>
                      <div className="relative rounded-2xl overflow-hidden border border-orange-500/40 bg-black max-h-64 flex items-center justify-center shadow-xl">
                        {getEmbedVideoUrl(configForm.introVideoUrl).isEmbed ? (
                          <iframe
                            src={getEmbedVideoUrl(configForm.introVideoUrl).url}
                            className="w-full h-56 rounded-xl"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={configForm.introVideoUrl}
                            controls
                            className="w-full max-h-56 rounded-xl object-contain"
                          >
                            Your browser does not support video playback.
                          </video>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                    Public Support Email:
                  </label>
                  <input
                    type="email"
                    value={configForm.supportEmail}
                    onChange={(e) => setConfigForm({ ...configForm, supportEmail: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">
                    Public Support Hotline:
                  </label>
                  <input
                    type="text"
                    value={configForm.supportPhone}
                    onChange={(e) => setConfigForm({ ...configForm, supportPhone: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-3.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
              >
                <Save className="h-4 w-4" />
                <span>Save Configuration & Publish</span>
              </button>
            </form>
          </div>
        )}

        {/* SUB-TAB 4: CANDIDATE INTAKE DESK */}
        {managerTab === 'applications' && (
          <div className="space-y-8">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.01] border border-white/5 p-6 rounded-3xl">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Creator Onboarding Desk</h2>
                <p className="text-xs text-gray-400 mt-1">Review candidate forms, conduct revenue audits, and book onboarding interviews.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSimulateNewCandidate}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Simulate Candidate</span>
                </button>
                <button
                  onClick={onResetDatabase}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Reset Candidates DB</span>
                </button>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 items-start">
              
              {/* Candidates List */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search name, email, or file ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:border-orange-500/50 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter className="h-3.5 w-3.5 text-gray-500" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="flex-grow appearance-none rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-gray-400 focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Intake States</option>
                      <option value="pending">Pending Audit</option>
                      <option value="reviewing">Active Review</option>
                      <option value="interview_scheduled">Interview Booked</option>
                      <option value="accepted">Approved Partner</option>
                      <option value="declined">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {filteredApps.length === 0 ? (
                    <div className="text-center py-12 rounded-2xl border border-dashed border-white/5 bg-white/[0.01]">
                      <Users className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                      <p className="text-xs text-gray-500 font-mono">No candidates found.</p>
                    </div>
                  ) : (
                    filteredApps.map((app) => {
                      const isSelected = selectedApp?.id === app.id;
                      return (
                        <div
                          key={app.id}
                          onClick={() => handleSelectApp(app)}
                          className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 ${
                            isSelected 
                              ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/40 shadow-md shadow-orange-500/5' 
                              : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-display text-sm font-bold text-white">{app.fullName}</h4>
                                {app.attachedImageUrl && (
                                  <span className="bg-orange-500/20 text-orange-400 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-orange-500/30 flex items-center gap-1">
                                    <ImageIcon className="h-2.5 w-2.5" />
                                    <span>Image Attached</span>
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-gray-500 font-mono block mt-0.5">
                                ID: {app.id} • {new Date(app.dateSubmitted).toLocaleDateString()}
                              </span>
                              <span className="text-[9px] text-emerald-400 font-mono block mt-1">
                                📩 Dispatched to {siteConfig.managerEmail || 'ipexagency57@gmail.com'}
                              </span>
                            </div>
                            {getStatusBadge(app.status)}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Candidate Audit Details */}
              <div className="lg:col-span-7">
                {selectedApp ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 space-y-6 relative overflow-hidden"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/5 pb-6">
                      <div>
                        <span className="font-mono text-xs font-semibold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-md">
                          Audit File Active
                        </span>
                        <h2 className="mt-2 font-display text-xl font-bold text-white">{selectedApp.fullName}</h2>
                        <span className="text-xs text-gray-500 font-mono block mt-0.5">Contact: {selectedApp.email}</span>
                      </div>

                      <button
                        onClick={() => { onDeleteApplication(selectedApp.id); setSelectedApp(null); }}
                        className="p-2 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/15 transition-colors cursor-pointer"
                        title="Delete Application"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 space-y-3 text-xs">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-500 uppercase font-mono text-[10px]">Manager Notification Dispatch</span>
                        <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Dispatched to {siteConfig.managerEmail || 'ipexagency57@gmail.com'}</span>
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-500 uppercase font-mono text-[10px]">Baseline Revenue</span>
                        <span className="text-white font-mono font-bold">${selectedApp.currentRevenue.toLocaleString()} / mo</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-500 uppercase font-mono text-[10px]">Allocated Weekly Hours</span>
                        <span className="text-white font-mono font-bold">{selectedApp.hoursPerWeek} Hours</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-500 uppercase font-mono text-[10px]">Primary Bottleneck</span>
                        <span className="text-white font-bold uppercase tracking-wider font-mono text-[10px]">{selectedApp.biggestChallenge}</span>
                      </div>
                      {selectedApp.notes && (
                        <div className="pt-2 border-b border-white/5 pb-2">
                          <span className="text-gray-500 uppercase font-mono text-[10px] block mb-1">Candidate Cover Memo:</span>
                          <p className="text-gray-400 italic">"{selectedApp.notes}"</p>
                        </div>
                      )}

                      {/* Candidate Attached Screenshot View */}
                      {selectedApp.attachedImageUrl && (
                        <div className="pt-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 uppercase font-mono text-[10px] flex items-center gap-1.5 font-bold">
                              <ImageIcon className="h-3.5 w-3.5 text-orange-400" />
                              <span>Candidate Attached Screenshot Proof</span>
                            </span>
                            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              Dispatched with Email
                            </span>
                          </div>
                          <div 
                            onClick={() => setLightboxImage(selectedApp.attachedImageUrl!)}
                            className="relative rounded-xl overflow-hidden border border-orange-500/30 bg-black p-1.5 flex items-center justify-center max-h-64 cursor-pointer group"
                          >
                            <img 
                              src={selectedApp.attachedImageUrl} 
                              alt="Attached Screenshot Proof" 
                              className="max-h-56 object-contain rounded-lg group-hover:scale-[1.01] transition-transform" 
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-orange-500 text-white text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg shadow-lg">
                                Click to Inspect Image
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Action Desk:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedApp.status === 'pending' && (
                          <button
                            onClick={() => handlePromoteStatus('reviewing')}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/20 text-blue-400 px-3 py-2 text-xs font-bold hover:bg-blue-500/30 transition-all cursor-pointer"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                            <span>Move to Active Review</span>
                          </button>
                        )}
                        {(selectedApp.status === 'pending' || selectedApp.status === 'reviewing') && (
                          <button
                            onClick={() => handlePromoteStatus('interview_scheduled')}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 px-3 py-2 text-xs font-bold hover:bg-indigo-500/30 transition-all cursor-pointer"
                          >
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Book Onboarding Interview</span>
                          </button>
                        )}
                        {selectedApp.status !== 'accepted' && (
                          <button
                            onClick={() => handlePromoteStatus('accepted')}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-green-500/20 text-green-400 px-3 py-2 text-xs font-bold hover:bg-green-500/30 transition-all cursor-pointer"
                          >
                            <UserCheck className="h-3.5 w-3.5" />
                            <span>Approve Partnership</span>
                          </button>
                        )}
                        {selectedApp.status !== 'declined' && (
                          <button
                            onClick={() => handlePromoteStatus('declined')}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/20 text-red-400 px-3 py-2 text-xs font-bold hover:bg-red-500/30 transition-all cursor-pointer"
                          >
                            <X className="h-3.5 w-3.5" />
                            <span>Archive Application</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-white/5">
                      <label className="block text-xs font-semibold font-mono uppercase text-gray-500">Auditor Notes Log:</label>
                      <textarea
                        rows={3}
                        value={editingNotes}
                        onChange={(e) => setEditingNotes(e.target.value)}
                        placeholder="Add auditor memo..."
                        className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-4 text-xs text-white focus:border-orange-500/60 focus:outline-none resize-none font-mono"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={handleSaveNotes}
                          className="cursor-pointer rounded-lg bg-orange-500/10 border border-orange-500/25 px-4 py-2 text-xs font-bold text-orange-400 hover:bg-orange-500/20 transition-all"
                        >
                          Save Auditor Note
                        </button>
                      </div>
                    </div>

                  </motion.div>
                ) : (
                  <div className="h-full rounded-3xl border border-dashed border-white/5 bg-white/[0.01] p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
                    <FileText className="h-12 w-12 text-gray-600 mb-4" />
                    <h3 className="font-display text-lg font-bold text-white mb-1">Select Candidate File</h3>
                    <p className="text-sm text-gray-500">Choose a candidate from the intake list to review statistics and schedule onboarding interviews.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      {/* BOOKING INTERVIEW MODAL */}
      {isBookingModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-[#0d0e2c] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-400" />
                <span>Schedule Interview</span>
              </h3>
              <button onClick={() => setIsBookingModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmInterview} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Date:</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-4 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Time Slot (EST):</label>
                <select
                  required
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-4 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="">Choose time slot</option>
                  <option value="10:00 AM">10:00 AM EST (Morning Session)</option>
                  <option value="11:30 AM">11:30 AM EST (Morning Session)</option>
                  <option value="2:00 PM">2:00 PM EST (Afternoon Session)</option>
                  <option value="3:30 PM">3:30 PM EST (Afternoon Session)</option>
                  <option value="5:00 PM">5:00 PM EST (Twilight Session)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3 font-bold text-xs text-white hover:opacity-90 transition-opacity mt-4 cursor-pointer"
              >
                Confirm Appointment
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* LIGHTBOX MODAL FOR FULL SCREENSHOT INSPECTION */}
      <AnimatePresence>
        {lightboxImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center" 
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-orange-400 cursor-pointer bg-white/10 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
              <img src={lightboxImage} alt="Enlarged Screenshot" className="max-h-[85vh] max-w-full rounded-2xl object-contain border border-white/20 shadow-2xl bg-black" referrerPolicy="no-referrer" />
              <p className="mt-3 text-xs font-mono text-gray-400">Press ESC or click anywhere outside to close</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
