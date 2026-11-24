import React from 'react';
import { useApp } from '../context/AppContext';
import { EndorsementCard } from './EndorsementCard';
import { getPlatformMeta } from '../utils/platformHelper';
import {
  Heart,
  Compass,
  Users,
  ExternalLink,
  ArrowRight,
  Plane,
} from 'lucide-react';

interface Props {
  onOpenEndorseModal: () => void;
  onOpenSendLinkModal: () => void;
}

export const FriendWingmanHub: React.FC<Props> = ({ onOpenEndorseModal, onOpenSendLinkModal }) => {
  const { daterProfile, endorsements, recommendations } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Banner for Friends */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-8 sm:p-12 text-center shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 border border-slate-700 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Plane className="w-3.5 h-3.5 text-sky-400" /> Wingman Command Center
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight max-w-2xl mx-auto leading-tight">
          Help <span className="text-sky-400">{daterProfile.name}</span> Find Someone Wonderful
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-3 leading-relaxed">
          {daterProfile.name} is a 6ft Mallu aviation cadet in Chennai who loves Anuv Jain and appreciates cute banter with short girls. As his friend, share an honest vouch or scout prospective dates from LinkedIn and Instagram.
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mt-8">
          {/* Action 1: Write Vouch */}
          <div
            onClick={onOpenEndorseModal}
            className="group rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 p-6 text-left transition shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-rose-400 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition">
                Write a Friend Description / Vouch
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Describe his personality, pilot ambitions, green flags, and why someone would be genuinely lucky to date him.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-rose-400 font-bold text-xs group-hover:translate-x-1 transition">
              <span>Write Testimonial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Action 2: Send Match Link */}
          <div
            onClick={onOpenSendLinkModal}
            className="group rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 p-6 text-left transition shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-sky-400 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Compass className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition">
                Send a Candidate Profile Link
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Know someone who matches his wavelength? Send a link from LinkedIn or Instagram with a note on why they would vibe.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-sky-400 font-bold text-xs group-hover:translate-x-1 transition">
              <span>Recommend Candidate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Community Endorsements List */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-rose-400" />
              Friend Endorsements Posted ({endorsements.length})
            </h2>
            <p className="text-xs text-slate-400">
              Vouches contributed by his closest circle in Chennai.
            </p>
          </div>
          <button
            onClick={onOpenEndorseModal}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 cursor-pointer"
          >
            + Add Your Vouch
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {endorsements.map((endorsement) => (
            <EndorsementCard key={endorsement.id} endorsement={endorsement} />
          ))}
        </div>
      </div>

      {/* Scouted Candidates Showcase */}
      <div className="space-y-5 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-sky-400" />
              Candidate Links Scouted by Friends ({recommendations.length})
            </h2>
            <p className="text-xs text-slate-400">
              Profiles recommended from LinkedIn, Instagram, and web platforms.
            </p>
          </div>
          <button
            onClick={onOpenSendLinkModal}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 cursor-pointer"
          >
            + Recommend Candidate
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec) => {
            const meta = getPlatformMeta(rec.platform);
            return (
              <div
                key={rec.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white ${meta.badgeBg}`}
                    >
                      {meta.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      via {rec.friendName}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white">{rec.candidateName}</h4>
                  {rec.candidateHandle && (
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{rec.candidateHandle}</p>
                  )}

                  <p className="text-xs text-slate-300 italic mt-2.5 line-clamp-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    "{rec.pitchNote}"
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400">
                    Status: <span className="capitalize text-slate-200">{rec.status.replace('_', ' ')}</span>
                  </span>
                  <a
                    href={rec.profileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
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
