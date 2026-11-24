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

  const modes: { id: DatingAppMode; label: string; icon: React.ReactNode; badge: string }[] = [
    {
      id: 'fusion',
      label: 'Editorial Fusion',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      badge: 'All-in-One',
    },
    {
      id: 'tinder',
      label: 'Tinder Deck',
      icon: <Flame className="w-3.5 h-3.5 text-rose-400" />,
      badge: 'Swipe Cards',
    },
    {
      id: 'hinge',
      label: 'Hinge Prompts',
      icon: <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />,
      badge: 'Editorial Prompts',
    },
    {
      id: 'bumble',
      label: 'Bumble First Move',
      icon: <Heart className="w-3.5 h-3.5 text-amber-400" />,
      badge: 'Honey Minimal',
    },
    {
      id: 'okcupid',
      label: 'OkCupid & eharmony',
      icon: <Scale className="w-3.5 h-3.5 text-sky-400" />,
      badge: '98% Compatibility',
    },
    {
      id: 'shaadi',
      label: 'Shaadi & TrulyMadly',
      icon: <Crown className="w-3.5 h-3.5 text-amber-300" />,
      badge: 'Biodata & Trust',
    },
    {
      id: 'raya',
      label: 'Raya VIP & Feeld',
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
      badge: 'VIP Soundtrack',
    },
    {
      id: 'happn',
      label: 'Happn & CMB',
      icon: <Compass className="w-3.5 h-3.5 text-cyan-400" />,
      badge: 'Radar & Proximity',
    },
  ];

  return (
    <div className="bg-slate-950/80 border-b border-slate-800/80 py-2.5 px-4 sm:px-6 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-slate-800 text-slate-300">
            <Radio className="w-3.5 h-3.5 text-sky-400" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Design Aesthetic:
          </span>
          <span className="text-xs font-bold text-slate-200">
            {modes.find((m) => m.id === datingAppMode)?.label}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {modes.map((mode) => {
            const isSelected = datingAppMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setDatingAppMode(mode.id);
                  addToast(`Switched view to ${mode.label}`, 'info');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-800 text-white border-slate-600 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
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
