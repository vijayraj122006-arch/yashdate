import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Badge {
  id: string;
  emoji: string;
  label: string;
  count: number;
}

const DEFAULT_BADGES: Badge[] = [
  { id: 'pilot', emoji: '✈️', label: 'Future Airline Captain', count: 12 },
  { id: 'green_flag', emoji: '🌲', label: 'Certified Green Flag', count: 18 },
  { id: 'tall_boy', emoji: '📏', label: 'Tall Boy Energy (6ft)', count: 15 },
  { id: 'pasta', emoji: '🍝', label: 'Will Cook Pasta For You', count: 9 },
  { id: 'anuv_jain', emoji: '🎧', label: 'Anuv Jain Playlist Curator', count: 14 },
  { id: 'coffee', emoji: '☕', label: 'Chennai Filter Coffee Connoisseur', count: 11 },
];

const STAMP_STORAGE_KEY = 'yashdate_friend_stamp_badges_v1';
const USER_STAMPS_KEY = 'yashdate_user_stamped_ids_v1';

export const FriendStampBadges: React.FC = () => {
  const { addToast, triggerConfetti } = useApp();
  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem(STAMP_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_BADGES;
    } catch {
      return DEFAULT_BADGES;
    }
  });

  const [userStamped, setUserStamped] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(USER_STAMPS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STAMP_STORAGE_KEY, JSON.stringify(badges));
    } catch (e) {
      console.error(e);
    }
  }, [badges]);

  useEffect(() => {
    try {
      localStorage.setItem(USER_STAMPS_KEY, JSON.stringify(userStamped));
    } catch (e) {
      console.error(e);
    }
  }, [userStamped]);

  const handleStamp = (id: string, label: string) => {
    if (userStamped.includes(id)) {
      addToast(`You already stamped "${label}"!`, 'info');
      return;
    }

    setBadges((prev) =>
      prev.map((b) => (b.id === id ? { ...b, count: b.count + 1 } : b))
    );
    setUserStamped((prev) => [...prev, id]);
    triggerConfetti();
    addToast(`Stamped "${label}"! ✨`, 'love');
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#181824] border border-white/5 space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            Friend Community Stamps
          </h4>
        </div>
        <span className="text-[11px] text-zinc-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Tap badge to vouch
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {badges.map((b) => {
          const isStamped = userStamped.includes(b.id);
          return (
            <button
              key={b.id}
              onClick={() => handleStamp(b.id, b.label)}
              data-testid={`stamp-badge-${b.id}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer ${
                isStamped
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm shadow-rose-500/10'
                  : 'bg-[#13131c] hover:bg-[#20202e] text-zinc-300 border-white/10 hover:border-white/20'
              }`}
            >
              <span>{b.emoji}</span>
              <span>{b.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5 ${
                  isStamped ? 'bg-rose-500 text-white' : 'bg-white/10 text-zinc-400'
                }`}
              >
                {b.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
