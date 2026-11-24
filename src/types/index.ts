export type PlatformType = 'instagram' | 'linkedin' | 'twitter' | 'github' | 'tiktok' | 'website' | 'other';

export type MatchStatus = 'to_review' | 'interested' | 'contacted' | 'date_scheduled' | 'passed';

export interface SocialLink {
  platform: PlatformType;
  url: string;
  label?: string;
}

export interface FriendEndorsement {
  id: string;
  daterId: string;
  friendName: string;
  friendHandle?: string;
  friendAvatar?: string;
  relationship: string; // e.g. "Best friend since college", "Roommate for 3 years"
  yearsKnown: number;
  description: string; // The friend's heartfelt / funny description of the dater
  whyYouShouldDateThem: string;
  greenFlags: string[];
  quirkOrRoast: string;
  ratingScore: number; // e.g., 10 for 10/10
  isFeatured: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface MatchRecommendation {
  id: string;
  daterId: string;
  friendName: string;
  friendAvatar?: string;
  candidateName: string;
  candidateHandle?: string;
  profileLink: string;
  platform: PlatformType;
  pitchNote: string; // "Why I think you two would vibe"
  categoryTag?: string; // e.g., "Software Engineer", "Bookworm", "Music Lover"
  status: MatchStatus;
  daterPrivateNotes?: string;
  createdAt: string;
}

export interface DaterProfile {
  id: string;
  name: string;
  age: number;
  pronouns: string;
  location: string;
  occupation: string;
  companyOrCollege?: string;
  headline: string;
  avatarUrl: string;
  photos: string[];
  // Dater's own descriptions:
  selfDescription: string;
  idealDate: string;
  whatImLookingFor: string;
  hobbies: string[];
  myGreenFlags: string[];
  hotTakeOrQuirk: string;
  socialLinks: SocialLink[];
  stats: {
    datesCompleted: number;
    friendsVouchedCount: number;
    recommendedMatchesCount: number;
  };
}

export type ViewMode = 'dater_dashboard' | 'friend_wingman' | 'public_date_view';
