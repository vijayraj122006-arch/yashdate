export type PlatformType = 'instagram' | 'linkedin' | 'twitter' | 'github' | 'tiktok' | 'website' | 'shaadi' | 'other';

export type MatchStatus = 'to_review' | 'interested' | 'contacted' | 'date_scheduled' | 'passed';

export type DatingAppMode =
  | 'fusion'       // Ultimate mashup
  | 'tinder'       // Swipe deck with Super Like, Boost, Rewind
  | 'hinge'        // Prompt-driven vertical cards & voice memo
  | 'bumble'       // Honey yellow theme, compliments & first move
  | 'okcupid'      // 98% Compatibility gauge & deep questions
  | 'shaadi'       // TrulyMadly Trust Score & Kundali/Horoscope vibe
  | 'raya'         // Ultra-sleek VIP dark mode with profile music track
  | 'happn';       // Crossed paths radar & proximity map

export interface SocialLink {
  platform: PlatformType;
  url: string;
  label?: string;
}

export interface HingePrompt {
  id: string;
  question: string;
  answer: string;
  likedByCount?: number;
}

export interface CompatibilityQuestion {
  id: string;
  question: string;
  daterAnswer: string;
  importance: 'Mandatory' | 'Very Important' | 'Nice to Have';
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

export interface IndianMatchmakingDetails {
  height: string;
  motherTongue: string;
  diet: string;
  drinking: string;
  smoking: string;
  sunSign: string;
  gotraOrCommunity?: string;
  kundaliGunas: number; // e.g. 33 out of 36
  trulyMadlyTrustScore: number; // e.g. 98%
  familyType: string;
}

export interface PersonalityDimension {
  trait: string;
  score: number; // 0 to 100
}

export interface DaterProfile {
  id: string;
  name: string;
  age: number;
  pronouns: string;
  location: string;
  distanceKm: number; // Happn / Tinder
  crossedPathsCount: number; // Happn
  crossedPathsLocation: string; // Happn
  occupation: string;
  companyOrCollege: string;
  headline: string;
  avatarUrl: string;
  photos: string[];
  // Raya Music Soundtrack
  soundtrack: {
    title: string;
    artist: string;
    previewUrl?: string;
    isPlaying?: boolean;
  };
  // Dater's descriptions
  selfDescription: string;
  idealDate: string;
  whatImLookingFor: string;
  hobbies: string[];
  myGreenFlags: string[];
  hotTakeOrQuirk: string;
  // Hinge Prompts
  prompts: HingePrompt[];
  // OkCupid & eharmony
  compatibilityScore: number; // e.g. 97
  compatibilityQuestions: CompatibilityQuestion[];
  personalityDimensions: PersonalityDimension[];
  // Indian Matchmaking (Shaadi / TrulyMadly / Aisle)
  matchmakingDetails: IndianMatchmakingDetails;
  // Socials
  socialLinks: SocialLink[];
  stats: {
    datesCompleted: number;
    friendsVouchedCount: number;
    recommendedMatchesCount: number;
    superLikesReceived: number;
    profileViews: number;
  };
}

export type ViewMode = 'dater_dashboard' | 'friend_wingman' | 'public_date_view';
