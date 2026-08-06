export type Tab = 'home' | 'services' | 'results' | 'apply' | 'admin';

export interface Application {
  id: string;
  fullName: string;
  email: string;
  instagram: string;
  tiktok: string;
  currentRevenue: number;
  hasOnlyFans: boolean;
  ofLink?: string;
  hoursPerWeek: number;
  biggestChallenge: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'interview_scheduled' | 'declined';
  dateSubmitted: string;
  notes?: string;
  attachedImageUrl?: string;
}

export interface CaseStudy {
  id: string;
  name: string;
  avatar: string;
  initialRevenue: number;
  currentRevenue: number;
  growthMultiplier: string;
  timeline: string;
  niche: string;
  highlights: string[];
  chartData: { month: string; revenue: number; subCount: number }[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  impact: string;
  features: string[];
}

export interface ProofScreenshot {
  id: string;
  title: string;
  imageUrl: string;
  creatorName: string;
  monthlyRevenue: string;
  platform: string;
  category: 'Daily Statement' | 'Monthly Ledger' | 'PPV Blast' | 'Chatting Upsell';
  dateAdded: string;
  description: string;
  verified: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  niche: string;
  beforeRevenue: string;
  afterRevenue: string;
  quote: string;
  rating: number;
  verified: boolean;
  date: string;
}

export interface SiteConfig {
  topAnnouncement: string;
  showAnnouncement: boolean;
  slotsRemaining: number;
  totalAgencyRevenue: string;
  activeCreatorsCount: number;
  supportEmail: string;
  supportPhone: string;
  managerEmail?: string;
  managerWhatsapp?: string;
  introVideoUrl?: string;
  introVideoTitle?: string;
  introVideoDescription?: string;

  // Manager Editable Official Social & Community Links
  instagramUrl?: string;
  instagramHandle?: string;
  redditUrl?: string;
  redditHandle?: string;
  telegramUrl?: string;
  telegramHandle?: string;
  twitterUrl?: string;
  twitterHandle?: string;
  onlyfansUrl?: string;
  onlyfansHandle?: string;
}

