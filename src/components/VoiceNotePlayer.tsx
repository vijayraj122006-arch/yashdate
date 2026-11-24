import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Mic } from 'lucide-react';

export const VoiceNotePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = 14; // 14 seconds
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isPlaying) {
      // Gentle web audio tone
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(320, ctx.currentTime);
          gain.gain.setValueAtTime(0.03, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          setTimeout(() => {
            try {
              osc.stop();
            } catch {}
          }, 300);
        }
      } catch {}

      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {}
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (progress >= duration) setProgress(0);
      setIsPlaying(true);
    }
  };

  const remainingSeconds = Math.max(0, duration - progress);
  const formattedTime = `0:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

  return (
    <div className="p-4 rounded-2xl bg-[#181824] border border-white/5 space-y-2.5 text-left">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-rose-300">
          <Mic className="w-3.5 h-3.5 text-rose-400" />
          <span>Wingman Audio Vouch</span>
        </div>
        <span className="text-[11px] text-zinc-400 flex items-center gap-1">
          <Volume2 className="w-3 h-3 text-zinc-400" /> 0:14
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          data-testid="voice-note-toggle-btn"
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-600/30 transition transform active:scale-95 cursor-pointer shrink-0"
          title={isPlaying ? 'Pause voice note' : 'Play voice note'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>

        {/* Animated Sound Wave Bars */}
        <div className="flex-1 flex items-center gap-1 h-8 px-2 bg-[#13131c] rounded-xl border border-white/5 overflow-hidden">
          {[12, 24, 18, 30, 14, 28, 20, 10, 26, 16, 32, 22, 14, 28, 18, 24, 12, 20].map((height, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-200 ${
                isPlaying
                  ? 'bg-gradient-to-t from-rose-500 to-pink-400 animate-pulse'
                  : i <= (progress / duration) * 18
                  ? 'bg-rose-400'
                  : 'bg-zinc-700'
              }`}
              style={{
                height: isPlaying ? `${Math.max(6, (height + ((i % 3) * 6)) % 28)}px` : `${height / 1.5}px`,
              }}
            />
          ))}
        </div>

        <span className="text-xs font-mono text-zinc-400 shrink-0 w-8 text-right">
          {formattedTime}
        </span>
      </div>

      <p className="text-[11px] text-zinc-400 italic">
        "Honestly, Yash is 6ft, loves flying, cooks great pasta, and is one of the most down-to-earth guys."
      </p>
    </div>
  );
};
