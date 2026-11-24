import React, { useState } from 'react';
import type { MatchRecommendation, MatchStatus } from '../types';
import { useApp } from '../context/AppContext';
import { getPlatformMeta } from '../utils/platformHelper';
import {
  ExternalLink,
  MessageSquare,
  Sparkles,
  User,
  Trash2,
  Calendar,
  Check,
  Clock,
  Heart,
  XCircle,
  Tag
} from 'lucide-react';

interface Props {
  recommendation: MatchRecommendation;
}

export const MatchLeadCard: React.FC<Props> = ({ recommendation }) => {
  const { updateMatchStatus, updateMatchNotes, deleteRecommendation } = useApp();
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(recommendation.daterPrivateNotes || '');

  const meta = getPlatformMeta(recommendation.platform);

  const handleSaveNotes = () => {
    updateMatchNotes(recommendation.id, notes);
    setIsEditingNotes(false);
  };

  const statusOptions: { value: MatchStatus; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'to_review', label: 'To Review', icon: <Clock className="w-3.5 h-3.5" />, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { value: 'interested', label: 'Interested 😍', icon: <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { value: 'contacted', label: 'DMed / Reached Out 💬', icon: <MessageSquare className="w-3.5 h-3.5" />, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { value: 'date_scheduled', label: 'Date Scheduled ☕', icon: <Calendar className="w-3.5 h-3.5" />, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { value: 'passed', label: 'Passed 🙈', icon: <XCircle className="w-3.5 h-3.5" />, color: 'text-slate-400 bg-slate-800 border-slate-700' },
  ];

  const currentStatusObj = statusOptions.find((s) => s.value === recommendation.status) || statusOptions[0];

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-lg flex flex-col justify-between">
      <div>
        {/* Top bar: Platform Badge & Friend who sent it */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1.5 ${meta.badgeBg}`}
            >
              {meta.name}
            </span>
            {recommendation.categoryTag && (
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-400" />
                {recommendation.categoryTag}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => deleteRecommendation(recommendation.id)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition"
              title="Delete recommendation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Candidate Info & Link */}
        <div className="mb-4">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              {recommendation.candidateName}
            </h3>
            {recommendation.candidateHandle && (
              <span className="text-xs text-slate-400 font-mono">
                {recommendation.candidateHandle}
              </span>
            )}
          </div>

          <a
            href={recommendation.profileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline mt-1.5 break-all group"
          >
            <span>{recommendation.profileLink}</span>
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </a>
        </div>

        {/* Friend Pitch Note */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300/90">
              Why {recommendation.friendName} sent this:
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
            "{recommendation.pitchNote}"
          </p>
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Recommended by <strong className="text-slate-300">{recommendation.friendName}</strong></span>
            <span>{new Date(recommendation.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Dater Private Notes */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Private Notes
            </span>
            {!isEditingNotes && (
              <button
                onClick={() => setIsEditingNotes(true)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
              >
                {notes ? 'Edit' : '+ Add Note'}
              </button>
            )}
          </div>

          {isEditingNotes ? (
            <div className="space-y-2">
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your private impressions, conversation notes, or follow-up plans..."
                className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-200 outline-none focus:border-indigo-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingNotes(false)}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="px-3 py-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-medium flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Save Note
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic bg-slate-800/30 p-2.5 rounded-lg border border-slate-800/60">
              {notes ? notes : 'No private notes yet. Click "+ Add Note" to jot down thoughts.'}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Status Control & Action */}
      <div className="pt-3 border-t border-slate-800/90 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          <select
            value={recommendation.status}
            onChange={(e) => updateMatchStatus(recommendation.id, e.target.value as MatchStatus)}
            className={`text-xs font-semibold px-2.5 py-1.5 rounded-xl border outline-none cursor-pointer ${currentStatusObj.color}`}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <a
          href={recommendation.profileLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 transition flex items-center gap-1.5"
        >
          <span>Open on {meta.name}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
