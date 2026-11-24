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
  UserSession,
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
  // RBAC & Auth
  session: UserSession | null;
  login: (role: UserRole, username: string, password: string) => { success: boolean; message: string };
  logout: () => void;
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
  SESSION: 'yashdate_session_v5',
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

  const [session, setSession] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<ViewTab>('profile');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
      }
    } catch (e) {
      console.error(e);
    }
  }, [session]);

  const userRole: UserRole = session ? session.role : 'friend';

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

  const login = (role: UserRole, username: string, password: string) => {
    const cleanUser = username.trim();
    const lowerUser = cleanUser.toLowerCase();
    const cleanPass = password.trim();

    if (!cleanUser) {
      return { success: false, message: 'Username / ID is required' };
    }

    if (role === 'dater') {
      if (lowerUser !== 'yash' && lowerUser !== 'yashsunil') {
        return { success: false, message: 'Invalid username for Yash (use "yash")' };
      }
      if (cleanPass !== ROLE_PINS.dater) {
        return { success: false, message: 'Invalid passcode for Yash (hint: 2026)' };
      }
      const newSession: UserSession = { role: 'dater', username: 'yash' };
      setSession(newSession);
      addToast('Welcome back, Yash!', 'love');
      return { success: true, message: 'Welcome back, Yash!' };
    }

    if (role === 'admin') {
      if (lowerUser !== 'admin') {
        return { success: false, message: 'Invalid username for Admin (use "admin")' };
      }
      if (cleanPass !== ROLE_PINS.admin) {
        return { success: false, message: 'Invalid admin passcode (hint: 7777)' };
      }
      const newSession: UserSession = { role: 'admin', username: 'admin' };
      setSession(newSession);
      addToast('Administrator authenticated', 'success');
      return { success: true, message: 'Admin access unlocked' };
    }

    if (role === 'friend') {
      if (cleanPass !== 'friend' && cleanPass !== 'friend123' && cleanPass !== '1234') {
        return { success: false, message: 'Friend passcode is "friend"' };
      }
      const newSession: UserSession = { role: 'friend', username: cleanUser };
      setSession(newSession);
      addToast(`Welcome ${cleanUser}! You are in Friend & Wingman mode.`, 'love');
      return { success: true, message: `Welcome ${cleanUser}!` };
    }

    return { success: false, message: 'Unknown role' };
  };

  const logout = () => {
    setSession(null);
    setActiveTab('profile');
    addToast('Signed out', 'info');
  };

  const switchRole = (newRole: UserRole, pin?: string) => {
    if (newRole === 'friend') {
      const friendUsername = session?.role === 'friend' ? session.username : 'friend';
      setSession({ role: 'friend', username: friendUsername });
      if (activeTab === 'edit_profile' || activeTab === 'sent_matches') {
        setActiveTab('profile');
      }
      addToast('Switched to Friend / Wingman view', 'info');
      return { success: true, message: 'Switched to Friend view' };
    }

    if (newRole === 'dater') {
      if (pin === ROLE_PINS.dater) {
        setSession({ role: 'dater', username: 'yash' });
        addToast('Unlocked Yash (Dater) access', 'love');
        return { success: true, message: 'Welcome back, Yash!' };
      }
      addToast('Incorrect PIN for Yash (hint: 2026)', 'info');
      return { success: false, message: 'Incorrect PIN. Hint: 2026' };
    }

    if (newRole === 'admin') {
      if (pin === ROLE_PINS.admin) {
        setSession({ role: 'admin', username: 'admin' });
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
        session,
        login,
        logout,
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
