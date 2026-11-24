import type { DaterProfile, FriendEndorsement, MatchRecommendation } from '../types';

export const INITIAL_DATER_PROFILE: DaterProfile = {
  name: 'Yash Sunil',
  age: 20,
  height: "6'0\"",
  location: 'Chennai',
  roots: 'Mallu',
  occupation: 'Aviation Cadet',
  dreamCareer: 'Commercial Pilot',
  musicTaste: 'Anuv Jain',
  datingPreference: 'Likes short girls',
  headline: '6ft Mallu boy in Chennai with pilot dreams and acoustic guitar songs.',
  selfDescription:
    'I am 20 years old, Mallu brought up in Chennai. When I am not studying flight navigation and aerodynamics, I play acoustic guitar to Anuv Jain songs, make homemade pasta, and hunt down good filter coffee. I have a dry sense of humor, attentive listening habits, and a soft spot for short girls who appreciate banter and sunset drives.',
  idealDate:
    'An evening drive to Besant Nagar beach with filter coffee, watching flights descend over the runway viewing point, and sharing stories over acoustic music.',
  photos: [
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=900',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=900',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=900',
  ],
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/yashsunil_pilot' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/yashsunil-aviation' },
  ],
};

export const INITIAL_ENDORSEMENTS: FriendEndorsement[] = [
  {
    id: 'end-1',
    friendName: 'Ashwin Nair',
    relationship: 'Aviation Cadet Roommate',
    yearsKnown: 4,
    description:
      'Yash Sunil is 6 feet of genuine calm. In flight ground school, he calmly masters instruments and then cooks dinner for all of us. Humble, hardworking, and deeply respectful.',
    whyYouShouldDateThem:
      'He is ambitious about flying, loyal, and will play acoustic Anuv Jain tracks for you whenever you have had a hard day.',
    createdAt: '2026-11-20',
  },
  {
    id: 'end-2',
    friendName: 'Pooja Sundaram',
    relationship: 'College Friend',
    yearsKnown: 3,
    description:
      'I am 5ft 2in and can confirm Yash has the sweetest, protective demeanor. He is handsome and tall, but completely grounded with zero toxic ego.',
    whyYouShouldDateThem:
      'He treats people with gentleness, never plays mind games, and knows every quiet coffee spot in Chennai.',
    createdAt: '2026-11-21',
  },
  {
    id: 'end-3',
    friendName: 'Harish Varma',
    relationship: 'Running & Gym Buddy',
    yearsKnown: 3,
    description:
      'Dependable and in top shape for his pilot medicals. He is funny, grounded, and has great stories about growing up Mallu in Chennai.',
    whyYouShouldDateThem:
      'He is emotionally mature, plans thoughtful dates, and stays calm in any stressful situation.',
    createdAt: '2026-11-22',
  },
];

export const INITIAL_RECOMMENDATIONS: MatchRecommendation[] = [
  {
    id: 'rec-1',
    friendName: 'Pooja Sundaram',
    candidateName: 'Diya Krishnan',
    candidateHandle: '@diya_krish',
    profileLink: 'https://instagram.com/diya_krish',
    platform: 'instagram',
    pitchNote:
      'She is 5ft 1in, studies design in Chennai, and loves Anuv Jain songs! You two would have the cutest height difference and great banter.',
    status: 'interested',
    daterNotes: 'Checked her design page. She loves acoustic Hindi songs. Planning to DM her!',
    createdAt: '2026-11-23',
  },
  {
    id: 'rec-2',
    friendName: 'Ashwin Nair',
    candidateName: 'Meera Nambeesan',
    candidateHandle: 'meera-nambeesan',
    profileLink: 'https://linkedin.com/in/meera-nambeesan',
    platform: 'linkedin',
    pitchNote:
      'Found her on LinkedIn from an aerospace engineering workshop in Chennai. She is 5ft 2in, Mallu, and plays violin.',
    status: 'to_review',
    daterNotes: '',
    createdAt: '2026-11-23',
  },
  {
    id: 'rec-3',
    friendName: 'Harish Varma',
    candidateName: 'Kavya Raman',
    candidateHandle: '@kavya_curates',
    profileLink: 'https://instagram.com/kavya_curates',
    platform: 'instagram',
    pitchNote:
      'She reviews artisan coffee in Chennai, 5ft tall, super witty and sweet.',
    status: 'contacted',
    daterNotes: 'DMed her about cold brew spots. Coffee date planned!',
    createdAt: '2026-11-24',
  },
];
