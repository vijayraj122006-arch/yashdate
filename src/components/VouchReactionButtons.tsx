import React, { useState, useEffect } from 'react';

interface Props {
  vouchId: string;
}

interface ReactionState {
  trueCount: number;
  greenCount: number;
  vouchCount: number;
  realCount: number;
  userReacted: string[];
}

export const VouchReactionButtons: React.FC<Props> = ({ vouchId }) => {
  const storageKey = `yashdate_vouch_reactions_${vouchId}`;

  const [state, setState] = useState<ReactionState>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {}
    // default seed based on vouchId
    const seed = vouchId.charCodeAt(0) || 5;
    return {
      trueCount: (seed % 5) + 3,
      greenCount: (seed % 4) + 4,
      vouchCount: (seed % 6) + 2,
      realCount: (seed % 3) + 2,
      userReacted: [],
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  }, [state, storageKey]);

  const handleToggleReaction = (type: 'true' | 'green' | 'vouch' | 'real') => {
    setState((prev) => {
      const hasReacted = prev.userReacted.includes(type);
      const countKey =
        type === 'true'
          ? 'trueCount'
          : type === 'green'
          ? 'greenCount'
          : type === 'vouch'
          ? 'vouchCount'
          : 'realCount';

      return {
        ...prev,
        [countKey]: hasReacted ? Math.max(0, prev[countKey] - 1) : prev[countKey] + 1,
        userReacted: hasReacted
          ? prev.userReacted.filter((r) => r !== type)
          : [...prev.userReacted, type],
      };
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-white/5">
      <button
        type="button"
        data-testid={`react-true-${vouchId}`}
        onClick={() => handleToggleReaction('true')}
        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border flex items-center gap-1 transition cursor-pointer ${
          state.userReacted.includes('true')
            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            : 'bg-[#181824] hover:bg-[#202030] text-zinc-400 hover:text-zinc-200 border-white/5'
        }`}
      >
        <span>💯</span>
        <span>100% True</span>
        <span className="text-[10px] opacity-75 font-mono">{state.trueCount}</span>
      </button>

      <button
        type="button"
        data-testid={`react-green-${vouchId}`}
        onClick={() => handleToggleReaction('green')}
        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border flex items-center gap-1 transition cursor-pointer ${
          state.userReacted.includes('green')
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            : 'bg-[#181824] hover:bg-[#202030] text-zinc-400 hover:text-zinc-200 border-white/5'
        }`}
      >
        <span>🟢</span>
        <span>Green Flag</span>
        <span className="text-[10px] opacity-75 font-mono">{state.greenCount}</span>
      </button>

      <button
        type="button"
        data-testid={`react-vouch-${vouchId}`}
        onClick={() => handleToggleReaction('vouch')}
        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border flex items-center gap-1 transition cursor-pointer ${
          state.userReacted.includes('vouch')
            ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
            : 'bg-[#181824] hover:bg-[#202030] text-zinc-400 hover:text-zinc-200 border-white/5'
        }`}
      >
        <span>🤝</span>
        <span>Vouched</span>
        <span className="text-[10px] opacity-75 font-mono">{state.vouchCount}</span>
      </button>

      <button
        type="button"
        data-testid={`react-real-${vouchId}`}
        onClick={() => handleToggleReaction('real')}
        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border flex items-center gap-1 transition cursor-pointer ${
          state.userReacted.includes('real')
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            : 'bg-[#181824] hover:bg-[#202030] text-zinc-400 hover:text-zinc-200 border-white/5'
        }`}
      >
        <span>👑</span>
        <span>Real One</span>
        <span className="text-[10px] opacity-75 font-mono">{state.realCount}</span>
      </button>
    </div>
  );
};
