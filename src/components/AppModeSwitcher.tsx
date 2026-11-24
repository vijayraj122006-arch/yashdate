import React from 'react';
import { useApp } from '../context/AppContext';
import type { DatingAppMode } from '../types';
import {
  Sparkles,
  Flame,
  MessageCircle,
  Heart,
  Scale,
  Crown,
  Compass,
  Radio,
} from 'lucide-react';

export const AppModeSwitcher: React.FC = () => {
  const { datingAppMode, setDatingAppMode, addToast } = useApp();

  const modes: { id: DatingAppMode; label: string; icon: React.ReactNode; desc: string; badge: string; color: string }[] = [
    {
      id: 'fusion',
      label: 'Super-App Fusion',
      icon: <Sparkles className="w-4 h-4" />,
      desc: 'All 15+ dating apps combined into one ultimate experience',
      badge: 'Ultimate',
      color: 'from-rose-500 to-indigo-600',
    },
    {
      id: 'tinder',
      label: 'Tinder Swipe Deck',
      icon: <Flame className="w-4 h-4 text-rose-500" />,
      desc: 'Quick connections, card stack, Super Likes & Boost',
      badge: 'Swipe Deck',
      color: 'from-rose-500 to-orange-500',
    },
    {
      id: 'hinge',
      label: 'Hinge Prompts',
      icon: <MessageCircle className="w-4 h-4 text-emerald-400" />,
      desc: 'Designed to be deleted, prompt cards & voice memos',
      badge: 'Prompts',
      color: 'from-emerald-500 to-teal-700',
    },
    {
      id: 'bumble',
      label: 'Bumble First Move',
      icon: <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />,
      desc: 'Honey-yellow theme, compliments & BFF mode',
      badge: 'Bumble Honey',
      color: 'from-amber-500 to-yellow-600',
    },
    {
      id: 'okcupid',
      label: 'OkCupid & eharmony',
      icon: <Scale className="w-4 h-4 text-blue-400" />,
      desc: '97% Match score, deep questions & 29-dimension spectrum',
      badge: '97% Match',
      color: 'from-blue-600 to-cyan-500',
    },
    {
      id: 'shaadi',
      label: 'Shaadi & TrulyMadly',
      icon: <Crown className="w-4 h-4 text-amber-300" />,
      desc: 'TrulyMadly Trust Score 99%, Kundali 34/36, Biodata',
      badge: 'Indian Matchmaking',
      color: 'from-rose-600 via-amber-600 to-red-700',
    },
    {
      id: 'raya',
      label: 'Raya VIP & Feeld',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      desc: 'Elite dark aesthetic with curated audio soundtrack',
      badge: 'VIP Club',
      color: 'from-purple-900 to-slate-900',
    },
    {
      id: 'happn',
      label: 'Happn & CMB Radar',
      icon: <Compass className="w-4 h-4 text-cyan-400" />,
      desc: 'Crossed paths in real life & Bagel of the Day',
      badge: 'Crossed Paths',
      color: 'from-cyan-600 to-blue-700',
    },
  ];

  return (
    <div className="bg-slate-900/95 border-b border-slate-800 py-3 px-4 sm:px-6 shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-sm">
            <Radio className="w-4 h-4 animate-pulse" />
          </span>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>UX App Mode:</span>
              <span className="text-rose-400">
                {modes.find((m) => m.id === datingAppMode)?.label}
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Switch UI/UX aesthetic between Tinder, Bumble, Hinge, OkCupid, Shaadi, Raya & Happn
            </p>
          </div>
        </div>

        {/* Mode selector pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {modes.map((mode) => {
            const isSelected = datingAppMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setDatingAppMode(mode.id);
                  addToast(`Switched to ${mode.label} UI/UX! ✨`, 'info');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? `bg-gradient-to-r ${mode.color} text-white border-white/20 shadow-lg scale-105`
                    : 'bg-slate-800/80 text-slate-400 border-slate-700/80 hover:text-slate-200 hover:border-slate-600'
                }`}
                title={mode.desc}
              >
                {mode.icon}
                <span>{mode.badge}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
