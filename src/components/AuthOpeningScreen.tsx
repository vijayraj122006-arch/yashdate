import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';
import { Heart, User, Shield, HeartHandshake, KeyRound, ArrowRight } from 'lucide-react';

export const AuthOpeningScreen: React.FC = () => {
  const { login } = useApp();
  const [role, setRole] = useState<UserRole>('friend');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    setError('');
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = login(role, username, password);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen app-ambient-bg flex items-center justify-center p-4 selection:bg-rose-500 selection:text-white">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Brand Header */}
        <div className="space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-rose-500/30">
            <Heart className="w-7 h-7 fill-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">YashDate</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            A clean dating web app backed by friend vouches and candidate link recommendations.
          </p>
        </div>

        {/* Main Auth Card */}
        <div className="p-6 sm:p-8 bg-[#13131c] border border-white/10 rounded-3xl shadow-2xl shadow-black/80 text-left space-y-5">
          {/* Role Tabs */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleSelect('friend')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 transition cursor-pointer border ${
                  role === 'friend'
                    ? 'bg-rose-500/15 border-rose-500/50 text-white shadow-sm'
                    : 'bg-[#181824] border-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <HeartHandshake className="w-4 h-4 text-rose-400" />
                <span>Friend</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('dater')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 transition cursor-pointer border ${
                  role === 'dater'
                    ? 'bg-violet-500/15 border-violet-500/50 text-white shadow-sm'
                    : 'bg-[#181824] border-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <User className="w-4 h-4 text-violet-400" />
                <span>Yash (Dater)</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 transition cursor-pointer border ${
                  role === 'admin'
                    ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-sm'
                    : 'bg-[#181824] border-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                {role === 'friend' ? 'Your Name / ID' : 'Username'}
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={role === 'friend' ? 'Enter your name' : 'Enter username'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#181824] border border-white/10 text-white text-xs outline-none focus:border-rose-500 font-mono tracking-wider transition"
                />
                <KeyRound className="w-4 h-4 text-zinc-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-bold text-xs shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition cursor-pointer transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Authenticate & Enter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footnote */}
        <p className="text-xs text-zinc-500">
          Crafted for Yash Sunil • Clean, minimalistic, zero hardcoded records.
        </p>
      </div>
    </div>
  );
};