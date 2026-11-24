import type { DaterProfile, FriendEndorsement, MatchRecommendation } from '../types';

export const INITIAL_DATER_PROFILE: DaterProfile = {
  name: 'Yash Sunil',
  age: 20,
  height: '6 feet',
  location: 'Chennai',
  roots: 'Mallu',
  personality: 'Cute and funny but pretty',
  dreamCareer: 'Pilot',
  musicTaste: 'Likes Anuv Jain',
  datingPreference: 'Likes short girls',
  selfDescription: '',
  idealDate: '',
  photos: ['/yash.jpg'],
  socialLinks: [],
};

export const INITIAL_ENDORSEMENTS: FriendEndorsement[] = [];

export const INITIAL_RECOMMENDATIONS: MatchRecommendation[] = [];
