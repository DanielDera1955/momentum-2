import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SectionGuideBanner } from './SectionGuideBanner';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Award, 
  Flame, 
  Calendar, 
  Download, 
  CheckCircle2, 
  Lock, 
  Share2,
  Compass,
  Clock,
  ShieldCheck,
  Dumbbell
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { 
    past14DaysSummary, 
    thisWeekStats, 
    goals, 
    badges, 
    streakDays, 
    activities,
    settings,
    setToastMessage
  } = useApp();

  const isMiles = settings.distanceUnit === 'miles';
  const unitLabel = isMiles ? 'mi' : 'km';
  const convertDist = (km: number) => isMiles ? Number((km * 0.621371).toFixed(1)) : km;

  // Format data for Recharts
  const chartData = past14DaysSummary.map(d => ({
    dayLabel: d.dayLabel,
    Distance: convertDist(d.distanceKm),
    ActiveMins: d.activeMinutes,
    Workouts: d.workoutsCount
  }));

  // Total rolling distance in past 14 days
  const total14DayDistance = past14DaysSummary.reduce((acc, d) => acc + convertDist(d.distanceKm), 0);
  const total14DayMinutes = past14DaysSummary.reduce((acc, d) => acc + d.activeMinutes, 0);

  // Activity breakdown distribution
  const activityTypeCounts = activities.reduce((acc, act) => {
    acc[act.type] = (acc[act.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = [
    { name: 'Wheeling/Rolling', value: activityTypeCounts['wheeling'] || 0, color: '#0d9488' },
    { name: 'Seated Strength', value: activityTypeCounts['strength'] || 0, color: '#6366f1' },
    { name: 'Shoulder Physio', value: activityTypeCounts['physio'] || 0, color: '#10b981' },
    { name: 'Adaptive Swimming', value: activityTypeCounts['swimming'] || 0, color: '#0284c7' },
    { name: 'Handcycling', value: activityTypeCounts['handcycling'] || 0, color: '#f59e0b' },
  ].filter(item => item.value > 0);

  const handleShareSummary = () => {
    const summaryText = `🏃 Momentum Adaptive Fitness Summary:\n` +
      `• Active Streak: ${streakDays} Days\n` +
      `• 14-Day Roll Distance: ${total14DayDistance.toFixed(1)} ${unitLabel}\n` +
      `• 14-Day Active Minutes: ${total14DayMinutes} mins\n` +
      `• Badges Unlocked: ${badges.filter(b => b.isUnlocked).length}/${badges.length}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setToastMessage('Progress summary copied to clipboard!');
    } else {
      setToastMessage('Summary generated!');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold border border-teal-200 dark:border-teal-800">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Accessible Analytics & Milestones</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Progress & Achievements
          </h1>
        </div>

        <button
          onClick={handleShareSummary}
          className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <Share2 className="w-4 h-4" />
          <span>Export Summary Report</span>
        </button>
      </div>

      {/* Section Guide Banner */}
      <SectionGuideBanner
        title="Progress & Achievements Section Guide"
        badgeText="Analytics & Badges"
        whatItShows={[
          "14-Day Distance & Active Duration Bar and Area charts showing your daily roll trends",
          "Workout category distribution (Wheeling vs Seated Strength vs Shoulder Physio vs Swim)",
          "Unlocked and locked achievement badges with real-time percentage progress bars",
          "Total rolling mileage and active movement minutes accumulated over time"
        ]}
        whatYouCanDo={[
          "Export or copy a text summary report of your fitness progress for physicians or coaches",
          "Track progress towards distance milestones (10km Roll, 100km Master, 500 Active Mins)",
          "Hover over chart bars to view precise day-by-day metrics"
        ]}
      />

      {/* CHART 1: Roll Distance Over Past 14 Days */}
      <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>Rolling Distance Trend (14 Days)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Daily distance pushed in {unitLabel}
            </p>
          </div>
          <div className="text-xs font-semibold bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-200 px-3 py-1.5 rounded-xl border border-teal-200 dark:border-teal-800">
            Total 14-Day Roll: <strong>{total14DayDistance.toFixed(1)} {unitLabel}</strong>
          </div>
        </div>

        {/* Chart + Text Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          {/* Recharts Bar Container (2 cols) */}
          <div className="lg:col-span-2 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#334155', 
                    borderRadius: '12px', 
                    color: '#fff',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="Distance" fill="#0d9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Accessible Text Summary (1 col) - Non-Visual Readability */}
          <div className="bg-slate-50 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Readable Text Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Over the past 14 days, you recorded a cumulative rolling distance of <strong>{total14DayDistance.toFixed(1)} {unitLabel}</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Your peak rolling day was <strong>{chartData.reduce((max, d) => d.Distance > max.Distance ? d : max, chartData[0])?.dayLabel}</strong> with <strong>{Math.max(...chartData.map(d => d.Distance))} {unitLabel}</strong> pushed.
            </p>
          </div>

        </div>
      </section>

      {/* CHART 2: Active Minutes Trend */}
      <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Active Minutes Trend</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Total minutes active per day (wheel, strength, physio, swim)
            </p>
          </div>
          <div className="text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800">
            14-Day Active Time: <strong>{total14DayMinutes} mins</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          <div className="lg:col-span-2 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#334155', 
                    borderRadius: '12px', 
                    color: '#fff',
                    fontSize: '12px'
                  }} 
                />
                <Area type="monotone" dataKey="ActiveMins" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#activeGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Readable Text Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              You averaged <strong>{Math.round(total14DayMinutes / 14)} active minutes per day</strong> over the past two weeks.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Your weekly target is <strong>{goals.activeMinutes} minutes</strong>. This week you are currently at <strong>{thisWeekStats.activeMinutes} minutes</strong> ({Math.min(100, Math.round((thisWeekStats.activeMinutes / goals.activeMinutes) * 100))}% of goal).
            </p>
          </div>

        </div>
      </section>

      {/* Milestone Badges Shelf */}
      <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Milestone Badges Shelf</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Earn badges for rolling milestones, active streaks, and shoulder care consistency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all ${
                badge.isUnlocked
                  ? 'bg-amber-50/60 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/80'
                  : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${badge.isUnlocked ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                  <Award className="w-5 h-5" />
                </div>
                {badge.isUnlocked ? (
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-900/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked ({badge.progressPercent}%)
                  </span>
                )}
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-sm mt-3">
                {badge.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                {badge.description}
              </p>

              {!badge.isUnlocked && (
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full" style={{ width: `${badge.progressPercent}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
