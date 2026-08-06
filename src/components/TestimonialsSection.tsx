import React from 'react';
import { Testimonial } from '../types';
import { motion } from 'motion/react';
import { Star, Quote, ShieldCheck, TrendingUp } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.length === 0 ? (
        <div className="col-span-full text-center py-12 rounded-3xl border border-dashed border-white/10 bg-white/[0.01]">
          <p className="text-gray-400 font-mono text-sm">No creator testimonials published yet.</p>
        </div>
      ) : (
        testimonials.map((testi) => (
          <motion.div
            key={testi.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0d0e2c]/90 p-6 sm:p-7 relative overflow-hidden shadow-xl hover:border-orange-500/30 transition-all duration-300"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 h-24 w-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none" />

            <div className="space-y-4">
              {/* Header Profile */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={testi.avatar}
                    alt={testi.name}
                    className="h-12 w-12 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-display text-base font-bold text-white">{testi.name}</h4>
                      {testi.verified && (
                        <ShieldCheck className="h-4 w-4 text-emerald-400" title="Verified Creator Partner" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 font-mono block">{testi.handle} • {testi.niche}</span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: testi.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Revenue Growth Box */}
              <div className="flex items-center justify-between rounded-2xl bg-black/40 border border-white/5 px-4 py-3">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Before Agency</span>
                  <span className="text-xs font-mono font-bold text-gray-400">{testi.beforeRevenue}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-orange-400 uppercase font-semibold block">iPex Partner</span>
                  <span className="text-xs font-mono font-black text-white">{testi.afterRevenue}</span>
                </div>
              </div>

              {/* Quote */}
              <div className="relative pt-2">
                <Quote className="absolute -top-1 -left-2 h-6 w-6 text-white/5 pointer-events-none" />
                <p className="text-xs text-gray-300 italic leading-relaxed relative z-10 pl-2">
                  "{testi.quote}"
                </p>
              </div>
            </div>

            {/* Date Tag */}
            <div className="mt-6 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-500">
              <span>Verified Partner Review</span>
              <span>{testi.date}</span>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
