import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { PublicDatingCard } from './components/PublicDatingCard';
import { FriendVouchesView } from './components/FriendVouchesView';
import { SentMatchesView } from './components/SentMatchesView';
import { EditBioView } from './components/EditBioView';
import { FriendEndorsementModal } from './components/FriendEndorsementModal';
import { SendMatchLinkModal } from './components/SendMatchLinkModal';
import { ToastContainer } from './components/ToastContainer';
import { RoleModal } from './components/RoleModal';
import { AuthOpeningScreen } from './components/AuthOpeningScreen';
import { Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();
  const [isEndorseModalOpen, setIsEndorseModalOpen] = useState(false);
  const [isSendLinkModalOpen, setIsSendLinkModalOpen] = useState(false);

  return (
    <div className="min-h-screen app-ambient-bg text-zinc-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      <div>
        <Navbar
          onOpenEndorseModal={() => setIsEndorseModalOpen(true)}
          onOpenSendLinkModal={() => setIsSendLinkModalOpen(true)}
        />

        <main className="pb-16">
          {activeTab === 'profile' && (
            <PublicDatingCard
              onOpenEndorseModal={() => setIsEndorseModalOpen(true)}
              onOpenSendLinkModal={() => setIsSendLinkModalOpen(true)}
            />
          )}

          {activeTab === 'friends_vouches' && (
            <FriendVouchesView
              onOpenEndorseModal={() => setIsEndorseModalOpen(true)}
            />
          )}

          {activeTab === 'sent_matches' && (
            <SentMatchesView
              onOpenSendLinkModal={() => setIsSendLinkModalOpen(true)}
            />
          )}

          {activeTab === 'edit_profile' && (
            <EditBioView />
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
      <RoleModal />

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-white/5 bg-[#0b0b0f]/80 backdrop-blur-md py-6 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
            </span>
            <span>
              <strong className="text-zinc-200">YashDate</strong> — Clean, uncrowded dating app backed by real friends.
            </span>
          </div>

          <a
            href="https://github.com/vijayraj122006-arch/yashdate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition"
          >
            github.com/vijayraj122006-arch/yashdate
          </a>
        </div>
      </footer>
    </div>
  );
};

const AppRouter: React.FC = () => {
  const { session } = useApp();

  if (!session) {
    return (
      <>
        <AuthOpeningScreen />
        <ToastContainer />
      </>
    );
  }

  return <MainContent />;
};

export function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
