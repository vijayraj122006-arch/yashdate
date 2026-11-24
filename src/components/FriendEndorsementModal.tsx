import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { createVouchWhatsAppUrl } from '../utils/whatsappHelper';
import { X, Heart, MessageCircle, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WINGMAN_PRESETS = [
  {
    label: '🟢 Green Flag Vibe',
    desc: 'Yash is 6ft of pure calm energy. Doesn\'t play games, loves Anuv Jain songs, and will genuinely remember your favorite coffee order.',
    why: 'He is a certified green flag, emotionally grounded, and has top-tier dry humor.',
  },
  {
    label: '✈️ Future Pilot & Foodie',
    desc: 'Aspiring pilot with mallu roots and Chennai warmth. Super hilarious, thoughtful, and makes amazing late-night pasta.',
    why: 'He is 6ft tall, cute and witty, and will literally fly you into the sunset.',
  },
  {
    label: '✨ Authentic & Thoughtful',
    desc: 'One of the most authentic and kindest guys you\'ll ever meet. Great listener, loves acoustic music, and treats people with true respect.',
    why: 'Zero drama, loyal, dependable, and genuine husband material.',
  },
];

export const FriendEndorsementModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { daterProfile, addEndorsement, session } = useApp();

  const [friendName, setFriendName] = useState(
    session?.role === 'friend' && session.username !== 'friend' ? session.username : ''
  );
  const [relationship, setRelationship] = useState('Close Friend');
  const [yearsKnown, setYearsKnown] = useState(3);
  const [description, setDescription] = useState('');
  const [whyYouShouldDateThem, setWhyYouShouldDateThem] = useState('');
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: typeof WINGMAN_PRESETS[0]) => {
    setDescription(preset.desc);
    setWhyYouShouldDateThem(preset.why);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim() || !description.trim()) return;

    addEndorsement({
      friendName: friendName.trim(),
      relationship: relationship.trim() || 'Friend',
      yearsKnown: Number(yearsKnown) || 1,
      description: description.trim(),
      whyYouShouldDateThem: whyYouShouldDateThem.trim(),
    });

    if (notifyWhatsapp) {
      const waUrl = createVouchWhatsAppUrl(daterProfile.whatsappNumber, friendName.trim(), description.trim());
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }

    onClose();
    setDescription('');
    setWhyYouShouldDateThem('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#13131c] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-7 text-zinc-100 my-8">
        <button
          onClick={onClose}
          data-testid="endorse-modal-close"
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-[#181824] hover:bg-[#222232] border border-white/5 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-1 text-left">
          <div className="p-2 bg-gradient-to-tr from-rose-600 to-pink-600 text-white rounded-xl shadow-md shadow-rose-600/25">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Vouch for {daterProfile.name}
            </h2>
          </div>
        </div>
        <p className="text-xs text-zinc-400 mb-3 text-left">
          Write an honest description about him, or use a 1-click wingman pitch generator below!
        </p>

        {/* 1-Click Wingman Pitch Generator */}
        <div className="mb-4 p-3 rounded-2xl bg-[#181824] border border-rose-500/20 text-left">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>1-Click Wingman Pitch Generator</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {WINGMAN_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                data-testid={`preset-wingman-${idx}`}
                onClick={() => handleApplyPreset(p)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-200 border border-white/5 transition cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                data-testid="vouch-input-name"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Relationship
              </label>
              <input
                type="text"
                data-testid="vouch-input-rel"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g. Roommate, College Friend"
                className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Years Known
            </label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              data-testid="vouch-input-years"
              value={yearsKnown}
              onChange={(e) => setYearsKnown(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Describe {daterProfile.name} *
            </label>
            <textarea
              required
              rows={3}
              data-testid="vouch-input-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`What is ${daterProfile.name} really like? His humor, kindness, pilot ambition, or cooking?`}
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs leading-relaxed outline-none focus:border-rose-500 resize-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Why should someone date him?
            </label>
            <textarea
              rows={2}
              data-testid="vouch-input-why"
              value={whyYouShouldDateThem}
              onChange={(e) => setWhyYouShouldDateThem(e.target.value)}
              placeholder="e.g. He is 6ft, thoughtful, cooks great meals, and treats people with genuine care."
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs leading-relaxed outline-none focus:border-rose-500 resize-none transition"
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
              data-testid="vouch-cancel-btn"
              className="px-4 py-2 rounded-xl bg-[#181824] hover:bg-[#222232] text-zinc-300 text-xs font-medium border border-white/5 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="vouch-submit-btn"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold shadow-md shadow-rose-600/25 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white" /> Post Vouch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
