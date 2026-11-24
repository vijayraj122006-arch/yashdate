import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type {
  DaterProfile,
  FriendEndorsement,
  MatchRecommendation,
  ViewMode,
  MatchStatus,
  DatingAppMode,
} from '../types';
import {
  INITIAL_DATER_PROFILE,
  INITIAL_ENDORSEMENTS,
  INITIAL_MATCH_RECOMMENDATIONS,
} from '../data/initialData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'love';
  message: string;
}

interface AppContextType {
  daterProfile: DaterProfile;
  updateDaterProfile: (updates: Partial<DaterProfile>) => void;
  endorsements: FriendEndorsement[];
  addEndorsement: (endorsement: Omit<FriendEndorsement, 'id' | 'createdAt'>) => void;
  toggleFeatureEndorsement: (id: string) => void;
  deleteEndorsement: (id: string) => void;
  recommendations: MatchRecommendation[];
  addRecommendation: (recommendation: Omit<MatchRecommendation, 'id' | 'createdAt' | 'status'>) => void;
  updateMatchStatus: (id: string, status: MatchStatus) => void;
  updateMatchNotes: (id: string, notes: string) => void;
  deleteRecommendation: (id: string) => void;
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  datingAppMode: DatingAppMode;
  setDatingAppMode: (mode: DatingAppMode) => void;
  triggerConfetti: () => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'love') => void;
  removeToast: (id: string) => void;
  resetToDefault: () => void;
  handleSuperLike: () => void;
  handleLikePrompt: (promptId: string) => void;
  isPlayingMusic: boolean;
  toggleMusic: () => void;
  exportConfig: () => void;
  importConfig: (jsonString: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'yashsunil_profile_v3',
  ENDORSEMENTS: 'yashsunil_endorsements_v3',
  RECOMMENDATIONS: 'yashsunil_recommendations_v3',
  APP_MODE: 'yashsunil_app_mode_v3',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [daterProfile, setDaterProfile] = useState<DaterProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_DATER_PROFILE;
    } catch {
      return INITIAL_DATER_PROFILE;
    }
  });

  const [endorsements, setEndorsements] = useState<FriendEndorsement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENDORSEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ENDORSEMENTS;
    } catch {
      return INITIAL_ENDORSEMENTS;
    }
  });

  const [recommendations, setRecommendations] = useState<MatchRecommendation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECOMMENDATIONS);
      return saved ? JSON.parse(saved) : INITIAL_MATCH_RECOMMENDATIONS;
    } catch {
      return INITIAL_MATCH_RECOMMENDATIONS;
    }
  });

  const [datingAppMode, setDatingAppMode] = useState<DatingAppMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APP_MODE);
      return (saved as DatingAppMode) || 'fusion';
    } catch {
      return 'fusion';
    }
  });

  const [currentView, setCurrentView] = useState<ViewMode>('public_date_view');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(daterProfile));
    } catch (e) {
      console.error(e);
    }
  }, [daterProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ENDORSEMENTS, JSON.stringify(endorsements));
    } catch (e) {
      console.error(e);
    }
  }, [endorsements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECOMMENDATIONS, JSON.stringify(recommendations));
    } catch (e) {
      console.error(e);
    }
  }, [recommendations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APP_MODE, datingAppMode);
    } catch (e) {
      console.error(e);
    }
  }, [datingAppMode]);

  const addToast = (message: string, type: 'success' | 'info' | 'love' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#38bdf8', '#fb7185', '#f43f5e', '#e0e7ff'],
    });
  };

  const toggleMusic = () => {
    setIsPlayingMusic((prev) => {
      const next = !prev;
      addToast(
        next
          ? `Playing acoustic track: ${daterProfile.soundtrack.title} by ${daterProfile.soundtrack.artist}`
          : 'Soundtrack paused',
        'info'
      );
      return next;
    });
  };

  const handleSuperLike = () => {
    setDaterProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        superLikesReceived: prev.stats.superLikesReceived + 1,
      },
    }));
    triggerConfetti();
    addToast(`You sent a Super Like to ${daterProfile.name}! It is a match!`, 'love');
  };

  const handleLikePrompt = (promptId: string) => {
    setDaterProfile((prev) => ({
      ...prev,
      prompts: prev.prompts.map((p) =>
        p.id === promptId ? { ...p, likedByCount: (p.likedByCount || 0) + 1 } : p
      ),
    }));
    triggerConfetti();
    addToast(`Sent a like on ${daterProfile.name}'s prompt!`, 'love');
  };

  const updateDaterProfile = (updates: Partial<DaterProfile>) => {
    setDaterProfile((prev) => ({
      ...prev,
      ...updates,
    }));
    addToast('Profile and preferences updated successfully', 'success');
  };

  const addEndorsement = (newEndorsement: Omit<FriendEndorsement, 'id' | 'createdAt'>) => {
    const item: FriendEndorsement = {
      ...newEndorsement,
      id: 'end-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setEndorsements((prev) => [item, ...prev]);
    setDaterProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        friendsVouchedCount: prev.stats.friendsVouchedCount + 1,
      },
    }));
    triggerConfetti();
    addToast(`Friend endorsement from ${newEndorsement.friendName} added`, 'love');
  };

  const toggleFeatureEndorsement = (id: string) => {
    setEndorsements((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isFeatured: !e.isFeatured } : e))
    );
    addToast('Featured status updated', 'info');
  };

  const deleteEndorsement = (id: string) => {
    setEndorsements((prev) => prev.filter((e) => e.id !== id));
    addToast('Endorsement removed', 'info');
  };

  const addRecommendation = (newRec: Omit<MatchRecommendation, 'id' | 'createdAt' | 'status'>) => {
    const item: MatchRecommendation = {
      ...newRec,
      id: 'rec-' + Date.now(),
      status: 'to_review',
      createdAt: new Date().toISOString(),
    };
    setRecommendations((prev) => [item, ...prev]);
    setDaterProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        recommendedMatchesCount: prev.stats.recommendedMatchesCount + 1,
      },
    }));
    triggerConfetti();
    addToast(`Match recommendation sent to ${daterProfile.name}`, 'success');
  };

  const updateMatchStatus = (id: string, status: MatchStatus) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    addToast('Candidate status updated', 'info');
  };

  const updateMatchNotes = (id: string, notes: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, daterPrivateNotes: notes } : r))
    );
  };

  const deleteRecommendation = (id: string) => {
    setRecommendations((prev) => prev.filter((r) => r.id !== id));
    addToast('Recommendation removed', 'info');
  };

  const exportConfig = () => {
    const data = {
      profile: daterProfile,
      endorsements,
      recommendations,
      appMode: datingAppMode,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${daterProfile.name.toLowerCase().replace(/\s+/g, '_')}_profile.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('Profile configuration exported to JSON file', 'success');
  };

  const importConfig = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) setDaterProfile(parsed.profile);
      if (Array.isArray(parsed.endorsements)) setEndorsements(parsed.endorsements);
      if (Array.isArray(parsed.recommendations)) setRecommendations(parsed.recommendations);
      if (parsed.appMode) setDatingAppMode(parsed.appMode);
      addToast('Profile configuration imported successfully', 'success');
      return true;
    } catch {
      addToast('Failed to parse JSON configuration file', 'info');
      return false;
    }
  };

  const resetToDefault = () => {
    setDaterProfile(INITIAL_DATER_PROFILE);
    setEndorsements(INITIAL_ENDORSEMENTS);
    setRecommendations(INITIAL_MATCH_RECOMMENDATIONS);
    setDatingAppMode('fusion');
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.ENDORSEMENTS);
    localStorage.removeItem(STORAGE_KEYS.RECOMMENDATIONS);
    localStorage.removeItem(STORAGE_KEYS.APP_MODE);
    addToast('Reset to default profile state', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        daterProfile,
        updateDaterProfile,
        endorsements,
        addEndorsement,
        toggleFeatureEndorsement,
        deleteEndorsement,
        recommendations,
        addRecommendation,
        updateMatchStatus,
        updateMatchNotes,
        deleteRecommendation,
        currentView,
        setCurrentView,
        datingAppMode,
        setDatingAppMode,
        triggerConfetti,
        toasts,
        addToast,
        removeToast,
        resetToDefault,
        handleSuperLike,
        handleLikePrompt,
        isPlayingMusic,
        toggleMusic,
        exportConfig,
        importConfig,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
