import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Plane,
  Music,
  User,
  CheckCircle2,
  Plus,
} from 'lucide-react';

interface Props {
  onOpenEndorseModal: () => void;
  onOpenSendLinkModal: () => void;
}

export const PublicDatingCard: React.FC<Props> = ({ onOpenEndorseModal, onOpenSendLinkModal }) => {
  const { daterProfile, endorsements, addToast, triggerConfetti } = useApp();
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const photos = daterProfile.photos && daterProfile.photos.length > 0
    ? daterProfile.photos
    : ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=900'];

  const handleNextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleLike = () => {
    triggerConfetti();
    addToast(`You liked ${daterProfile.name}`, 'love');
  };

  const handlePass = () => {
    addToast(`Passed on ${daterProfile.name}`, 'info');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      {/* Main Dating Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {/* Photo Container */}
        <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-slate-950 overflow-hidden group">
          <img
            src={photos[currentPhotoIdx]}
            alt={daterProfile.name}
            className="w-full h-full object-cover object-center transition duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIdx(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentPhotoIdx === idx ? 'w-6 bg-white' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Name & Basic Info Overlay */}
          <div className="absolute bottom-5 left-5 right-5 text-left z-10">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {daterProfile.name}, {daterProfile.age}
              </h1>
              <span className="p-1 rounded-full bg-sky-500 text-white" title="Verified Profile">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-2 flex-wrap font-medium">
              <span>{daterProfile.height}</span>
              <span>•</span>
              <span>{daterProfile.roots}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {daterProfile.location}
              </span>
            </p>
          </div>
        </div>

        {/* Clean Attributes Chips */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex flex-wrap gap-2">
          {daterProfile.dreamCareer && (
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-sky-300 font-medium flex items-center gap-1.5 border border-slate-700">
              <Plane className="w-3.5 h-3.5 text-sky-400" />
              {daterProfile.dreamCareer}
            </span>
          )}
          {daterProfile.musicTaste && (
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-rose-300 font-medium flex items-center gap-1.5 border border-slate-700">
              <Music className="w-3.5 h-3.5 text-rose-400" />
              {daterProfile.musicTaste}
            </span>
          )}
          {daterProfile.datingPreference && (
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-200 font-medium flex items-center gap-1.5 border border-slate-700">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {daterProfile.datingPreference}
            </span>
          )}
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-6">
          {/* Headline */}
          {daterProfile.headline && (
            <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed border-l-2 border-rose-500/50 pl-3">
              "{daterProfile.headline}"
            </p>
          )}

          {/* Self Description */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              About Me
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
              {daterProfile.selfDescription}
            </p>
          </div>

          {/* Ideal Date */}
          {daterProfile.idealDate && (
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Ideal Date
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                {daterProfile.idealDate}
              </p>
            </div>
          )}

          {/* What Friends Say About Him */}
          <div className="pt-2 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">What Friends Say</h3>
                <p className="text-xs text-slate-400">Real descriptions from friends who know him best</p>
              </div>
              <button
                onClick={onOpenEndorseModal}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Vouch</span>
              </button>
            </div>

            <div className="space-y-3">
              {endorsements.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-left"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{item.friendName}</span>
                    <span className="text-slate-400">{item.relationship}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "{item.description}"
                  </p>
                  {item.whyYouShouldDateThem && (
                    <p className="text-xs text-slate-400 border-t border-slate-900 pt-1.5">
                      <strong className="text-rose-300">Why date him:</strong> {item.whyYouShouldDateThem}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          {daterProfile.socialLinks && daterProfile.socialLinks.length > 0 && (
            <div className="pt-2 border-t border-slate-800 flex items-center justify-center gap-3 flex-wrap">
              {daterProfile.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
                >
                  <span className="capitalize">{link.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
            </div>
          )}

          {/* Wingman scout trigger */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Know someone who would like {daterProfile.name}?</span>
            <button
              onClick={onOpenSendLinkModal}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold transition cursor-pointer"
            >
              Send Match Link
            </button>
          </div>
        </div>
      </div>

      {/* Clean Bottom Action Buttons */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <button
          onClick={handlePass}
          className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white flex items-center justify-center text-xl font-bold shadow-md transition hover:scale-105 cursor-pointer"
          title="Pass"
        >
          ✕
        </button>
        <button
          onClick={handleLike}
          className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg transition hover:scale-105 cursor-pointer"
          title="Like"
        >
          <Heart className="w-7 h-7 fill-white" />
        </button>
      </div>
    </div>
  );
};
