import React from 'react';
import { useApp } from '../context/AppContext';
import { SectionGuideBanner } from './SectionGuideBanner';
import {
  Settings,
  Sun,
  Moon,
  Eye,
  Type,
  Compass,
  Bell,
  Volume2,
  RotateCcw,
  UserCheck
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, resetToSeedData, startOnboardingAgain } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold border border-teal-200 dark:border-teal-800">
          <Settings className="w-3.5 h-3.5" />
          <span>Accessibility & App Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Settings & Accessibility
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
          Accessibility is core to Momentum. Fine-tune visual contrast, font sizes, distance units, audio feedback, and reminder schedules.
        </p>
      </div>

      {/* Section Explanation Guide */}
      <SectionGuideBanner
        title="Settings & Accessibility Section Guide"
        badgeText="Preferences"
        whatItShows={[
          "Dark mode and light mode theme settings",
          "High contrast mode for ultra-clear element borders and focus rings",
          "Dynamic text scaling controls (Standard 100%, Large 112.5%, Extra Large 125%)",
          "Distance unit preferences (Kilometers vs Miles)",
          "Timer sound chime preferences and daily movement reminder schedule"
        ]}
        whatYouCanDo={[
          "Toggle Dark/Light theme mode instantly",
          "Enable High Contrast mode for high visibility outdoors",
          "Adjust text size scalar across the entire application",
          "Switch between Metric (km) and Imperial (miles) units",
          "Re-run the adaptive onboarding wizard anytime"
        ]}
      />

      <div className="space-y-6">

        {/* Visual Accessibility Section */}
        <section className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>Visual Accessibility & Theme</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Dark Mode Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-xl">
                  {settings.darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Theme Mode</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{settings.darkMode ? 'Dark Theme' : 'Light Theme'}</p>
                </div>
              </div>

              <button
                onClick={() => updateSettings({ darkMode: !settings.darkMode })}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  settings.darkMode ? 'bg-teal-600' : 'bg-slate-300'
                }`}
                aria-label={`Toggle Dark Mode. Currently ${settings.darkMode ? 'On' : 'Off'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* High Contrast Mode Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">High Contrast Mode</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Ultra-crisp borders & focus rings</p>
                </div>
              </div>

              <button
                onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  settings.highContrast ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
                aria-label={`Toggle High Contrast Mode. Currently ${settings.highContrast ? 'On' : 'Off'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

          </div>

          {/* Text Size Scale Selector */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-700">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <Type className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Text Scaling (Font Size)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'normal', label: 'Standard (100%)', desc: 'Default layout text' },
                { id: 'large', label: 'Large (112.5%)', desc: 'Enhanced legibility' },
                { id: 'xlarge', label: 'Extra Large (125%)', desc: 'Maximum readability' },
              ].map((size) => {
                const isSelected = settings.textSize === size.id;
                return (
                  <button
                    key={size.id}
                    onClick={() => updateSettings({ textSize: size.id as any })}
                    className={`p-3.5 rounded-2xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isSelected
                        ? 'bg-teal-50 dark:bg-teal-950/80 border-teal-600 dark:border-teal-400 font-bold text-teal-900 dark:text-teal-200 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{size.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{size.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

        </section>

        {/* Onboarding Controls */}
        <section className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>Profile & Onboarding</span>
          </h2>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Re-run Adaptive Onboarding</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Update your preferred name, mobility profile, or equipment preferences.
              </p>
            </div>
            <button
              onClick={startOnboardingAgain}
              className="py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm shrink-0"
            >
              <UserCheck className="w-4 h-4" />
              <span>Launch Onboarding Wizard</span>
            </button>
          </div>
        </section>

        {/* Units & Cues Section */}
        <section className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Units & Workout Audio Cues</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Distance Unit Selector */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Distance Unit</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Kilometers vs Miles</p>
              </div>

              <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => updateSettings({ distanceUnit: 'km' })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    settings.distanceUnit === 'km' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Metric (km)
                </button>
                <button
                  onClick={() => updateSettings({ distanceUnit: 'miles' })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    settings.distanceUnit === 'miles' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Imperial (mi)
                </button>
              </div>
            </div>

            {/* Audio Feedback Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Timer Sound Chimes</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Audio cue on rest-interval countdown</p>
                </div>
              </div>

              <button
                onClick={() => updateSettings({ audioFeedback: !settings.audioFeedback })}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  settings.audioFeedback ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
                aria-label={`Toggle Audio Cues. Currently ${settings.audioFeedback ? 'On' : 'Off'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.audioFeedback ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

          </div>
        </section>

        {/* Reminders & Data */}
        <section className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            <span>Reminders & Data</span>
          </h2>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Daily Shoulder & Movement Reminders</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Scheduled for 09:30 AM and 03:00 PM to encourage rotator cuff care and posture resets.
              </p>
            </div>
            <span className="text-xs font-extrabold text-amber-900 dark:text-amber-200 bg-amber-200/60 dark:bg-amber-900/60 px-3 py-1 rounded-full shrink-0">
              Active Schedule
            </span>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Reset app data</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Restore the app to its starting demo data. This clears activities you have logged.
              </p>
            </div>

            <button
              onClick={resetToSeedData}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/60 dark:hover:text-red-300 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset app data</span>
            </button>
          </div>

        </section>

      </div>

    </div>
  );
};
