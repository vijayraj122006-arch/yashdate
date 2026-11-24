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
    <header className="sticky top-0 z-40 bg-[#0e0e14]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand */}
          <div
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25 transition group-hover:scale-105">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight group-hover:text-rose-200 transition">
                {daterProfile.name}
              </span>
            </div>
          </div>

          {/* Clean Modern Tabs */}
          <nav className="flex items-center bg-[#15151e] p-1 rounded-2xl border border-white/10 shadow-inner">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/25'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-rose-500/20 text-rose-300'
                    }`}>
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
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition cursor-pointer shadow-sm shadow-rose-950"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-400" />
              <span>Vouch</span>
            </button>

            <button
              onClick={onOpenSendLinkModal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30 hover:bg-sky-500/25 transition cursor-pointer shadow-sm shadow-sky-950"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Send Match</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-[#15151e] hover:bg-[#1f1f2c] text-zinc-300 hover:text-white border border-white/10 transition cursor-pointer"
              title="Share profile link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={resetToDefault}
              className="p-2 rounded-xl bg-[#15151e] hover:bg-[#1f1f2c] text-zinc-400 hover:text-zinc-200 border border-white/10 transition cursor-pointer"
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
