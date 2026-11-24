import type { DaterProfile, FriendEndorsement, MatchRecommendation } from '../types';

export const INITIAL_DATER_PROFILE: DaterProfile = {
  id: 'yash-01',
  name: 'Yash',
  age: 23,
  pronouns: 'He/Him',
  location: 'Bengaluru / San Francisco',
  occupation: 'Full-Stack Developer & Product Builder',
  companyOrCollege: 'Tech Startup & Night-owl Hacker',
  headline: 'Looking for someone to share good filter coffee, late night debates, and spontaneous road trips with ✨',
  avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
  photos: [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
  ],
  selfDescription:
    "Hey! I'm Yash. By day I build cool web apps and craft slick user experiences; by night I'm usually exploring indie cafes, hunting for the best sourdough pizza in town, or curating eccentric Spotify playlists. I'm a good listener, big on emotional intelligence, and believe that the best dates are low-stress, laughter-filled conversations where hours fly by without checking our phones.",
  idealDate:
    'A quiet bookstore stroll followed by artisan espresso or hot chocolate, then walking through the city streets discovering hidden art spots and eating street tacos or ramen.',
  whatImLookingFor:
    'Someone ambitious, kind-hearted, with a sharp sense of humor and their own passions they can talk about for hours with sparkling eyes.',
  hobbies: ['Indie Coffee Brewing', 'Late-night Coding', 'Bouldering & Badminton', 'Analog Photography', 'Cook-offs with Friends', 'Synthesizers & Lo-Fi'],
  myGreenFlags: [
    'Always texts back within a reasonable time (no playing hard-to-get games)',
    'Can cook a mean garlic butter aglio e olio from scratch',
    'Remembers the small details you casually mentioned 3 weeks ago',
    'Has a high-trust friend circle who actively vouch for him',
    'Puts phones face-down during one-on-one dinners'
  ],
  hotTakeOrQuirk:
    "Pineapple on pizza is an act of culinary courage. Also, I will definitely research 15 reviews before we pick a restaurant so we never end up with mediocre food.",
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/yash_builds', label: '@yash_builds' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/yash-developer', label: 'linkedin.com/in/yash-developer' },
    { platform: 'github', url: 'https://github.com/vijayraj122006-arch/yashdate', label: 'github/yashdate' },
    { platform: 'twitter', url: 'https://twitter.com/yashcodes', label: '@yashcodes' }
  ],
  stats: {
    datesCompleted: 3,
    friendsVouchedCount: 4,
    recommendedMatchesCount: 4,
  }
};

export const INITIAL_ENDORSEMENTS: FriendEndorsement[] = [
  {
    id: 'end-01',
    daterId: 'yash-01',
    friendName: 'Rohan Sharma',
    friendHandle: '@rohan_s',
    friendAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    relationship: 'College Roommate & Best Friend',
    yearsKnown: 5,
    description:
      "I've lived with Yash for 3 years in dorms and apartments. He is genuinely one of the most reliable, empathetic people you will ever meet. When you are sick, he literally boils ginger-lemon tea without being asked. He has zero ego, keeps his space tidy, and his laugh is completely infectious.",
    whyYouShouldDateThem:
      "He will hype you up before every presentation, cook you comfort meals, and will never flake on plans. Certified 11/10 human.",
    greenFlags: ['Clean roommate certified', 'Top tier emotional quotient', 'Makes killer morning coffee', 'Patient problem solver'],
    quirkOrRoast: 'Will explain the entire git merge conflict lifecycle if you ask how his day was for more than 10 seconds.',
    ratingScore: 10,
    isFeatured: true,
    isApproved: true,
    createdAt: '2026-11-20T10:30:00Z',
  },
  {
    id: 'end-02',
    daterId: 'yash-01',
    friendName: 'Ananya Verma',
    friendHandle: '@ananyav_designs',
    friendAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    relationship: 'Close Friend & Co-designer',
    yearsKnown: 4,
    description:
      "As a girl who has seen too many red flags in modern dating, let me state for the record: Yash is pure green flag material. He respects boundaries, listens with genuine curiosity rather than waiting to speak, and has the most aesthetic playlist tastes. Also, he takes stellar portrait photos of his friends without being asked twice!",
    whyYouShouldDateThem:
      "You will never have to wonder where you stand with him. He communicates with honest warmth, and your friends will love him instantly.",
    greenFlags: ['Instagram boyfriend photography skills', 'Zero fragile masculinity', 'Deep listener', 'Never leaves dishes in the sink'],
    quirkOrRoast: 'Spends 25 minutes debating which mechanical keyboard switch sound is more satisfying.',
    ratingScore: 10,
    isFeatured: true,
    isApproved: true,
    createdAt: '2026-11-21T14:15:00Z',
  },
  {
    id: 'end-03',
    daterId: 'yash-01',
    friendName: 'Kabir Mehta',
    friendHandle: '@kabir_m',
    friendAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    relationship: 'Gym & Bouldering Buddy',
    yearsKnown: 3,
    description:
      "Yash is that guy who cheers louder for your personal records than his own. Consistent, disciplined, but doesn't take himself too seriously. If you date him, expect thoughtful surprise snacks and genuine enthusiasm for whatever you're passionate about.",
    whyYouShouldDateThem:
      "He is the definition of dependable. If your tire blows out at 2 AM or you had a brutal day at work, he's the one who answers on ring 2.",
    greenFlags: ['Shows up on time', 'Supportive hype person', 'Great with dogs and kids', 'Has strong integrity'],
    quirkOrRoast: 'Will refuse to leave an escape room until every single puzzle is solved logically.',
    ratingScore: 10,
    isFeatured: true,
    isApproved: true,
    createdAt: '2026-11-22T09:00:00Z',
  },
  {
    id: 'end-04',
    daterId: 'yash-01',
    friendName: 'Maya Patel',
    friendHandle: '@maya.creates',
    friendAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    relationship: 'Childhood Friend',
    yearsKnown: 8,
    description:
      "Known him since we were teenagers. He has grown into a kind, driven, grounded man who treats everyone from servers to CEOs with the exact same warmth and dignity. 100% verified catch.",
    whyYouShouldDateThem:
      "His family and friends adore him, and he will make you feel safe, celebrated, and deeply appreciated.",
    greenFlags: ['Kind to service workers', 'Long-term loyalty', 'Hilarious dry humor'],
    quirkOrRoast: 'Possesses at least 7 black hoodies that all look identical but he claims each has a distinct purpose.',
    ratingScore: 10,
    isFeatured: false,
    isApproved: true,
    createdAt: '2026-11-23T18:20:00Z',
  }
];

