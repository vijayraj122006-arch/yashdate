# YashDate ❤️ — Friend-Vouched Dating Web App

> **Where dating meets honest friend endorsements and community wingmen.**  
> Built for the dater who wants genuine connections backed by the people who know them best.

[![GitHub Repo](https://img.shields.io/badge/GitHub-yashdate-rose.svg)](https://github.com/vijayraj122006-arch/yashdate)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)

---

## 🌟 Concept & Vision

Traditional dating apps are plagued by superficial swiping, fabricated bios, and zero accountability. **YashDate** fixes modern dating through **community social proof and friend-powered matchmaking**:

1. **The Person Who Wants to Date (Dater Cockpit)**:
   - Sets up their own profile and detailed **self-descriptions** (About Me, What I'm Looking For, Ideal First Date, Certified Green Flags, Quirks & Passions).
   - Receives **descriptions & vouches from their real-life friends** (roommates, best friends, coworkers).
   - Pins the best friend testimonials directly onto their public dating card.
   - Receives **scouted candidate profile links** sent by friends from **LinkedIn, Instagram, X/Twitter, and web profiles** directly inside the app!
   - Tracks incoming leads through an interactive dating pipeline (*To Review*, *Interested 😍*, *DMed / Reached Out 💬*, *Date Scheduled ☕*, *Passed 🙈*) with private notes.

2. **The Friends / Wingmen (Wingman Hub)**:
   - **Vouch & Describe**: Friends write authentic, hilarious, or heartwarming testimonials about the dater, choose certified green flags, add friendly roasts, and rate them (10/10 or 11/10).
   - **Scout & Send Match Links**: When friends see someone cute or interesting on Instagram, LinkedIn, or Twitter, they paste their link directly into the app with a pitch note explaining why they'd vibe!

3. **Prospective Dates (Public Date View)**:
   - Anyone receiving the profile link sees not just what the dater says about themselves, but **what their friends say about them**!
   - Instant trust and high emotional safety through verified social proof.
   - Direct links to connect via Instagram, LinkedIn, or message.

---

## 🚀 Key Features

- **💖 Dater Self-Description Studio**: Live-editable bio, ideal date ideas, relationship goals, lifestyle tags, and social profiles.
- **🤝 Friend Endorsement System**: Multi-field vouch forms with green flag tag selectors, years known, relationship tags, and celebratory confetti upon submission.
- **🔗 In-App Match Link Scout**: Friends drop links from LinkedIn, Instagram, TikTok, Twitter/X, and websites with automatic platform detection and custom pitch notes.
- **📊 Match Pipeline & Private Notes**: The dater can manage prospective dates with status flags, private follow-up notes, and direct external profile links.
- **👀 Glassmorphism Public Dating Card**: Multi-photo carousel, interactive friend quote highlights, green flags checklist, and direct social links.
- **💾 LocalStorage Persistence**: All changes, friend submissions, and match links persist automatically in browser storage.
- **🔄 Demo Reset & Export**: Quickly reset to the default rich demo data (featuring Yash and his friends) anytime.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Micro-Interactions**: Canvas Confetti
- **State & Storage**: React Context API + LocalStorage synchronization

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/vijayraj122006-arch/yashdate.git
cd yashdate

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` to explore the app!

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
yashdate/
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite + Tailwind configuration
├── src/
│   ├── types/
│   │   └── index.ts            # Core TypeScript interfaces
│   ├── data/
│   │   └── initialData.ts      # Default profile, endorsements & match leads
│   ├── utils/
│   │   └── platformHelper.ts   # Platform link detector (Instagram, LinkedIn, etc.)
│   ├── context/
│   │   └── AppContext.tsx      # State management & persistent storage
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation, view switcher, quick actions
│   │   ├── DaterDashboard.tsx  # Dater cockpit (bio, endorsements, match pipeline)
│   │   ├── FriendWingmanHub.tsx# Hub for friends to describe & send links
│   │   ├── PublicDatingCard.tsx# Public view seen by prospective dates
│   │   ├── EndorsementCard.tsx # Testimonial card component
│   │   ├── MatchLeadCard.tsx   # Candidate link card component
│   │   ├── FriendEndorsementModal.tsx # Friend description submission modal
│   │   ├── SendMatchLinkModal.tsx     # Friend link submission modal
│   │   └── ToastContainer.tsx  # Floating notification toasts
│   ├── App.tsx                 # Root application
│   ├── main.tsx                # React DOM render entry
│   └── index.css               # Tailwind CSS v4 styles
└── dist/                       # Production build output
```

---

## 📄 License

MIT License. Crafted with ❤️ for better, friend-backed dating.
