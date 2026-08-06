import React from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  Video
} from 'lucide-react';
import ProofGallery from './ProofGallery';
import { ProofScreenshot, Testimonial, SiteConfig } from '../types';

interface ResultsViewProps {
  onApplyClick: () => void;
  proofs?: ProofScreenshot[];
  testimonials?: Testimonial[];
  siteConfig?: SiteConfig;
}

export default function ResultsView({ onApplyClick, proofs = [], siteConfig }: ResultsViewProps) {
  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden pb-24">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full bg-red-600/5 blur-[130px] pointer-events-none" />


      {/* Main Header */}
      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold text-emerald-400 mb-4">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>100% Manager Verified Receipts</span>
          </div>
          <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Live Platform{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Proof & Receipts.
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-400 leading-relaxed">
            Authentic payout ledgers, banking statements, and vault campaign receipts uploaded directly by our management team.
          </p>
        </div>

        {/* VERIFIED MANAGER PROOFS SHOWCASE SECTION */}
        <div className="mt-8">
          <ProofGallery proofs={proofs} />
        </div>

        {/* DEMO INTRODUCTORY VIDEO SECTION (BELOW HOUSE PAYMENTS & RECEIPTS) */}
        {siteConfig && (
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-b from-[#0e0f2b] via-[#090a1d] to-[#070817] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-xs font-mono font-bold text-orange-400 mb-4 shadow-lg shadow-orange-500/10">
                  <Video className="h-4 w-4 text-orange-400 animate-pulse" />
                  <span>Official Agency Strategy & Platform Demo</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {siteConfig.introVideoTitle || "iPex Agency Overview & OnlyFans Scaling Strategy"}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  {siteConfig.introVideoDescription || "Watch how our 24/7 inbox chatting team, viral social traffic engines, and legal DMCA protection scale creators to top 0.1%."}
                </p>
              </div>

              {/* Video Player */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/90 shadow-2xl max-w-4xl mx-auto">
                {(() => {
                  const url = siteConfig.introVideoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
                  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
                  const isVimeo = url.includes('vimeo.com');

                  if (isYouTube) {
                    let embedUrl = url;
                    if (url.includes('watch?v=')) {
                      const id = url.split('v=')[1]?.split('&')[0];
                      embedUrl = `https://www.youtube.com/embed/${id}`;
                    } else if (url.includes('youtu.be/')) {
                      const id = url.split('youtu.be/')[1]?.split('?')[0];
                      embedUrl = `https://www.youtube.com/embed/${id}`;
                    }
                    return (
                      <iframe
                        src={embedUrl}
                        title={siteConfig.introVideoTitle || "Agency Demo Video"}
                        className="w-full aspect-video rounded-2xl border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  }

                  if (isVimeo) {
                    const id = url.split('vimeo.com/')[1]?.split('?')[0];
                    return (
                      <iframe
                        src={`https://player.vimeo.com/video/${id}`}
                        title={siteConfig.introVideoTitle || "Agency Demo Video"}
                        className="w-full aspect-video rounded-2xl border-0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  }

                  return (
                    <video
                      src={url}
                      controls
                      poster="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200"
                      className="w-full aspect-video rounded-2xl object-cover"
                    >
                      Your browser does not support HTML5 video streaming.
                    </video>
                  );
                })()}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs font-mono text-gray-400 relative z-10">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Verified Manager Video Demo</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-300">Manager Contact: <strong className="text-orange-400 font-mono">{siteConfig.managerEmail || 'ipexagency57@gmail.com'}</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* APPLY NOW CALL TO ACTION */}
        <div className="mt-20 mx-auto max-w-3xl text-center bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border border-orange-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 h-32 w-32 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full uppercase border border-orange-500/20 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Ready To Scale Your Account?
          </span>

          <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
            Apply For Dedicated Management
          </h2>
          <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Our team handles 24/7 chatting, vault campaign optimization, and viral traffic funnels so you can focus strictly on content creation.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onApplyClick}
              className="relative cursor-pointer group overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-center text-sm font-bold tracking-wide text-white transition-all hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              <span>Submit Management Application</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

