import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Edit3, Check } from 'lucide-react';

export const EditBioView: React.FC = () => {
  const { daterProfile, updateDaterProfile } = useApp();

  const [formData, setFormData] = useState({
    name: daterProfile.name,
    age: daterProfile.age,
    height: daterProfile.height,
    location: daterProfile.location,
    roots: daterProfile.roots,
    occupation: daterProfile.occupation,
    dreamCareer: daterProfile.dreamCareer,
    musicTaste: daterProfile.musicTaste,
    datingPreference: daterProfile.datingPreference,
    headline: daterProfile.headline,
    selfDescription: daterProfile.selfDescription,
    idealDate: daterProfile.idealDate,
    photo1: daterProfile.photos[0] || '',
    photo2: daterProfile.photos[1] || '',
    photo3: daterProfile.photos[2] || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const photos = [formData.photo1, formData.photo2, formData.photo3].filter(Boolean);
    updateDaterProfile({
      name: formData.name.trim(),
      age: Number(formData.age) || 20,
      height: formData.height.trim(),
      location: formData.location.trim(),
      roots: formData.roots.trim(),
      occupation: formData.occupation.trim(),
      dreamCareer: formData.dreamCareer.trim(),
      musicTaste: formData.musicTaste.trim(),
      datingPreference: formData.datingPreference.trim(),
      headline: formData.headline.trim(),
      selfDescription: formData.selfDescription.trim(),
      idealDate: formData.idealDate.trim(),
      photos: photos.length > 0 ? photos : daterProfile.photos,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-emerald-400" />
            Edit Profile & Bio
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Update your personal details, descriptions, and photo links.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-5 text-left shadow-lg">
        {/* Basic Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Age
            </label>
            <input
              type="number"
              required
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Height
            </label>
            <input
              type="text"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Location & Roots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Location / City
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Roots / Heritage
            </label>
            <input
              type="text"
              value={formData.roots}
              onChange={(e) => setFormData({ ...formData, roots: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Career & Dating Preference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Dream Career / Ambition
            </label>
            <input
              type="text"
              value={formData.dreamCareer}
              onChange={(e) => setFormData({ ...formData, dreamCareer: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Dating Preference / Type
            </label>
            <input
              type="text"
              value={formData.datingPreference}
              onChange={(e) => setFormData({ ...formData, datingPreference: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Music Taste & Headline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Music Taste
            </label>
            <input
              type="text"
              value={formData.musicTaste}
              onChange={(e) => setFormData({ ...formData, musicTaste: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Headline
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Self Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Self Description ("About Me")
          </label>
          <textarea
            required
            rows={4}
            value={formData.selfDescription}
            onChange={(e) => setFormData({ ...formData, selfDescription: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed outline-none focus:border-emerald-500"
          />
        </div>

        {/* Ideal Date */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Ideal Date Idea
          </label>
          <textarea
            rows={2}
            value={formData.idealDate}
            onChange={(e) => setFormData({ ...formData, idealDate: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed outline-none focus:border-emerald-500"
          />
        </div>

        {/* Photos URLs */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Profile Photo URLs
          </label>
          <input
            type="url"
            value={formData.photo1}
            onChange={(e) => setFormData({ ...formData, photo1: e.target.value })}
            placeholder="Primary Photo URL"
            className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500 font-mono text-[11px]"
          />
          <input
            type="url"
            value={formData.photo2}
            onChange={(e) => setFormData({ ...formData, photo2: e.target.value })}
            placeholder="Second Photo URL"
            className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500 font-mono text-[11px]"
          />
          <input
            type="url"
            value={formData.photo3}
            onChange={(e) => setFormData({ ...formData, photo3: e.target.value })}
            placeholder="Third Photo URL"
            className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-500 font-mono text-[11px]"
          />
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
