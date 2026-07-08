import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Award, 
  ArrowUpRight, 
  Sparkles,
  HelpCircle,
  Calculator,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import GrowthChart from './GrowthChart';

interface ChartPoint {
  month: string;
  revenue: number;
  subCount: number;
}

export default function ResultsView({ onApplyClick }: { onApplyClick: () => void }) {
  // Case studies data
  const caseStudies = [
    {
      id: 'alana',
      name: "Alana S.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      niche: "Cosplay & Gaming",
      initialRevenue: 1200,
      currentRevenue: 32400,
      growthMultiplier: "27x",
      timeline: "4 Months",
      highlights: [
        "Transformed TikTok followers into premium high-tier buyers",
        "Configured custom pricing brackets for customized video requests",
        "Reduced messaging response times to under 3 minutes"
      ],
      chartData: [
        { month: 'Month 1', revenue: 1200, subCount: 80 },
        { month: 'Month 2', revenue: 6400, subCount: 220 },
        { month: 'Month 3', revenue: 18100, subCount: 510 },
        { month: 'Month 4', revenue: 32400, subCount: 850 }
      ]
    },
    {
      id: 'chloe',
      name: "Chloe M.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      niche: "Lifestyle & Fitness",
      initialRevenue: 3500,
      currentRevenue: 54000,
      growthMultiplier: "15.4x",
      timeline: "6 Months",
      highlights: [
        "Optimized Reddit automation posting to gain 400+ subscribers weekly",
        "Restructured PPV vault messaging to target deep-pocketed high-spenders",
        "Automated DMCA legal protection safeguarding profile exclusivity"
      ],
      chartData: [
        { month: 'Month 1', revenue: 3500, subCount: 210 },
        { month: 'Month 2', revenue: 12400, subCount: 520 },
        { month: 'Month 3', revenue: 23000, subCount: 880 },
        { month: 'Month 4', revenue: 34100, subCount: 1200 },
        { month: 'Month 5', revenue: 45000, subCount: 1450 },
        { month: 'Month 6', revenue: 54000, subCount: 1680 }
      ]
    },
    {
      id: 'naomi',
      name: "Naomi K.",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200",
      niche: "High-Fashion & Glamour",
      initialRevenue: 12000,
      currentRevenue: 118500,
      growthMultiplier: "9.8x",
      timeline: "8 Months",
      highlights: [
        "Scaled existing audience utilizing professional IG Reels scripting plans",
        "Built custom private-chat tiers yielding high-ticket $1k+ weekly tips",
        "Structured automated operations yielding a 92% lifetime retention rate"
      ],
      chartData: [
        { month: 'Month 1', revenue: 12000, subCount: 650 },
        { month: 'Month 2', revenue: 28000, subCount: 1100 },
        { month: 'Month 3', revenue: 49000, subCount: 1800 },
        { month: 'Month 4', revenue: 71000, subCount: 2400 },
        { month: 'Month 5', revenue: 92000, subCount: 2950 },
        { month: 'Month 6', revenue: 104000, subCount: 3250 },
        { month: 'Month 7', revenue: 111000, subCount: 3450 },
        { month: 'Month 8', revenue: 118500, subCount: 3600 }
      ]
    }
  ];

  const [activeCreator, setActiveCreator] = useState(caseStudies[0]);

  // Earnings Calculator State
  const [socialAudience, setSocialAudience] = useState(15000);
  const [subscriptionPrice, setSubscriptionPrice] = useState(9.99);

  // Math equations based on agency scaling vs solo
  // Solo Conversion: 0.8% sign-up rate, average monthly spending per fan (sub fee only): $12
  // iPex Conversion: 1.8% sign-up rate (via viral traffic templates), average monthly spending per fan (sub fee + elite PPV sales + chatting upsell): $45
  const soloSubscribers = Math.round(socialAudience * 0.008);
  const soloMonthlyRevenue = Math.round(soloSubscribers * subscriptionPrice);

  const ipexSubscribers = Math.round(socialAudience * 0.018);
  const ipexChattingSales = Math.round(ipexSubscribers * 35); // average messaging upsell
  const ipexSubFees = Math.round(ipexSubscribers * subscriptionPrice);
  const ipexMonthlyRevenue = ipexSubFees + ipexChattingSales;
  
  const additionalEarnings = ipexMonthlyRevenue - soloMonthlyRevenue;

  // Render responsive SVG line path for selected creator
  const renderSVGChart = (data: ChartPoint[]) => {
    const width = 500;
    const height = 220;
    const paddingLeft = 60;
    const paddingRight = 30;
    const paddingTop = 20;
    const paddingBottom = 40;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    const maxVal = Math.max(...data.map(d => d.revenue));
    const minVal = 0;

    // Map points to SVG coordinates
    const points = data.map((d, index) => {
      const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
      const y = paddingTop + chartHeight - ((d.revenue - minVal) / (maxVal - minVal)) * chartHeight;
      return { x, y, revenue: d.revenue, label: d.month };
    });

    // Generate SVG path string
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathD += ` L ${points[i].x} ${points[i].y}`;
    }

    // Generate area path string
    const areaD = `${pathD} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

    return (
      <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chartLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="chartAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0a0b1e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = paddingTop + chartHeight * ratio;
          const val = Math.round(maxVal - (maxVal * ratio));
          return (
            <g key={idx} className="opacity-40">
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />
              <text x={paddingLeft - 10} y={y + 4} fill="#9ca3af" fontSize="10" fontFamily="monospace" textAnchor="end">
                ${val.toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* Shaded Area */}
        <path d={areaD} fill="url(#chartAreaGrad)" />

        {/* Line Path */}
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          d={pathD} 
          stroke="url(#chartLineGrad)" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
        />

        {/* Interactive Highlight Nodes */}
        {points.map((pt, idx) => (
          <g key={idx} className="group cursor-pointer">
            <circle cx={pt.x} cy={pt.y} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
            {/* Value popups */}
            <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <rect x={pt.x - 45} y={pt.y - 32} width="90" height="22" rx="4" fill="#1e1b4b" stroke="#f97316" strokeWidth="1" />
              <text x={pt.x} y={pt.y - 17} fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ${pt.revenue.toLocaleString()}
              </text>
            </g>
            {/* X-axis Month Label */}
            <text x={pt.x} y={height - 12} fill="#9ca3af" fontSize="10" fontFamily="monospace" textAnchor="middle">
              {pt.label}
            </text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0a0b1e] text-white overflow-hidden pb-24">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full bg-red-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* Main Header */}
      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-orange-400 uppercase">
            Proven Performance
          </span>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Numbers Don’t{" " }
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Lie.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400">
            Real data from real creators. See how our operational framework turns social profiles into automated, high-yielding revenue empires.
          </p>
        </div>

        {/* CASE STUDIES TRACKER */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          
          {/* Left: Interactive Creator Selector Tabs */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-display text-lg font-bold text-gray-300 mb-4 px-1">
              Select Case Study:
            </h3>
            
            <div className="space-y-3">
              {caseStudies.map((study) => {
                const isActive = activeCreator.id === study.id;
                return (
                  <button
                    key={study.id}
                    onClick={() => setActiveCreator(study)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/40 shadow-lg shadow-orange-500/5' 
                        : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    <img 
                      src={study.avatar} 
                      alt={study.name}
                      referrerPolicy="no-referrer"
                      className="h-12 w-12 rounded-full object-cover border border-white/10"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-base font-bold text-white">
                          {study.name}
                        </h4>
                        <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">
                          {study.growthMultiplier} Growth
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">
                        {study.niche} • {study.timeline}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Verification Notice */}
            <div className="rounded-xl border border-white/5 bg-black/40 p-4 mt-6">
              <span className="text-[10px] font-mono font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                🛡️ Verified Audit Guarantee:
              </span>
              <p className="text-xs text-gray-500 leading-relaxed">
                All monthly revenue amounts have been audited and verified via banking ledgers and platform invoice receipts. Creator identities have been adjusted for legal compliance and confidentiality.
              </p>
            </div>
          </div>

          {/* Right: Dynamic Visual Graph Card */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none" />

              {/* Stats overview row */}
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 border-b border-white/5 pb-6 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    Baseline Revenue
                  </span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-gray-400 mt-1">
                    ${activeCreator.initialRevenue.toLocaleString()}/mo
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-orange-400 uppercase tracking-wider block">
                    iPex Revenue
                  </span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-white mt-1 flex items-center gap-1">
                    ${activeCreator.currentRevenue.toLocaleString()}/mo
                    <ArrowUpRight className="h-4 w-4 text-orange-500" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    Total Timeline
                  </span>
                  <div className="text-xl sm:text-2xl font-bold font-display text-gray-300 mt-1">
                    {activeCreator.timeline}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    Active Fans
                  </span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-gray-300 mt-1">
                    {activeCreator.chartData[activeCreator.chartData.length - 1].subCount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Dynamic Chart Body */}
              <div className="flex-grow py-4 h-[240px] flex items-center justify-center">
                {renderSVGChart(activeCreator.chartData)}
              </div>

              {/* Bullet points strategies details */}
              <div className="mt-6 pt-6 border-t border-white/5 bg-black/20 rounded-2xl p-5">
                <h4 className="text-xs font-bold tracking-wider text-orange-400 font-mono uppercase mb-3 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                  Growth Strategy Applied:
                </h4>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {activeCreator.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500/10 text-[10px] font-mono font-bold text-orange-400 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* COMPOUNDING GROWTH MECHANICS */}
        <div className="mx-auto mt-32 max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 items-center bg-white/[0.01] border border-white/5 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-semibold tracking-widest text-orange-400 uppercase">
                The compounding curve
              </span>
              <h2 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl lg:text-5xl leading-tight">
                Break Free From Revenue Plateaus
              </h2>
              <p className="mt-6 text-gray-400 text-sm sm:text-base leading-relaxed">
                Solo creators often hit an invisible ceiling because they split their limited hours between shoot schedules, marketing, and 24/7 direct messaging. 
              </p>
              <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
                When you delegate operations to <strong className="text-white">iPex Agency</strong>, we optimize each element of your business dynamically. As your social media reach scales, our high-ticket chatting conversion multipliers kick in, resulting in a compounding, hockey-stick growth curve that traditional models cannot match.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <span className="font-mono text-xs font-bold text-orange-400 block mb-2">⚡ 1. TRAFFIC EXPANSION</span>
                  <p className="text-xs text-gray-400">Viral content concepts and automatic hooks scale your organic follower-to-fan conversion rate by up to 240%.</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <span className="font-mono text-xs font-bold text-red-500 block mb-2">💰 2. MONETIZATION SCALING</span>
                  <p className="text-xs text-gray-400">Our 24/7 elite inbox specialists categorize whales and run high-intent custom-request PPV message loops.</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex justify-center">
              <GrowthChart />
            </div>
          </div>
        </div>

        {/* ONLYFANS POTENTIAL EARNINGS CALCULATOR */}
        <div className="mt-32 max-w-7xl">
          
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-mono text-orange-400 border border-orange-500/10">
              <Calculator className="h-3.5 w-3.5 text-orange-400" />
              <span>Earnings Simulator</span>
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Calculate Your Growth Potential
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-gray-400">
              Drag the sliders below to enter your estimated social media audience across all networks, specify subscription parameters, and watch the revenue projections adjust.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 bg-white/[0.01] border border-white/5 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            
            {/* Sliders Input Column */}
            <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
              
              {/* Slider 1: Social Audience */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-display text-sm font-bold text-white uppercase tracking-wider">
                    Total Social Media Audience:
                  </label>
                  <span className="font-mono text-lg font-black text-orange-400 bg-orange-500/10 px-3 py-1 rounded-lg">
                    {socialAudience.toLocaleString()} Followers
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="200000"
                  step="1000"
                  value={socialAudience}
                  onChange={(e) => setSocialAudience(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg bg-white/10 appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-2 uppercase">
                  <span>2,000 (Micro-influencer)</span>
                  <span>200,000 (Professional)</span>
                </div>
              </div>

              {/* Slider 2: Subscription Price */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-display text-sm font-bold text-white uppercase tracking-wider">
                    Monthly Subscription Price:
                  </label>
                  <span className="font-mono text-lg font-black text-red-400 bg-red-500/10 px-3 py-1 rounded-lg">
                    ${subscriptionPrice.toFixed(2)} /mo
                  </span>
                </div>
                <input
                  type="range"
                  min="4.99"
                  max="49.99"
                  step="1.00"
                  value={subscriptionPrice}
                  onChange={(e) => setSubscriptionPrice(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg bg-white/10 appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-2 uppercase">
                  <span>$4.99 (Low Tier)</span>
                  <span>$49.99 (Premium Tier)</span>
                </div>
              </div>

            </div>

            {/* Outputs Column */}
            <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-10">
              
              <div className="space-y-6">
                
                {/* Solo vs Agency Card */}
                <div className="space-y-3.5">
                  
                  {/* Solo Earnings */}
                  <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
                        Solo Creator Average
                      </h4>
                      <span className="text-[10px] text-gray-500 font-mono">
                        ~{soloSubscribers} subs • subscription fee only
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black font-mono text-gray-400">
                        ${soloMonthlyRevenue.toLocaleString()}/mo
                      </div>
                    </div>
                  </div>

                  {/* iPex Partner Earnings */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-500/10 text-orange-400 text-[8px] font-mono font-black tracking-widest px-2.5 py-1 rounded-bl-lg uppercase">
                      iPex Enhanced Scale
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                        iPex Partner Average
                      </h4>
                      <span className="text-[10px] text-gray-400 font-mono">
                        ~{ipexSubscribers} subs • 24/7 DMs & high-ticket PPV
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black font-mono text-white flex items-center justify-end gap-1">
                        ${ipexMonthlyRevenue.toLocaleString()}/mo
                      </div>
                    </div>
                  </div>

                </div>

                {/* Compound profit box */}
                <div className="rounded-xl bg-black/40 border border-white/5 p-4 flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-semibold text-gray-500 uppercase">
                      Partnership Revenue Increase:
                    </span>
                    <div className="text-lg font-black text-white font-mono mt-0.5">
                      +${additionalEarnings.toLocaleString()} / month
                    </div>
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="mt-8">
                <button
                  onClick={onApplyClick}
                  className="w-full relative cursor-pointer group overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-center text-sm font-bold tracking-wide text-white transition-all hover:opacity-95 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span className="flex items-center justify-center gap-2">
                    Claim your potential earnings <ChevronRight className="h-4 w-4" />
                  </span>
                </button>
                <span className="text-[10px] text-gray-500 text-center block mt-3 font-mono">
                  Projections simulate realistic 24/7 chatting optimization and audience conversion formulas.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
