import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FriendEndorsementModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { daterProfile, addEndorsement } = useApp();

  const [friendName, setFriendName] = useState('');
  const [relationship, setRelationship] = useState('Close Friend');
  const [yearsKnown, setYearsKnown] = useState(3);
  const [description, setDescription] = useState('');
  const [whyYouShouldDateThem, setWhyYouShouldDateThem] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim() || !description.trim()) return;

    addEndorsement({
      friendName: friendName.trim(),
      relationship: relationship.trim() || 'Friend',
      yearsKnown: Number(yearsKnown) || 1,
      description: description.trim(),
      whyYouShouldDateThem: whyYouShouldDateThem.trim(),
    });

    onClose();
    setDescription('');
    setWhyYouShouldDateThem('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 sm:p-7 text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-1">
          <div className="p-2 bg-rose-600/20 text-rose-400 rounded-lg">
            <Heart className="w-4 h-4 fill-rose-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Vouch for {daterProfile.name}
            </h2>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Write an honest, genuine description about what he is like in real life.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
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
                placeholder="e.g. Ashwin"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Relationship
              </label>
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g. Roommate, College Friend"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-rose-500"
              />
            </div>
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

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Describe {daterProfile.name} *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`What is ${daterProfile.name} really like? His humor, kindness, pilot ambition, or cooking?`}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed outline-none focus:border-rose-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Why should someone date him?
            </label>
            <textarea
              rows={2}
              value={whyYouShouldDateThem}
              onChange={(e) => setWhyYouShouldDateThem(e.target.value)}
              placeholder="e.g. He is 6ft, thoughtful, cooks great meals, and treats people with genuine care."
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed outline-none focus:border-rose-500 resize-none"
            />
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
