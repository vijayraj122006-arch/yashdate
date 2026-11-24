import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Heart, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 bg-[#13131c]/95 border-white/10 text-white shadow-black/80"
        >
          <div className="flex items-center gap-3">
            {toast.type === 'love' && (
              <span className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
                <Heart className="w-5 h-5 fill-rose-500" />
              </span>
            )}
            {toast.type === 'success' && (
              <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
              </span>
            )}
            {toast.type === 'info' && (
              <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                <Info className="w-5 h-5" />
              </span>
            )}
            <p className="text-sm font-medium text-slate-100">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
