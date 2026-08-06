import React, { useState } from 'react';
import { ProofScreenshot } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Eye, X, CheckCircle2, DollarSign, Calendar, ExternalLink } from 'lucide-react';

interface ProofGalleryProps {
  proofs: ProofScreenshot[];
}

export default function ProofGallery({ proofs }: ProofGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProof, setActiveModalProof] = useState<ProofScreenshot | null>(null);

  const categories = ['All', 'Monthly Ledger', 'PPV Blast', 'Daily Statement', 'Chatting Upsell'];

  const filteredProofs = proofs.filter(p => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="w-full space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs font-mono font-semibold transition-all duration-200 cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg shadow-orange-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Proof Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProofs.length === 0 ? (
          <div className="col-span-full text-center py-12 rounded-3xl border border-dashed border-white/10 bg-white/[0.01]">
            <p className="text-gray-400 font-mono text-sm">No verified proof screenshots uploaded in this category yet.</p>
          </div>
        ) : (
          filteredProofs.map((proof) => (
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setActiveModalProof(proof)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e2c] transition-all duration-300 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10"
            >
              {/* Image Container with Zoom hover */}
              <div className="relative h-48 w-full overflow-hidden bg-black/60">
                <img
                  src={proof.imageUrl}
                  alt={proof.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e2c] via-black/20 to-transparent" />
                
                {/* Verified Audit Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-emerald-500/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold text-white shadow-md">
                  <ShieldCheck className="h-3.5 w-3.5 text-white" />
                  <span>Verified Audit</span>
                </div>

                {/* Category Tag */}
                <div className="absolute top-3 right-3 rounded-full bg-black/70 border border-white/10 px-2.5 py-1 text-[10px] font-mono font-medium text-orange-400 backdrop-blur-sm">
                  {proof.category}
                </div>

                {/* Hover overlay preview icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <div className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
                    <Eye className="h-4 w-4" />
                    <span>View Proof Screenshot</span>
                  </div>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                    {proof.title}
                  </h3>
                  <span className="font-mono text-sm font-black text-emerald-400 flex-shrink-0">
                    {proof.monthlyRevenue}
                  </span>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {proof.description}
                </p>

                <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[11px] font-mono text-gray-500">
                  <span>Creator: <strong className="text-gray-300">{proof.creatorName}</strong></span>
                  <span>{proof.platform}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Lightbox High-Res Proof Viewer Modal */}
      <AnimatePresence>
        {activeModalProof && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0e2c] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProof(null)}
                className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 pr-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Audited & Verified Manager Proof
                    </span>
                    <span className="text-xs font-mono text-gray-500">• {activeModalProof.dateAdded}</span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold text-white">
                    {activeModalProof.title}
                  </h2>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Verified Earnings</span>
                  <span className="font-mono text-2xl font-black text-emerald-400">
                    {activeModalProof.monthlyRevenue}
                  </span>
                </div>
              </div>

              {/* Full Screenshot Preview Image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center min-h-[300px]">
                <img
                  src={activeModalProof.imageUrl}
                  alt={activeModalProof.title}
                  className="w-full max-h-[500px] object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
                
                {/* Watermark Seal */}
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold text-orange-400 flex items-center gap-1.5 shadow-lg pointer-events-none">
                  <ShieldCheck className="h-4 w-4 text-orange-400" />
                  <span>iPex Manager Certified Ledger</span>
                </div>
              </div>

              {/* Description & Metadata */}
              <div className="grid gap-4 sm:grid-cols-3 bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Creator Handle</span>
                  <span className="text-sm font-bold text-white font-mono">{activeModalProof.creatorName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Platform Channel</span>
                  <span className="text-sm font-bold text-orange-400 font-mono">{activeModalProof.platform}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Proof Category</span>
                  <span className="text-sm font-bold text-white font-mono">{activeModalProof.category}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 font-mono uppercase">Operational Context & Details:</span>
                <p className="text-xs text-gray-300 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">
                  "{activeModalProof.description}"
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
