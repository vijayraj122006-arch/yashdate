import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type {
  DaterProfile,
  FriendEndorsement,
  MatchRecommendation,
  MatchStatus,
  ViewTab,
  UserRole,
  RolePermissions,
} from '../types';
import {
  INITIAL_DATER_PROFILE,
  INITIAL_ENDORSEMENTS,
  INITIAL_RECOMMENDATIONS,
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
  deleteEndorsement: (id: string) => void;
  recommendations: MatchRecommendation[];
  addRecommendation: (recommendation: Omit<MatchRecommendation, 'id' | 'createdAt' | 'status'>) => void;
  updateMatchStatus: (id: string, status: MatchStatus) => void;
  updateMatchNotes: (id: string, notes: string) => void;
  deleteRecommendation: (id: string) => void;
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  triggerConfetti: () => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'love') => void;
  removeToast: (id: string) => void;
  resetToDefault: () => void;
  // RBAC
  userRole: UserRole;
  switchRole: (newRole: UserRole, pin?: string) => { success: boolean; message: string };
  permissions: RolePermissions;
  isRoleModalOpen: boolean;
  setIsRoleModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'yashdate_user_clean_v5',
  ENDORSEMENTS: 'yashdate_endorsements_clean_v5',
  RECOMMENDATIONS: 'yashdate_recommendations_clean_v5',
  ROLE: 'yashdate_role_v5',
};

const ROLE_PINS = {
  dater: '2026',
  admin: '7777',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [daterProfile, setDaterProfile] = useState<DaterProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.photos || parsed.photos.length === 0) {
          parsed.photos = INITIAL_DATER_PROFILE.photos;
        }
        return parsed;
      }
      return INITIAL_DATER_PROFILE;
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
      return saved ? JSON.parse(saved) : INITIAL_RECOMMENDATIONS;
    } catch {
      return INITIAL_RECOMMENDATIONS;
    }
  });

  const [activeTab, setActiveTab] = useState<ViewTab>('profile');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
      if (saved === 'friend' || saved === 'dater' || saved === 'admin') {
        return saved;
      }
      return 'friend';
    } catch {
      return 'friend';
    }
  });
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, userRole);
    } catch (e) {
      console.error(e);
    }
  }, [userRole]);

  const permissions: RolePermissions = {
    canEditBio: userRole === 'dater' || userRole === 'admin',
    canViewMatches: userRole === 'dater' || userRole === 'admin',
    canManageMatchStatus: userRole === 'dater' || userRole === 'admin',
    canEditMatchNotes: userRole === 'dater' || userRole === 'admin',
    canDeleteMatches: userRole === 'dater' || userRole === 'admin',
    canDeleteVouches: userRole === 'dater' || userRole === 'admin',
    canResetDatabase: userRole === 'admin',
    canWriteVouch: userRole === 'friend' || userRole === 'admin',
    canSendMatchLink: true,
  };

  const switchRole = (newRole: UserRole, pin?: string) => {
    if (newRole === 'friend') {
      setUserRole('friend');
      if (activeTab === 'edit_profile' || activeTab === 'sent_matches') {
        setActiveTab('profile');
      }
      addToast('Switched to Friend / Wingman view', 'info');
      return { success: true, message: 'Switched to Friend view' };
    }

    if (newRole === 'dater') {
      if (pin === ROLE_PINS.dater) {
        setUserRole('dater');
        addToast('Unlocked Yash (Dater) access', 'love');
        return { success: true, message: 'Welcome back, Yash!' };
      }
      addToast('Incorrect PIN for Yash (hint: 2026)', 'info');
      return { success: false, message: 'Incorrect PIN. Hint: 2026' };
    }

    if (newRole === 'admin') {
      if (pin === ROLE_PINS.admin) {
        setUserRole('admin');
        addToast('Admin mode activated', 'success');
        return { success: true, message: 'Admin mode unlocked' };
      }
      addToast('Incorrect Admin PIN (hint: 7777)', 'info');
      return { success: false, message: 'Incorrect PIN. Hint: 7777' };
    }

    return { success: false, message: 'Unknown role' };
  };

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

  const addToast = (message: string, type: 'success' | 'info' | 'love' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#38bdf8', '#fb7185', '#f43f5e'],
    });
  };

  const updateDaterProfile = (updates: Partial<DaterProfile>) => {
    setDaterProfile((prev) => ({
      ...prev,
      ...updates,
    }));
    addToast('Profile saved successfully', 'success');
  };

  const addEndorsement = (newEndorsement: Omit<FriendEndorsement, 'id' | 'createdAt'>) => {
    const item: FriendEndorsement = {
      ...newEndorsement,
      id: 'end-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setEndorsements((prev) => [item, ...prev]);
    triggerConfetti();
    addToast(`Friend description from ${newEndorsement.friendName} posted`, 'love');
  };

  const deleteEndorsement = (id: string) => {
    setEndorsements((prev) => prev.filter((e) => e.id !== id));
    addToast('Description removed', 'info');
  };

  const addRecommendation = (newRec: Omit<MatchRecommendation, 'id' | 'createdAt' | 'status'>) => {
    const item: MatchRecommendation = {
      ...newRec,
      id: 'rec-' + Date.now(),
      status: 'to_review',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setRecommendations((prev) => [item, ...prev]);
    triggerConfetti();
    addToast(`Match recommendation sent to ${daterProfile.name}`, 'success');
  };

  const updateMatchStatus = (id: string, status: MatchStatus) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    addToast('Status updated', 'info');
  };

  const updateMatchNotes = (id: string, notes: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, daterNotes: notes } : r))
    );
  };

  const deleteRecommendation = (id: string) => {
    setRecommendations((prev) => prev.filter((r) => r.id !== id));
    addToast('Recommendation removed', 'info');
  };

  const resetToDefault = () => {
    setDaterProfile(INITIAL_DATER_PROFILE);
    setEndorsements(INITIAL_ENDORSEMENTS);
    setRecommendations(INITIAL_RECOMMENDATIONS);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.ENDORSEMENTS);
    localStorage.removeItem(STORAGE_KEYS.RECOMMENDATIONS);
    addToast('Reset to clean profile', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        daterProfile,
        updateDaterProfile,
        endorsements,
        addEndorsement,
        deleteEndorsement,
        recommendations,
        addRecommendation,
        updateMatchStatus,
        updateMatchNotes,
        deleteRecommendation,
        activeTab,
        setActiveTab,
        triggerConfetti,
        toasts,
        addToast,
        removeToast,
        resetToDefault,
        userRole,
        switchRole,
        permissions,
        isRoleModalOpen,
        setIsRoleModalOpen,
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
