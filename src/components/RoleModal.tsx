import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';
import { X, Shield, User, HeartHandshake, KeyRound, Check } from 'lucide-react';

export const RoleModal: React.FC = () => {
  const { userRole, switchRole, isRoleModalOpen, setIsRoleModalOpen } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(userRole);
  const [pinInput, setPinInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isRoleModalOpen) return null;

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setPinInput('');
    setErrorMessage('');
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = switchRole(selectedRole, pinInput.trim());
    if (res.success) {
      setIsRoleModalOpen(false);
      setPinInput('');
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#13131c] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-7 text-zinc-100 my-8 text-left">
        <button
          onClick={() => setIsRoleModalOpen(false)}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-[#181824] hover:bg-[#222232] border border-white/5 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-1">
          <div className="p-2 bg-gradient-to-tr from-violet-600 to-indigo-600 text-white rounded-xl shadow-md shadow-violet-600/25">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Role Access & Permissions
            </h2>
          </div>
        </div>
        <p className="text-xs text-zinc-400 mb-5">
          Select how you want to experience the app. Friends can vouch and send matches, while Yash can review dates and edit his bio.
        </p>

        <form onSubmit={handleApply} className="space-y-4">
          {/* Role Selection Options */}
          <div className="space-y-2.5">
            {/* Friend Option */}
            <div
              onClick={() => handleSelectRole('friend')}
              className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                selectedRole === 'friend'
                  ? 'bg-rose-500/10 border-rose-500/40 text-white shadow-sm'
                  : 'bg-[#181824] border-white/5 hover:border-white/10 text-zinc-300'
              }`}
            >
              <div className="p-2 rounded-xl bg-rose-500/15 text-rose-300 mt-0.5">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">Friend / Wingman (Default)</h4>
                  {userRole === 'friend' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                  Browse profile, write friend vouches, and send prospective dates from Instagram or LinkedIn. No PIN required.
                </p>
              </div>
            </div>

            {/* Yash (Dater) Option */}
            <div
              onClick={() => handleSelectRole('dater')}
              className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                selectedRole === 'dater'
                  ? 'bg-rose-500/10 border-rose-500/40 text-white shadow-sm'
                  : 'bg-[#181824] border-white/5 hover:border-white/10 text-zinc-300'
              }`}
            >
              <div className="p-2 rounded-xl bg-violet-500/15 text-violet-300 mt-0.5">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">Yash Sunil (Dater Mode)</h4>
                  {userRole === 'dater' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                  Unlock to edit bio, view matches sent by friends, track status (Interested / Passed), and add private notes.
                </p>
              </div>
            </div>

            {/* Admin Option */}
            <div
              onClick={() => handleSelectRole('admin')}
              className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                selectedRole === 'admin'
                  ? 'bg-rose-500/10 border-rose-500/40 text-white shadow-sm'
                  : 'bg-[#181824] border-white/5 hover:border-white/10 text-zinc-300'
              }`}
            >
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-300 mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">Administrator</h4>
                  {userRole === 'admin' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                  Full control to moderate any vouches, delete recommendations, manage profiles, and reset system data.
                </p>
              </div>
            </div>
          </div>

          {/* PIN Input if Dater or Admin */}
          {(selectedRole === 'dater' || selectedRole === 'admin') && (
            <div className="p-3.5 rounded-2xl bg-[#181824] border border-white/10 space-y-2">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-rose-400" />
                Enter Passcode for {selectedRole === 'dater' ? 'Yash' : 'Admin'}
              </label>

              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-[#13131c] border border-white/10 text-white text-xs outline-none focus:border-rose-500 font-mono tracking-widest"
              />

              {errorMessage && (
                <p className="text-[11px] text-rose-400">{errorMessage}</p>
              )}
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsRoleModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#181824] hover:bg-[#222232] text-zinc-300 text-xs font-medium border border-white/5 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold shadow-md shadow-rose-600/25 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm & Switch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
