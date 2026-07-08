import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  MessageCircle, 
  TrendingUp, 
  ShieldAlert, 
  BarChart3, 
  Camera,
  CheckCircle2,
  Clock,
  Briefcase,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ServicesViewProps {
  onApplyClick: () => void;
}

export default function ServicesView({ onApplyClick }: ServicesViewProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  // Strategy Builder State
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'marketing', 'chatting', 'legal'
  ]);

  const servicesList = [
    {
      id: 'marketing',
      icon: <TrendingUp className="h-6 w-6 text-orange-400" />,
      title: "Viral Traffic Acquisition",
      badge: "High Impact",
      description: "Flood your profile with targeted, highly monetizable subscriber traffic without spending a single dollar on paid advertising.",
      hoursSaved: 15,
      bullets: [
        "Proprietary Reddit scraping & automated hot-topic viral promotion scheduling",
        "TikTok & Instagram Reels daily video concept templates & sound trend alerts",
        "Deep Twitter/X engagement farming & cross-creator promo coordination",
        "High-converting landing page setups & tracking links to isolate traffic source ROI"
      ],
      tacticSecret: "Our creators average 350+ new organic subs per week using our proprietary Instagram Reels shadow-group algorithm."
    },
    {
      id: 'chatting',
      icon: <MessageCircle className="h-6 w-6 text-red-400" />,
      title: "24/7 Elite Inbox Sales",
      badge: "Most Popular",
      description: "Our professionally trained sales representatives staff your account 24 hours a day, 365 days a year to convert every DM into revenue.",
      hoursSaved: 25,
      bullets: [
        "Strategic subscriber categorization (VIP, whales, high-tippers, fence-sitters)",
        "Daily customized mass-PPV campaigns written to align with psychological triggers",
        "Custom request custom-upselling framework yielding $300-$500 per request",
        "Active relationship logging (remembers birthdays, hobbies, pet names to drive retention)"
      ],
      tacticSecret: "By introducing structured whale-segmentation, we increase message revenue per active subscriber by 180% in the first 30 days."
    },
    {
      id: 'legal',
      icon: <ShieldAlert className="h-6 w-6 text-amber-400" />,
      title: "Proactive DMCA Legal Takedowns",
      badge: "Essential Security",
      description: "Complete security architecture guarding your brand assets, personal information, and subscriber-only media from malicious leaks.",
      hoursSaved: 5,
      bullets: [
        "Continuous automated web crawls scanning forums, leak sites, and cloud drives",
        "Instant legal DMCA takedown notice dispatch within 3 hours of leak identification",
        "Strategic geo-blocking configured to prevent access from home states/cities",
        "Dynamic real-time digital media watermarking across all uploaded media"
      ],
      tacticSecret: "We boast an outstanding 98.4% success rate in completely purging leaked content from Google search results."
    },
    {
      id: 'branding',
      icon: <Camera className="h-6 w-6 text-indigo-400" />,
      title: "Branding & Aesthetic Design",
      badge: "Visual Polish",
      description: "Transform your profile from a basic landing page into an elite digital brand that commands premium pricing.",
      hoursSaved: 8,
      bullets: [
        "Psychology-driven OnlyFans bio copywriting & layout structure changes",
        "High-fidelity custom profile banners, matching thumbnails, and grid layouts",
        "Curated monthly photoshoot blueprints specifying angles, color palettes, and lighting",
        "Media organization system: batch editing, crop optimization, and vault structuring"
      ],
      tacticSecret: "Upgrading your bio and banner aesthetics directly boosts visitor-to-subscriber sign-up conversion by 34%."
    },
    {
      id: 'analytics',
      icon: <BarChart3 className="h-6 w-6 text-purple-400" />,
      title: "Data-Driven Cohort Audits",
      badge: "Data Engine",
      description: "Deep statistical breakdowns analyzing your subscribers' behavior to predict and compound your lifetime earnings.",
      hoursSaved: 4,
      bullets: [
        "Granular Subscriber Lifetime Value (LTV) and churn rate statistical modeling",
        "Weekly A/B pricing testing of entry subscription tiers to maximize gross revenue",
        "Mass-message sales analytics pointing out exactly what media type sells best",
        "Weekly KPI dashboards with precise action instructions for upcoming shoots"
      ],
      tacticSecret: "We optimize subscription price tiers dynamically to lock in the absolute highest net margin relative to fan growth velocity."
    }
  ];

  const handleServiceToggle = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) { // Keep at least one
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const totalHoursReclaimed = selectedServices.reduce((acc, currentId) => {
    const service = servicesList.find(s => s.id === currentId);
    return acc + (service?.hoursSaved || 0);
  }, 0);

  const activeServicesData = servicesList.filter(s => selectedServices.includes(s.id));

  return (
    <div className="relative min-h-screen bg-[#0a0b1e] text-white overflow-hidden pb-24">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 h-[450px] w-[450px] rounded-full bg-orange-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* Main Header */}
      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-orange-400 uppercase">
            Full-Service Architecture
          </span>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Elite Infrastructure.{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Zero Headaches.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400">
            We handle 100% of the operational overhead. You create the raw content, we turn it into a high-margin digital enterprise.
          </p>
        </div>

        {/* BENTO GRID OF SERVICES */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {servicesList.map((service, idx) => {
            const isExpanded = selectedService === service.id;
            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setSelectedService(isExpanded ? null : service.id)}
                className={`relative cursor-pointer rounded-2xl border p-8 transition-all duration-300 ${
                  isExpanded 
                    ? 'border-orange-500/50 bg-gradient-to-b from-orange-500/10 to-red-500/5 col-span-1 sm:col-span-2 lg:col-span-1 ring-1 ring-orange-500/20' 
                    : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]'
                }`}
              >
                {/* Top service badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex rounded-xl bg-white/5 p-3">
                    {service.icon}
                  </div>
                  <span className="font-mono text-[10px] font-bold tracking-widest text-orange-400 uppercase bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/10">
                    {service.badge}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold text-white flex items-center gap-2">
                  {service.title}
                  <span className="text-xs font-mono font-normal text-gray-500">
                    ({service.hoursSaved}h/wk saved)
                  </span>
                </h3>
                
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Expanded tactics details */}
                {isExpanded ? (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-white/10 space-y-4"
                  >
                    <div>
                      <h4 className="text-xs font-bold tracking-wider text-orange-400 font-mono uppercase mb-3">
                        Operational Strategy:
                      </h4>
                      <ul className="space-y-2">
                        {service.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                            <CheckCircle2 className="h-3.5 w-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-black/40 p-4 border border-white/5">
                      <span className="text-[10px] font-mono font-semibold tracking-wider text-amber-400 uppercase block mb-1">
                        🔒 iPex Secret Playbook Tactic:
                      </span>
                      <p className="text-xs text-gray-400 italic">
                        \"{service.tacticSecret}\"
                      </p>
                    </div>

                    <span className="text-[10px] text-gray-500 italic block text-right">
                      Click to collapse details
                    </span>
                  </motion.div>
                ) : (
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-orange-400/80 font-mono font-medium group">
                    <span>Click to reveal playbook secrets</span>
                    <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1" />
                  </div>
                )}

              </motion.div>
            );
          })}

        </div>

        {/* CUSTOM INTERACTIVE STRATEGY BUILDER */}
        <div className="mt-32 max-w-7xl">
          
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-mono text-orange-400 border border-orange-500/10">
              <Sparkles className="h-3.5 w-3.5 text-orange-400" />
              <span>Interactive Simulator</span>
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Build Your Partnership Plan
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-gray-400">
              Toggle the services you want to delegate below and visualize exactly how much weekly time you will reclaim for your life and content creation.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 bg-white/[0.01] border border-white/5 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            
            {/* Toggles Column */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-display text-lg font-bold text-white mb-6">
                Select Services to Delegate:
              </h3>
              
              <div className="space-y-3">
                {servicesList.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/40 shadow-lg shadow-orange-500/5' 
                          : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-orange-500/20 text-orange-400' : 'bg-white/5 text-gray-400'}`}>
                          {service.icon}
                        </div>
                        <div>
                          <h4 className="font-display text-sm font-bold text-white">
                            {service.title}
                          </h4>
                          <span className="text-xs text-gray-500 font-mono">
                            Saves ~{service.hoursSaved} hours per week
                          </span>
                        </div>
                      </div>
                      
                      {/* Checkbox indicator */}
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-orange-500 border-orange-400 text-white' : 'border-white/20'
                      }`}>
                        {isSelected && (
                          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calculations Dashboard Column */}
            <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-10">
              
              <div>
                <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block mb-1">
                  Active Strategy Preview
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-6">
                  Partnership Impact Dashboard
                </h3>

                {/* Big Hour Counter */}
                <div className="rounded-2xl bg-black/40 border border-white/5 p-6 text-center mb-6">
                  <div className="flex items-center justify-center gap-2 text-gray-400 font-mono text-sm uppercase tracking-wider">
                    <Clock className="h-4 w-4 text-orange-400" />
                    <span>Your Reclaimed Time</span>
                  </div>
                  <div className="mt-2 text-5xl sm:text-6xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent font-display">
                    {totalHoursReclaimed} Hrs
                  </div>
                  <span className="text-xs text-gray-500 font-mono uppercase tracking-wider block mt-2">
                    REDELEGATED EVERY WEEK
                  </span>
                </div>

                {/* Scaling Recommendation Box */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono font-semibold text-gray-400">
                      Primary Strategic Benefit:
                    </span>
                    <p className="mt-1 text-sm text-gray-300">
                      {totalHoursReclaimed >= 40 
                        ? "🚀 Complete Business Autonomy. Your entire pipeline is fully automated. You are strictly a content producer, freeing up your mental state entirely to scale and enjoy life."
                        : totalHoursReclaimed >= 20 
                        ? "⚡ Accelerated Scale. Delegating chatting and key traffic channels ensures a dramatic increase in conversion and revenue without content bottlenecks."
                        : "📈 Core delegation. Starting with high-leverage bottlenecks to give you consistent relief and lay down the foundation for massive scaling."}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono font-semibold text-gray-400">
                      Delegated Functions ({selectedServices.length}):
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {activeServicesData.map(s => (
                        <span key={s.id} className="text-[10px] font-mono bg-white/5 border border-white/5 px-2.5 py-1 rounded-md text-gray-300">
                          {s.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Action */}
              <div className="mt-8">
                <button
                  onClick={onApplyClick}
                  className="w-full relative cursor-pointer group overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-center text-sm font-bold tracking-wide text-white transition-all hover:opacity-95 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span className="flex items-center justify-center gap-2">
                    Lock in this strategy & apply <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
                <span className="text-[10px] text-gray-500 text-center block mt-3 font-mono">
                  This custom plan will be auto-attached to your application form below!
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
