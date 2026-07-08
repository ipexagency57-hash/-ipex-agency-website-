import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  HelpCircle, 
  Plus, 
  Minus,
  CheckCircle2,
  Lock
} from 'lucide-react';
import PrivacyShield from './PrivacyShield';
import MarketingFunnel from './MarketingFunnel';

interface HomeViewProps {
  onApplyClick: () => void;
  onServicesClick: () => void;
}

export default function HomeView({ onApplyClick, onServicesClick }: HomeViewProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const pillars = [
    {
      icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
      title: "Viral Acquisition Loops",
      description: "We deploy proprietary automation and content blueprints on TikTok, Instagram, and Reddit to flood your funnel with high-intent subscribers daily."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-red-500" />,
      title: "24/7/365 Inbox Sales",
      description: "Our elite chatting crew monetizes your inbox round-the-clock, converting direct messages into high-ticket PPV sales, custom tips, and deep fan connections."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
      title: "Absolute Anonymity & Security",
      description: "State-of-the-art geo-blocking, dynamic watermark protections, and proactive copyright takedowns ensure your digital footprint remains fully protected."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "In-Depth Creator Audit",
      desc: "We analyze your current social traffic, subscription rates, and chatting conversions to identify high-leverage revenue leakage."
    },
    {
      num: "02",
      title: "Branding & Content Strategy",
      desc: "We structure your exact weekly shooting schedule and supply viral prompts, audio trends, and pacing guidelines."
    },
    {
      num: "03",
      title: "Inbox Sales Takeover",
      desc: "Our trained 24/7 sales specialists load your vault, manage mass PPVs, and build high-converting custom-request funnels."
    },
    {
      num: "04",
      title: "Aggressive Traffic Scaling",
      desc: "We execute cross-platform marketing campaigns to scale your subscribers, shooting your profile straight into the Top 0.1%."
    }
  ];

  const faqs = [
    {
      question: "How much of my time will this actually free up?",
      answer: "Most creators go from working 40+ hours a week (chatting, marketing, posting, editing) to just 4-6 hours a week. Your ONLY responsibility is filming the content batches we plan for you; we handle all scheduling, copywriting, marketing, DM upselling, and page optimization."
    },
    {
      question: "Do you protect my privacy and secure my content?",
      answer: "Absolutely. Privacy is our absolute highest priority. We implement strict geo-blocking (to block your local state, country, or specific regions) and configure robust watermark strategies. We also have a dedicated 24/7 DMCA copyright protection legal squad that automatically flags and takes down any unauthorized leaked content from Google, social platforms, or forums within hours."
    },
    {
      question: "What percentage cut does iPex Agency take?",
      answer: "We work on a highly motivating performance-based commission structure. Our success is 100% aligned with your success. Because we do not earn unless you do, we put our full energy, proprietary traffic systems, and elite sales force behind your page. Specific rates vary based on your account size, current revenue, and required support, and are finalized during our onboarding interview."
    },
    {
      question: "I'm a brand-new creator. Can I still apply?",
      answer: "Yes! While we manage several Top 0.1% creators, we have dedicated growth pipelines for highly motivated upcoming creators who have strong social media potential or a unique look. If you are dedicated, consistent, and willing to work hard, our systems can take you to $10,000+/month within your first 90 days."
    }
  ];

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0b1e] text-white overflow-hidden pb-24">
      
      {/* Absolute Ambient Glows to match screen */}
      <div className="absolute top-1/4 left-1/4 h-[450px] w-[450px] rounded-full bg-orange-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 h-[250px] w-[250px] rounded-full bg-yellow-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[110px] pointer-events-none" />

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* HERO SECTION MATCHING SCREENSHOT EXACTLY */}
      <div className="relative mx-auto max-w-5xl px-4 pt-16 sm:pt-24 text-center">
        
        {/* Urgent Warning Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 text-xs font-medium text-orange-400 mb-8 sm:mb-12"
        >
          <Zap className="h-3.5 w-3.5 animate-pulse text-orange-400" />
          <span>Only 3 creator slots left for Q3 partnership programs</span>
        </motion.div>

        {/* Main H1 Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]"
        >
          We grow your{" "}
          <span className="relative inline-block">
            <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 opacity-20 blur-xl"></span>
            <span className="relative bg-gradient-to-r from-orange-400 via-red-500 to-amber-400 bg-clip-text text-transparent filter drop-shadow-[0_2px_15px_rgba(249,115,22,0.3)]">
              OnlyFans
            </span>
          </span>{" "}
          while you focus on{" "}
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            content
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base text-gray-400 sm:text-lg md:text-xl leading-relaxed"
        >
          Scale your revenue to the top 0.1% with elite marketing infrastructure, 24/7 high-ticket inbox chatting, and full-spectrum copyright protection.
        </motion.p>

        {/* Action Button & Disclaimer pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-5"
        >
          <button
            onClick={onApplyClick}
            className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 px-10 py-5 text-lg font-bold tracking-wide text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 active:scale-95"
          >
            {/* Glossy shine */}
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-white/10 via-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="flex items-center justify-center gap-2">
              Apply now <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>

          {/* Screenshot Match: Month to Month. Cancel any time. */}
          <div className="rounded-full border border-white/5 bg-white/[0.03] px-5 py-2 text-xs font-mono tracking-wide text-gray-400 backdrop-blur-sm sm:text-sm">
            Month to Month. Cancel any time.
          </div>
        </motion.div>

        {/* Live Social proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 sm:mt-24 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-white/5 pt-8 text-xs font-mono text-gray-500"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-orange-500" />
            <span>AVG. SUBSCRIBER GROWTH: +240%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-orange-500" />
            <span>TOP 0.1% CREATOR NETWORK</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-orange-500" />
            <span>24/7 LEGAL DMCA TAKEDOWNS</span>
          </div>
        </motion.div>

      </div>

      {/* CORE PILLARS SECTION */}
      <div className="mx-auto mt-28 max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Why Top Creators Scale With{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              iPex
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400 text-sm sm:text-base">
            We don't just 'manage' accounts. We construct custom, high-velocity digital marketing engines around your personal brand.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-white/10 hover:bg-white/[0.04] hover:-translate-y-1"
            >
              {/* Subtle top glow bar */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="inline-flex rounded-xl bg-white/5 p-3.5 mb-6 group-hover:bg-gradient-to-br group-hover:from-orange-500/10 group-hover:to-red-500/10 group-hover:scale-105 transition-all">
                {pillar.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                {pillar.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* PROPRIETARY INFRASTRUCTURE SHOWCASE */}
      <div className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono text-xs font-semibold tracking-widest text-orange-400 uppercase">
            Proprietary Architecture
          </span>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Unbreakable Security & High-Yield Marketing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            We operate behind the scenes to shield your identity with state-of-the-art protection while systematically driving high-intent subscribers to your profile.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex"
          >
            <div className="w-full flex">
              <PrivacyShield />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex"
          >
            <div className="w-full flex">
              <MarketingFunnel />
            </div>
          </motion.div>
        </div>
      </div>

      {/* HOW THE ENGINE SCALES YOU */}
      <div className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Inner ambient glow */}
          <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-red-600/5 blur-[80px]" />

          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold tracking-widest text-orange-400 uppercase">
              The Growth Roadmap
            </span>
            <h2 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              Our 4-Step Scaling Engine
            </h2>
            <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
              We've refined a repeatable roadmap that takes high-potential accounts from baseline performance straight to high-tier income, quickly and safely.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold bg-gradient-to-b from-orange-400 to-red-500 bg-clip-text text-transparent">
                    {step.num}
                  </span>
                  <div className="h-[1px] flex-grow bg-white/10" />
                </div>
                <h4 className="mt-4 font-display text-lg font-bold text-white">
                  {step.title}
                </h4>
                <p className="mt-2 text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Lock className="h-4 w-4 text-orange-500" />
              <span>Full confidentiality agreements signed prior to audits.</span>
            </div>
            <button
              onClick={onServicesClick}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <span>Explore services in depth</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>

      {/* REVOLUTIONARY FAQ ACCORDION */}
      <div className="mx-auto mt-32 max-w-4xl px-4 sm:px-6">
        
        <div className="text-center mb-16">
          <HelpCircle className="mx-auto h-10 w-10 text-orange-500 mb-4" />
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Transparent answers to common questions about partnering with iPex Agency.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden transition-all duration-300 hover:border-white/10"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors group-hover:text-white">
                    {isOpen ? <Minus className="h-4 w-4 text-orange-500" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>
                
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/5 bg-white/[0.01]"
                  >
                    <p className="p-6 text-sm sm:text-base text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Closing Call to Action Box */}
        <div className="mt-20 rounded-2xl border border-orange-500/25 bg-gradient-to-r from-orange-500/5 to-red-500/5 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 h-16 w-16 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
          <h3 className="font-display text-2xl font-bold text-white">
            Ready to reclaim your time & multiply your income?
          </h3>
          <p className="mt-3 text-gray-400 text-sm max-w-xl mx-auto">
            Take 3 minutes to submit your onboarding profile. Our team will review your application and follow up via email within 12 hours.
          </p>
          <button
            onClick={onApplyClick}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-sm font-bold text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Submit Application Profile
          </button>
        </div>

      </div>

    </div>
  );
}
