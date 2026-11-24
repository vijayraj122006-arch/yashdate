import type { DaterProfile, FriendEndorsement, MatchRecommendation } from '../types';

export const INITIAL_DATER_PROFILE: DaterProfile = {
  id: 'yash-sunil-20',
  name: 'Yash Sunil',
  age: 20,
  pronouns: 'He/Him',
  location: 'Bengaluru / Mumbai',
  distanceKm: 1.2,
  crossedPathsCount: 4,
  crossedPathsLocation: 'Near Blue Tokai Coffee & Indiranagar 12th Main',
  occupation: 'CS & AI Undergrad • Full-Stack Builder',
  companyOrCollege: 'Tech Startup Intern & Open Source Contributor',
  headline: 'Looking for someone to share good filter coffee, late night debates, and spontaneous road trips with ✨',
  avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800',
  photos: [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800',
  ],
  soundtrack: {
    title: 'Passionfruit',
    artist: 'Drake (Lofi Chill Remix)',
    previewUrl: 'https://cdn.freesound.org/previews/612/612610_5674468-lq.mp3',
    isPlaying: false,
  },
  selfDescription:
    "Hey! I'm Yash Sunil. At 20, I split my time between writing clean code, building web apps, and hunting down the best artisanal pour-over coffee and sourdough pizza. I'm a big believer in emotional maturity, active listening, and banter that makes your stomach hurt from laughing. If we hang out, expect someone who puts their phone away and actually remembers the little things you care about.",
  idealDate:
    'A quiet bookstore or vinyl shop stroll followed by specialty coffee, then walking through tree-lined streets discussing everything from cosmos to childhood cartoons, ending with street food tacos or ramen.',
  whatImLookingFor:
    'Someone genuine, driven, with an infectious laugh and passions of their own that they can talk about for hours with sparkling eyes.',
  hobbies: [
    'Specialty Coffee Brewing ☕',
    'Full-Stack Coding 💻',
    'Bouldering & Badminton 🏸',
    'Film Photography 📷',
    'Cook-offs with Friends 🍳',
    'Synthwave & Indie Pop 🎵',
  ],
  myGreenFlags: [
    'Always replies promptly without playing waiting games',
    'Can cook a delicious garlic aglio e olio pasta from scratch',
    'Remembers the random favorite snack you casually mentioned 3 weeks ago',
    'Has a high-trust circle of close friends who actively vouch for him',
    'Puts his phone face down during one-on-one dinners',
    'Takes flattering, aesthetic portrait photos of his friends',
  ],
  hotTakeOrQuirk:
    'Pineapple on pizza is a culinary marvel. Also, I will cross-reference 4 food blogs before picking a dinner spot so we never suffer through mediocre food.',
  prompts: [
    {
      id: 'p-1',
      question: "My friends' favorite story about me...",
      answer:
        'When my college roommate had a 102° fever at 2 AM before midterms, I woke up, cooked fresh ginger broth from scratch, and made sure he had medicines and notes ready by 7 AM.',
      likedByCount: 14,
    },
    {
      id: 'p-2',
      question: 'Together, we could...',
      answer:
        'Build a collaborative Spotify playlist, road trip to misty hill stations, and rate every iced latte in the city on a shared Notion board.',
      likedByCount: 22,
    },
    {
      id: 'p-3',
      question: 'The key to my heart is...',
      answer:
        'Sending me obscure memes, sharing your favorite hidden food gems, and being kind to servers and stray animals.',
      likedByCount: 19,
    },
  ],
  compatibilityScore: 97,
  compatibilityQuestions: [
    {
      id: 'q-1',
      question: 'How do you handle conflict or misunderstandings in a relationship?',
      daterAnswer: 'Calm, transparent communication on the same day. No silent treatment or passive aggression.',
      importance: 'Mandatory',
    },
    {
      id: 'q-2',
      question: 'What is your idea of a perfect Sunday morning?',
      daterAnswer: 'Slow sunrise, freshly ground pour-over coffee, listening to acoustic vinyl, and relaxed cooking.',
      importance: 'Very Important',
    },
    {
      id: 'q-3',
      question: 'How important is personal ambition and having independent goals?',
      daterAnswer: 'Extremely important — we should be each other’s biggest cheerleaders while growing individually.',
      importance: 'Very Important',
    },
    {
      id: 'q-4',
      question: 'Do you believe friendships and social proof matter in romance?',
      daterAnswer: 'Yes! How a person treats their friends and how their friends view them reveals true character.',
      importance: 'Mandatory',
    },
  ],
  personalityDimensions: [
    { trait: 'Emotional Intelligence & Empathy', score: 98 },
    { trait: 'Reliability & Punctuality', score: 96 },
    { trait: 'Sense of Humor & Banter', score: 94 },
    { trait: 'Curiosity & Intellectual Depth', score: 95 },
    { trait: 'Spontaneity & Adventure', score: 88 },
    { trait: 'Domestic Life & Culinary Skills', score: 91 },
  ],
  matchmakingDetails: {
    height: "5'11\" (180 cm)",
    motherTongue: 'Hindi / English',
    diet: 'Vegetarian (Loves Italian & Asian cuisine)',
    drinking: 'Socially / Occasional wine & craft beer',
    smoking: 'Never',
    sunSign: 'Sagittarius ♐',
    gotraOrCommunity: 'Modern & Progressive Urban Indian',
    kundaliGunas: 34, // out of 36
    trulyMadlyTrustScore: 99, // 99/100 verified by friends & college ID
    familyType: 'Nuclear, Modern & Supportive Values',
  },
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/yashsunil_builds', label: '@yashsunil_builds' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/yashsunil-dev', label: 'linkedin.com/in/yashsunil-dev' },
    { platform: 'github', url: 'https://github.com/vijayraj122006-arch/yashdate', label: 'github/yashdate' },
    { platform: 'twitter', url: 'https://twitter.com/yashsunilcodes', label: '@yashsunilcodes' },
  ],
  stats: {
    datesCompleted: 3,
    friendsVouchedCount: 4,
    recommendedMatchesCount: 4,
    superLikesReceived: 38,
    profileViews: 1420,
  },
};

