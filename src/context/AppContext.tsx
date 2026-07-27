import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { 
  ActivityLog, 
  UserProfile, 
  WeeklyGoals, 
  AppSettings, 
  Badge, 
  TabType,
  DailySummary
} from '../types';
import { 
  INITIAL_ACTIVITIES, 
  INITIAL_PROFILE, 
  INITIAL_GOALS, 
  INITIAL_SETTINGS, 
  INITIAL_BADGES 
} from '../data/seedData';

interface AppContextType {
  activities: ActivityLog[];
  profile: UserProfile;
  goals: WeeklyGoals;
  settings: AppSettings;
  badges: Badge[];
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isLogModalOpen: boolean;
  setIsLogModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
  
  // Auth & Onboarding State
  isLoggedIn: boolean;
  hasCompletedOnboarding: boolean;
  showSectionGuides: boolean;
  setShowSectionGuides: (show: boolean) => void;
  login: (email?: string, name?: string) => void;
  logout: () => void;
  completeOnboarding: (data: { name: string; profileType: any; mobilityNotes?: string }) => void;
  startOnboardingAgain: () => void;

  // Actions
  addActivity: (newAct: Omit<ActivityLog, 'id' | 'timestamp'> & { timestamp?: string }) => void;
  deleteActivity: (id: string) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  updateGoals: (updated: Partial<WeeklyGoals>) => void;
  updateSettings: (updated: Partial<AppSettings>) => void;
  resetToSeedData: () => void;
  triggerConfetti: () => void;