export const INITIAL_MATCH_RECOMMENDATIONS: MatchRecommendation[] = [
  {
    id: 'rec-01',
    daterId: 'yash-01',
    friendName: 'Ananya Verma',
    friendAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    candidateName: 'Tanvi Kapoor',
    candidateHandle: '@tanvi.ux',
    profileLink: 'https://instagram.com/tanvi.ux',
    platform: 'instagram',
    pitchNote:
      "Yash! She's a Senior Product Designer at a fintech company, obsessed with specialty coffee, and she posted yesterday about wanting someone to check out the new pour-over lab in Indiranagar! You two would talk design and espresso for hours.",
    categoryTag: 'Product Designer & Coffee Nerd',
    status: 'interested',
    daterPrivateNotes: 'Her typography posts are gorgeous. Planning to DM her about the pour-over cafe!',
    createdAt: '2026-11-23T11:45:00Z',
  },
  {
    id: 'rec-02',
    daterId: 'yash-01',
    friendName: 'Rohan Sharma',
    friendAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    candidateName: 'Dr. Meera Nambiar',
    candidateHandle: 'meera-nambiar-neuro',
    profileLink: 'https://linkedin.com/in/meera-nambiar-neuro',
    platform: 'linkedin',
    pitchNote:
      "Found her on LinkedIn through an AI in Healthcare symposium. She's a computational neuroscience researcher, plays cello, and mentioned on her profile she loves indie film festivals. I know you love people with big brains and creative hobbies!",
    categoryTag: 'Neuroscience Researcher',
    status: 'to_review',
    daterPrivateNotes: 'Checked out her research on brain-computer interfaces — super inspiring profile.',
    createdAt: '2026-11-23T16:10:00Z',
  },
  {
    id: 'rec-03',
    daterId: 'yash-01',
    friendName: 'Kabir Mehta',
    friendAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    candidateName: 'Rhea Sen',
    candidateHandle: '@rhea_climbs',
    profileLink: 'https://instagram.com/rhea_climbs',
    platform: 'instagram',
    pitchNote:
      "She routes V5 boulders at the climbing gym on weekends and works as an environmental architect! Super chill, great sense of adventure, and has a golden retriever named Miso.",
    categoryTag: 'Boulderer & Architect',
    status: 'contacted',
    daterPrivateNotes: 'Sent a DM saying we both boulder at the same gym. She replied! Setting up a coffee next week.',
    createdAt: '2026-11-24T08:30:00Z',
  },
  {
    id: 'rec-04',
    daterId: 'yash-01',
    friendName: 'Maya Patel',
    friendAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    candidateName: 'Aarohi Deshmukh',
    candidateHandle: 'aarohi-deshmukh',
    profileLink: 'https://linkedin.com/in/aarohi-deshmukh-ventures',
    platform: 'linkedin',
    pitchNote:
      "She's an associate at an early-stage climate tech fund and a certified yoga instructor. She wrote a brilliant essay on sustainable urban design on LinkedIn. Very grounded and ambitious, exactly your vibe.",
    categoryTag: 'Climate Tech VC & Yogi',
    status: 'to_review',
    daterPrivateNotes: '',
    createdAt: '2026-11-24T12:00:00Z',
  }
];

export const SUGGESTED_GREEN_FLAGS = [
  'Emotional Intelligence 🧠',
  'Great Cook 🍳',
  'Active & Attentive Listener 👂',
  'Punctual & Respects Time ⏰',
  'Loves Animals 🐕',
  'Clear Communicator 💬',
  'Loyal Friend Circle 🤝',
  'Curious & Continuous Learner 📚',
  'Top Tier Coffee Maker ☕',
  'Takes Amazing Photos 📸',
  'Financially Responsible 💳',
  'Supports Your Dreams 🚀'
];
