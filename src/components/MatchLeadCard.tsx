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
  Tag,
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
    { value: 'to_review', label: 'To Review', icon: <Clock className="w-3.5 h-3.5" />, color: 'text-amber-300 bg-slate-800 border-slate-700' },
    { value: 'interested', label: 'Interested', icon: <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />, color: 'text-rose-300 bg-slate-800 border-rose-500/30' },
    { value: 'contacted', label: 'Contacted / DMed', icon: <MessageSquare className="w-3.5 h-3.5" />, color: 'text-sky-300 bg-slate-800 border-sky-500/30' },
    { value: 'date_scheduled', label: 'Date Scheduled', icon: <Calendar className="w-3.5 h-3.5" />, color: 'text-emerald-300 bg-slate-800 border-emerald-500/30' },
    { value: 'passed', label: 'Passed', icon: <XCircle className="w-3.5 h-3.5" />, color: 'text-slate-400 bg-slate-800 border-slate-700' },
  ];

  const currentStatusObj = statusOptions.find((s) => s.value === recommendation.status) || statusOptions[0];

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 transition shadow-md flex flex-col justify-between">
      <div>
        {/* Top bar: Platform Badge & Actions */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-white ${meta.badgeBg}`}
            >
              {meta.name}
            </span>
            {recommendation.categoryTag && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-400" />
                {recommendation.categoryTag}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => deleteRecommendation(recommendation.id)}
              className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-slate-800 transition"
              title="Delete candidate"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Candidate Info */}
        <div className="mb-3.5">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-sky-400" />
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
            className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 hover:underline mt-1 break-all group"
          >
            <span>{recommendation.profileLink}</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
        </div>

        {/* Friend Pitch Note */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 mb-3.5">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
              Note from {recommendation.friendName}:
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed italic">
            "{recommendation.pitchNote}"
          </p>
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <span>Wingman: <strong className="text-slate-300">{recommendation.friendName}</strong></span>
            <span>{new Date(recommendation.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Dater Private Notes */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Private Notes
            </span>
            {!isEditingNotes && (
              <button
                onClick={() => setIsEditingNotes(true)}
                className="text-[10px] text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
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
                placeholder="Write private impressions, conversation notes, or date thoughts..."
                className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-200 outline-none focus:border-sky-500"
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
                  className="px-3 py-1 text-xs bg-sky-600 hover:bg-sky-500 text-white rounded-md font-medium flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Save Note
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              {notes ? notes : 'No private notes yet.'}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Status & Link Action */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          <select
            value={recommendation.status}
            onChange={(e) => updateMatchStatus(recommendation.id, e.target.value as MatchStatus)}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${currentStatusObj.color}`}
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
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-800 hover:bg-sky-600 border border-slate-700 hover:border-sky-500 transition flex items-center gap-1.5"
        >
          <span>Open Profile</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
