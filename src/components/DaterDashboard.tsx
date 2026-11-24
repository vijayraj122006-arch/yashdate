import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EndorsementCard } from './EndorsementCard';
import { MatchLeadCard } from './MatchLeadCard';
import {
  Heart,
  Compass,
  FileText,
  Share2,
  Plus,
  Sparkles,
  MapPin,
  Briefcase,
  Check,
  Filter,
  Copy,
  ExternalLink,
  ShieldCheck,
  MessageSquare,
  Crown,
  Music,
} from 'lucide-react';

interface Props {
  onOpenEndorseModal: () => void;
  onOpenSendLinkModal: () => void;
}

export const DaterDashboard: React.FC<Props> = ({ onOpenEndorseModal, onOpenSendLinkModal }) => {
  const {
    daterProfile,
    updateDaterProfile,
    endorsements,
    recommendations,
    setCurrentView,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'matches' | 'endorsements' | 'bio' | 'matchmaking' | 'invite'>('matches');

  // Fully dynamic state - nothing hardcoded!
  const [formData, setFormData] = useState({
    name: daterProfile.name,
    age: daterProfile.age,
    pronouns: daterProfile.pronouns,
    location: daterProfile.location,
    occupation: daterProfile.occupation,
    companyOrCollege: daterProfile.companyOrCollege || '',
    headline: daterProfile.headline,
    avatarUrl: daterProfile.avatarUrl,
    selfDescription: daterProfile.selfDescription,
    idealDate: daterProfile.idealDate,
    whatImLookingFor: daterProfile.whatImLookingFor,
    hotTakeOrQuirk: daterProfile.hotTakeOrQuirk,
    hobbiesInput: daterProfile.hobbies.join(', '),
    greenFlagsInput: daterProfile.myGreenFlags.join('\n'),
    // Prompts
    prompt1: daterProfile.prompts[0]?.answer || '',
    prompt2: daterProfile.prompts[1]?.answer || '',
    prompt3: daterProfile.prompts[2]?.answer || '',
    // Matchmaking details (Shaadi / TrulyMadly)
    height: daterProfile.matchmakingDetails.height,
    motherTongue: daterProfile.matchmakingDetails.motherTongue,
    diet: daterProfile.matchmakingDetails.diet,
    sunSign: daterProfile.matchmakingDetails.sunSign,
    familyType: daterProfile.matchmakingDetails.familyType,
    kundaliGunas: daterProfile.matchmakingDetails.kundaliGunas,
    trulyMadlyTrustScore: daterProfile.matchmakingDetails.trulyMadlyTrustScore,
    // Raya Soundtrack
    soundtrackTitle: daterProfile.soundtrack.title,
    soundtrackArtist: daterProfile.soundtrack.artist,
  });

  // Filter states for recommendations
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateDaterProfile({
      name: formData.name.trim(),
      age: Number(formData.age) || 20,
      pronouns: formData.pronouns.trim(),
      location: formData.location.trim(),
      occupation: formData.occupation.trim(),
      companyOrCollege: formData.companyOrCollege.trim(),
      headline: formData.headline.trim(),
      avatarUrl: formData.avatarUrl.trim(),
      selfDescription: formData.selfDescription.trim(),
      idealDate: formData.idealDate.trim(),
      whatImLookingFor: formData.whatImLookingFor.trim(),
      hotTakeOrQuirk: formData.hotTakeOrQuirk.trim(),
      hobbies: formData.hobbiesInput
        .split(',')
        .map((h) => h.trim())
        .filter(Boolean),
      myGreenFlags: formData.greenFlagsInput
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
      prompts: [
        {
          id: 'p-1',
          question: "My friends' favorite story about me...",
          answer: formData.prompt1,
          likedByCount: daterProfile.prompts[0]?.likedByCount || 14,
        },
        {
          id: 'p-2',
          question: 'Together, we could...',
          answer: formData.prompt2,
          likedByCount: daterProfile.prompts[1]?.likedByCount || 22,
        },
        {
          id: 'p-3',
          question: 'The key to my heart is...',
          answer: formData.prompt3,
          likedByCount: daterProfile.prompts[2]?.likedByCount || 19,
        },
      ],
      matchmakingDetails: {
        ...daterProfile.matchmakingDetails,
        height: formData.height,
        motherTongue: formData.motherTongue,
        diet: formData.diet,
        sunSign: formData.sunSign,
        familyType: formData.familyType,
        kundaliGunas: Number(formData.kundaliGunas) || 34,
        trulyMadlyTrustScore: Number(formData.trulyMadlyTrustScore) || 99,
      },
      soundtrack: {
        ...daterProfile.soundtrack,
        title: formData.soundtrackTitle,
        artist: formData.soundtrackArtist,
      },
    });
  };

  const filteredRecommendations = recommendations.filter((rec) => {
    const matchesPlatform = platformFilter === 'all' || rec.platform === platformFilter;
    const matchesStatus = statusFilter === 'all' || rec.status === statusFilter;
    return matchesPlatform && matchesStatus;
  });

  const copyInviteMessage = (type: 'vouch' | 'scout') => {
    const appUrl = window.location.href;
    const msg =
      type === 'vouch'
        ? `Hey! I'm on ${daterProfile.name}Date — write a friend description / vouch about me here: ${appUrl} ❤️`
        : `Hey! Be my wingman on ${daterProfile.name}Date: if you see anyone cute or interesting on LinkedIn or Instagram, drop their link here: ${appUrl} 🚀`;
    navigator.clipboard.writeText(msg);
    addToast('Invite text copied to clipboard! Ready to send on WhatsApp or Messages 📱', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Dater Header Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/30 border border-slate-800 p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={daterProfile.avatarUrl}
                alt={daterProfile.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-rose-500/40 shadow-xl shadow-rose-500/20"
              />
              <span className="absolute -bottom-2 -right-2 p-1.5 bg-emerald-500 rounded-xl text-white shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {daterProfile.name}, {daterProfile.age}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                  Seeking Dates
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                  OkCupid 97% Match
                </span>
              </div>
              <p className="text-sm font-medium text-slate-300 mt-1 flex items-center justify-center sm:justify-start gap-2">
                <Briefcase className="w-4 h-4 text-slate-400" />
                {daterProfile.occupation}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {daterProfile.location} • {daterProfile.pronouns} • {daterProfile.matchmakingDetails.height}
              </p>
              <p className="text-xs sm:text-sm text-rose-200/90 mt-2 italic max-w-xl">
                "{daterProfile.headline}"
              </p>
            </div>
          </div>

          {/* Stats & Preview Button */}
          <div className="flex flex-col sm:flex-row md:flex-col items-center sm:items-end gap-3 w-full md:w-auto">
            <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3 text-center min-w-[120px]">
                <div className="text-xl font-black text-rose-400">{endorsements.length}</div>
                <div className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                  Friend Vouches
                </div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3 text-center min-w-[120px]">
                <div className="text-xl font-black text-indigo-400">{recommendations.length}</div>
                <div className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                  Scouted Links
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('public_date_view')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Public Dating Card</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cockpit Tabs */}
      <div className="flex border-b border-slate-800 mb-8 overflow-x-auto no-scrollbar gap-2">
        <button
          onClick={() => setActiveTab('matches')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition cursor-pointer ${
            activeTab === 'matches'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Scouted Match Links</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold">
            {recommendations.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('endorsements')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition cursor-pointer ${
            activeTab === 'endorsements'
              ? 'border-rose-500 text-rose-400 bg-rose-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Friend Vouches & Descriptions</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-extrabold">
            {endorsements.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('bio')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition cursor-pointer ${
            activeTab === 'bio'
              ? 'border-rose-500 text-rose-400 bg-rose-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Self-Description & Hinge Prompts</span>
        </button>

        <button
          onClick={() => setActiveTab('matchmaking')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition cursor-pointer ${
            activeTab === 'matchmaking'
              ? 'border-amber-500 text-amber-400 bg-amber-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>Shaadi / Biodata & Soundtrack</span>
        </button>

        <button
          onClick={() => setActiveTab('invite')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition cursor-pointer ${
            activeTab === 'invite'
              ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Invite Wingmen</span>
        </button>
      </div>

      {/* Tab 1: Friend-Sent Match Links */}
      {activeTab === 'matches' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Compass className="w-6 h-6 text-indigo-400" />
                Wingman Scouted Links (LinkedIn, Instagram & More)
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Prospective matches and profile links sent directly to you by your trusted friends inside the web app.
              </p>
            </div>
            <button
              onClick={onOpenSendLinkModal}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Drop Match Link</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>

            {/* Platform Filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-500">Platform:</span>
              {['all', 'instagram', 'linkedin', 'twitter', 'website'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatformFilter(p)}
                  className={`text-xs px-2.5 py-1 rounded-lg capitalize font-medium transition cursor-pointer ${
                    platformFilter === p
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="hidden sm:block h-4 w-[1px] bg-slate-700" />

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-500">Status:</span>
              {[
                { val: 'all', label: 'All' },
                { val: 'to_review', label: 'To Review' },
                { val: 'interested', label: 'Interested 😍' },
                { val: 'contacted', label: 'DMed 💬' },
                { val: 'date_scheduled', label: 'Date ☕' },
                { val: 'passed', label: 'Passed' },
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => setStatusFilter(s.val)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                    statusFilter === s.val
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredRecommendations.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 p-8">
              <Compass className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No matches found for this filter</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mt-1 mb-4">
                Ask your friends to scout someone on Instagram or LinkedIn, or click below to submit a link yourself!
              </p>
              <button
                onClick={onOpenSendLinkModal}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
              >
                + Drop a Match Link
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecommendations.map((rec) => (
                <MatchLeadCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tab 2: Friend Endorsements & Descriptions */}
      {activeTab === 'endorsements' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                Friend Descriptions & Endorsements ({endorsements.length})
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Descriptions written about you by your friends. Pin the best ones to show up on your public dating card!
              </p>
            </div>
            <button
              onClick={onOpenEndorseModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-500/25 flex items-center gap-2 transition cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add Friend Vouch</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {endorsements.map((endorsement) => (
              <EndorsementCard
                key={endorsement.id}
                endorsement={endorsement}
                isDaterMode={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Tab 3: Self-Description & Hinge Prompts Form */}
      {activeTab === 'bio' && (
        <section className="max-w-4xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-rose-400" />
              Edit Self-Description, Bio & Hinge Prompts
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Completely customizable for {formData.name} (age {formData.age}). Every detail is editable!
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Age *
                </label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Pronouns
                </label>
                <input
                  type="text"
                  value={formData.pronouns}
                  onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Occupation / Work / Studies
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Headline (Catchy Vibe)
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500"
              />
            </div>

            {/* Dater's Own Description */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-rose-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <label className="block text-sm font-bold uppercase tracking-wider text-rose-300">
                  Your Self-Description ("About Me") *
                </label>
              </div>
              <textarea
                required
                rows={5}
                value={formData.selfDescription}
                onChange={(e) => setFormData({ ...formData, selfDescription: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm leading-relaxed outline-none focus:border-rose-500 resize-y"
              />
            </div>

            {/* Hinge Prompts Fields */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <label className="block text-sm font-bold uppercase tracking-wider text-emerald-300">
                  Hinge Prompts & Stories
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  1. "My friends' favorite story about me..."
                </label>
                <textarea
                  rows={2}
                  value={formData.prompt1}
                  onChange={(e) => setFormData({ ...formData, prompt1: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  2. "Together, we could..."
                </label>
                <textarea
                  rows={2}
                  value={formData.prompt2}
                  onChange={(e) => setFormData({ ...formData, prompt2: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  3. "The key to my heart is..."
                </label>
                <textarea
                  rows={2}
                  value={formData.prompt3}
                  onChange={(e) => setFormData({ ...formData, prompt3: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Ideal Date & What Looking For */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Ideal Date
                </label>
                <textarea
                  rows={2}
                  value={formData.idealDate}
                  onChange={(e) => setFormData({ ...formData, idealDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  What I'm Looking For
                </label>
                <textarea
                  rows={2}
                  value={formData.whatImLookingFor}
                  onChange={(e) => setFormData({ ...formData, whatImLookingFor: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Hobbies & Green Flags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Green Flags I Bring (one per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.greenFlagsInput}
                  onChange={(e) => setFormData({ ...formData, greenFlagsInput: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Hobbies & Passions (comma separated)
                </label>
                <textarea
                  rows={4}
                  value={formData.hobbiesInput}
                  onChange={(e) => setFormData({ ...formData, hobbiesInput: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm shadow-xl shadow-rose-500/30 flex items-center gap-2 transition cursor-pointer"
              >
                <Check className="w-5 h-5" />
                <span>Save Description & Prompts</span>
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Tab 4: Shaadi, TrulyMadly & Raya Details Form */}
      {activeTab === 'matchmaking' && (
        <section className="max-w-4xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-400" />
              Shaadi, TrulyMadly & Raya Custom Settings
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Customize Indian matchmaking parameters, trust score, and Raya profile music soundtrack.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Height
                </label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Mother Tongue
                </label>
                <input
                  type="text"
                  value={formData.motherTongue}
                  onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Diet
                </label>
                <input
                  type="text"
                  value={formData.diet}
                  onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Sun Sign
                </label>
                <input
                  type="text"
                  value={formData.sunSign}
                  onChange={(e) => setFormData({ ...formData, sunSign: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Kundali Guna Match (out of 36)
                </label>
                <input
                  type="number"
                  max="36"
                  min="1"
                  value={formData.kundaliGunas}
                  onChange={(e) => setFormData({ ...formData, kundaliGunas: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  TrulyMadly Trust Score (%)
                </label>
                <input
                  type="number"
                  max="100"
                  min="50"
                  value={formData.trulyMadlyTrustScore}
                  onChange={(e) => setFormData({ ...formData, trulyMadlyTrustScore: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Raya Profile Soundtrack */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-purple-500/30 space-y-4">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-purple-400" />
                <label className="block text-sm font-bold uppercase tracking-wider text-purple-300">
                  Raya VIP Profile Soundtrack
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Song Title
                  </label>
                  <input
                    type="text"
                    value={formData.soundtrackTitle}
                    onChange={(e) => setFormData({ ...formData, soundtrackTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Artist / Version
                  </label>
                  <input
                    type="text"
                    value={formData.soundtrackArtist}
                    onChange={(e) => setFormData({ ...formData, soundtrackArtist: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-sm shadow-xl shadow-amber-500/25 flex items-center gap-2 transition cursor-pointer"
              >
                <Check className="w-5 h-5" />
                <span>Save Matchmaking & Music Settings</span>
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Tab 5: Invite Wingmen */}
      {activeTab === 'invite' && (
        <section className="max-w-3xl mx-auto space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 mx-auto flex items-center justify-center shadow-lg shadow-rose-500/25 mb-4">
              <Share2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Get Your Friends Involved as Wingmen!</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2 mb-6">
              Modern dating works 10x better when friends back you up! Send this link to your group chats so they can vouch for you and drop prospective date links from LinkedIn or Instagram.
            </p>

            <div className="space-y-4 max-w-md mx-auto">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left">
                <span className="text-xs font-semibold uppercase text-rose-400">Invite Message 1: For Descriptions & Vouches</span>
                <p className="text-xs text-slate-300 mt-1 italic">
                  "Hey! I'm on {daterProfile.name}Date — write a friend description / vouch about me here: {window.location.href} ❤️"
                </p>
                <button
                  onClick={() => copyInviteMessage('vouch')}
                  className="mt-3 w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Vouch Invite Text
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left">
                <span className="text-xs font-semibold uppercase text-indigo-400">Invite Message 2: For LinkedIn/Instagram Scouted Links</span>
                <p className="text-xs text-slate-300 mt-1 italic">
                  "Hey! If you see anyone cute or interesting on LinkedIn or Instagram, drop their link into my dating web app: {window.location.href} 🚀"
                </p>
                <button
                  onClick={() => copyInviteMessage('scout')}
                  className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Scout Invite Text
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
