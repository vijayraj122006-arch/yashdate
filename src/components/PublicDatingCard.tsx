import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EndorsementCard } from './EndorsementCard';
import { getPlatformMeta } from '../utils/platformHelper';
import {
  Heart,
  Sparkles,
  MapPin,
  CheckCircle2,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Zap,
  RotateCcw,
  Play,
  Pause,
  MessageSquare,
  Crown,
  Compass,
  Send,
  Plane,
  Coffee,
} from 'lucide-react';

interface Props {
  onOpenEndorseModal: () => void;
  onOpenSendLinkModal: () => void;
}

export const PublicDatingCard: React.FC<Props> = ({ onOpenEndorseModal, onOpenSendLinkModal }) => {
  const {
    daterProfile,
    endorsements,
    datingAppMode,
    addToast,
    triggerConfetti,
    handleSuperLike,
    handleLikePrompt,
    isPlayingMusic,
    toggleMusic,
  } = useApp();

  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [isSecretCrush, setIsSecretCrush] = useState(false);
  const [complimentText, setComplimentText] = useState('');
  const [showComplimentInput, setShowComplimentInput] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [secretCrushCount, setSecretCrushCount] = useState(19);

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
    addToast('Profile link copied to clipboard', 'success');
  };

  const handleToggleSecretCrush = () => {
    setIsSecretCrush((prev) => {
      const next = !prev;
      setSecretCrushCount((c) => (next ? c + 1 : c - 1));
      if (next) {
        triggerConfetti();
        addToast(`Added ${daterProfile.name} to your secret connection list`, 'love');
      } else {
        addToast('Removed from secret list', 'info');
      }
      return next;
    });
  };

  const handleSendCompliment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complimentText.trim()) return;
    triggerConfetti();
    addToast(`Compliment delivered to ${daterProfile.name}`, 'love');
    setComplimentText('');
    setShowComplimentInput(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Active App Mode Banner */}
      {datingAppMode !== 'fusion' && (
        <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Preset: <span className="text-white uppercase">{datingAppMode} Mode</span></span>
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">Change style in top bar</span>
        </div>
      )}

      {/* 1. HAPPN PROXIMITY & CURATED MATCH BANNER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Happn Real Proximity */}
        <div className="flex items-center gap-3 p-3.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-xs shadow-sm">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 flex-shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold flex items-center gap-2 text-slate-200">
              <span>Crossed Paths:</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-sky-300 font-semibold border border-slate-700">
                {daterProfile.crossedPathsCount} times
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {daterProfile.crossedPathsLocation} • {daterProfile.distanceKm} km away
            </p>
          </div>
        </div>

        {/* Curated Daily Selection */}
        <div className="flex items-center justify-between gap-3 p-3.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200 flex items-center gap-2">
                <span>Curated Selection:</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-semibold border border-slate-700">
                  Featured Dater
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Active connection window • High response rate
              </p>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title="Share profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. ACOUSTIC SOUNDTRACK BAR (ANUV JAIN) */}
      <div className="flex items-center justify-between p-3.5 px-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMusic}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition shadow-sm cursor-pointer ${
              isPlayingMusic
                ? 'bg-rose-500 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
            title={isPlayingMusic ? 'Pause Soundtrack' : 'Play Soundtrack'}
          >
            {isPlayingMusic ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[10px] uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Acoustic Favorite
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Anuv Jain Devotee</span>
            </div>
            <p className="text-white font-semibold text-xs mt-0.5">
              {daterProfile.soundtrack.title} <span className="text-slate-400 font-normal">• {daterProfile.soundtrack.artist}</span>
            </p>
          </div>
        </div>

        {/* Secret Crush Counter */}
        <button
          onClick={handleToggleSecretCrush}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
            isSecretCrush
              ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-rose-500/40'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isSecretCrush ? 'fill-white' : 'text-rose-400'}`} />
          <span className="hidden sm:inline">{isSecretCrush ? 'Favorited' : 'Add to Favorites'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-black/40 text-white font-bold">
            {secretCrushCount}
          </span>
        </button>
      </div>

      {/* 3. HERO CARD (CLEAN PHOTOGRAPHY & VERIFIED SPECIFICATIONS) */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {/* Main Photo Container */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/10] w-full bg-slate-950 overflow-hidden group">
          <img
            src={photos[currentPhotoIdx]}
            alt={daterProfile.name}
            className="w-full h-full object-cover object-center transition-all duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-sm transition opacity-80 group-hover:opacity-100 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-sm transition opacity-80 group-hover:opacity-100 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIdx(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentPhotoIdx === idx ? 'w-6 bg-white' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Bumble Compliment Trigger on Photo */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setShowComplimentInput(!showComplimentInput)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md border border-slate-700 hover:bg-slate-800 transition cursor-pointer backdrop-blur-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Send Compliment</span>
            </button>
          </div>

          {/* Identity & Core Specs */}
          <div className="absolute bottom-6 left-6 right-6 text-left z-10">
            <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                {daterProfile.name}, {daterProfile.age}
              </h1>
              <span className="p-1 rounded-full bg-sky-500 text-white shadow-sm" title="Verified Dater">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-900/90 text-slate-200 text-xs font-bold border border-slate-700">
                {daterProfile.height}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
                {daterProfile.roots}
              </span>
            </div>

            <p className="text-sm text-slate-200 font-medium flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Plane className="w-4 h-4 text-sky-400" />
                {daterProfile.dreamCareer}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {daterProfile.location}
              </span>
            </p>
          </div>
        </div>

        {/* Inline Compliment Form */}
        {showComplimentInput && (
          <form onSubmit={handleSendCompliment} className="p-4 bg-slate-950 border-b border-slate-800 flex gap-2">
            <input
              type="text"
              required
              value={complimentText}
              onChange={(e) => setComplimentText(e.target.value)}
              placeholder={`Send a quick note to ${daterProfile.name}... (e.g. Favorite Anuv Jain track?)`}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        )}

        {/* 4. MINIMALIST ACTION CONTROLS */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-center gap-5 sm:gap-7 flex-wrap">
          {/* Rewind */}
          <button
            onClick={() => addToast('Previous profile view restored', 'info')}
            className="w-11 h-11 rounded-full bg-slate-900 border border-slate-700 text-slate-400 flex items-center justify-center hover:scale-105 hover:text-white transition shadow-sm cursor-pointer"
            title="Rewind"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Pass */}
          <button
            onClick={() => addToast(`Passed on ${daterProfile.name}`, 'info')}
            className="w-13 h-13 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 flex items-center justify-center hover:scale-105 transition shadow-sm cursor-pointer text-xl font-bold"
            title="Pass"
          >
            ✕
          </button>

          {/* Super Like */}
          <button
            onClick={handleSuperLike}
            className="w-12 h-12 rounded-full bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center hover:scale-105 transition shadow-md cursor-pointer"
            title="Super Like"
          >
            <Star className="w-5 h-5 fill-white" />
          </button>

          {/* Like */}
          <button
            onClick={() => {
              triggerConfetti();
              addToast(`You liked ${daterProfile.name}! It is a match!`, 'love');
            }}
            className="w-13 h-13 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center hover:scale-105 transition shadow-md cursor-pointer"
            title="Like (Match)"
          >
            <Heart className="w-6 h-6 fill-white" />
          </button>

          {/* Boost */}
          <button
            onClick={() => {
              triggerConfetti();
              addToast('Profile priority boost active', 'success');
            }}
            className="w-11 h-11 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 flex items-center justify-center hover:scale-105 transition shadow-sm cursor-pointer"
            title="Priority Boost"
          >
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
          </button>
        </div>

        {/* 5. PHOTO-BASED INTEREST BADGES (REPLACED RAW EMOJIS WITH CLEAN IMAGE CARDS) */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Passions & Visual Interests
            </span>
            <span className="text-xs text-sky-400 font-medium">Curated Gallery</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {daterProfile.interestBadges.map((badge) => (
              <div
                key={badge.id}
                className="group relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-sm transition hover:border-slate-600"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <img
                    src={badge.imageUrl}
                    alt={badge.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                </div>
                <div className="p-2 absolute bottom-0 left-0 right-0 text-left">
                  <span className="text-[10px] font-bold text-white block truncate leading-tight">
                    {badge.label}
                  </span>
                  <span className="text-[9px] text-slate-400 block uppercase font-medium">
                    {badge.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details & Sections Container */}
        <div className="p-6 sm:p-10 space-y-10">
          {/* Headline quote */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <Quote className="w-5 h-5 text-sky-400 mb-2 opacity-70" />
            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed italic">
              "{daterProfile.headline}"
            </p>
          </div>

          {/* Dater's Self Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <h2 className="text-lg font-bold text-white">About Yash Sunil</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
              {daterProfile.selfDescription}
            </p>
          </div>

          {/* Specific Preference: Short Girls & Pilot Ambition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
                Type & Preference:
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                "{daterProfile.datingPreference}"
              </p>
              <p className="text-[11px] text-slate-400">
                Stands at 6'0" — loves the height difference, sweet eye-contact, and someone who appreciates dry humor.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block">
                Dream Ambition & Pilot Life:
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                "{daterProfile.dreamCareer}"
              </p>
              <p className="text-[11px] text-slate-400">
                Ground school, instrument flight rating, cross-country navigation, and sunset cloud chasing.
              </p>
            </div>
          </div>

          {/* 6. HINGE EDITORIAL PROMPTS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Editorial Prompts</h3>
              </div>
              <span className="text-xs text-slate-400">Tap heart to like any prompt</span>
            </div>

            <div className="space-y-4">
              {daterProfile.prompts.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition shadow-sm flex items-start justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                      {p.question}
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed font-medium">
                      "{p.answer}"
                    </p>
                  </div>
                  <button
                    onClick={() => handleLikePrompt(p.id)}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-rose-400 transition flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer"
                    title="Like prompt"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span className="text-[10px] font-bold text-slate-300">{p.likedByCount || 0}</span>
                  </button>
                </div>
              ))}

              {/* Minimal Voice Memo Simulation */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsPlayingVoice(!isPlayingVoice);
                      addToast(isPlayingVoice ? 'Voice note paused' : 'Playing voice note from Yash Sunil (0:32)', 'info');
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition cursor-pointer ${
                      isPlayingVoice ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-emerald-400 border border-slate-700'
                    }`}
                  >
                    {isPlayingVoice ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Voice Memo</span>
                    <p className="text-xs font-semibold text-white">"Acoustic guitar riff and Anuv Jain lyrics" (0:32)</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <span className="w-1 h-2 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-5 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-3 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-6 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-4 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-2 bg-emerald-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* 7. OKCUPID 98% COMPATIBILITY MATRIX */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Compatibility Index
                </span>
                <h3 className="text-xl font-bold text-white">98% Match Potential</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Alignment on emotional intelligence, humor, ambition, and long-term goals.
                </p>
              </div>

              <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-sky-500 flex flex-col items-center justify-center shadow-sm flex-shrink-0">
                <span className="text-base font-black text-white">{daterProfile.compatibilityScore}%</span>
                <span className="text-[8px] uppercase font-bold text-sky-400">Match</span>
              </div>
            </div>

            {/* Personality Dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              {daterProfile.personalityDimensions.map((dim) => (
                <div key={dim.trait} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-1 font-medium">
                    <span className="text-slate-300">{dim.trait}</span>
                    <span className="text-sky-400 font-bold">{dim.score}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full"
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. SHAADI & TRULYMADLY VERIFIED BIODATA */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-amber-400">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Verified Biodata & Credentials
                  </span>
                  <h3 className="text-xl font-bold text-white">Cultural & Family Background</h3>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-black text-amber-400">
                  {daterProfile.matchmakingDetails.kundaliGunas} / 36
                </div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Guna Score
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Height</span>
                <p className="text-xs font-bold text-white mt-0.5">{daterProfile.matchmakingDetails.height}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Mother Tongue</span>
                <p className="text-xs font-bold text-white mt-0.5">{daterProfile.matchmakingDetails.motherTongue}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Diet</span>
                <p className="text-xs font-bold text-white mt-0.5">{daterProfile.matchmakingDetails.diet}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Sun Sign</span>
                <p className="text-xs font-bold text-white mt-0.5">{daterProfile.matchmakingDetails.sunSign}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Smoking / Habits</span>
                <p className="text-xs font-bold text-white mt-0.5">{daterProfile.matchmakingDetails.smoking}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Trust Score</span>
                <p className="text-xs font-bold text-emerald-400 mt-0.5">{daterProfile.matchmakingDetails.trulyMadlyTrustScore}% Verified</p>
              </div>
            </div>
          </div>

          {/* 9. WHAT HIS REAL FRIENDS SAY ABOUT HIM (THE HEART OF YASHDATE) */}
          <div className="pt-6 border-t border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                  <Star className="w-3.5 h-3.5 fill-rose-400" /> Community Social Proof
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  What Friends Say About {daterProfile.name}
                </h2>
                <p className="text-xs text-slate-400">
                  Honest testimonials, green flags, and playful stories from his closest circle in Chennai.
                </p>
              </div>

              <button
                onClick={onOpenEndorseModal}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-300 text-xs font-bold border border-slate-800 hover:border-slate-700 transition whitespace-nowrap cursor-pointer"
              >
                + Vouch for {daterProfile.name}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {endorsements.map((e) => (
                <EndorsementCard key={e.id} endorsement={e} isDaterMode={false} />
              ))}
            </div>
          </div>

          {/* 10. SOCIAL CHANNELS & DIRECT CONNECT */}
          <div className="pt-8 border-t border-slate-800 text-center space-y-6">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white mb-1.5">
                Connect with {daterProfile.name}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Say hello on Instagram, LinkedIn, or Twitter directly.
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
                      className={`px-4 py-2 rounded-xl font-bold text-xs text-white shadow-sm transition flex items-center gap-2 hover:scale-105 ${meta.badgeBg}`}
                    >
                      <span>Connect on {meta.name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Friend wingman prompt */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-lg mx-auto text-xs text-slate-400 flex items-center justify-between gap-4">
              <span>Know someone {daterProfile.name} should meet?</span>
              <button
                onClick={onOpenSendLinkModal}
                className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold transition cursor-pointer"
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
