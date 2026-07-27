import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Plus, 
  Sun, 
  Moon, 
  Eye, 
  Type, 
  User, 
  Sparkles,
  Accessibility
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    profile, 
    streakDays, 
    settings, 
    updateSettings, 
    setIsLogModalOpen,
    setActiveTab,
    activeTab
  } = useApp();

  const toggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
  };

  const toggleHighContrast = () => {
    updateSettings({ highContrast: !settings.highContrast });
  };

  const cycleTextSize = () => {
    const sizes: Array<'normal' | 'large' | 'xlarge'> = ['normal', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(settings.textSize);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    updateSettings({ textSize: nextSize });
  };

  const getProfileLabel = (type: string) => {
    switch (type) {
      case 'manual_wheelchair': return 'Manual Chair';
      case 'powered_wheelchair': return 'Power Chair';
      case 'limited_mobility': return 'Limited Mobility';
      case 'physio_recovery': return 'Physio Care';
      default: return 'Adaptive';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand & Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-xl p-1"
          role="button"
          tabIndex={0}
          aria-label="Momentum Home Dashboard"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-indigo-600 p-0.5 shadow-md shadow-teal-500/20 group-hover:shadow-lg transition-all">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-teal-400">
              <Accessibility className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-slate-900 via-teal-800 to-indigo-950 dark:from-white dark:via-teal-200 dark:to-indigo-300 bg-clip-text text-transparent">
                Momentum
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                Adaptive
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Inclusive & Accessible Fitness
            </p>
          </div>
        </div>

        {/* Action Controls & Preferences */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Active Streak Badge */}
          <button
            onClick={() => setActiveTab('progress')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800/80 font-semibold text-xs sm:text-sm hover:bg-amber-100 dark:hover:bg-amber-900/80 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
            title="View Active Streak Progress"
            aria-label={`${streakDays} days active streak. Click to view progress.`}
          >
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span className="font-extrabold">{streakDays}</span>
            <span className="hidden md:inline">Day Streak</span>
          </button>

          {/* Text Size Scalar Control */}
          <button
            onClick={cycleTextSize}
            className="hidden sm:flex items-center justify-center p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 relative"
            title={`Text Size: ${settings.textSize.toUpperCase()}. Click to cycle.`}
            aria-label={`Cycle Text Size. Current size: ${settings.textSize}`}
          >
            <Type className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-1 -right-1 text-[9px] font-bold px-1 rounded bg-teal-600 text-white uppercase">
              {settings.textSize === 'normal' ? '1x' : settings.textSize === 'large' ? '1.1x' : '1.2x'}
            </span>
          </button>

          {/* High Contrast Mode Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`hidden sm:flex items-center justify-center p-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              settings.highContrast 
                ? 'bg-indigo-600 text-white' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={settings.highContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
            aria-label={`Toggle High Contrast Mode. Currently ${settings.highContrast ? 'On' : 'Off'}`}
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
            title={settings.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={`Toggle Theme. Currently ${settings.darkMode ? 'Dark' : 'Light'} mode`}
          >
            {settings.darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />}
          </button>

          {/* Prominent Log Activity Button */}
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/25 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:scale-95"
            aria-label="Log new fitness activity"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            <span className="hidden sm:inline">Log Activity</span>
          </button>

          {/* Profile Quick Pill */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl transition-all border focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              activeTab === 'profile'
                ? 'bg-teal-50 border-teal-300 text-teal-800 dark:bg-teal-950 dark:border-teal-700 dark:text-teal-200'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-700'
            }`}
            aria-label={`Profile view for ${profile.name}`}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 font-bold flex items-center justify-center text-xs">
              {profile.name.charAt(0)}
            </div>
            <span className="hidden lg:inline text-xs font-semibold max-w-[90px] truncate">
              {profile.name}
            </span>
          </button>

        </div>
      </div>
    </header>
  );
};