export const INITIAL_ENDORSEMENTS: FriendEndorsement[] = [
  {
    id: 'end-01',
    daterId: 'yash-sunil-20',
    friendName: 'Rohan Sharma',
    friendHandle: '@rohan_s',
    friendAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    relationship: 'College Roommate & Best Friend',
    yearsKnown: 4,
    description:
      "I've lived with Yash Sunil for college dorms and campus apartments. At 20, he is genuinely more dependable and emotionally mature than people ten years older. When you're sick, he brews herbal tea without you even asking. He keeps his space clean, never flakes on promises, and his laughter is contagiously wholesome.",
    whyYouShouldDateThem:
      'He will hype you up before every exam or job interview, cook comfort meals from scratch, and always respect your boundaries. Certified 11/10 human.',
    greenFlags: ['Clean roommate certified', 'Top tier emotional quotient', 'Makes killer morning coffee', 'Zero ego or drama'],
    quirkOrRoast: 'Will explain the entire git merge conflict lifecycle if you ask how his code was for more than 5 seconds.',
    ratingScore: 10,
    isFeatured: true,
    isApproved: true,
    createdAt: '2026-11-20T10:30:00Z',
  },
  {
    id: 'end-02',
    daterId: 'yash-sunil-20',
    friendName: 'Ananya Verma',
    friendHandle: '@ananyav_designs',
    friendAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    relationship: 'Design Lead & Close Friend',
    yearsKnown: 3,
    description:
      "As someone who has seen the circus of modern dating apps, let me state for the record: Yash Sunil is pure green flag material. He listens with sincere curiosity rather than waiting to speak, has impeccable music taste, and takes flattering portrait photos of everyone without having to be begged.",
    whyYouShouldDateThem:
      'You will never have to guess where you stand with him. He communicates with honest warmth, and your girl gang will approve of him immediately.',
    greenFlags: ['Instagram boyfriend photography skills', 'Zero fragile masculinity', 'Deep listener', 'Never leaves dishes in the sink'],
    quirkOrRoast: 'Spends 25 minutes debating which mechanical keyboard switch sound is most aesthetically pleasing.',
    ratingScore: 10,
    isFeatured: true,
    isApproved: true,
    createdAt: '2026-11-21T14:15:00Z',
  },
  {
    id: 'end-03',
    daterId: 'yash-sunil-20',
    friendName: 'Kabir Mehta',
    friendHandle: '@kabir_m',
    friendAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    relationship: 'Gym & Bouldering Buddy',
    yearsKnown: 3,
    description:
      "Yash Sunil is that guy who cheers louder for your personal records at the gym than his own. Consistent, disciplined, but stays grounded and funny. If you date him, expect thoughtful surprise snacks and genuine enthusiasm for whatever you're passionate about.",
    whyYouShouldDateThem:
      "He is the definition of dependable. If your tire blows out at 2 AM or you had a brutal day, he's the one who picks up on ring two.",
    greenFlags: ['Shows up on time', 'Supportive hype person', 'Great with dogs and kids', 'Has strong moral integrity'],
    quirkOrRoast: 'Will refuse to leave an escape room until every single puzzle is solved with mathematical logic.',
    ratingScore: 10,
    isFeatured: true,
    isApproved: true,
    createdAt: '2026-11-22T09:00:00Z',
  },
  {
    id: 'end-04',
    daterId: 'yash-sunil-20',
    friendName: 'Maya Patel',
    friendHandle: '@maya.creates',
    friendAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    relationship: 'Childhood Friend',
    yearsKnown: 7,
    description:
      'Known Yash Sunil for seven years. He has grown into a kind, driven, grounded young man who treats everyone from waiters to professors with the exact same warmth and dignity. 100% verified catch.',
    whyYouShouldDateThem:
      'His family and friends adore him, and he will make you feel safe, celebrated, and deeply appreciated every single day.',
    greenFlags: ['Kind to service workers', 'Long-term loyalty', 'Hilarious dry humor', 'Respects boundaries'],
    quirkOrRoast: 'Possesses at least six black hoodies that look identical but he claims each is engineered for a specific temperature.',
    ratingScore: 10,
    isFeatured: true,
    isApproved: true,
    createdAt: '2026-11-23T18:20:00Z',
  },
];

