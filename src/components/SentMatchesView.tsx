import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { MatchStatus } from '../types';
import { Compass, Plus, ExternalLink, Trash2, Check, User } from 'lucide-react';

interface Props {
  onOpenSendLinkModal: () => void;
}

export const SentMatchesView: React.FC<Props> = ({ onOpenSendLinkModal }) => {
  const { recommendations, updateMatchStatus, updateMatchNotes, deleteRecommendation, daterProfile } = useApp();
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const handleStartEditNote = (id: string, currentNote?: string) => {
    setEditingNoteId(id);
    setNoteText(currentNote || '');
  };

  const handleSaveNote = (id: string) => {
    updateMatchNotes(id, noteText);
    setEditingNoteId(null);
  };

  const statusOptions: { value: MatchStatus; label: string }[] = [
    { value: 'to_review', label: 'To Review' },
    { value: 'interested', label: 'Interested' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'passed', label: 'Passed' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-400" />
            Sent Match Recommendations
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Profiles scouted and sent by friends for {daterProfile.name}.
          </p>
        </div>
        <button
          onClick={onOpenSendLinkModal}
          className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Send Match Link</span>
        </button>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-6">
          <p className="text-sm text-slate-400 mb-3">No match recommendations sent yet.</p>
          <button
            onClick={onOpenSendLinkModal}
            className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold"
          >
            Recommend Someone from LinkedIn or Instagram
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-sky-400" />
                      {item.candidateName}
                    </h4>
                    {item.candidateHandle && (
                      <span className="text-xs text-slate-400 font-mono">
                        {item.candidateHandle}
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.platform}
                    </span>
                  </div>

                  <a
                    href={item.profileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 mt-1"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={item.status}
                    onChange={(e) => updateMatchStatus(item.id, e.target.value as MatchStatus)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 outline-none cursor-pointer"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => deleteRecommendation(item.id)}
                    className="p-1 text-slate-500 hover:text-red-400 transition"
                    title="Remove match"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Friend pitch note */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-0.5">
                  Why {item.friendName} recommended them:
                </span>
                <p className="text-slate-300 italic leading-relaxed">
                  "{item.pitchNote}"
                </p>
              </div>

              {/* Dater private note */}
              <div className="text-xs pt-1">
                {editingNoteId === item.id ? (
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add private note..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={() => handleSaveNote(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3 h-3" /> Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px] italic">
                      {item.daterNotes ? `Note: ${item.daterNotes}` : 'No private notes yet.'}
                    </span>
                    <button
                      onClick={() => handleStartEditNote(item.id, item.daterNotes)}
                      className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
                    >
                      {item.daterNotes ? 'Edit Note' : '+ Add Note'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
