import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { detectPlatform } from '../utils/platformHelper';
import type { PlatformType } from '../types';
import { X, Send, Link as LinkIcon, Compass } from 'lucide-react';

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
        `Found on ${platform}. I think you two have great chemistry and shared taste.`,
      categoryTag: categoryTag.trim() || undefined,
    });

    onClose();
    setCandidateName('');
    setCandidateHandle('');
    setProfileLink('');
    setPitchNote('');
    setCategoryTag('');
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Send a Candidate Link to {daterProfile.name}
            </h2>
            <p className="text-xs text-slate-400">
              Found someone interesting on LinkedIn, Instagram, or Twitter? Drop their profile link into {daterProfile.name}'s dating inbox.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Your Name (Wingman) *
            </label>
            <input
              type="text"
              required
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="e.g. Pooja Sundaram"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Candidate Profile Link *
              </label>
              <span className="text-[10px] text-sky-400 font-medium flex items-center gap-1">
                <LinkIcon className="w-3 h-3" /> Auto-detects platform
              </span>
            </div>
            <input
              type="url"
              required
              value={profileLink}
              onChange={handleUrlChange}
              placeholder="https://instagram.com/username or https://linkedin.com/in/username"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
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
                      className={`px-2 py-1.5 rounded-lg text-xs font-semibold capitalize border transition cursor-pointer text-center ${
                        isSelected
                          ? 'bg-sky-600 text-white border-sky-500'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {p === 'website' ? 'Web' : p}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Candidate Name *
              </label>
              <input
                type="text"
                required
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="e.g. Diya Krishnan"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Social Handle (optional)
              </label>
              <input
                type="text"
                value={candidateHandle}
                onChange={(e) => setCandidateHandle(e.target.value)}
                placeholder="e.g. @diya_krish"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Vibe / Profession Tag
            </label>
            <input
              type="text"
              value={categoryTag}
              onChange={(e) => setCategoryTag(e.target.value)}
              placeholder="e.g. Communication Designer, Petite & Funny, Indie Music Lover"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Wingman Pitch: Why They Would Vibe Together *
            </label>
            <textarea
              required
              rows={3}
              value={pitchNote}
              onChange={(e) => setPitchNote(e.target.value)}
              placeholder={`"Yash, she is 5ft 1in, loves Anuv Jain songs, and posted about watching flight takeoffs in Chennai! You two would have the sweetest height difference and banter."`}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed outline-none focus:border-sky-500 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Drop Candidate Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
