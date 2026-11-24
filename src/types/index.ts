export type PlatformType = 'instagram' | 'linkedin' | 'twitter' | 'github' | 'tiktok' | 'website' | 'shaadi' | 'other';

export type MatchStatus = 'to_review' | 'interested' | 'contacted' | 'date_scheduled' | 'passed';

export type DatingAppMode =
  | 'fusion'       // All-in-one minimal fusion
  | 'tinder'       // Swipe deck with clean action controls
  | 'hinge'        // Clean editorial prompt cards & voice memos
  | 'bumble'       // Honey minimal theme & compliments
  | 'okcupid'      // Compatibility gauge & questionnaire
  | 'shaadi'       // Biodata & trust score
  | 'raya'         // Dark VIP aesthetic with profile soundtrack
  | 'happn';       // Proximity radar & crossed paths

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
  relationship: string;
  yearsKnown: number;
  description: string;
  whyYouShouldDateThem: string;
  greenFlags: string[];
  quirkOrRoast: string;
  ratingScore: number;
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
  pitchNote: string;
  categoryTag?: string;
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
  kundaliGunas: number;
  trulyMadlyTrustScore: number;
  familyType: string;
}

export interface PersonalityDimension {
  trait: string;
  score: number;
}

export interface InterestBadge {
  id: string;
  label: string;
  imageUrl: string;
  category: string;
}

export interface DaterProfile {
  id: string;
  name: string;
  age: number;
  pronouns: string;
  height: string; // e.g. "6'0\" (183 cm)"
  location: string; // e.g. "Chennai, India"
  roots: string; // e.g. "Malayali / Mallu"
  dreamCareer: string; // e.g. "Commercial Aviation Pilot"
  musicTaste: string; // e.g. "Anuv Jain, Acoustic Indie, Prateek Kuhad"
  datingPreference: string; // e.g. "Short girls who appreciate humor, airport dates & good hugs"
  distanceKm: number;
  crossedPathsCount: number;
  crossedPathsLocation: string;
  occupation: string;
  companyOrCollege: string;
  headline: string;
  avatarUrl: string;
  photos: string[];
  soundtrack: {
    title: string;
    artist: string;
    previewUrl?: string;
  };
  selfDescription: string;
  idealDate: string;
  whatImLookingFor: string;
  hobbies: string[];
  interestBadges: InterestBadge[];
  myGreenFlags: string[];
  hotTakeOrQuirk: string;
  prompts: HingePrompt[];
  compatibilityScore: number;
  compatibilityQuestions: CompatibilityQuestion[];
  personalityDimensions: PersonalityDimension[];
  matchmakingDetails: IndianMatchmakingDetails;
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
