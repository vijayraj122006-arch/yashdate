import React from 'react';
import type { FriendEndorsement } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Star, Sparkles, Pin, Trash2, CheckCircle2 } from 'lucide-react';

interface Props {
  endorsement: FriendEndorsement;
  isDaterMode?: boolean;
}

export const EndorsementCard: React.FC<Props> = ({ endorsement, isDaterMode = false }) => {
  const { toggleFeatureEndorsement, deleteEndorsement } = useApp();

  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-300 border backdrop-blur-md ${
        endorsement.isFeatured
          ? 'bg-gradient-to-b from-slate-900 via-slate-900/90 to-rose-950/20 border-rose-500/40 shadow-xl shadow-rose-950/30'
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Header with friend avatar and meta */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rose-500/30 bg-slate-800 flex-shrink-0">
            {endorsement.friendAvatar ? (
              <img
                src={endorsement.friendAvatar}
                alt={endorsement.friendName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-rose-500 to-pink-600 text-white font-bold text-lg">
                {endorsement.friendName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="font-bold text-base text-white">{endorsement.friendName}</h4>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <CheckCircle2 className="w-3 h-3 text-rose-400" /> Verified Wingman
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {endorsement.relationship} • {endorsement.yearsKnown} {endorsement.yearsKnown === 1 ? 'year' : 'years'} of friendship
            </p>
          </div>
        </div>

        {/* Score & Dater controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{endorsement.ratingScore}/10</span>
          </div>

          {isDaterMode && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleFeatureEndorsement(endorsement.id)}
                className={`p-1.5 rounded-lg border transition ${
                  endorsement.isFeatured
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
                title={endorsement.isFeatured ? 'Pinned to Public Profile' : 'Pin to Public Profile'}
              >
                <Pin className={`w-3.5 h-3.5 ${endorsement.isFeatured ? 'fill-rose-400' : ''}`} />
              </button>
              <button
                onClick={() => deleteEndorsement(endorsement.id)}
                className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition"
                title="Remove endorsement"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Featured badge */}
      {endorsement.isFeatured && (
        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 mb-3 bg-rose-500/10 px-2.5 py-0.5 rounded-md border border-rose-500/20">
          <Sparkles className="w-3 h-3" /> Pinned on Public Dating Profile
        </div>
      )}

      {/* Description quote */}
      <div className="mb-4">
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic relative pl-4 border-l-2 border-rose-500/50">
          "{endorsement.description}"
        </p>
      </div>

      {/* Why you should date them */}
      {endorsement.whyYouShouldDateThem && (
        <div className="mb-4 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Heart className="w-3 h-3 fill-rose-400" /> Why you should date them:
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            {endorsement.whyYouShouldDateThem}
          </p>
        </div>
      )}

      {/* Green Flags */}
      {endorsement.greenFlags && endorsement.greenFlags.length > 0 && (
        <div className="mb-3">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Friend-Certified Green Flags:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {endorsement.greenFlags.map((flag, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 font-medium"
              >
                {flag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quirk / Roast */}
      {endorsement.quirkOrRoast && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-400">
          <span className="font-semibold text-amber-400/90 whitespace-nowrap">Playful Warning:</span>
          <span className="italic text-slate-300">"{endorsement.quirkOrRoast}"</span>
        </div>
      )}
    </div>
  );
};
