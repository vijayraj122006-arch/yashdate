import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EndorsementCard } from './EndorsementCard';
import { getPlatformMeta } from '../utils/platformHelper';
import {
  Heart,
  Sparkles,
  MapPin,
  Coffee,
  CheckCircle2,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
  Quote,
} from 'lucide-react';

interface Props {
  onOpenEndorseModal: () => void;
  onOpenSendLinkModal: () => void;
}

export const PublicDatingCard: React.FC<Props> = ({ onOpenEndorseModal, onOpenSendLinkModal }) => {
  const { daterProfile, endorsements, addToast } = useApp();
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const photos = daterProfile.photos && daterProfile.photos.length > 0
    ? daterProfile.photos
    : [daterProfile.avatarUrl];

  const handleNextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Profile link copied! Share it anywhere ❤️', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Trust banner */}
      <div className="flex items-center justify-between p-3.5 px-5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-amber-500/10 border border-rose-500/20 text-xs text-rose-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>
            <strong>Verified Community Profile:</strong> Backed by {endorsements.length} real-life friend endorsements & vouches.
          </span>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 font-bold text-rose-400 hover:text-white transition"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Main Dating Profile Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Photo Carousel */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] w-full bg-slate-950 overflow-hidden group">
          <img
            src={photos[currentPhotoIdx]}
            alt={daterProfile.name}
            className="w-full h-full object-cover object-center transition-all duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-sm transition opacity-80 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-sm transition opacity-80 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIdx(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentPhotoIdx === idx ? 'w-6 bg-rose-500' : 'w-2 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Name & Headline overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-left">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">
                {daterProfile.name}, {daterProfile.age}
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold flex items-center gap-1 shadow-md">
                <CheckCircle2 className="w-3 h-3" /> 100% Friend Vouched
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 font-medium drop-shadow-sm flex items-center gap-2 flex-wrap">
              <span>{daterProfile.occupation}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {daterProfile.location}</span>
            </p>
          </div>
        </div>

        {/* Content sections */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Headline quote */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/5 to-slate-900 border border-rose-500/20">
            <Quote className="w-6 h-6 text-rose-400 mb-2 opacity-60" />
            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed italic">
              "{daterProfile.headline}"
            </p>
          </div>

          {/* Dater's Self Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-400" />
              <h2 className="text-xl font-bold text-white">About Me (In My Own Words)</h2>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
              {daterProfile.selfDescription}
            </p>
          </div>

          {/* Ideal First Date & What Looking For */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
                <Coffee className="w-4 h-4" />
                <span>My Ideal Date</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {daterProfile.idealDate}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
                <Heart className="w-4 h-4 fill-indigo-400" />
                <span>What I'm Looking For</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {daterProfile.whatImLookingFor}
              </p>
            </div>
          </div>

          {/* Green flags & Hot take */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Green Flags I Bring to the Table:
              </span>
              <ul className="space-y-2">
                {daterProfile.myGreenFlags.map((flag, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Quirk / Hot Take:
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "{daterProfile.hotTakeOrQuirk}"
              </p>

              <div className="pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Favorite Things:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {daterProfile.hobbies.map((h, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* THE HIGHLIGHT: WHAT REAL FRIENDS SAY ABOUT HIM */}
          {/* ======================================================== */}
          <div className="pt-6 border-t border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                  <Star className="w-3.5 h-3.5 fill-rose-400" /> Verified Social Proof
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  What {daterProfile.name}'s Friends Say About Him
                </h2>
                <p className="text-sm text-slate-400">
                  Because self-descriptions only tell half the story. Here is what his closest circle vouches for.
                </p>
              </div>

              <button
                onClick={onOpenEndorseModal}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-bold border border-slate-700 hover:border-rose-500/40 transition whitespace-nowrap cursor-pointer"
              >
                + Are you a friend? Vouch for him
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {endorsements.map((e) => (
                <EndorsementCard key={e.id} endorsement={e} isDaterMode={false} />
              ))}
            </div>
          </div>

          {/* Social Links & Connect CTA */}
          <div className="pt-8 border-t border-slate-800 text-center space-y-6">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-2">
                Think you and {daterProfile.name} would vibe?
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Say hi directly on your favorite platform! No endless swiping algorithms.
              </p>

              <div className="flex items-center justify-center gap-3 flex-wrap">
                {daterProfile.socialLinks.map((link) => {
                  const meta = getPlatformMeta(link.platform);
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition flex items-center gap-2 hover:scale-105 ${meta.badgeBg}`}
                    >
                      <span>Connect on {meta.name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Friend wingman prompt */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 max-w-lg mx-auto text-xs text-slate-400 flex items-center justify-between gap-4">
              <span>Know someone {daterProfile.name} should meet?</span>
              <button
                onClick={onOpenSendLinkModal}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition cursor-pointer"
              >
                Send Match Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
