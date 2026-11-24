import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { detectPlatform } from '../utils/platformHelper';
import { createMatchWhatsAppUrl } from '../utils/whatsappHelper';
import type { PlatformType } from '../types';
import { X, Send, Compass, MessageCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SendMatchLinkModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { daterProfile, addRecommendation, session } = useApp();

  const [friendName, setFriendName] = useState(
    session?.role === 'friend' && session.username !== 'friend' ? session.username : ''
  );
  const [candidateName, setCandidateName] = useState('');
  const [candidateHandle, setCandidateHandle] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [pitchNote, setPitchNote] = useState('');
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);

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

    if (notifyWhatsapp) {
      const waUrl = createMatchWhatsAppUrl(
        daterProfile.whatsappNumber,
        friendName.trim(),
        candidateName.trim(),
        platform,
        profileLink.trim(),
        pitchNote.trim()
      );
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }

    onClose();
    setCandidateName('');
    setCandidateHandle('');
    setProfileLink('');
    setPitchNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#13131c] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-7 text-zinc-100 my-8">
        <button
          onClick={onClose}
          data-testid="send-match-modal-close"
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-[#181824] hover:bg-[#222232] border border-white/5 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-1 text-left">
          <div className="p-2 bg-gradient-to-tr from-sky-600 to-blue-600 text-white rounded-xl shadow-md shadow-sky-600/25">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Send a Match Link to {daterProfile.name}
            </h2>
          </div>
        </div>
        <p className="text-xs text-zinc-400 mb-4 text-left">
          Found someone on LinkedIn or Instagram who would hit it off with {daterProfile.name}?
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              data-testid="match-input-friend"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-sky-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Profile Link (LinkedIn, Instagram, etc.) *
            </label>
            <input
              type="url"
              required
              data-testid="match-input-link"
              value={profileLink}
              onChange={handleUrlChange}
              placeholder="https://instagram.com/username or https://linkedin.com/in/username"
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-sky-500 font-mono text-[11px] transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Candidate Name *
              </label>
              <input
                type="text"
                required
                data-testid="match-input-candidate"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Candidate's name"
                className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-sky-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Handle (optional)
              </label>
              <input
                type="text"
                data-testid="match-input-handle"
                value={candidateHandle}
                onChange={(e) => setCandidateHandle(e.target.value)}
                placeholder="@diya_krish"
                className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-sky-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Why would they vibe together?
            </label>
            <textarea
              required
              rows={3}
              data-testid="match-input-pitch"
              value={pitchNote}
              onChange={(e) => setPitchNote(e.target.value)}
              placeholder="e.g. She loves Anuv Jain songs, studies design, and is super witty. You two would have great chemistry."
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs leading-relaxed outline-none focus:border-sky-500 resize-none transition"
            />
          </div>

          {/* WhatsApp Notification Option */}
          <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#181824] border border-white/5 cursor-pointer text-xs text-zinc-300 hover:border-emerald-500/30 transition">
            <input
              type="checkbox"
              checked={notifyWhatsapp}
              onChange={(e) => setNotifyWhatsapp(e.target.checked)}
              className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
            />
            <span className="flex-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                <MessageCircle className="w-3.5 h-3.5" />
                Notify Yash directly on WhatsApp
              </span>
              <span className="text-[11px] text-zinc-400">Instant Alert</span>
            </span>
          </label>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              data-testid="match-cancel-btn"
              className="px-4 py-2 rounded-xl bg-[#181824] hover:bg-[#222232] text-zinc-300 text-xs font-medium border border-white/5 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="match-submit-btn"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-sky-600/25 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Send to {daterProfile.name}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
