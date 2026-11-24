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
  Zap,
  RotateCcw,
  Play,
  Pause,
  MessageSquare,
  Crown,
  Compass,
  Send,
  Smile,
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
  const [secretCrushCount, setSecretCrushCount] = useState(12);

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

  const handleToggleSecretCrush = () => {
    setIsSecretCrush((prev) => {
      const next = !prev;
      setSecretCrushCount((c) => (next ? c + 1 : c - 1));
      if (next) {
        triggerConfetti();
        addToast(`Added ${daterProfile.name} to your Facebook Dating Secret Crush! 🤫❤️`, 'love');
      } else {
        addToast('Removed from Secret Crush', 'info');
      }
      return next;
    });
  };

  const handleSendCompliment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complimentText.trim()) return;
    triggerConfetti();
    addToast(`Bumble Compliment sent to ${daterProfile.name}: "${complimentText}" 🐝💛`, 'love');
    setComplimentText('');
    setShowComplimentInput(false);
  };

  const handleQuickTap = (emoji: string, label: string) => {
    triggerConfetti();
    addToast(`Sent a quick ${emoji} ${label} to ${daterProfile.name}!`, 'love');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Active App Mode Banner */}
      {datingAppMode !== 'fusion' && (
        <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 shadow-sm">
          <span className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Active Aesthetic: <span className="text-white uppercase">{datingAppMode} Mode</span></span>
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">Change style in top bar</span>
        </div>
      )}

      {/* 1. HAPPN CROSSED PATHS & COFFEE MEETS BAGEL BANNER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Happn Proximity */}
        <div className="flex items-center gap-3 p-3.5 px-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs shadow-md backdrop-blur-sm">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 flex-shrink-0 animate-pulse">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold flex items-center gap-1.5 text-cyan-300">
              <span>Happn Radar:</span>
              <span className="text-[11px] px-2 py-0.2 rounded-full bg-cyan-500/30 text-cyan-200">
                {daterProfile.crossedPathsCount}x Crossed Paths
              </span>
            </div>
            <p className="text-[11px] text-cyan-300/80 mt-0.5">
              {daterProfile.crossedPathsLocation} • {daterProfile.distanceKm} km away
            </p>
          </div>
        </div>

        {/* Coffee Meets Bagel (CMB) Daily Bagel */}
        <div className="flex items-center justify-between gap-3 p-3.5 px-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs shadow-md backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 flex-shrink-0">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <span>Coffee Meets Bagel:</span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/30 text-amber-200 font-extrabold uppercase">
                  Curated Bagel
                </span>
              </div>
              <p className="text-[11px] text-amber-300/80 mt-0.5">
                ⏳ 18h remaining to connect • ☕ 450 Beans
              </p>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="p-1.5 text-amber-400 hover:text-white rounded-lg hover:bg-amber-500/20 transition"
            title="Share profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. RAYA VIP AUDIO SOUNDTRACK BAR */}
      <div className="flex items-center justify-between p-3.5 px-5 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-950 border border-purple-500/30 text-xs shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMusic}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition shadow-lg cursor-pointer ${
              isPlayingMusic
                ? 'bg-purple-600 text-white animate-pulse'
                : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
            }`}
            title={isPlayingMusic ? 'Pause Raya Soundtrack' : 'Play Raya Soundtrack'}
          >
            {isPlayingMusic ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[10px] uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                Raya VIP Soundtrack
              </span>
              {isPlayingMusic && (
                <span className="flex items-center gap-0.5 text-purple-400">
                  <span className="w-1 h-3 bg-purple-400 animate-bounce" />
                  <span className="w-1 h-4 bg-purple-400 animate-bounce delay-100" />
                  <span className="w-1 h-2 bg-purple-400 animate-bounce delay-200" />
                </span>
              )}
            </div>
            <p className="text-slate-200 font-semibold text-xs mt-0.5">
              {daterProfile.soundtrack.title} <span className="text-slate-400 font-normal">• {daterProfile.soundtrack.artist}</span>
            </p>
          </div>
        </div>

        {/* Facebook Secret Crush Toggle */}
        <button
          onClick={handleToggleSecretCrush}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
            isSecretCrush
              ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-600/30'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-rose-500/50'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isSecretCrush ? 'fill-white' : 'text-rose-400'}`} />
          <span className="hidden sm:inline">{isSecretCrush ? 'In Secret Crush' : 'Secret Crush'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 text-white font-bold">
            {secretCrushCount}
          </span>
        </button>
      </div>

      {/* 3. MAIN HERO DATING CARD (TINDER & BUMBLE PHOTO STACK) */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Photo Container */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/10] w-full bg-slate-950 overflow-hidden group">
          <img
            src={photos[currentPhotoIdx]}
            alt={daterProfile.name}
            className="w-full h-full object-cover object-center transition-all duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 backdrop-blur-sm transition opacity-80 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 backdrop-blur-sm transition opacity-80 group-hover:opacity-100"
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
                      currentPhotoIdx === idx ? 'w-7 bg-rose-500' : 'w-2 bg-white/50'
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
              className="px-3 py-1.5 rounded-full bg-amber-500/90 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg hover:bg-amber-400 transition cursor-pointer"
            >
              <Smile className="w-4 h-4" />
              <span>Send Compliment 💛</span>
            </button>
          </div>

          {/* Verified Badges & Identity */}
          <div className="absolute bottom-6 left-6 right-6 text-left z-10">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">
                {daterProfile.name}, {daterProfile.age}
              </h1>
              {/* Tinder/Badoo Blue Checkmark */}
              <span className="p-1 rounded-full bg-blue-500 text-white shadow-md" title="Selfie Verified (Badoo / Tinder)">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              {/* TrulyMadly Trust Score Shield */}
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white text-xs font-bold flex items-center gap-1 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" /> TrulyMadly Trust {daterProfile.matchmakingDetails.trulyMadlyTrustScore}%
              </span>
              {/* Bumble Honey Badge */}
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1 shadow-md">
                🐝 Bumble BFF & Date
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-200 font-medium drop-shadow flex items-center gap-2 flex-wrap">
              <span>{daterProfile.occupation}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-400" /> {daterProfile.location}</span>
            </p>
          </div>
        </div>

        {/* Bumble Inline Compliment Form */}
        {showComplimentInput && (
          <form onSubmit={handleSendCompliment} className="p-4 bg-amber-950/40 border-b border-amber-500/30 flex gap-2">
            <input
              type="text"
              required
              value={complimentText}
              onChange={(e) => setComplimentText(e.target.value)}
              placeholder={`Send an icebreaker compliment to ${daterProfile.name}... (e.g. Love your coffee vibe!)`}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-amber-500/50 text-white text-xs outline-none focus:ring-1 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        )}

        {/* 4. TINDER / BUMBLE / GRINDR FLOATING ACTION CONTROLS */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
          {/* Rewind */}
          <button
            onClick={() => addToast('Rewinded previous profile view', 'info')}
            className="w-11 h-11 rounded-full bg-slate-800 border border-amber-500/40 text-amber-400 flex items-center justify-center hover:scale-110 hover:bg-amber-500/10 transition shadow-md cursor-pointer"
            title="Rewind"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Pass / Nope */}
          <button
            onClick={() => addToast(`Passed on ${daterProfile.name}. Swipe next!`, 'info')}
            className="w-14 h-14 rounded-full bg-slate-800 border-2 border-rose-500/60 text-rose-400 flex items-center justify-center hover:scale-110 hover:bg-rose-500/20 transition shadow-lg cursor-pointer"
            title="Pass (Nope)"
          >
            <span className="text-2xl font-bold">✕</span>
          </button>

          {/* Super Like */}
          <button
            onClick={handleSuperLike}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center hover:scale-110 hover:shadow-cyan-500/40 transition shadow-xl cursor-pointer"
            title="Super Like"
          >
            <Star className="w-6 h-6 fill-white" />
          </button>

          {/* Like / Match */}
          <button
            onClick={() => {
              triggerConfetti();
              addToast(`💚 You Liked ${daterProfile.name}! It's a Match!`, 'love');
            }}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-green-600 text-white flex items-center justify-center hover:scale-110 hover:shadow-emerald-500/40 transition shadow-xl cursor-pointer"
            title="Like (Match)"
          >
            <Heart className="w-7 h-7 fill-white" />
          </button>

          {/* Boost */}
          <button
            onClick={() => {
              triggerConfetti();
              addToast('⚡ Boost Activated! Your profile is now visible to 10x more people!', 'success');
            }}
            className="w-11 h-11 rounded-full bg-slate-800 border border-purple-500/40 text-purple-400 flex items-center justify-center hover:scale-110 hover:bg-purple-500/10 transition shadow-md cursor-pointer"
            title="Tinder Boost"
          >
            <Zap className="w-5 h-5 fill-purple-400" />
          </button>
        </div>

        {/* Quick Tap Emojis (Grindr / Scruff / Taimi Style) */}
        <div className="py-2.5 px-4 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
          <span className="font-semibold text-slate-300">Quick Reaction:</span>
          <div className="flex items-center gap-2">
            {[
              { emoji: '🔥', label: 'Flame' },
              { emoji: '👋', label: 'Wave' },
              { emoji: '☕', label: 'Coffee' },
              { emoji: '🍕', label: 'Pizza' },
              { emoji: '💻', label: 'Code' },
            ].map((tap) => (
              <button
                key={tap.label}
                onClick={() => handleQuickTap(tap.emoji, tap.label)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm transition hover:scale-110 cursor-pointer"
                title={`Send ${tap.label}`}
              >
                {tap.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="p-6 sm:p-10 space-y-10">
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
              <h2 className="text-xl font-bold text-white">About Yash Sunil (In His Own Words)</h2>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
              {daterProfile.selfDescription}
            </p>
          </div>

          {/* 5. HINGE PROMPTS WITH INDIVIDUAL LIKE BUTTONS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Hinge Prompts • Designed to be Deleted</h3>
              </div>
              <span className="text-xs text-emerald-400 font-semibold">Tap ❤️ to like any prompt</span>
            </div>

            <div className="space-y-4">
              {daterProfile.prompts.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 hover:border-emerald-500/40 transition shadow-md flex items-start justify-between gap-4"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                      {p.question}
                    </span>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                      "{p.answer}"
                    </p>
                  </div>
                  <button
                    onClick={() => handleLikePrompt(p.id)}
                    className="p-3 rounded-2xl bg-slate-800 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500/50 text-slate-400 hover:text-emerald-300 transition flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer"
                    title="Like this prompt"
                  >
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                    <span className="text-[10px] font-bold text-slate-300">{p.likedByCount || 0}</span>
                  </button>
                </div>
              ))}

              {/* Hinge Voice Memo Simulation */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsPlayingVoice(!isPlayingVoice);
                      addToast(isPlayingVoice ? 'Voice memo stopped' : '🎙️ Playing Yash Sunil’s voice prompt (0:32)', 'info');
                    }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition shadow-md cursor-pointer ${
                      isPlayingVoice ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-emerald-400 border border-slate-700'
                    }`}
                  >
                    {isPlayingVoice ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Voice Prompt</span>
                    <p className="text-xs font-semibold text-white">"Listen to my laugh & how I pronounce espresso" (0:32)</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-emerald-400/80">
                  <span className="w-1 h-3 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-6 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-4 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-8 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-5 bg-emerald-400 rounded-full" />
                  <span className="w-1 h-3 bg-emerald-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* 6. OKCUPID & EHARMONY 97% COMPATIBILITY MATRIX */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/40 via-slate-950 to-slate-900 border border-blue-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400">
                  OkCupid & eharmony Algorithm
                </span>
                <h3 className="text-2xl font-black text-white">97% Compatibility Match</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Based on shared core values, emotional quotient, and lifestyle goals.
                </p>
              </div>

              {/* Match Gauge */}
              <div className="w-20 h-20 rounded-full bg-blue-600/20 border-4 border-blue-500 flex flex-col items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
                <span className="text-xl font-black text-white">{daterProfile.compatibilityScore}%</span>
                <span className="text-[9px] uppercase font-bold text-blue-300">Match</span>
              </div>
            </div>

            {/* 29-Dimension Personality Breakdown */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Personality Dimensions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {daterProfile.personalityDimensions.map((dim) => (
                  <div key={dim.trait} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                      <span className="text-slate-300">{dim.trait}</span>
                      <span className="text-blue-400 font-bold">{dim.score}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* OkCupid Questions Matchup */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Match Questions & Answers:
              </span>
              {daterProfile.compatibilityQuestions.map((q) => (
                <div key={q.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                  <div className="flex justify-between items-center gap-2 mb-1">
                    <span className="font-bold text-white">{q.question}</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-semibold whitespace-nowrap">
                      {q.importance}
                    </span>
                  </div>
                  <p className="text-slate-300 italic">"{q.daterAnswer}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7. SHAADI, JEEVANSATHI & TRULYMADLY INDIAN MATCHMAKING CARD */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 via-rose-950/20 to-slate-950 border border-amber-500/30 space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                    Shaadi, Jeevansathi & TrulyMadly
                  </span>
                  <h3 className="text-2xl font-black text-white">Indian Matchmaking & Compatibility</h3>
                </div>
              </div>

              {/* Kundali Gunas */}
              <div className="text-right">
                <div className="text-xl font-black text-amber-400">
                  {daterProfile.matchmakingDetails.kundaliGunas} / 36
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Kundali Guna Match
                </div>
              </div>
            </div>

            {/* Biodata Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Height</span>
                <p className="text-xs font-bold text-white mt-0.5">{daterProfile.matchmakingDetails.height}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Mother Tongue</span>
                <p className="text-xs font-bold text-white mt-0.5">{daterProfile.matchmakingDetails.motherTongue}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Diet</span>
                <p className="text-xs font-bold text-white mt-0.5">{daterProfile.matchmakingDetails.diet}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Sun Sign</span>
                <p className="text-xs font-bold text-white mt-0.5">{daterProfile.matchmakingDetails.sunSign}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Drinking / Smoking</span>
                <p className="text-xs font-bold text-white mt-0.5">
                  {daterProfile.matchmakingDetails.drinking} • {daterProfile.matchmakingDetails.smoking}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Family Values</span>
                <p className="text-xs font-bold text-white mt-0.5">{daterProfile.matchmakingDetails.familyType}</p>
              </div>
            </div>
          </div>

          {/* 8. WHAT HIS REAL FRIENDS SAY ABOUT HIM (THE HEART OF YASHDATE) */}
          <div className="pt-6 border-t border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                  <Star className="w-3.5 h-3.5 fill-rose-400" /> High-Trust Social Proof
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

          {/* 9. SOCIAL LINKS & DIRECT CONNECT (INSTAGRAM, LINKEDIN, ETC.) */}
          <div className="pt-8 border-t border-slate-800 text-center space-y-6">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-2">
                Think you and {daterProfile.name} would vibe?
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Say hi directly on your favorite platform! No endless waiting or paywalls.
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
