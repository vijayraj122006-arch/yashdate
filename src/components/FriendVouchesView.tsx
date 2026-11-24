import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Plus, Trash2 } from 'lucide-react';
import { WingmanLeaderboard } from './WingmanLeaderboard';
import { VoiceNotePlayer } from './VoiceNotePlayer';
import { VouchReactionButtons } from './VouchReactionButtons';

interface Props {
  onOpenEndorseModal: () => void;
}

export const FriendVouchesView: React.FC<Props> = ({ onOpenEndorseModal }) => {
  const { endorsements, deleteEndorsement, daterProfile, permissions } = useApp();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            Friend Descriptions & Vouches
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            What real friends have written about {daterProfile.name}.
          </p>
        </div>
        <button
          onClick={onOpenEndorseModal}
          data-testid="write-vouch-tab-btn"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-md shadow-rose-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write Vouch</span>
        </button>
      </div>

      {/* Wingman Leaderboard */}
      <WingmanLeaderboard />

      {/* Featured Voice Note Vouch */}
      <VoiceNotePlayer />

      {endorsements.length === 0 ? (
        <div className="text-center py-12 bg-[#13131c] border border-dashed border-white/10 rounded-3xl p-8 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-400 flex items-center justify-center mx-auto shadow-sm">
            <Heart className="w-6 h-6 fill-rose-500/40" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">No friend descriptions written yet</p>
            <p className="text-xs text-zinc-400 mt-1">Friends can share what makes {daterProfile.name} great.</p>
          </div>
          <button
            onClick={onOpenEndorseModal}
            data-testid="empty-vouch-btn"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold shadow-md shadow-rose-600/25 transition cursor-pointer"
          >
            Be the First to Vouch
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {endorsements.map((e) => (
            <div
              key={e.id}
              data-testid={`vouch-card-${e.id}`}
              className="p-5 rounded-2xl bg-[#13131c] border border-white/10 space-y-3 relative text-left shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center font-bold text-xs text-rose-300 shadow-sm">
                    {e.friendName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {e.friendName}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-normal border border-white/5">
                        {e.relationship}
                      </span>
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Known for {e.yearsKnown} {e.yearsKnown === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                </div>

                {permissions.canDeleteVouches && (
                  <button
                    onClick={() => deleteEndorsement(e.id)}
                    data-testid={`delete-vouch-${e.id}`}
                    className="p-1.5 text-zinc-500 hover:text-rose-400 transition cursor-pointer"
                    title="Remove vouch"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed italic pl-3 border-l-2 border-rose-500/50">
                "{e.description}"
              </p>

              {e.whyYouShouldDateThem && (
                <div className="text-xs text-zinc-300 p-3 rounded-xl bg-[#181824] border border-white/5">
                  <strong className="text-rose-300">Why date him:</strong> {e.whyYouShouldDateThem}
                </div>
              )}

              <VouchReactionButtons vouchId={e.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
