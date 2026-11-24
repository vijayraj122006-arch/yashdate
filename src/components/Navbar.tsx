import React from 'react';
import { useApp } from '../context/AppContext';
import type { ViewMode } from '../types';
import { Heart, Compass, Eye, Share2, Sparkles, RotateCcw } from 'lucide-react';

interface Props {
  onOpenEndorseModal: () => void;
  onOpenSendLinkModal: () => void;
}

export const Navbar: React.FC<Props> = ({ onOpenEndorseModal, onOpenSendLinkModal }) => {
  const { currentView, setCurrentView, daterProfile, endorsements, recommendations, addToast, resetToDefault } = useApp();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Link copied to clipboard! Share it with your friends or prospective dates 💌', 'success');
  };

  const navItems: { mode: ViewMode; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      mode: 'dater_dashboard',
      label: 'Dater Cockpit',
      icon: <Sparkles className="w-4 h-4" />,
      badge: recommendations.length,
    },
    {
      mode: 'friend_wingman',
      label: 'Wingman Hub',
      icon: <Compass className="w-4 h-4" />,
      badge: endorsements.length,
    },
    {
      mode: 'public_date_view',
      label: 'Public Date View',
      icon: <Eye className="w-4 h-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => setCurrentView('dater_dashboard')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-500/25 group-hover:scale-105 transition">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-rose-100 to-rose-400 bg-clip-text text-transparent">
                  {daterProfile.name}Date
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Friend Vouched
                </span>
              </div>
            </div>
          </div>

          {/* Navigation view modes */}
          <div className="flex items-center bg-slate-950/70 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            {navItems.map((item) => {
              const isActive = currentView === item.mode;
              return (
                <button
                  key={item.mode}
                  onClick={() => setCurrentView(item.mode)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenEndorseModal}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition cursor-pointer"
              title="Vouch for friend"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-400" />
              <span>Vouch for {daterProfile.name}</span>
            </button>

            <button
              onClick={onOpenSendLinkModal}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 transition cursor-pointer"
              title="Send a match profile link"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Send Match Link</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
              title="Share Web App Link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={resetToDefault}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60 transition cursor-pointer"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
