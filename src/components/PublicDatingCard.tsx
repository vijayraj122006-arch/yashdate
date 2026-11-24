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
  Plus,
  Sparkles,
  Camera,
  X,
  Share2,
} from 'lucide-react';

interface Props {
  onOpenEndorseModal: () => void;
  onOpenSendLinkModal: () => void;
}

export const PublicDatingCard: React.FC<Props> = ({ onOpenEndorseModal, onOpenSendLinkModal }) => {
  const { daterProfile, endorsements, setActiveTab, addToast, triggerConfetti, permissions, setIsRoleModalOpen } = useApp();
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const hasPhotos = daterProfile.photos && daterProfile.photos.length > 0;

  const handleNextPhoto = () => {
    if (!hasPhotos) return;
    setCurrentPhotoIdx((prev) => (prev + 1) % daterProfile.photos.length);
  };

  const handlePrevPhoto = () => {
    if (!hasPhotos) return;
    setCurrentPhotoIdx((prev) => (prev - 1 + daterProfile.photos.length) % daterProfile.photos.length);
  };

  const handleLike = () => {
    triggerConfetti();
    addToast(`You liked ${daterProfile.name}`, 'love');
  };

  const handlePass = () => {
    addToast(`Passed on ${daterProfile.name}`, 'info');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Profile link copied to clipboard', 'success');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      {/* Main Profile Card */}
      <div className="bg-[#13131c] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/80 text-left">
        {/* Photo or Placeholder */}
        <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-[#181824] overflow-hidden flex items-center justify-center">
          {hasPhotos ? (
            <>
              <img
                src={daterProfile.photos[currentPhotoIdx]}
                alt={daterProfile.name}
                className="w-full h-full object-cover object-top sm:object-center transition duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#13131c] via-[#13131c]/30 to-transparent" />

              {daterProfile.photos.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    data-testid="photo-prev-btn"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    data-testid="photo-next-btn"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                    {daterProfile.photos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPhotoIdx(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          currentPhotoIdx === idx ? 'w-6 bg-rose-500' : 'w-2 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center p-6 space-y-3">
              <div className="w-20 h-20 rounded-full bg-[#1c1c28] border-2 border-dashed border-white/15 flex items-center justify-center mx-auto text-zinc-400">
                <Camera className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">No photos added yet</p>
                <p className="text-xs text-zinc-400 mt-0.5">Add photo links in the Edit Bio tab</p>
              </div>
              <button
                onClick={() => (permissions.canEditBio ? setActiveTab('edit_profile') : setIsRoleModalOpen(true))}
                data-testid="add-photos-btn"
                className="px-4 py-2 bg-[#1f1f2c] hover:bg-[#28283a] text-xs font-semibold text-zinc-200 border border-white/10 rounded-xl transition cursor-pointer"
              >
                {permissions.canEditBio ? '+ Add Photos' : 'Unlock Yash to Add Photos'}
              </button>
            </div>
          )}

          {/* Identity Overlay on Image */}
          {hasPhotos && (
            <div className="absolute bottom-5 left-5 right-5 text-left z-10">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                  {daterProfile.name}, {daterProfile.age}
                </h1>
              </div>

              <p className="text-xs sm:text-sm text-zinc-200 flex items-center gap-2 flex-wrap font-medium drop-shadow-sm">
                {daterProfile.height && <span className="bg-white/15 px-2 py-0.5 rounded-md backdrop-blur-sm">{daterProfile.height}</span>}
                {daterProfile.roots && (
                  <span className="bg-white/15 px-2 py-0.5 rounded-md backdrop-blur-sm">{daterProfile.roots}</span>
                )}
                {daterProfile.location && (
                  <span className="flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-md backdrop-blur-sm">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {daterProfile.location}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* If no photos, show identity header block */}
        {!hasPhotos && (
          <div className="p-6 border-b border-white/10 bg-[#151520]">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {daterProfile.name}, {daterProfile.age}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 flex items-center gap-2 flex-wrap mt-1">
              {daterProfile.height && <span>{daterProfile.height}</span>}
              {daterProfile.roots && (
                <>
                  <span>•</span>
                  <span>{daterProfile.roots}</span>
                </>
              )}
              {daterProfile.location && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {daterProfile.location}
                  </span>
                </>
              )}
            </p>
          </div>
        )}

        {/* User-Given Attribute Chips with Distinct Harmonious Colors */}
        <div className="p-4 border-b border-white/5 bg-[#101018]/60 flex flex-wrap gap-2">
          {daterProfile.personality && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 font-medium border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              {daterProfile.personality}
            </span>
          )}
          {daterProfile.dreamCareer && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-indigo-500/15 text-indigo-300 font-medium border border-indigo-500/30 flex items-center gap-1.5 shadow-sm">
              <Plane className="w-3.5 h-3.5 text-indigo-400" />
              Wants to be a {daterProfile.dreamCareer}
            </span>
          )}
          {daterProfile.musicTaste && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-rose-500/15 text-rose-300 font-medium border border-rose-500/30 flex items-center gap-1.5 shadow-sm">
              <Music className="w-3.5 h-3.5 text-rose-400" />
              {daterProfile.musicTaste}
            </span>
          )}
          {daterProfile.datingPreference && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-pink-500/15 text-pink-300 font-medium border border-pink-500/30 flex items-center gap-1.5 shadow-sm">
              <User className="w-3.5 h-3.5 text-pink-400" />
              {daterProfile.datingPreference}
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Self-Description */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              About {daterProfile.name}
            </h3>
            {daterProfile.selfDescription ? (
              <p className="text-sm text-zinc-200 leading-relaxed bg-[#181824] p-4 rounded-2xl border border-white/5 shadow-inner">
                {daterProfile.selfDescription}
              </p>
            ) : (
              <div className="bg-[#181824] p-4 rounded-2xl border border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>No bio description written yet.</span>
                {permissions.canEditBio ? (
                  <button
                    onClick={() => setActiveTab('edit_profile')}
                    data-testid="write-description-btn"
                    className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer transition"
                  >
                    Write Description
                  </button>
                ) : (
                  <button
                    onClick={() => setIsRoleModalOpen(true)}
                    className="text-zinc-400 hover:text-zinc-200 text-[11px] underline cursor-pointer"
                  >
                    Unlock Yash to Write
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Ideal Date */}
          {daterProfile.idealDate && (
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Ideal Date
              </h3>
              <p className="text-sm text-zinc-200 leading-relaxed bg-[#181824] p-4 rounded-2xl border border-white/5 shadow-inner">
                {daterProfile.idealDate}
              </p>
            </div>
          )}

          {/* What My Friends Say (Friend Endorsements) */}
          <div className="pt-2 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">What Friends Say About Him</h3>
                <p className="text-xs text-zinc-400">Descriptions written by his real friends</p>
              </div>
              <button
                onClick={onOpenEndorseModal}
                data-testid="vouch-open-btn"
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Vouch</span>
              </button>
            </div>

            {endorsements.length === 0 ? (
              <div className="p-4 rounded-2xl bg-[#181824] border border-dashed border-white/10 text-center space-y-2.5">
                <p className="text-xs text-zinc-400">
                  No friend descriptions posted yet. Friends can click below to write a vouch!
                </p>
                <button
                  onClick={onOpenEndorseModal}
                  data-testid="first-vouch-btn"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-xs font-semibold text-white shadow-md shadow-rose-600/25 transition cursor-pointer"
                >
                  + Write a Friend Description
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {endorsements.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#181824] border border-white/10 space-y-2 text-left shadow-sm"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{item.friendName}</span>
                      <span className="text-zinc-400">{item.relationship}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-200 italic leading-relaxed pl-2.5 border-l-2 border-rose-500/50">
                      "{item.description}"
                    </p>
                    {item.whyYouShouldDateThem && (
                      <p className="text-xs text-zinc-400 border-t border-white/5 pt-1.5">
                        <strong className="text-rose-300">Why date him:</strong> {item.whyYouShouldDateThem}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Social Links */}
          {daterProfile.socialLinks && daterProfile.socialLinks.length > 0 && (
            <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-3 flex-wrap">
              {daterProfile.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#181824] hover:bg-[#222232] text-zinc-200 border border-white/10 transition flex items-center gap-1.5 shadow-sm"
                >
                  <span className="capitalize">{link.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              ))}
            </div>
          )}

          {/* Send Match Link Trigger */}
          <div className="p-3.5 rounded-2xl bg-[#181824] border border-white/10 flex items-center justify-between text-xs text-zinc-300">
            <span>Know someone who would like {daterProfile.name}?</span>
            <button
              onClick={onOpenSendLinkModal}
              data-testid="send-match-card-btn"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-semibold shadow-md shadow-sky-600/20 transition cursor-pointer"
            >
              Send Match Link
            </button>
          </div>
        </div>
      </div>

      {/* Clean Premium Actions (Pass, Like, Share) */}
      <div className="flex items-center justify-center gap-6 pt-3">
        <button
          onClick={handlePass}
          data-testid="pass-button"
          className="w-14 h-14 rounded-full bg-[#181824] border border-white/15 hover:border-white/30 text-zinc-400 hover:text-white flex items-center justify-center shadow-lg transition transform hover:scale-110 active:scale-95 cursor-pointer"
          title="Pass"
        >
          <X className="w-6 h-6" />
        </button>

        <button
          onClick={handleLike}
          data-testid="like-button"
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white flex items-center justify-center shadow-xl shadow-rose-500/35 transition transform hover:scale-110 active:scale-95 cursor-pointer"
          title="Like"
        >
          <Heart className="w-7 h-7 fill-white" />
        </button>

        <button
          onClick={handleShare}
          data-testid="share-card-btn"
          className="w-14 h-14 rounded-full bg-[#181824] border border-white/15 hover:border-white/30 text-zinc-400 hover:text-white flex items-center justify-center shadow-lg transition transform hover:scale-110 active:scale-95 cursor-pointer"
          title="Share profile"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
