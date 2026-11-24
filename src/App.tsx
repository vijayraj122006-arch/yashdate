import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AppModeSwitcher } from './components/AppModeSwitcher';
import { DaterDashboard } from './components/DaterDashboard';
import { FriendWingmanHub } from './components/FriendWingmanHub';
import { PublicDatingCard } from './components/PublicDatingCard';
import { FriendEndorsementModal } from './components/FriendEndorsementModal';
import { SendMatchLinkModal } from './components/SendMatchLinkModal';
import { ToastContainer } from './components/ToastContainer';
import { Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView } = useApp();
  const [isEndorseModalOpen, setIsEndorseModalOpen] = useState(false);
  const [isSendLinkModalOpen, setIsSendLinkModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      <div>
        <Navbar
          onOpenEndorseModal={() => setIsEndorseModalOpen(true)}
          onOpenSendLinkModal={() => setIsSendLinkModalOpen(true)}
        />

        {/* Global Dating Mode Switcher (Tinder, Bumble, Hinge, OkCupid, Shaadi, Raya, Happn, Fusion) */}
        <AppModeSwitcher />

        <main className="pb-16">
          {currentView === 'dater_dashboard' && (
            <DaterDashboard
              onOpenEndorseModal={() => setIsEndorseModalOpen(true)}
              onOpenSendLinkModal={() => setIsSendLinkModalOpen(true)}
            />
          )}

          {currentView === 'friend_wingman' && (
            <FriendWingmanHub
              onOpenEndorseModal={() => setIsEndorseModalOpen(true)}
              onOpenSendLinkModal={() => setIsSendLinkModalOpen(true)}
            />
          )}

          {currentView === 'public_date_view' && (
            <PublicDatingCard
              onOpenEndorseModal={() => setIsEndorseModalOpen(true)}
              onOpenSendLinkModal={() => setIsSendLinkModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <FriendEndorsementModal
        isOpen={isEndorseModalOpen}
        onClose={() => setIsEndorseModalOpen(false)}
      />

      <SendMatchLinkModal
        isOpen={isSendLinkModalOpen}
        onClose={() => setIsSendLinkModalOpen(false)}
      />

      <ToastContainer />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-rose-500/20 text-rose-400">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
            </span>
            <span>
              <strong>YashDate</strong> — Multi-app fusion dating (Tinder, Bumble, Hinge, OkCupid, Shaadi, TrulyMadly, Raya, Happn).
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/vijayraj122006-arch/yashdate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>vijayraj122006-arch/yashdate</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
