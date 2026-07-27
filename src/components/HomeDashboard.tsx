import React from 'react';
import { useApp } from '../context/AppContext';
import { DAILY_TIPS } from '../data/seedData';
import { SectionGuideBanner } from './SectionGuideBanner';
import { 
  Compass, 
  Clock, 
  Dumbbell, 
  Flame, 
  Plus, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Award,
  Zap,
  Trash2,
  ShieldCheck,
  Activity,
  Heart
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomeDashboard: React.FC = () => {
  const { 
    todayStats, 
    thisWeekStats, 
    goals, 
    streakDays, 
    activities, 
    profile,
    setIsLogModalOpen,
    setActiveTab,
    addActivity,
    deleteActivity,
    settings
  } = useApp();

  const isMiles = settings.distanceUnit === 'miles';
  const unitLabel = isMiles ? 'mi' : 'km';
  const convertDist = (km: number) => isMiles ? Number((km * 0.621371).toFixed(1)) : km;

  // Calculate percentages
  const weeklyDistGoalConverted = convertDist(goals.distanceKm);
  const weeklyDistCurrentConverted = convertDist(thisWeekStats.distanceKm);
  const distPercent = Math.min(100, Math.round((weeklyDistCurrentConverted / (weeklyDistGoalConverted || 1)) * 100));
  const minsPercent = Math.min(100, Math.round((thisWeekStats.activeMinutes / (goals.activeMinutes || 1)) * 100));
  const workoutsPercent = Math.min(100, Math.round((thisWeekStats.workoutsCount / (goals.workoutsCount || 1)) * 100));

  // Today's activities
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysActivities = activities.filter(a => a.timestamp.startsWith(todayStr));

  // Quick Preset Logger
  const handleQuickPreset = (title: string, type: 'wheeling' | 'physio' | 'strength' | 'swimming', dist: number, mins: number) => {
    addActivity({
      title,
      type,
      distanceKm: dist,
      durationMinutes: mins,
      feelRating: 'energized',
      notes: 'Logged via 1-tap quick preset.'
    });
  };

  const getProfileBadgeLabel = (type: string) => {
    switch (type) {
      case 'manual_wheelchair': return 'Manual Wheelchair Profile';
      case 'powered_wheelchair': return 'Power Wheelchair Profile';
      case 'limited_mobility': return 'Limited Mobility Profile';
      case 'physio_recovery': return 'Physio Recovery Profile';
      default: return 'Adaptive Profile';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      
      {/* Welcome Banner */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{getProfileBadgeLabel(profile.profileType)}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, <span className="text-teal-400">{profile.name}</span>!
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl font-medium">
              You are on an <span className="text-amber-400 font-bold">{streakDays}-day active streak</span>. Every push, pull, and stretch builds your momentum today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsLogModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Log Activity</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className="px-4 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <Dumbbell className="w-4 h-4 text-teal-400" />
              <span>Guided Workouts</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section Guide Banner */}
      <SectionGuideBanner
        title="Home Dashboard Section Guide"
        badgeText="Overview"
        whatItShows={[
          "Today's summary metrics: Roll distance, active minutes, workouts logged, and estimated calories burned",
          "Weekly progress gauges tracking progress toward your weekly distance and duration targets",
          "One-tap quick-log presets for instant activity recording (Outdoor Roll, Shoulder Physio, Seated Strength, Swim)",
          "Today's Activity Log timeline with options to review or remove entries",
          "Daily adaptive tip tailored for shoulder preservation and posture care"
        ]}
        whatYouCanDo={[
          "Click 'Log Activity' to launch the full activity recorder",
          "Use 1-tap quick presets to instantly record 1.5km rolls or 15m shoulder physio sessions",
          "Review active streak days and click to view your badges and history in Progress",
          "Explore recommended guided exercises in the Exercises library"
        ]}
      />

      {/* Today's Summary Stat Cards */}
      <section aria-labelledby="today-summary-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="today-summary-heading" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>Today's Summary</span>
          </h2>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          
          {/* Card 1: Roll Distance */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">Roll Distance</span>
              <div className="p-2 bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-xl">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {convertDist(todayStats.distanceKm)} <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{unitLabel}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Target: ~{(weeklyDistGoalConverted / 7).toFixed(1)} {unitLabel}/day
              </p>
            </div>
          </div>

          {/* Card 2: Active Minutes */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">Active Time</span>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {todayStats.activeMinutes} <span className="text-sm font-bold text-slate-500 dark:text-slate-400">min</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Pushes & upper-body work
              </p>
            </div>
          </div>

          {/* Card 3: Workouts Completed */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">Workouts</span>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {todayStats.workoutsCount} <span className="text-sm font-bold text-slate-500 dark:text-slate-400">session{todayStats.workoutsCount !== 1 ? 's' : ''}</span>
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {todayStats.workoutsCount > 0 ? 'Goal active today' : 'Ready to start'}
              </p>
            </div>
          </div>

          {/* Card 4: Active Streak */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">Active Streak</span>
              <div className="p-2 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-xl">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {streakDays} <span className="text-sm font-bold text-slate-500 dark:text-slate-400">days</span>
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">
                🔥 Personal Record Streak
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Weekly Goals Progress Rings */}
      <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6" aria-labelledby="weekly-goals-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 id="weekly-goals-heading" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Weekly Goal Progress</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Track your rolling, active minutes, and workout consistency for this week.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline self-start sm:self-auto"
          >
            Edit Weekly Targets →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Ring 1: Distance Goal */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-700 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-600 dark:text-teal-400 stroke-current transition-all duration-1000 ease-out"
                  strokeDasharray={`${distPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-extrabold text-sm text-slate-900 dark:text-white">
                {distPercent}%
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Roll Distance
              </span>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {weeklyDistCurrentConverted} / {weeklyDistGoalConverted} {unitLabel}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {distPercent >= 100 ? '🎉 Weekly Goal Reached!' : `${(weeklyDistGoalConverted - weeklyDistCurrentConverted).toFixed(1)} ${unitLabel} remaining`}
              </p>
            </div>
          </div>

          {/* Ring 2: Active Time Goal */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-700 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-600 dark:text-indigo-400 stroke-current transition-all duration-1000 ease-out"
                  strokeDasharray={`${minsPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-extrabold text-sm text-slate-900 dark:text-white">
                {minsPercent}%
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Minutes
              </span>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {thisWeekStats.activeMinutes} / {goals.activeMinutes} min
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {minsPercent >= 100 ? '🎉 Time Goal Reached!' : `${goals.activeMinutes - thisWeekStats.activeMinutes} min remaining`}
              </p>
            </div>
          </div>

          {/* Ring 3: Workouts Count Goal */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-700 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-600 dark:text-emerald-400 stroke-current transition-all duration-1000 ease-out"
                  strokeDasharray={`${workoutsPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-extrabold text-sm text-slate-900 dark:text-white">
                {workoutsPercent}%
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Weekly Sessions
              </span>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {thisWeekStats.workoutsCount} / {goals.workoutsCount} workouts
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {workoutsPercent >= 100 ? '🎉 Workouts Completed!' : `${goals.workoutsCount - thisWeekStats.workoutsCount} sessions remaining`}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Quick 1-Tap Log Presets Bar */}
      <section className="bg-slate-100 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            Quick 1-Tap Log Presets
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Tap to record instantly</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => handleQuickPreset('Quick 2km Outdoor Push', 'wheeling', 2.0, 18)}
            className="p-3 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/80 rounded-xl border border-slate-200 dark:border-slate-700 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <div className="text-xs font-bold text-slate-900 dark:text-white">+2.0 {unitLabel} Roll</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">18 min outdoor push</div>
          </button>

          <button
            onClick={() => handleQuickPreset('Shoulder Physio & Care', 'physio', 0, 15)}
            className="p-3 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/80 rounded-xl border border-slate-200 dark:border-slate-700 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <div className="text-xs font-bold text-slate-900 dark:text-white">+15 min Physio</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Rotator cuff care</div>
          </button>

          <button
            onClick={() => handleQuickPreset('Seated Upper Body Cardio', 'strength', 0, 20)}
            className="p-3 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/80 rounded-xl border border-slate-200 dark:border-slate-700 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <div className="text-xs font-bold text-slate-900 dark:text-white">+20 min Upper Body</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Shadow boxing & bands</div>
          </button>

          <button
            onClick={() => handleQuickPreset('Adaptive Swim Laps', 'swimming', 0.8, 30)}
            className="p-3 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/80 rounded-xl border border-slate-200 dark:border-slate-700 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <div className="text-xs font-bold text-slate-900 dark:text-white">+30 min Swim</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Water mobility workout</div>
          </button>
        </div>
      </section>

      {/* Two Column Layout: Today's Timeline + Adaptive Tip Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Today's Activity Stream (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>Today's Activity Feed</span>
            </h3>
            <button
              onClick={() => setIsLogModalOpen(true)}
              className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Manual Activity</span>
            </button>
          </div>

          {todaysActivities.length === 0 ? (
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-8 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 mx-auto flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">No activities logged yet today</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  Start your day with an outdoor push, seated workout, or shoulder physio stretch.
                </p>
              </div>
              <button
                onClick={() => setIsLogModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition-colors inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Log First Activity
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {todaysActivities.map((act) => (
                <div
                  key={act.id}
                  className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-sm flex items-center justify-between gap-4 transition-all hover:border-teal-300 dark:hover:border-teal-700"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="p-3 bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 rounded-2xl shrink-0">
                      {act.type === 'physio' ? <ShieldCheck className="w-5 h-5" /> : 
                       act.type === 'strength' ? <Dumbbell className="w-5 h-5" /> : 
                       act.type === 'swimming' ? <Heart className="w-5 h-5" /> : <Compass className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base truncate">
                        {act.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                        <span>{act.durationMinutes} mins</span>
                        {act.distanceKm > 0 && (
                          <>
                            <span>•</span>
                            <span className="font-semibold text-teal-700 dark:text-teal-300">
                              {convertDist(act.distanceKm)} {unitLabel}
                            </span>
                          </>
                        )}
                        {act.pushIntensity && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium capitalize">
                            {act.pushIntensity}
                          </span>
                        )}
                      </div>
                      {act.notes && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 italic mt-1.5 line-clamp-1">
                          "{act.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteActivity(act.id)}
                    className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Delete entry"
                    aria-label={`Delete ${act.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Adaptive Daily Tip & Quick Library (1 col) */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Adaptive Knowledge</span>
          </h3>

          <div className="bg-gradient-to-br from-amber-50 via-amber-100/50 to-orange-50 dark:from-amber-950/40 dark:via-slate-800 dark:to-slate-900 rounded-2xl p-5 border border-amber-200 dark:border-amber-900/60 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                {DAILY_TIPS[0].tag}
              </span>
              <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">Daily Tip</span>
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
              {DAILY_TIPS[0].title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {DAILY_TIPS[0].content}
            </p>
            <button
              onClick={() => setActiveTab('library')}
              className="text-xs font-bold text-amber-900 dark:text-amber-300 hover:underline flex items-center gap-1 pt-1"
            >
              Browse Exercise Library →
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center justify-between">
              <span>Recommended Exercises</span>
              <button
                onClick={() => setActiveTab('library')}
                className="text-xs text-teal-600 dark:text-teal-400 hover:underline"
              >
                View All
              </button>
            </h4>
            <div className="space-y-2">
              <div 
                onClick={() => setActiveTab('library')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Shoulder Guardian Rotations</span>
                  <span className="text-slate-500">12 mins • Physio Care</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div 
                onClick={() => setActiveTab('library')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Seated Shadow Boxing</span>
                  <span className="text-slate-500">15 mins • Seated Cardio</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
