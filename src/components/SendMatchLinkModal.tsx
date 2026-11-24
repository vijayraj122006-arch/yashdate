import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { detectPlatform } from '../utils/platformHelper';
import type { PlatformType } from '../types';
import { X, Send, Compass } from 'lucide-react';

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
      friendName: friendName.trim(),
      candidateName: candidateName.trim(),
      candidateHandle: candidateHandle.trim() || undefined,
      profileLink: profileLink.trim(),
      platform,
      pitchNote: pitchNote.trim(),
    });

    onClose();
    setCandidateName('');
    setCandidateHandle('');
    setProfileLink('');
    setPitchNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 sm:p-7 text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-1">
          <div className="p-2 bg-sky-600/20 text-sky-400 rounded-lg">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Send a Match Link to {daterProfile.name}
            </h2>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Found someone on LinkedIn or Instagram who would hit it off with {daterProfile.name}?
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="e.g. Pooja"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Profile Link (LinkedIn, Instagram, etc.) *
            </label>
            <input
              type="url"
              required
              value={profileLink}
              onChange={handleUrlChange}
              placeholder="https://instagram.com/username or https://linkedin.com/in/username"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
            />
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
                placeholder="e.g. Diya"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Handle (optional)
              </label>
              <input
                type="text"
                value={candidateHandle}
                onChange={(e) => setCandidateHandle(e.target.value)}
                placeholder="@diya_krish"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Why would they vibe together?
            </label>
            <textarea
              required
              rows={3}
              value={pitchNote}
              onChange={(e) => setPitchNote(e.target.value)}
              placeholder="e.g. She loves Anuv Jain songs, studies design, and is super witty. You two would have great chemistry."
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed outline-none focus:border-sky-500 resize-none"
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
              <Send className="w-3.5 h-3.5" /> Send to {daterProfile.name}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