  // Derived Stats
  todayStats: {
    distanceKm: number;
    activeMinutes: number;
    workoutsCount: number;
  };
  thisWeekStats: {
    distanceKm: number;
    activeMinutes: number;
    workoutsCount: number;
  };
  streakDays: number;
  past14DaysSummary: DailySummary[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'momentum_app_v1_';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load saved state from localStorage, or fall back to the starting demo data
  const [activities, setActivities] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}activities`);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch (e) {
      return INITIAL_ACTIVITIES;
    }
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}profile`);
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch (e) {
      return INITIAL_PROFILE;
    }
  });

  const [goals, setGoals] = useState<WeeklyGoals>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}goals`);
      return saved ? JSON.parse(saved) : INITIAL_GOALS;
    } catch (e) {
      return INITIAL_GOALS;
    }
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}settings`);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch (e) {
      return INITIAL_SETTINGS;
    }
  });

  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auth & Onboarding State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}is_logged_in`);
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}has_onboarded`);
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });

  const [showSectionGuides, setShowSectionGuides] = useState<boolean>(true);

  // Local storage effects for Auth
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}is_logged_in`, JSON.stringify(isLoggedIn));
    } catch (e) { console.error(e); }
  }, [isLoggedIn]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}has_onboarded`, JSON.stringify(hasCompletedOnboarding));
    } catch (e) { console.error(e); }
  }, [hasCompletedOnboarding]);

  const login = (email?: string, name?: string) => {
    setIsLoggedIn(true);
    if (name) {
      setProfile(prev => ({ ...prev, name, email: email || prev.email }));
    }
    showToast('Signed in successfully!');
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('Signed out of Momentum.');
  };

  const completeOnboarding = (data: { name: string; profileType: any; mobilityNotes?: string }) => {
    setProfile(prev => ({
      ...prev,
      name: data.name || prev.name,
      profileType: data.profileType || prev.profileType,
      mobilityNotes: data.mobilityNotes || prev.mobilityNotes
    }));
    setHasCompletedOnboarding(true);
    setIsLoggedIn(true);
    triggerConfetti();
    showToast(`Welcome to Momentum, ${data.name}! Your adaptive profile is configured.`);
  };

  const startOnboardingAgain = () => {
    setHasCompletedOnboarding(false);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}activities`, JSON.stringify(activities));
    } catch (e) { console.error(e); }
  }, [activities]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}profile`, JSON.stringify(profile));
    } catch (e) { console.error(e); }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}goals`, JSON.stringify(goals));
    } catch (e) { console.error(e); }
  }, [goals]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}settings`, JSON.stringify(settings));
    } catch (e) { console.error(e); }
  }, [settings]);

  // Handle Root Dark Mode / High Contrast / Text Size HTML classes
  useEffect(() => {
    const root = document.documentElement;
    if (settings.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    root.classList.remove('text-scale-normal', 'text-scale-large', 'text-scale-xlarge');
    root.classList.add(`text-scale-${settings.textSize}`);
  }, [settings]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0d9488', '#0284c7', '#6366f1', '#f59e0b', '#10b981']
      });
    } catch (e) {
      // safe fallback if canvas canvas-confetti is restricted
    }
  };

  const addActivity = (newAct: Omit<ActivityLog, 'id' | 'timestamp'> & { timestamp?: string }) => {
    const created: ActivityLog = {
      ...newAct,
      id: `act-${Date.now()}`,
      timestamp: newAct.timestamp || new Date().toISOString(),
      energyBurnedEst: newAct.energyBurnedEst || Math.round((newAct.durationMinutes * 5) + (newAct.distanceKm * 25))
    };

    setActivities(prev => [created, ...prev]);
    showToast(`Logged "${created.title}" successfully!`);
    triggerConfetti();

    // Check if badges unlocked
    checkBadgeUnlocks([created, ...activities]);
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
    showToast('Activity removed.');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
    showToast('Profile updated.');
  };

  const updateGoals = (updated: Partial<WeeklyGoals>) => {
    setGoals(prev => ({ ...prev, ...updated }));
    showToast('Weekly fitness goals updated!');
  };

  const updateSettings = (updated: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updated }));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const resetToSeedData = () => {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}activities`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}profile`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}goals`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}settings`);
    setActivities(INITIAL_ACTIVITIES);
    setProfile(INITIAL_PROFILE);
    setGoals(INITIAL_GOALS);
    setSettings(INITIAL_SETTINGS);
    setBadges(INITIAL_BADGES);
    showToast('App data reset to its starting state.');
  };

  const checkBadgeUnlocks = (currentActs: ActivityLog[]) => {
    const totalDist = currentActs.reduce((acc, a) => acc + a.distanceKm, 0);
    const totalMins = currentActs.reduce((acc, a) => acc + a.durationMinutes, 0);
    
    setBadges(prev => prev.map(badge => {
      if (badge.id === 'badge-4') { // 100km
        const percent = Math.min(100, Math.round((totalDist / 100) * 100));
        return { ...badge, progressPercent: percent, isUnlocked: percent >= 100 };
      }
      if (badge.id === 'badge-5') { // 500 mins
        const percent = Math.min(100, Math.round((totalMins / 500) * 100));
        return { ...badge, progressPercent: percent, isUnlocked: percent >= 100 };
      }
      return badge;
    }));
  };

  // Helper date matching
  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  // Derived Today Stats
  const todayStats = useMemo(() => {
    const now = new Date();
    const todaysActivities = activities.filter(a => isSameDay(new Date(a.timestamp), now));
    
    return {
      distanceKm: Number(todaysActivities.reduce((acc, a) => acc + a.distanceKm, 0).toFixed(1)),
      activeMinutes: todaysActivities.reduce((acc, a) => acc + a.durationMinutes, 0),
      workoutsCount: todaysActivities.length,
    };
  }, [activities]);

  // Derived This Week Stats (last 7 days rolling)
  const thisWeekStats = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const weekActivities = activities.filter(a => new Date(a.timestamp) >= sevenDaysAgo);

    return {
      distanceKm: Number(weekActivities.reduce((acc, a) => acc + a.distanceKm, 0).toFixed(1)),
      activeMinutes: weekActivities.reduce((acc, a) => acc + a.durationMinutes, 0),
      workoutsCount: weekActivities.length,
    };
  }, [activities]);

  // Calculate consecutive active streak days
  const streakDays = useMemo(() => {
    if (activities.length === 0) return 0;
    
    const activityDates = new Set(
      activities.map(a => new Date(a.timestamp).toISOString().split('T')[0])
    );

    let streak = 0;
    const checkDate = new Date();
    
    // Check if active today
    const todayStr = checkDate.toISOString().split('T')[0];
    if (activityDates.has(todayStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      // Check if active yesterday to hold current streak
      checkDate.setDate(checkDate.getDate() - 1);
      const yesterdayStr = checkDate.toISOString().split('T')[0];
      if (!activityDates.has(yesterdayStr)) {
        return 0;
      }
    }

    // Count backward
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (activityDates.has(dateStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }, [activities]);

  // Past 14 Days daily summaries for charts
  const past14DaysSummary = useMemo<DailySummary[]>(() => {
    const result: DailySummary[] = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = days[d.getDay()];

      const dayActs = activities.filter(a => a.timestamp.split('T')[0] === dateStr);
      const distanceKm = Number(dayActs.reduce((acc, a) => acc + a.distanceKm, 0).toFixed(1));
      const activeMinutes = dayActs.reduce((acc, a) => acc + a.durationMinutes, 0);

      result.push({
        dateStr,
        dayLabel: i === 0 ? 'Today' : (i === 1 ? 'Yest' : `${dayLabel} ${d.getDate()}`),
        distanceKm,
        activeMinutes,
        workoutsCount: dayActs.length
      });
    }

    return result;
  }, [activities]);

  return (
    <AppContext.Provider
      value={{
        activities,
        profile,
        goals,
        settings,
        badges,
        activeTab,
        setActiveTab,
        isLogModalOpen,
        setIsLogModalOpen,
        toastMessage,
        setToastMessage,
        isLoggedIn,
        hasCompletedOnboarding,
        showSectionGuides,
        setShowSectionGuides,
        login,
        logout,
        completeOnboarding,
        startOnboardingAgain,
        addActivity,
        deleteActivity,
        updateProfile,
        updateGoals,
        updateSettings,
        resetToSeedData,
        triggerConfetti,
        todayStats,
        thisWeekStats,
        streakDays,
        past14DaysSummary
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
