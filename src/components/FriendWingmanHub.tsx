import React from 'react';
import { useApp } from '../context/AppContext';
import { EndorsementCard } from './EndorsementCard';
import { getPlatformMeta } from '../utils/platformHelper';
import {
  Heart,
  Compass,
  Sparkles,
  Users,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

interface Props {
  onOpenEndorseModal: () => void;
  onOpenSendLinkModal: () => void;
}

export const FriendWingmanHub: React.FC<Props> = ({ onOpenEndorseModal, onOpenSendLinkModal }) => {
  const { daterProfile, endorsements, recommendations } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Banner for Friends */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-rose-950/40 border border-slate-800 p-8 sm:p-12 text-center shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Official Wingman Headquarters
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
          Help <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">{daterProfile.name}</span> Find Someone Amazing ✨
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Traditional dating apps are noisy and impersonal. You know {daterProfile.name} best! Help him stand out by writing a genuine friend description or dropping match links from LinkedIn & Instagram.
        </p>

        {/* Big Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
          {/* Action 1: Write Description / Vouch */}
          <div
            onClick={onOpenEndorseModal}
            className="group relative rounded-2xl bg-gradient-to-b from-slate-900 to-rose-950/30 border border-rose-500/30 hover:border-rose-500/60 p-6 sm:p-8 text-left transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-rose-500/10 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition duration-300">
                <Heart className="w-7 h-7 fill-rose-500 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-rose-300 transition">
                Write a Friend Description / Vouch
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Describe what {daterProfile.name} is like behind the scenes, highlight his top green flags, and share why someone would be lucky to date him.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-rose-400 font-bold text-sm group-hover:translate-x-1 transition">
              <span>Write Testimonial</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Action 2: Send Match Link */}
          <div
            onClick={onOpenSendLinkModal}
            className="group relative rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950/30 border border-indigo-500/30 hover:border-indigo-500/60 p-6 sm:p-8 text-left transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition duration-300">
                <Compass className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition">
                Send a Match Profile Link
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Know someone who matches his energy? Send a link from LinkedIn, Instagram, or Twitter with a quick note on why they'd hit it off.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-indigo-400 font-bold text-sm group-hover:translate-x-1 transition">
              <span>Send LinkedIn / Instagram Link</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Community Wingman Activity Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-rose-400" />
              Friend Descriptions Already Posted ({endorsements.length})
            </h2>
            <p className="text-sm text-slate-400">
              Check out the vouches his inner circle has contributed so far.
            </p>
          </div>
          <button
            onClick={onOpenEndorseModal}
            className="text-xs sm:text-sm font-semibold text-rose-400 hover:text-rose-300 cursor-pointer"
          >
            + Add Your Own Description
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {endorsements.map((endorsement) => (
            <EndorsementCard key={endorsement.id} endorsement={endorsement} />
          ))}
        </div>
      </div>

      {/* Scouted Candidate Links Showcase */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-indigo-400" />
              Match Profiles Scouted by Friends ({recommendations.length})
            </h2>
            <p className="text-sm text-slate-400">
              Profiles recommended from LinkedIn, Instagram, and web platforms.
            </p>
          </div>
          <button
            onClick={onOpenSendLinkModal}
            className="text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            + Recommend Someone You Know
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.map((rec) => {
            const meta = getPlatformMeta(rec.platform);
            return (
              <div
                key={rec.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white ${meta.badgeBg}`}
                    >
                      {meta.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      via {rec.friendName}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-white">{rec.candidateName}</h4>
                  {rec.candidateHandle && (
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{rec.candidateHandle}</p>
                  )}

                  <p className="text-xs text-slate-300 italic mt-3 line-clamp-3 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                    "{rec.pitchNote}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    Status: <span className="capitalize text-slate-200">{rec.status.replace('_', ' ')}</span>
                  </span>
                  <a
                    href={rec.profileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>View Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
