import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Award, Sparkles, Heart } from 'lucide-react';

export const WingmanLeaderboard: React.FC = () => {
  const { endorsements, recommendations } = useApp();

  // Aggregate stats per friend name
  const statsMap: Record<string, { vouches: number; matches: number }> = {};

  endorsements.forEach((e) => {
    const name = e.friendName.trim();
    if (!name) return;
    if (!statsMap[name]) statsMap[name] = { vouches: 0, matches: 0 };
    statsMap[name].vouches += 1;
  });

  recommendations.forEach((r) => {
    const name = r.friendName.trim();
    if (!name) return;
    if (!statsMap[name]) statsMap[name] = { vouches: 0, matches: 0 };
    statsMap[name].matches += 1;
  });

  const leaders = Object.entries(statsMap)
    .map(([name, data]) => ({
      name,
      vouches: data.vouches,
      matches: data.matches,
      totalPoints: data.vouches * 10 + data.matches * 15,
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints);

  if (leaders.length === 0) {
    return null;
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#181824] border border-white/5 space-y-3 text-left shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Wingman Leaderboard
          </h4>
        </div>
        <span className="text-[11px] text-zinc-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Top Scouts
        </span>
      </div>

      <div className="space-y-2">
        {leaders.slice(0, 3).map((leader, index) => {
          const medal =
            index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
          return (
            <div
              key={leader.name}
              data-testid={`leaderboard-item-${index}`}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#13131c] border border-white/5 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{medal}</span>
                <span className="font-semibold text-white">{leader.name}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
                {leader.vouches > 0 && (
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                    {leader.vouches} {leader.vouches === 1 ? 'vouch' : 'vouches'}
                  </span>
                )}
                {leader.matches > 0 && (
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-sky-400" />
                    {leader.matches} {leader.matches === 1 ? 'match' : 'matches'}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-white/5 font-mono text-amber-300 font-bold">
                  {leader.totalPoints} pts
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
