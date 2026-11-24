import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUGGESTED_GREEN_FLAGS } from '../data/initialData';
import { X, Heart, Star, Plus } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FriendEndorsementModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { daterProfile, addEndorsement } = useApp();

  const [friendName, setFriendName] = useState('');
  const [friendHandle, setFriendHandle] = useState('');
  const [relationship, setRelationship] = useState('Close Friend');
  const [yearsKnown, setYearsKnown] = useState(3);
  const [description, setDescription] = useState('');
  const [whyYouShouldDateThem, setWhyYouShouldDateThem] = useState('');
  const [selectedGreenFlags, setSelectedGreenFlags] = useState<string[]>([
    'Certified 6ft height',
    'Aspiring Commercial Pilot',
    'Anuv Jain acoustic guitar player',
  ]);
  const [customFlag, setCustomFlag] = useState('');
  const [quirkOrRoast, setQuirkOrRoast] = useState('');
  const [ratingScore, setRatingScore] = useState(10);

  if (!isOpen) return null;

  const toggleFlag = (flag: string) => {
    if (selectedGreenFlags.includes(flag)) {
      setSelectedGreenFlags(selectedGreenFlags.filter((f) => f !== flag));
    } else {
      setSelectedGreenFlags([...selectedGreenFlags, flag]);
    }
  };

  const handleAddCustomFlag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFlag.trim()) return;
    if (!selectedGreenFlags.includes(customFlag.trim())) {
      setSelectedGreenFlags([...selectedGreenFlags, customFlag.trim()]);
    }
    setCustomFlag('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim() || !description.trim()) return;

    addEndorsement({
      daterId: daterProfile.id,
      friendName: friendName.trim(),
      friendHandle: friendHandle.trim() || undefined,
      relationship: relationship.trim() || 'Good Friend',
      yearsKnown: Number(yearsKnown) || 1,
      description: description.trim(),
      whyYouShouldDateThem:
        whyYouShouldDateThem.trim() ||
        `${daterProfile.name} is one of the kindest, tallest, and most dependable people you will ever meet.`,
      greenFlags: selectedGreenFlags,
      quirkOrRoast:
        quirkOrRoast.trim() || 'Warning: May accidentally steal your attention with acoustic songs.',
      ratingScore: Number(ratingScore) || 10,
      isFeatured: true,
      isApproved: true,
    });

    onClose();
    setDescription('');
    setWhyYouShouldDateThem('');
    setQuirkOrRoast('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Vouch for {daterProfile.name}
            </h2>
            <p className="text-xs text-slate-400">
              Your honest testimonial will be featured on {daterProfile.name}'s dating profile.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                placeholder="e.g. Ashwin Nair"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Your Handle / Social (optional)
              </label>
              <input
                type="text"
                value={friendHandle}
                onChange={(e) => setFriendHandle(e.target.value)}
                placeholder="e.g. @ashwin_nair"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Relationship
              </label>
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g. Flight Academy Roommate, Childhood Friend"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Years Known
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={yearsKnown}
                onChange={(e) => setYearsKnown(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Describe {daterProfile.name} in Your Own Words *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Share what ${daterProfile.name} is really like behind the scenes. His pilot dreams, humor, kindness, or cooking skills?`}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed outline-none focus:border-rose-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Why Should Someone Date Them?
            </label>
            <input
              type="text"
              value={whyYouShouldDateThem}
              onChange={(e) => setWhyYouShouldDateThem(e.target.value)}
              placeholder="e.g. He is 6ft, plays acoustic songs, and will always make sure you are safe."
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-rose-500"
            />
          </div>

          {/* Green Flags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Verified Green Flags
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
              {SUGGESTED_GREEN_FLAGS.map((flag) => {
                const isSelected = selectedGreenFlags.includes(flag);
                return (
                  <button
                    type="button"
                    key={flag}
                    onClick={() => toggleFlag(flag)}
                    className={`text-[11px] px-2.5 py-1 rounded-md border transition cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-medium'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {isSelected && <Star className="w-3 h-3 fill-rose-400 text-rose-400" />}
                    {flag}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={customFlag}
                onChange={(e) => setCustomFlag(e.target.value)}
                placeholder="Add custom green flag..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomFlag}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Playful Quirk / Funny Habit
            </label>
            <input
              type="text"
              value={quirkOrRoast}
              onChange={(e) => setQuirkOrRoast(e.target.value)}
              placeholder="e.g. Will explain flight cockpit dials during romantic golden hour."
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-rose-500"
            />
          </div>

          {/* Vouch Rating */}
          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Wingman Score</p>
              <p className="text-xs text-slate-300">How strongly do you vouch for him?</p>
            </div>
            <div className="flex items-center gap-2">
              {[10, 11].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setRatingScore(val)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                    ratingScore === val
                      ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {val}/10
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white" /> Post Vouch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
