import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Plus, Trash2 } from 'lucide-react';

interface Props {
  onOpenEndorseModal: () => void;
}

export const FriendVouchesView: React.FC<Props> = ({ onOpenEndorseModal }) => {
  const { endorsements, deleteEndorsement, daterProfile } = useApp();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            Friend Descriptions & Vouches
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            What real friends have written about {daterProfile.name}.
          </p>
        </div>
        <button
          onClick={onOpenEndorseModal}
          className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write Vouch</span>
        </button>
      </div>

      {endorsements.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-6">
          <p className="text-sm text-slate-400 mb-3">No friend descriptions written yet.</p>
          <button
            onClick={onOpenEndorseModal}
            className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold"
          >
            Be the First to Vouch
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {endorsements.map((e) => (
            <div
              key={e.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-white border border-slate-700">
                    {e.friendName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {e.friendName}
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-normal">
                        {e.relationship}
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Known for {e.yearsKnown} {e.yearsKnown === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => deleteEndorsement(e.id)}
                  className="p-1.5 text-slate-500 hover:text-red-400 transition"
                  title="Remove vouch"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic pl-3 border-l-2 border-rose-500/40">
                "{e.description}"
              </p>

              {e.whyYouShouldDateThem && (
                <div className="text-xs text-slate-300 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-rose-400">Why date him:</strong> {e.whyYouShouldDateThem}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
