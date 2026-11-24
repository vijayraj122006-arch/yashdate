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
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bio' | 'endorsements' | 'matches' | 'invite'>('matches');

  // Local state for editing dater's description
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
  });

  // Filter states for recommendations
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateDaterProfile({
      name: formData.name.trim(),
      age: Number(formData.age) || 24,
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
        ? `Hey! I'm using ${daterProfile.name}Date — write a friend description / vouch about me here: ${appUrl} ❤️`
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
              </div>
              <p className="text-sm font-medium text-slate-300 mt-1 flex items-center justify-center sm:justify-start gap-2">
                <Briefcase className="w-4 h-4 text-slate-400" />
                {daterProfile.occupation}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {daterProfile.location} • {daterProfile.pronouns}
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
          <span>Friend-Sent Match Links</span>
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
          <span>Friend Descriptions & Vouches</span>
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
          <span>My Self-Description & Bio</span>
        </button>

        <button
          onClick={() => setActiveTab('invite')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition cursor-pointer ${
            activeTab === 'invite'
              ? 'border-amber-500 text-amber-400 bg-amber-500/5'
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
                Wingman Recommendations (LinkedIn, Instagram & More)
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
                Here are descriptions written about you by your friends. Pin the best ones to show up on your public dating card!
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

      {/* Tab 3: My Self-Description & Bio */}
      {activeTab === 'bio' && (
        <section className="max-w-4xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-rose-400" />
              Your Self-Description & Profile Settings
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Put your description, ideal date ideas, what you are looking for, and social handles.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Your Name *
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
                  Occupation / Work
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

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Avatar Image URL
              </label>
              <input
                type="url"
                value={formData.avatarUrl}
                onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500 font-mono text-xs"
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
              <p className="text-xs text-slate-400 mb-2.5">
                Describe who you are, what you enjoy doing, what drives you, and what kind of conversations you love having on dates.
              </p>
              <textarea
                required
                rows={5}
                value={formData.selfDescription}
                onChange={(e) => setFormData({ ...formData, selfDescription: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm leading-relaxed outline-none focus:border-rose-500 resize-y"
              />
            </div>

            {/* Ideal Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                My Ideal First Date
              </label>
              <textarea
                rows={2}
                value={formData.idealDate}
                onChange={(e) => setFormData({ ...formData, idealDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500 resize-none"
              />
            </div>

            {/* What I'm looking for */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                What I'm Looking For in a Partner
              </label>
              <textarea
                rows={2}
                value={formData.whatImLookingFor}
                onChange={(e) => setFormData({ ...formData, whatImLookingFor: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500 resize-none"
              />
            </div>

            {/* Green flags & hot takes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Green Flags I Bring (one per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.greenFlagsInput}
                  onChange={(e) => setFormData({ ...formData, greenFlagsInput: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500 resize-none font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Hot Take / Quirk / Fun Fact
                </label>
                <textarea
                  rows={4}
                  value={formData.hotTakeOrQuirk}
                  onChange={(e) => setFormData({ ...formData, hotTakeOrQuirk: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500 resize-none"
                />
              </div>
            </div>

            {/* Hobbies */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Hobbies & Passions (comma separated)
              </label>
              <input
                type="text"
                value={formData.hobbiesInput}
                onChange={(e) => setFormData({ ...formData, hobbiesInput: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm outline-none focus:border-rose-500"
              />
            </div>

            {/* Submit button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm shadow-xl shadow-rose-500/30 flex items-center gap-2 transition cursor-pointer"
              >
                <Check className="w-5 h-5" />
                <span>Save Description & Profile</span>
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Tab 4: Invite Wingmen */}
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
