# YashDate — Clean & Minimalist Dating Web App

> **A focused, spacious, and user-friendly dating app powered by friend endorsements & community recommendations.**  
> Built for **Yash Sunil** (20, 6'0", Mallu from Chennai, aspiring pilot, likes short girls, Anuv Jain fan) with zero hardcoded values.

[![GitHub Repo](https://img.shields.io/badge/GitHub-yashdate-rose.svg)](https://github.com/vijayraj122006-arch/yashdate)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvijayraj122006-arch%2Fyashdate)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)

---

## The Core Experience

1. **Dating Card (Prospective Match View)**:
   - Clean, spacious photo card with smooth pagination.
   - Core details: Name, age, 6ft height, location (Chennai), roots (Mallu).
   - Focused badges: Aspiring Pilot, Anuv Jain, Likes short girls.
   - **Dater's Self-Description ("About Me")** & **Ideal Date Idea**.
   - **"What My Friends Say"**: Real, verified descriptions and testimonials written by his close friends.
   - Direct Instagram & LinkedIn connect links.
   - Clean, uncluttered Pass (✕) and Like (♥) actions.

2. **Friend Vouches Tab**:
   - Dedicated clean view of all testimonials written by friends.
   - Quick "Write Vouch" modal for friends to add their descriptions.

3. **Sent Matches Tab**:
   - Clean pipeline of prospective date profile links sent by friends from **LinkedIn, Instagram, or Twitter**.
   - Notes from friends explaining why they would hit it off.
   - Direct links to open profiles and status tracking (*To Review, Interested, Contacted, Passed*).
   - Quick modal for friends to drop new candidate links.

4. **Edit Bio Tab (Zero Hardcoding)**:
   - Live, editable form for every single detail: Name, age, height, location, roots, career ambition, dating preferences, headline, bio, ideal date, and photo URLs.
   - Instant local storage synchronization.

---

## Opening Auth Screen & Credentials

When opening the app, users authenticate through the opening gate with their **Role**, **Username / ID**, and **Passcode**:

| Role | Username / ID | Passcode | Permissions & Description |
|---|---|---|---|
| **Friend / Wingman** | Any Name (e.g. `Pooja`, `Ashwin`, or `friend`) | `friend` | Browse Yash's profile, write vouches, and send candidate links from Instagram / LinkedIn. |
| **Yash Sunil (Dater)** | `yash` | `2026` | Review incoming matches, track status (Interested / Passed), write private notes, and edit bio / photos. |
| **Administrator** | `admin` | `7777` | Full administrative oversight, vouch / match moderation, and database reset controls. |

*A 1-tap quick fill button is available directly on the opening auth screen for instant testing.*

---

The app maintains strict role separation between friends, Yash Sunil, and administrators:

| Capability | Friend / Wingman | Yash Sunil (Dater) | Administrator |
|---|:---:|:---:|:---:|
| **Access Requirement** | None (Default) | PIN: `2026` | PIN: `7777` |
| **View Dating Card & Photos** | Yes | Yes | Yes |
| **Write Friend Vouches** | Yes | Yes | Yes |
| **Send Match Links (Instagram/LinkedIn)** | Yes | Yes | Yes |
| **View Match Candidates Pipeline** | Confidential (Locked) | Yes | Yes |
| **Update Match Interest Status** | No | Yes | Yes |
| **Edit Private Dater Notes** | No | Yes | Yes |
| **Edit Profile Bio & Photos** | Locked | Yes | Yes |
| **Moderate / Delete Content** | No | Yes (His card) | Yes (All content) |
| **Reset Database** | No | No | Yes |

Switch roles anytime via the **Role Pill** in the top navigation bar.

---

## Local Development & Build

```bash
# Clone the repository
git clone https://github.com/vijayraj122006-arch/yashdate.git
cd yashdate

# Install dependencies
npm install

# Start local development server
npm run dev

# Production build
npm run build
```

---

## Deploy to Vercel

The app is fully configured for Vercel deployment with `vercel.json` routing and caching headers.

### Option 1: Import via Vercel Dashboard (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and import `vijayraj122006-arch/yashdate`.
3. Vercel will automatically detect:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your dating app will be live with a free `.vercel.app` domain and automatic SSL!

### Option 2: Deploy via Vercel CLI
```bash
npx vercel
```

---

## License

MIT. Clean, focused, and crafted for Yash Sunil.
