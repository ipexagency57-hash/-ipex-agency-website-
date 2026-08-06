import { Application, ProofScreenshot, Testimonial, SiteConfig } from '../types';

export const INITIAL_APPLICATIONS: Application[] = [
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

export const INITIAL_PROOF_SCREENSHOTS: ProofScreenshot[] = [
  {
    id: 'proof-1',
    title: 'OnlyFans Monthly Earnings Statement',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    creatorName: 'Chloe M.',
    monthlyRevenue: '$54,200',
    platform: 'OnlyFans Premium',
    category: 'Monthly Ledger',
    dateAdded: '2026-07-15',
    description: 'Verified 6-month compounding revenue statement following 24/7 high-ticket DM chatting implementation.',
    verified: true
  },
  {
    id: 'proof-2',
    title: '24-Hour PPV Mass Message Spike',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    creatorName: 'Alana S.',
    monthlyRevenue: '$14,850 in 24 Hrs',
    platform: 'OnlyFans Vault',
    category: 'PPV Blast',
    dateAdded: '2026-07-18',
    description: 'Custom-tiered video vault campaign converting 18% of free subscribers into VIP content buyers.',
    verified: true
  },
  {
    id: 'proof-3',
    title: 'Banking Direct Wire Payout Batch',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
    creatorName: 'Naomi K.',
    monthlyRevenue: '$118,500',
    platform: 'US Wire Direct',
    category: 'Daily Statement',
    dateAdded: '2026-07-20',
    description: 'Verified weekly payout clearance with 92% fan retention rate via personalized VIP tiers.',
    verified: true
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Alana S.',
    handle: '@alana_cosplay',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    niche: 'Cosplay & Gaming',
    beforeRevenue: '$1,200/mo',
    afterRevenue: '$32,400/mo',
    quote: 'I went from spending 14 hours a day glued to my phone answering DMs for pennies to having a dedicated team handle everything. My earnings skyrocketed 27x in 4 months!',
    rating: 5,
    verified: true,
    date: '2026-06-12'
  },
  {
    id: 'testi-2',
    name: 'Chloe M.',
    handle: '@chloe_fitlife',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    niche: 'Fitness & Lifestyle',
    beforeRevenue: '$3,500/mo',
    afterRevenue: '$54,000/mo',
    quote: 'iPex Agency fixed my traffic leaks completely. Their Reddit automation and high-ticket PPV scripts transformed my page into a full hands-off business.',
    rating: 5,
    verified: true,
    date: '2026-07-01'
  },
  {
    id: 'testi-3',
    name: 'Naomi K.',
    handle: '@naomi_glamour',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
    niche: 'Glamour & High Fashion',
    beforeRevenue: '$12,000/mo',
    afterRevenue: '$118,500/mo',
    quote: 'Partnering with iPex was the best decision of my career. They protect my content with DMCA legal teams while scaling my revenue to 6-figures per month.',
    rating: 5,
    verified: true,
    date: '2026-07-10'
  }
];

export const INITIAL_SITE_CONFIG: SiteConfig = {
  topAnnouncement: '🔥 Q3 Creator Onboarding Open: Only 2 Exclusive Management Slots Remaining!',
  showAnnouncement: true,
  slotsRemaining: 2,
  totalAgencyRevenue: '$2,850,000+',
  activeCreatorsCount: 14,
  supportEmail: 'contact@ipexagency.io',
  supportPhone: '+237 652 950 944',
  managerEmail: 'ipexagency57@gmail.com',
  managerWhatsapp: '+237 652 950 944',
  introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  introVideoTitle: 'iPex Agency Overview & OnlyFans Scaling Strategy',
  introVideoDescription: 'Watch how our 24/7 inbox sales team, viral social traffic engines, and legal DMCA protection scale creators to the top 0.1%.',
  
  // Official Social & Community Demo Links
  instagramUrl: 'https://instagram.com/ipex_agency',
  instagramHandle: '@ipex_agency',
  redditUrl: 'https://reddit.com/r/iPexAgency',
  redditHandle: 'r/iPexAgency',
  telegramUrl: 'https://t.me/ipexagency',
  telegramHandle: '@ipexagency',
  twitterUrl: 'https://x.com/ipex_agency',
  twitterHandle: '@ipex_agency',
  onlyfansUrl: 'https://onlyfans.com/ipex_agency_demo',
  onlyfansHandle: 'onlyfans.com/ipex_agency'
};
