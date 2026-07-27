import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeDashboard } from './components/HomeDashboard';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { ProgressView } from './components/ProgressView';
import { OnboardingProfileView } from './components/OnboardingProfileView';
import { SettingsView } from './components/SettingsView';
import { LogActivityModal } from './components/LogActivityModal';
import { NotificationToast } from './components/NotificationToast';
import { OnboardingFlowModal } from './components/OnboardingFlowModal';
import { Accessibility, Heart, ShieldCheck } from 'lucide-react';

const MainAppLayout: React.FC = () => {
  const { hasCompletedOnboarding, activeTab } = useApp();

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors flex flex-col font-sans relative">
      
      {/* Onboarding Flow Modal overlay if logged in but onboarding not completed */}
      {!hasCompletedOnboarding && <OnboardingFlowModal />}

      {/* Top Header */}
      <Header />

      {/* Tab Navigation */}
      <Navigation />

      {/* Main View Area */}
      <div className="flex-1">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 min-h-[80vh]">
          {activeTab === 'dashboard' && <HomeDashboard />}
          {activeTab === 'library' && <ExerciseLibrary />}
          {activeTab === 'progress' && <ProgressView />}
          {activeTab === 'profile' && <OnboardingProfileView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Log Activity Overlay Modal */}
      <LogActivityModal />

      {/* Floating Accessible Notification Toast */}
      <NotificationToast />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mb-16 md:mb-0 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
              <Accessibility className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Momentum Adaptive Fitness
            </span>
            <span>— Accessible by design</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              High-contrast mode & adjustable text
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              Designed for Wheelchair Athletes
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}
