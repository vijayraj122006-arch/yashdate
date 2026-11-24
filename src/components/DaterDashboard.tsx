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
  MapPin,
  Check,
  Filter,
  Copy,
  ExternalLink,
  ShieldCheck,
  Crown,
  Music,
  Download,
  Plane,
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
    exportConfig,
    importConfig,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'matches' | 'endorsements' | 'bio' | 'matchmaking' | 'config' | 'invite'>('matches');

  // Fully dynamic state - zero hardcoded values!
  const [formData, setFormData] = useState({
    name: daterProfile.name,
    age: daterProfile.age,
    pronouns: daterProfile.pronouns,
    height: daterProfile.height,
    location: daterProfile.location,
    roots: daterProfile.roots,
    dreamCareer: daterProfile.dreamCareer,
    musicTaste: daterProfile.musicTaste,
    datingPreference: daterProfile.datingPreference,
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
    // Matchmaking details
    motherTongue: daterProfile.matchmakingDetails.motherTongue,
    diet: daterProfile.matchmakingDetails.diet,
    sunSign: daterProfile.matchmakingDetails.sunSign,
    familyType: daterProfile.matchmakingDetails.familyType,
    kundaliGunas: daterProfile.matchmakingDetails.kundaliGunas,
    trulyMadlyTrustScore: daterProfile.matchmakingDetails.trulyMadlyTrustScore,
    // Soundtrack
    soundtrackTitle: daterProfile.soundtrack.title,
    soundtrackArtist: daterProfile.soundtrack.artist,
  });

  const [importJsonText, setImportJsonText] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateDaterProfile({
      name: formData.name.trim(),
      age: Number(formData.age) || 20,
      pronouns: formData.pronouns.trim(),
      height: formData.height.trim(),
      location: formData.location.trim(),
      roots: formData.roots.trim(),
      dreamCareer: formData.dreamCareer.trim(),
      musicTaste: formData.musicTaste.trim(),
      datingPreference: formData.datingPreference.trim(),
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
          likedByCount: daterProfile.prompts[0]?.likedByCount || 28,
        },
        {
          id: 'p-2',
          question: 'Together, we could...',
          answer: formData.prompt2,
          likedByCount: daterProfile.prompts[1]?.likedByCount || 41,
        },
        {
          id: 'p-3',
          question: 'The way to win me over is...',
          answer: formData.prompt3,
          likedByCount: daterProfile.prompts[2]?.likedByCount || 35,
        },
      ],
      matchmakingDetails: {
        ...daterProfile.matchmakingDetails,
        height: formData.height,
        motherTongue: formData.motherTongue,
        diet: formData.diet,
        sunSign: formData.sunSign,
        familyType: formData.familyType,
        kundaliGunas: Number(formData.kundaliGunas) || 35,
        trulyMadlyTrustScore: Number(formData.trulyMadlyTrustScore) || 100,
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

  const handleManualImport = () => {
    if (!importJsonText.trim()) return;
    const success = importConfig(importJsonText.trim());
    if (success) {
      setImportJsonText('');
    }
  };

  const copyInviteMessage = (type: 'vouch' | 'scout') => {
    const appUrl = window.location.href;
    const msg =
      type === 'vouch'
        ? `Hey! I am on ${daterProfile.name}Date — write a friend description or vouch about me here: ${appUrl}`
        : `Hey! Be my wingman on ${daterProfile.name}Date: if you see anyone interesting on LinkedIn or Instagram, drop their link here: ${appUrl}`;
    navigator.clipboard.writeText(msg);
    addToast('Invite text copied to clipboard', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header Card */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={daterProfile.avatarUrl}
                alt={daterProfile.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-slate-700 shadow-md"
              />
              <span className="absolute -bottom-2 -right-2 p-1.5 bg-sky-500 rounded-xl text-white shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {daterProfile.name}, {daterProfile.age}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                  {daterProfile.height}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold">
                  {daterProfile.roots}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-300 mt-1 flex items-center justify-center sm:justify-start gap-2">
                <Plane className="w-4 h-4 text-sky-400" />
                {daterProfile.dreamCareer}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {daterProfile.location} • {daterProfile.datingPreference}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 italic max-w-xl">
                "{daterProfile.headline}"
              </p>
            </div>
          </div>

          {/* Stats & Preview Button */}
          <div className="flex flex-col sm:flex-row md:flex-col items-center sm:items-end gap-3 w-full md:w-auto">
            <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 text-center min-w-[120px]">
                <div className="text-xl font-bold text-rose-400">{endorsements.length}</div>
                <div className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                  Friend Vouches
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 text-center min-w-[120px]">
                <div className="text-xl font-bold text-sky-400">{recommendations.length}</div>
                <div className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                  Scouted Links
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('public_date_view')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
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
              ? 'border-sky-500 text-sky-400 bg-sky-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Scouted Match Links</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-sky-300 font-bold">
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
          <span>Friend Vouches</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-rose-300 font-bold">
            {endorsements.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('bio')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition cursor-pointer ${
            activeTab === 'bio'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Profile, Prompts & Type</span>
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
          <span>Biodata & Music</span>
        </button>

        <button
          onClick={() => setActiveTab('config')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition cursor-pointer ${
            activeTab === 'config'
              ? 'border-purple-500 text-purple-400 bg-purple-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Zero-Hardcode JSON Manager</span>
        </button>

        <button
          onClick={() => setActiveTab('invite')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition cursor-pointer ${
            activeTab === 'invite'
              ? 'border-slate-500 text-slate-300 bg-slate-800/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Wingman Invites</span>
        </button>
      </div>

      {/* Tab 1: Scouted Match Links */}
      {activeTab === 'matches' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" />
                Scouted Match Recommendations
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Prospective matches and profile links sent by your friends from LinkedIn, Instagram, or Twitter.
              </p>
            </div>
            <button
              onClick={onOpenSendLinkModal}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Recommend Candidate</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5" />
              <span>Platform:</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {['all', 'instagram', 'linkedin', 'twitter', 'website'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatformFilter(p)}
                  className={`text-xs px-2.5 py-1 rounded-lg capitalize font-medium transition cursor-pointer ${
                    platformFilter === p
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="hidden sm:block h-4 w-[1px] bg-slate-700" />

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-500">Status:</span>
              {[
                { val: 'all', label: 'All' },
                { val: 'to_review', label: 'To Review' },
                { val: 'interested', label: 'Interested' },
                { val: 'contacted', label: 'DMed' },
                { val: 'date_scheduled', label: 'Date Planned' },
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
            <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 p-8">
              <Compass className="w-10 h-10 text-slate-600 mx-auto mb-2.5" />
              <h3 className="text-base font-bold text-white">No candidates found for this filter</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                Ask your friends in Chennai or online to recommend someone from LinkedIn or Instagram!
              </p>
              <button
                onClick={onOpenSendLinkModal}
                className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold"
              >
                + Drop a Match Link
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredRecommendations.map((rec) => (
                <MatchLeadCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tab 2: Friend Endorsements */}
      {activeTab === 'endorsements' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                Friend Endorsements & Vouches ({endorsements.length})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Reviews and stories written by friends about {daterProfile.name}.
              </p>
            </div>
            <button
              onClick={onOpenEndorseModal}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Friend Vouch</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

      {/* Tab 3: Profile & Prompts Form */}
      {activeTab === 'bio' && (
        <section className="max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Edit Profile, Character & Dating Preferences
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Zero hardcoded elements. Everything is saved dynamically to local storage and exports cleanly.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Identity Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Height
                </label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Location & Roots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Current City & Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Cultural Roots & Origin
                </label>
                <input
                  type="text"
                  value={formData.roots}
                  onChange={(e) => setFormData({ ...formData, roots: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Career & Dating Preference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Dream Ambition / Career Focus
                </label>
                <input
                  type="text"
                  value={formData.dreamCareer}
                  onChange={(e) => setFormData({ ...formData, dreamCareer: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Dating Preference / Type
                </label>
                <input
                  type="text"
                  value={formData.datingPreference}
                  onChange={(e) => setFormData({ ...formData, datingPreference: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Headline */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Headline / Profile Hook
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
              />
            </div>

            {/* Self Description */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-sky-400">
                Self Description ("About Me")
              </label>
              <textarea
                required
                rows={4}
                value={formData.selfDescription}
                onChange={(e) => setFormData({ ...formData, selfDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed outline-none focus:border-sky-500"
              />
            </div>

            {/* Hinge Prompts Fields */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400">
                Editorial Prompts & Anecdotes
              </label>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
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
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
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
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  3. "The way to win me over is..."
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Ideal Date
                </label>
                <textarea
                  rows={2}
                  value={formData.idealDate}
                  onChange={(e) => setFormData({ ...formData, idealDate: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  What I Look For in a Partner
                </label>
                <textarea
                  rows={2}
                  value={formData.whatImLookingFor}
                  onChange={(e) => setFormData({ ...formData, whatImLookingFor: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Green Flags & Hobbies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  My Green Flags (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.greenFlagsInput}
                  onChange={(e) => setFormData({ ...formData, greenFlagsInput: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Hobbies (comma separated)
                </label>
                <textarea
                  rows={3}
                  value={formData.hobbiesInput}
                  onChange={(e) => setFormData({ ...formData, hobbiesInput: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile Settings</span>
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Tab 4: Biodata & Soundtrack Form */}
      {activeTab === 'matchmaking' && (
        <section className="max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              Biodata & Music Settings
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Indian matrimonial specs, Anuv Jain acoustic soundtrack, and verification scores.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Mother Tongue
                </label>
                <input
                  type="text"
                  value={formData.motherTongue}
                  onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Dietary Habits
                </label>
                <input
                  type="text"
                  value={formData.diet}
                  onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Sun Sign
                </label>
                <input
                  type="text"
                  value={formData.sunSign}
                  onChange={(e) => setFormData({ ...formData, sunSign: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Kundali Gunas Match (out of 36)
                </label>
                <input
                  type="number"
                  max="36"
                  min="1"
                  value={formData.kundaliGunas}
                  onChange={(e) => setFormData({ ...formData, kundaliGunas: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Trust Score Percentage
                </label>
                <input
                  type="number"
                  max="100"
                  min="50"
                  value={formData.trulyMadlyTrustScore}
                  onChange={(e) => setFormData({ ...formData, trulyMadlyTrustScore: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Soundtrack */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" /> Profile Soundtrack
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Track Title
                  </label>
                  <input
                    type="text"
                    value={formData.soundtrackTitle}
                    onChange={(e) => setFormData({ ...formData, soundtrackTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Artist (e.g. Anuv Jain)
                  </label>
                  <input
                    type="text"
                    value={formData.soundtrackArtist}
                    onChange={(e) => setFormData({ ...formData, soundtrackArtist: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Biodata & Music</span>
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Tab 5: Zero-Hardcode JSON Manager */}
      {activeTab === 'config' && (
        <section className="max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-purple-400" />
              Zero-Hardcoding JSON Configuration Manager
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Export the entire app configuration to a file or paste any JSON string to instantly reconfigure everything dynamically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Export Full Config</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Downloads a complete JSON bundle with your profile, endorsements, scouted links, and UI states.
                </p>
              </div>
              <button
                onClick={exportConfig}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download JSON File
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Quick Backup Status</h3>
                <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                  Synchronized with browser localStorage. Resetting demo returns to default Yash Sunil (age 20, Chennai).
                </p>
                <div className="text-[11px] text-slate-300 font-mono bg-slate-900 p-2 rounded-lg border border-slate-800">
                  Profile: {daterProfile.name} ({daterProfile.age}y, {daterProfile.height})
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">Paste JSON Configuration String</h3>
            <textarea
              rows={4}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste valid JSON profile configuration here..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs outline-none focus:border-purple-500"
            />
            <div className="flex justify-end">
              <button
                onClick={handleManualImport}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition cursor-pointer"
              >
                Apply Pasted Config
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Tab 6: Invite Wingmen */}
      {activeTab === 'invite' && (
        <section className="max-w-3xl mx-auto space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center mb-3">
              <Share2 className="w-6 h-6 text-sky-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Invite Friends & Wingmen</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-6">
              Send your link to friends in Chennai or colleges so they can write descriptions and scout matches.
            </p>

            <div className="space-y-3 max-w-md mx-auto">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left">
                <span className="text-xs font-bold uppercase text-rose-400">Invite 1: For Friend Descriptions</span>
                <p className="text-xs text-slate-300 mt-1 italic">
                  "Hey! I am on {daterProfile.name}Date — write a friend description or vouch about me here: {window.location.href}"
                </p>
                <button
                  onClick={() => copyInviteMessage('vouch')}
                  className="mt-3 w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Vouch Invite Text
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left">
                <span className="text-xs font-bold uppercase text-sky-400">Invite 2: For LinkedIn/Instagram Scouted Links</span>
                <p className="text-xs text-slate-300 mt-1 italic">
                  "Hey! If you see anyone interesting on LinkedIn or Instagram, drop their link here: {window.location.href}"
                </p>
                <button
                  onClick={() => copyInviteMessage('scout')}
                  className="mt-3 w-full py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
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
