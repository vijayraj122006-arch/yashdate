import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import type { ViewMode } from '../types';
import {
  Heart,
  Compass,
  Eye,
  Share2,
  Sparkles,
  RotateCcw,
  Download,
  Upload,
} from 'lucide-react';

interface Props {
  onOpenEndorseModal: () => void;
  onOpenSendLinkModal: () => void;
}

export const Navbar: React.FC<Props> = ({ onOpenEndorseModal, onOpenSendLinkModal }) => {
  const {
    currentView,
    setCurrentView,
    daterProfile,
    endorsements,
    recommendations,
    addToast,
    resetToDefault,
    exportConfig,
    importConfig,
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Profile link copied to clipboard', 'success');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importConfig(content);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const navItems: { mode: ViewMode; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      mode: 'public_date_view',
      label: 'Date Profile',
      icon: <Eye className="w-4 h-4" />,
    },
    {
      mode: 'dater_dashboard',
      label: 'Dater Studio',
      icon: <Sparkles className="w-4 h-4" />,
      badge: recommendations.length,
    },
    {
      mode: 'friend_wingman',
      label: 'Wingman Hub',
      icon: <Compass className="w-4 h-4" />,
      badge: endorsements.length,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => setCurrentView('public_date_view')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white">
                  {daterProfile.name}
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  {daterProfile.height} • {daterProfile.location.split(',')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation view modes */}
          <div className="flex items-center bg-slate-900 p-1.5 rounded-xl border border-slate-800 shadow-inner">
            {navItems.map((item) => {
              const isActive = currentView === item.mode;
              return (
                <button
                  key={item.mode}
                  onClick={() => setCurrentView(item.mode)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300'
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
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={onOpenEndorseModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 transition cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Vouch</span>
            </button>

            <button
              onClick={onOpenSendLinkModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 transition cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Recommend Match</span>
            </button>

            {/* Export JSON Config */}
            <button
              onClick={exportConfig}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 flex items-center gap-1.5 transition cursor-pointer"
              title="Export complete profile configuration as JSON"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span className="hidden xl:inline">Export</span>
            </button>

            {/* Import JSON Config */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json,application/json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 flex items-center gap-1.5 transition cursor-pointer"
              title="Import profile configuration JSON"
            >
              <Upload className="w-4 h-4 text-slate-400" />
              <span className="hidden xl:inline">Import</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 flex items-center gap-1.5 transition cursor-pointer"
              title="Share profile link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={resetToDefault}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition cursor-pointer"
              title="Reset to default data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
