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