export const INITIAL_MATCH_RECOMMENDATIONS: MatchRecommendation[] = [
  {
    id: 'rec-01',
    daterId: 'yash-sunil-20',
    friendName: 'Ananya Verma',
    friendAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    candidateName: 'Tanvi Kapoor',
    candidateHandle: '@tanvi.ux',
    profileLink: 'https://instagram.com/tanvi.ux',
    platform: 'instagram',
    pitchNote:
      "Yash! She's a 20yo UI/UX designer, obsessed with specialty coffee, and she posted yesterday about wanting someone to check out the new pour-over lab in Indiranagar! You two would talk design and espresso for hours.",
    categoryTag: 'Product Designer & Coffee Nerd',
    status: 'interested',
    daterPrivateNotes: 'Her typography posts are gorgeous. Planning to DM her about the pour-over cafe!',
    createdAt: '2026-11-23T11:45:00Z',
  },
  {
    id: 'rec-02',
    daterId: 'yash-sunil-20',
    friendName: 'Rohan Sharma',
    friendAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    candidateName: 'Dr. Meera Nambiar',
    candidateHandle: 'meera-nambiar-neuro',
    profileLink: 'https://linkedin.com/in/meera-nambiar-neuro',
    platform: 'linkedin',
    pitchNote:
      "Found her on LinkedIn through an AI in Healthcare research symposium. She's a computational neuroscience researcher, plays cello, and mentioned on her profile she loves indie film festivals. I know you love people with big brains and creative hobbies!",
    categoryTag: 'Neuroscience Researcher',
    status: 'to_review',
    daterPrivateNotes: 'Checked out her research on brain-computer interfaces — super inspiring profile.',
    createdAt: '2026-11-23T16:10:00Z',
  },
  {
    id: 'rec-03',
    daterId: 'yash-sunil-20',
    friendName: 'Kabir Mehta',
    friendAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    candidateName: 'Rhea Sen',
    candidateHandle: '@rhea_climbs',
    profileLink: 'https://instagram.com/rhea_climbs',
    platform: 'instagram',
    pitchNote:
      'She routes V5 boulders at the climbing gym on weekends and studies architecture! Super chill, great sense of adventure, and has a golden retriever named Miso.',
    categoryTag: 'Boulderer & Architecture Undergrad',
    status: 'contacted',
    daterPrivateNotes: 'Sent a DM saying we both boulder at the same gym. She replied! Setting up a coffee next week.',
    createdAt: '2026-11-24T08:30:00Z',
  },
  {
    id: 'rec-04',
    daterId: 'yash-sunil-20',
    friendName: 'Maya Patel',
    friendAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    candidateName: 'Aarohi Deshmukh',
    candidateHandle: 'aarohi-deshmukh',
    profileLink: 'https://linkedin.com/in/aarohi-deshmukh-ventures',
    platform: 'linkedin',
    pitchNote:
      "She's an associate at a climate-tech fellowship and a certified yoga practitioner. She wrote a brilliant essay on sustainable urban design on LinkedIn. Very grounded and ambitious, exactly your vibe.",
    categoryTag: 'Climate Tech & Sustainable Design',
    status: 'to_review',
    daterPrivateNotes: '',
    createdAt: '2026-11-24T12:00:00Z',
  },
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
  'Supports Your Dreams 🚀',
  'Zero Silent Treatment 🕊️',
  'High Family Values 🏡',
];
