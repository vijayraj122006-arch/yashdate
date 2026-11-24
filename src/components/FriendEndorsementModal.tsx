import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUGGESTED_GREEN_FLAGS } from '../data/initialData';
import { X, Heart, Sparkles, Star, Plus } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FriendEndorsementModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { daterProfile, addEndorsement } = useApp();

  const [friendName, setFriendName] = useState('');
  const [friendHandle, setFriendHandle] = useState('');
  const [relationship, setRelationship] = useState('Best friend');
  const [yearsKnown, setYearsKnown] = useState(3);
  const [description, setDescription] = useState('');
  const [whyYouShouldDateThem, setWhyYouShouldDateThem] = useState('');
  const [selectedGreenFlags, setSelectedGreenFlags] = useState<string[]>([
    'Active & Attentive Listener 👂',
    'Great Cook 🍳',
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
        `${daterProfile.name} is one of the kindest and most reliable people you will ever meet!`,
      greenFlags: selectedGreenFlags,
      quirkOrRoast:
        quirkOrRoast.trim() || 'Warning: May accidentally steal your heart and your snacks.',
      ratingScore: Number(ratingScore) || 10,
      isFeatured: true,
      isApproved: true,
    });

    onClose();
    // Reset form
    setDescription('');
    setWhyYouShouldDateThem('');
    setQuirkOrRoast('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-xl text-white shadow-lg shadow-rose-500/20">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Vouch & Describe {daterProfile.name}
            </h2>
            <p className="text-sm text-slate-400">
              Your honest, heartwarming or funny testimonial will be featured on {daterProfile.name}'s dating profile!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Friend details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white placeholder-slate-500 text-sm outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Your Handle / Social (optional)
              </label>
              <input
                type="text"
                value={friendHandle}
                onChange={(e) => setFriendHandle(e.target.value)}
                placeholder="e.g. @alex_rivera"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white placeholder-slate-500 text-sm outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                How Do You Know {daterProfile.name}?
              </label>
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g. College Roommate, Best Friend, Coworker"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white placeholder-slate-500 text-sm outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Years Known
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={yearsKnown}
                onChange={(e) => setYearsKnown(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white text-sm outline-none transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Describe {daterProfile.name} in Your Own Words *
              </label>
              <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> What makes them special?
              </span>
            </div>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Share what ${daterProfile.name} is really like behind the scenes. Are they thoughtful, hilarious, loyal, great in a crisis, or an amazing cook?`}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white placeholder-slate-500 text-sm outline-none transition resize-none"
            />
          </div>

          {/* Why date them */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Why Should Someone Date Them?
            </label>
            <input
              type="text"
              value={whyYouShouldDateThem}
              onChange={(e) => setWhyYouShouldDateThem(e.target.value)}
              placeholder="e.g. He will remember your favorite coffee order and never leave you on read."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white placeholder-slate-500 text-sm outline-none transition"
            />
          </div>

          {/* Green Flags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Their Certified Green Flags ({selectedGreenFlags.length} selected)
            </label>
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
              {SUGGESTED_GREEN_FLAGS.map((flag) => {
                const isSelected = selectedGreenFlags.includes(flag);
                return (
                  <button
                    type="button"
                    key={flag}
                    onClick={() => toggleFlag(flag)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-semibold shadow-sm'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
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
                placeholder="Add custom green flag (e.g. Sings in Italian)..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomFlag}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {/* Friendly Roast */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Friendly Roast / Cute Quirk (Optional)
            </label>
            <input
              type="text"
              value={quirkOrRoast}
              onChange={(e) => setQuirkOrRoast(e.target.value)}
              placeholder="e.g. Will spend 20 minutes explaining how mechanical keyboards work."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white placeholder-slate-500 text-sm outline-none transition"
            />
          </div>

          {/* Vouch Rating */}
          <div className="flex items-center justify-between p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/60">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Wingman Vouch Score</p>
              <p className="text-sm text-slate-300 font-medium">How strongly do you vouch for them?</p>
            </div>
            <div className="flex items-center gap-2">
              {[10, 11].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setRatingScore(val)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition ${
                    ratingScore === val
                      ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30'
                      : 'bg-slate-800 text-slate-300 border-slate-600 hover:border-slate-500'
                  }`}
                >
                  {val}/10 ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-sm font-semibold shadow-lg shadow-rose-500/25 transition flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" /> Post Friend Vouch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
