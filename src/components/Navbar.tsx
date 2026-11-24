import React from 'react';
import { useApp } from '../context/AppContext';
import type { ViewTab } from '../types';
import { Heart, User, Users, Compass, Edit3, Share2, RotateCcw } from 'lucide-react';

interface Props {
  onOpenEndorseModal: () => void;
  onOpenSendLinkModal: () => void;
}

export const Navbar: React.FC<Props> = ({ onOpenEndorseModal, onOpenSendLinkModal }) => {
  const { activeTab, setActiveTab, daterProfile, endorsements, recommendations, addToast, resetToDefault } = useApp();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Profile link copied to clipboard', 'success');
  };

  const navTabs: { id: ViewTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'profile', label: 'Dating Card', icon: <User className="w-4 h-4" /> },
    { id: 'friends_vouches', label: 'Friend Vouches', icon: <Users className="w-4 h-4" />, badge: endorsements.length },
    { id: 'sent_matches', label: 'Sent Matches', icon: <Compass className="w-4 h-4" />, badge: recommendations.length },
    { id: 'edit_profile', label: 'Edit Bio', icon: <Edit3 className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand */}
          <div
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-sm">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">
                {daterProfile.name}
              </span>
            </div>
          </div>

          {/* Clean Minimal Tabs */}
          <nav className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenEndorseModal}
              className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600/10 text-rose-300 border border-rose-500/20 hover:bg-rose-600/20 transition cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-400" />
              <span>Vouch</span>
            </button>

            <button
              onClick={onOpenSendLinkModal}
              className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600/10 text-sky-300 border border-sky-500/20 hover:bg-sky-600/20 transition cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Send Match</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
              title="Share profile link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={resetToDefault}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition cursor-pointer"
              title="Reset profile"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
