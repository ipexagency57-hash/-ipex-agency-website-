import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Instagram, 
  Video, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft,
  Loader2,
  Calendar,
  Lock,
  ChevronDown
} from 'lucide-react';
import { Application } from '../types';

interface ApplyViewProps {
  onApplicationSubmit: (app: Application) => void;
  onGoToPortal: () => void;
}

export default function ApplyView({ onApplicationSubmit, onGoToPortal }: ApplyViewProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdult, setIsAdult] = useState(false);
  
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [hasOnlyFans, setHasOnlyFans] = useState(false);
  const [ofLink, setOfLink] = useState('');
  const [currentRevenue, setCurrentRevenue] = useState(0);

  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [biggestChallenge, setBiggestChallenge] = useState('traffic');
  const [notes, setNotes] = useState('');

  // Local Validation Error
  const [error, setError] = useState('');

  const revenueOptions = [
    { value: 0, label: "Brand new (No OnlyFans yet)" },
    { value: 500, label: "Under $1,000 / month" },
    { value: 2500, label: "$1,000 - $5,000 / month" },
    { value: 7500, label: "$5,000 - $15,000 / month" },
    { value: 20000, label: "$15,000+ / month" }
  ];

  const handleNextStep = () => {
    setError('');
    
    if (step === 1) {
      if (!fullName.trim()) return setError('Please enter your full name.');
      if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email address.');
      if (!isAdult) return setError('You must be strictly 18 years or older to apply.');
      setStep(2);
    } else if (step === 2) {
      if (!instagram.trim() && !tiktok.trim()) {
        return setError('Please provide at least one social media link (Instagram or TikTok).');
      }
      if (hasOnlyFans && !ofLink.trim()) {
        return setError('Please provide your OnlyFans link.');
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    setLoading(true);

    // Simulate elite verification/audit loaders
    setTimeout(() => {
      const newApp: Application = {
        id: `IPEX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName,
        email,
        instagram,
        tiktok,
        currentRevenue,
        hasOnlyFans,
        ofLink: hasOnlyFans ? ofLink : undefined,
        hoursPerWeek,
        biggestChallenge,
        status: 'pending',
        dateSubmitted: new Date().toISOString(),
        notes: notes.trim() ? notes : undefined
      };

      // Call parent handler to save to local storage/state
      onApplicationSubmit(newApp);
      setSubmittedApp(newApp);
      setLoading(false);
    }, 2000);
  };

  if (submittedApp) {
    return (
      <div className="relative min-h-screen bg-[#0a0b1e] text-white overflow-hidden pb-24">
        <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
        
        <div className="relative mx-auto max-w-3xl px-4 pt-16 text-center">
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl border border-orange-500/30 bg-gradient-to-b from-orange-500/10 via-black/40 to-transparent p-8 sm:p-12 relative overflow-hidden"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 text-orange-400 mx-auto mb-6 border border-orange-500/20">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <span className="font-mono text-xs font-semibold tracking-widest text-orange-400 uppercase">
              Application Locked In
            </span>
            <h1 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">
              Profile Received, {submittedApp.fullName.split(' ')[0]}!
            </h1>
            <p className="mt-4 text-gray-400 text-sm max-w-xl mx-auto">
              Your growth analysis audit is currently executing. We have allocated a dedicated Q3 candidate file for you.
            </p>

            {/* Receipt Summary block */}
            <div className="bg-black/60 border border-white/5 rounded-2xl p-6 mt-8 text-left space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs font-mono text-gray-500">Application ID</span>
                <span className="text-xs font-mono font-bold text-orange-400">{submittedApp.id}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div>
                  <span className="text-gray-500 block uppercase font-mono tracking-wider text-[10px]">Contact Email</span>
                  <span className="text-white font-medium mt-0.5 block">{submittedApp.email}</span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase font-mono tracking-wider text-[10px]">Current Revenue</span>
                  <span className="text-white font-medium mt-0.5 block">
                    ${submittedApp.currentRevenue === 0 ? "New Creator" : `${submittedApp.currentRevenue.toLocaleString()}/mo`}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase font-mono tracking-wider text-[10px]">Social Handles</span>
                  <span className="text-white font-medium mt-0.5 block">
                    {submittedApp.instagram && `@${submittedApp.instagram}`}
                    {submittedApp.instagram && submittedApp.tiktok && ' / '}
                    {submittedApp.tiktok && `@${submittedApp.tiktok}`}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase font-mono tracking-wider text-[10px]">Hours Allocated</span>
                  <span className="text-white font-medium mt-0.5 block">{submittedApp.hoursPerWeek} hrs / week</span>
                </div>
              </div>
            </div>

            {/* Next Steps List */}
            <div className="mt-10 text-left">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono mb-4">
                🔒 Next Operational Steps:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white mt-0.5">1</div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Primary Intake Review</h4>
                    <p className="text-xs text-gray-400 mt-1">Our review managers will check your social channels to verify audience engagement and content quality metrics within 12 hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-gray-400 mt-0.5">2</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase">Interactive Interview Invite</h4>
                    <p className="text-xs text-gray-500 mt-1">If approved, you'll receive a secure Telegram or email invitation link to schedule a 15-minute onboarding strategy interview.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGoToPortal}
                className="flex-1 cursor-pointer rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-4 font-bold text-sm text-white hover:opacity-90 transition-opacity"
              >
                Go to Creator Status Hub
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0b1e] text-white overflow-hidden pb-24">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-red-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      <div className="relative mx-auto max-w-2xl px-4 pt-16">
        
        {/* Intros Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs font-semibold tracking-widest text-orange-400 uppercase">
            Onboarding intake
          </span>
          <h1 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">
            Partner with{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              iPex Agency
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-400 max-w-md mx-auto">
            Take 3 minutes to tell us about your brand. All data is processed securely and kept completely private under NDA rules.
          </p>
        </div>

        {/* HIGH-FIDELITY WHATSAPP FAST TRACK CARD */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8 relative overflow-hidden text-center"
        >
          {/* Subtle green ambient glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4 uppercase tracking-wider">
            ⚡ Recommended Fast-Track
          </div>
          
          <h2 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            DM Our Manager Directly on WhatsApp
          </h2>
          <p className="mt-2.5 text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
            Skip the intake form! Send a direct message to our WhatsApp Talent Line for an instant response, 24/7.
          </p>
          
          <div className="mt-6 flex flex-col items-center justify-center gap-3">
            <a
              href="https://wa.me/237652950944"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-8 py-4 font-extrabold text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20 text-base cursor-pointer"
            >
              {/* WhatsApp Icon (SVG) */}
              <svg className="h-5.5 w-5.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.216 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Apply on WhatsApp</span>
            </a>
            
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>DIRECT RESPONSE RATE: &lt; 5 MINUTES</span>
            </div>
          </div>
        </motion.div>

        {/* Step Indicator */}
        <div className="mb-10 flex items-center justify-between px-2 text-xs font-mono text-gray-400">
          <span className={step >= 1 ? "text-orange-400 font-bold" : ""}>01. Contact</span>
          <div className={`h-[1px] flex-grow mx-4 ${step >= 2 ? 'bg-orange-500/50' : 'bg-white/10'}`} />
          <span className={step >= 2 ? "text-orange-400 font-bold" : ""}>02. Statistics</span>
          <div className={`h-[1px] flex-grow mx-4 ${step >= 3 ? 'bg-orange-500/50' : 'bg-white/10'}`} />
          <span className={step >= 3 ? "text-orange-400 font-bold" : ""}>03. Bottlenecks</span>
        </div>

        {/* Dynamic Form Wrapper */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 sm:p-10 relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Error Bar */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-500/20 bg-red-500/15 p-4 flex items-center gap-3 text-xs text-red-300"
              >
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* STEP 1: CONTACT DETAILS */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="font-display text-lg font-bold text-white border-b border-white/5 pb-3">
                  Primary Contact Details
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Full Name (or Stage Name)
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Alana Winters"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:border-orange-500/60 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., alana@example.com"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:border-orange-500/60 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Age confirmation checkbox */}
                <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAdult}
                      onChange={(e) => setIsAdult(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded bg-black border-white/20 text-orange-500 focus:ring-orange-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-white uppercase font-mono block">Age Verification (18+)</span>
                      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                        I certify that I am strictly 18 years or older, and agree to iPex Agency validating my age documents during onboarding interviews in compliance with standard laws.
                      </p>
                    </div>
                  </label>
                </div>

              </motion.div>
            )}

            {/* STEP 2: STATISTICS & CHANNELS */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="font-display text-lg font-bold text-white border-b border-white/5 pb-3">
                  Social Channels & Statistics
                </h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Instagram handle */}
                  <div>
                    <label className="block text-xs font-semibold font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Instagram Handle
                    </label>
                    <div className="relative">
                      <Instagram className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value.replace('@', ''))}
                        placeholder="e.g., alana_winters"
                        className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:border-orange-500/60 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* TikTok handle */}
                  <div>
                    <label className="block text-xs font-semibold font-mono uppercase tracking-wider text-gray-400 mb-2">
                      TikTok Handle
                    </label>
                    <div className="relative">
                      <Video className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={tiktok}
                        onChange={(e) => setTiktok(e.target.value.replace('@', ''))}
                        placeholder="e.g., alanacosplay"
                        className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:border-orange-500/60 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Has OnlyFans toggle */}
                <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white uppercase font-mono block">Do you have an active OnlyFans?</span>
                      <span className="text-[11px] text-gray-500">Toggle on if your account is already active.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setHasOnlyFans(!hasOnlyFans)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                        hasOnlyFans ? 'bg-orange-500' : 'bg-white/10'
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        hasOnlyFans ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {hasOnlyFans && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-white/5"
                    >
                      <label className="block text-xs font-semibold font-mono uppercase tracking-wider text-gray-400 mb-2">
                        OnlyFans Profile Link
                      </label>
                      <input
                        type="url"
                        value={ofLink}
                        onChange={(e) => setOfLink(e.target.value)}
                        placeholder="e.g., https://onlyfans.com/alana_winters"
                        className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 px-4 text-sm text-white placeholder-gray-600 focus:border-orange-500/60 focus:outline-none"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Revenue Range Select */}
                <div>
                  <label className="block text-xs font-semibold font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Current Monthly Revenue (Average)
                  </label>
                  <div className="relative">
                    <select
                      value={currentRevenue}
                      onChange={(e) => setCurrentRevenue(parseInt(e.target.value))}
                      className="w-full appearance-none rounded-xl border border-white/10 bg-black/40 py-3.5 px-4 text-sm text-white focus:border-orange-500/60 focus:outline-none cursor-pointer pr-10"
                    >
                      {revenueOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#0a0b1e] text-white">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

              </motion.div>
            )}

            {/* STEP 3: CHALLENGES & HOUSER LIMITS */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="font-display text-lg font-bold text-white border-b border-white/5 pb-3">
                  Availability & Main Challenges
                </h3>

                {/* Hours available per week */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-semibold font-mono uppercase tracking-wider text-gray-400">
                      Time Available to Shoot/Film:
                    </label>
                    <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md">
                      {hoursPerWeek} Hours / week
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="40"
                    step="1"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg bg-white/10 appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1 uppercase">
                    <span>2 hrs (Part-time)</span>
                    <span>40 hrs (Full-time)</span>
                  </div>
                </div>

                {/* Biggest challenge */}
                <div>
                  <label className="block text-xs font-semibold font-mono uppercase tracking-wider text-gray-400 mb-2">
                    What is your biggest current bottleneck?
                  </label>
                  <div className="relative">
                    <select
                      value={biggestChallenge}
                      onChange={(e) => setBiggestChallenge(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-white/10 bg-black/40 py-3.5 px-4 text-sm text-white focus:border-orange-500/60 focus:outline-none cursor-pointer pr-10"
                    >
                      <option value="traffic" className="bg-[#0a0b1e]">Social media organic traffic growth</option>
                      <option value="chatting" className="bg-[#0a0b1e]">Inbox DM sales & chatting upselling</option>
                      <option value="time" className="bg-[#0a0b1e]">Time limits (Can't manage DMs and shoot)</option>
                      <option value="privacy" className="bg-[#0a0b1e]">Privacy, geo-blocking, leak prevention</option>
                      <option value="branding" className="bg-[#0a0b1e]">Branding direction & photography setups</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Custom notes */}
                <div>
                  <label className="block text-xs font-semibold font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Tell us more (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g., details about your goals, current bottlenecks, or why you want to partner with iPex."
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 px-4 text-sm text-white placeholder-gray-600 focus:border-orange-500/60 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-2.5 text-[11px] text-gray-500 font-mono bg-black/40 border border-white/5 p-3.5 rounded-xl">
                  <Lock className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  <span>Confidentiality: Submitted profiles are encrypted and shared exclusively with agency review directors.</span>
                </div>

              </motion.div>
            )}

            {/* CONTROL NAVIGATION BUTTONS */}
            <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-semibold text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div /> // placeholder to maintain right-align
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3.5 text-xs font-bold text-white hover:opacity-90 transition-opacity"
                >
                  <span>Continue</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3.5 text-xs font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting Profile...</span>
                    </>
                  ) : (
                    <span>Submit Application</span>
                  )}
                </button>
              )}
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}
