export type PlatformType = 'instagram' | 'linkedin' | 'twitter' | 'website' | 'other';

export type MatchStatus = 'to_review' | 'interested' | 'contacted' | 'passed';

export interface SocialLink {
  platform: PlatformType;
  url: string;
}

export interface FriendEndorsement {
  id: string;
  friendName: string;
  relationship: string;
  yearsKnown?: number;
  description: string;
  whyYouShouldDateThem?: string;
  createdAt: string;
}

export interface MatchRecommendation {
  id: string;
  friendName: string;
  candidateName: string;
  candidateHandle?: string;
  profileLink: string;
  platform: PlatformType;
  pitchNote: string;
  status: MatchStatus;
  daterNotes?: string;
  createdAt: string;
}

export interface DaterProfile {
  name: string;
  age: number;
  height: string;
  location: string;
  roots: string;
  personality: string;
  dreamCareer: string;
  musicTaste: string;
  datingPreference: string;
  selfDescription: string;
  idealDate: string;
  photos: string[];
  socialLinks: SocialLink[];
}

export type ViewTab = 'profile' | 'friends_vouches' | 'sent_matches' | 'edit_profile';
