import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Edit3, Check, Lock } from 'lucide-react';

export const EditBioView: React.FC = () => {
  const { daterProfile, updateDaterProfile, permissions, setIsRoleModalOpen } = useApp();

  if (!permissions.canEditBio) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 space-y-5 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/15 border border-rose-500/25 text-rose-300 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/20">
          <Lock className="w-7 h-7" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-white">Profile Editing Locked</h2>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Only Yash Sunil (Dater Mode) and the Administrator have permission to edit personal details, bio descriptions, and photos.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold shadow-md shadow-rose-600/25 cursor-pointer"
          >
            Unlock Yash / Admin Access
          </button>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: daterProfile.name,
    age: daterProfile.age,
    height: daterProfile.height,
    location: daterProfile.location,
    roots: daterProfile.roots,
    personality: daterProfile.personality,
    dreamCareer: daterProfile.dreamCareer,
    musicTaste: daterProfile.musicTaste,
    datingPreference: daterProfile.datingPreference,
    selfDescription: daterProfile.selfDescription,
    idealDate: daterProfile.idealDate,
    photo1: daterProfile.photos[0] || '',
    photo2: daterProfile.photos[1] || '',
    photo3: daterProfile.photos[2] || '',
    instagramUrl: daterProfile.socialLinks.find((l) => l.platform === 'instagram')?.url || '',
    linkedinUrl: daterProfile.socialLinks.find((l) => l.platform === 'linkedin')?.url || '',
    whatsappNumber: daterProfile.whatsappNumber || '+91 94875 48740',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const photos = [formData.photo1, formData.photo2, formData.photo3]
      .map((p) => p.trim())
      .filter(Boolean);

    const socialLinks = [];
    if (formData.instagramUrl.trim()) {
      socialLinks.push({ platform: 'instagram' as const, url: formData.instagramUrl.trim() });
    }
    if (formData.linkedinUrl.trim()) {
      socialLinks.push({ platform: 'linkedin' as const, url: formData.linkedinUrl.trim() });
    }

    updateDaterProfile({
      name: formData.name.trim(),
      age: Number(formData.age) || 20,
      height: formData.height.trim(),
      location: formData.location.trim(),
      roots: formData.roots.trim(),
      personality: formData.personality.trim(),
      dreamCareer: formData.dreamCareer.trim(),
      musicTaste: formData.musicTaste.trim(),
      datingPreference: formData.datingPreference.trim(),
      selfDescription: formData.selfDescription.trim(),
      idealDate: formData.idealDate.trim(),
      whatsappNumber: formData.whatsappNumber.trim(),
      photos,
      socialLinks,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-rose-400" />
            Edit Profile & Bio
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage personal description, photo URLs, and preferences.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-7 bg-[#13131c] border border-white/10 rounded-3xl space-y-5 text-left shadow-2xl">
        {/* Basic Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              data-testid="input-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Age
            </label>
            <input
              type="number"
              required
              data-testid="input-age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Height
            </label>
            <input
              type="text"
              data-testid="input-height"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
            />
          </div>
        </div>

        {/* Location & Roots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Location
            </label>
            <input
              type="text"
              data-testid="input-location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Roots / Heritage
            </label>
            <input
              type="text"
              data-testid="input-roots"
              value={formData.roots}
              onChange={(e) => setFormData({ ...formData, roots: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
            />
          </div>
        </div>

        {/* Career, Personality & Dating Preference */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Dream Career
            </label>
            <input
              type="text"
              data-testid="input-dreamCareer"
              value={formData.dreamCareer}
              onChange={(e) => setFormData({ ...formData, dreamCareer: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Personality / Vibe
            </label>
            <input
              type="text"
              data-testid="input-personality"
              value={formData.personality}
              onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Dating Preference
            </label>
            <input
              type="text"
              data-testid="input-datingPreference"
              value={formData.datingPreference}
              onChange={(e) => setFormData({ ...formData, datingPreference: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
            />
          </div>
        </div>

        {/* Music Taste */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
            Music Taste
          </label>
          <input
            type="text"
            data-testid="input-musicTaste"
            value={formData.musicTaste}
            onChange={(e) => setFormData({ ...formData, musicTaste: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
          />
        </div>

        {/* Self-Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
            Put Your Description ("About Me")
          </label>
          <textarea
            rows={4}
            data-testid="input-selfDescription"
            value={formData.selfDescription}
            onChange={(e) => setFormData({ ...formData, selfDescription: e.target.value })}
            placeholder="Write your description here..."
            className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs leading-relaxed outline-none focus:border-rose-500 transition"
          />
        </div>

        {/* Ideal Date */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
            Ideal Date
          </label>
          <textarea
            rows={2}
            data-testid="input-idealDate"
            value={formData.idealDate}
            onChange={(e) => setFormData({ ...formData, idealDate: e.target.value })}
            placeholder="Describe your ideal date idea..."
            className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs leading-relaxed outline-none focus:border-rose-500 transition"
          />
        </div>

        {/* Photos URLs */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Profile Photo URLs
          </label>
          <input
            type="text"
            data-testid="input-photo1"
            value={formData.photo1}
            onChange={(e) => setFormData({ ...formData, photo1: e.target.value })}
            placeholder="Primary Photo URL (e.g. /yash.jpg)"
            className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 font-mono text-[11px] transition"
          />
          <input
            type="text"
            data-testid="input-photo2"
            value={formData.photo2}
            onChange={(e) => setFormData({ ...formData, photo2: e.target.value })}
            placeholder="Second Photo URL (optional)"
            className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 font-mono text-[11px] transition"
          />
          <input
            type="text"
            data-testid="input-photo3"
            value={formData.photo3}
            onChange={(e) => setFormData({ ...formData, photo3: e.target.value })}
            placeholder="Third Photo URL (optional)"
            className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 font-mono text-[11px] transition"
          />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Instagram Profile URL
            </label>
            <input
              type="url"
              data-testid="input-instagram"
              value={formData.instagramUrl}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              placeholder="https://instagram.com/yourhandle"
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              data-testid="input-linkedin"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/in/yourhandle"
              className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
            />
          </div>
        </div>

        {/* WhatsApp Notification Number */}
        <div className="pt-2 border-t border-white/10">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
            WhatsApp Notification Number (where friends send alerts)
          </label>
          <input
            type="tel"
            data-testid="input-whatsapp"
            value={formData.whatsappNumber}
            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
            placeholder="+91 94875 48740"
            className="w-full px-3 py-2 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 font-mono transition"
          />
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            data-testid="save-profile-btn"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-bold text-xs shadow-md shadow-rose-500/25 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
