import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { detectPlatform, getPlatformMeta } from '../utils/platformHelper';
import type { PlatformType } from '../types';
import { X, Send, Link as LinkIcon, Compass, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SendMatchLinkModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { daterProfile, addRecommendation } = useApp();

  const [friendName, setFriendName] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidateHandle, setCandidateHandle] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [pitchNote, setPitchNote] = useState('');
  const [categoryTag, setCategoryTag] = useState('');

  if (!isOpen) return null;

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setProfileLink(url);
    if (url.trim()) {
      const detected = detectPlatform(url);
      setPlatform(detected);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileLink.trim() || !candidateName.trim() || !friendName.trim()) return;

    addRecommendation({
      daterId: daterProfile.id,
      friendName: friendName.trim(),
      candidateName: candidateName.trim(),
      candidateHandle: candidateHandle.trim() || undefined,
      profileLink: profileLink.trim(),
      platform,
      pitchNote:
        pitchNote.trim() ||
        `Found on ${platform}! I think you two have great chemistry and shared interests.`,
      categoryTag: categoryTag.trim() || undefined,
    });

    onClose();
    // Reset form
    setCandidateName('');
    setCandidateHandle('');
    setProfileLink('');
    setPitchNote('');
    setCategoryTag('');
  };

  const meta = getPlatformMeta(platform);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl text-white shadow-lg shadow-indigo-500/20">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Send a Match Link to {daterProfile.name}
            </h2>
            <p className="text-sm text-slate-400">
              Scouted someone cute or interesting on LinkedIn, Instagram, or Twitter? Drop their link into {daterProfile.name}'s dating inbox!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Friend's Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Your Name (The Wingman) *
            </label>
            <input
              type="text"
              required
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="e.g. Maya or Rohan"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 text-sm outline-none transition"
            />
          </div>

          {/* Profile Link */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Candidate Profile Link *
              </label>
              <span className="text-xs text-indigo-400 font-medium flex items-center gap-1">
                <LinkIcon className="w-3.5 h-3.5" /> Auto-detects platform
              </span>
            </div>
            <input
              type="url"
              required
              value={profileLink}
              onChange={handleUrlChange}
              placeholder="e.g. https://www.linkedin.com/in/... or https://instagram.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 text-sm outline-none transition"
            />
          </div>

          {/* Platform Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Platform
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {(['instagram', 'linkedin', 'twitter', 'github', 'tiktok', 'website'] as PlatformType[]).map(
                (p) => {
                  const isSelected = platform === p;
                  return (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={`px-2.5 py-2 rounded-xl text-xs font-semibold capitalize border transition cursor-pointer text-center ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/20'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {p === 'website' ? 'Web/Portfolio' : p}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Candidate Name & Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Candidate's Name *
              </label>
              <input
                type="text"
                required
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 text-sm outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Social Handle (optional)
              </label>
              <input
                type="text"
                value={candidateHandle}
                onChange={(e) => setCandidateHandle(e.target.value)}
                placeholder="e.g. @priya_designs"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 text-sm outline-none transition"
              />
            </div>
          </div>

          {/* Category Tag */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Vibe / Profession Tag
            </label>
            <input
              type="text"
              value={categoryTag}
              onChange={(e) => setCategoryTag(e.target.value)}
              placeholder="e.g. UI/UX Designer & Dog Lover, FinTech Founder, Neuroscientist"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 text-sm outline-none transition"
            />
          </div>

          {/* Pitch Note */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Wingman Pitch: Why You Think They'd Vibe *
              </label>
              <span className="text-xs text-indigo-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> What caught your eye?
              </span>
            </div>
            <textarea
              required
              rows={3}
              value={pitchNote}
              onChange={(e) => setPitchNote(e.target.value)}
              placeholder={`"Yash, I saw her post about artisanal coffee and indie music on ${meta.name} and thought of you immediately! You two have the exact same goofy sense of humor."`}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 text-sm outline-none transition resize-none"
            />
          </div>

          {/* Submit buttons */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Drop Match Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
