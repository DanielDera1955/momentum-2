import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Dumbbell, 
  TrendingUp, 
  User, 
  Settings 
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, setIsLogModalOpen } = useApp();

  const navItems: Array<{ id: TabType; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'log', label: 'Log Activity', icon: PlusCircle },
    { id: 'library', label: 'Exercises', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'profile', label: 'Profile & Goals', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTabClick = (tabId: TabType) => {
    if (tabId === 'log') {
      setIsLogModalOpen(true);
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <>
      {/* Desktop & Tablet Navigation Header Bar */}
      <nav 
        className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 hidden md:block"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar" role="tablist">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${item.id}`}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 whitespace-nowrap ${
                    isActive
                      ? 'bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600 dark:text-teal-400' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden"
        aria-label="Mobile Bottom Navigation"
      >
        <div className="grid grid-cols-6 h-16 max-w-md mx-auto px-1" role="tablist">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                role="tab"
                aria-selected={isActive}
                className={`flex flex-col items-center justify-center py-1 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg ${
                  isActive
                    ? 'text-teal-600 dark:text-teal-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className={`p-1 rounded-xl ${isActive ? 'bg-teal-50 dark:bg-teal-950/80' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight leading-none mt-0.5 max-w-[50px] truncate">
                  {item.label.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
