import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MobilityProfileType } from '../types';
import { SectionGuideBanner } from './SectionGuideBanner';
import { 
  User, 
  Accessibility, 
  Check, 
  Target, 
  Compass, 
  Clock, 
  Dumbbell, 
  Sparkles,
  ShieldCheck,
  Save
} from 'lucide-react';

export const OnboardingProfileView: React.FC = () => {
  const { profile, goals, updateProfile, updateGoals, settings } = useApp();

  const isMiles = settings.distanceUnit === 'miles';
  const unitLabel = isMiles ? 'mi' : 'km';
  const convertDist = (km: number) => isMiles ? Number((km * 0.621371).toFixed(1)) : km;

  // Form states
  const [name, setName] = useState(profile.name);
  const [profileType, setProfileType] = useState<MobilityProfileType>(profile.profileType);
  const [chairType, setChairType] = useState(profile.chairType || '');
  const [mobilityNotes, setMobilityNotes] = useState(profile.mobilityNotes || '');

  // Goals
  const [weeklyDistance, setWeeklyDistance] = useState<number>(convertDist(goals.distanceKm));
  const [weeklyActiveMins, setWeeklyActiveMins] = useState<number>(goals.activeMinutes);
  const [weeklyWorkouts, setWeeklyWorkouts] = useState<number>(goals.workoutsCount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile({
      name,
      profileType,
      chairType,
      mobilityNotes,
    });

    const finalDistanceKm = isMiles ? Number((weeklyDistance / 0.621371).toFixed(1)) : weeklyDistance;

    updateGoals({
      distanceKm: finalDistanceKm,
      activeMinutes: weeklyActiveMins,
      workoutsCount: weeklyWorkouts,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold border border-teal-200 dark:border-teal-800">
          <User className="w-3.5 h-3.5" />
          <span>Profile & Adaptive Targets</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Personal Profile & Weekly Goals
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
          Customize your mobility profile, wheelchair specifications, and set tailored weekly targets that match your movement style.
        </p>
      </div>

      {/* Section Guide Banner */}
      <SectionGuideBanner
        title="Profile & Goals Section Guide"
        badgeText="User Profile"
        whatItShows={[
          "Your preferred display name and wheelchair/equipment model specifications",
          "Selected primary mobility category (Manual Wheelchair, Power Wheelchair, Limited Mobility, Physio Recovery)",
          "Personal movement focus and shoulder protection notes",
          "Target weekly fitness goals (rolling distance, active minutes, session count)"
        ]}
        whatYouCanDo={[
          "Update your preferred name and equipment specs anytime",
          "Change your primary movement profile to recalibrate recommended workouts",
          "Adjust your weekly fitness target sliders (distance and active duration)",
          "Save changes to update your progress dashboard immediately"
        ]}
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: User Profile & Mobility Setup */}
        <section className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>1. Mobility Profile Setup</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-2">
              <label htmlFor="user-name-input" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Your Preferred Name
              </label>
              <input
                id="user-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="chair-type-input" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Wheelchair / Equipment Model (Optional)
              </label>
              <input
                id="chair-type-input"
                type="text"
                value={chairType}
                onChange={(e) => setChairType(e.target.value)}
                placeholder="e.g. TiLite Aero Z, Quickie GP, Permobil M3"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

          </div>

          {/* Profile Type Selector Cards */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Select Your Primary Movement Profile
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { 
                  id: 'manual_wheelchair', 
                  title: 'Manual Wheelchair User', 
                  desc: 'Propulsion rolling distance, push cadence, shoulder protection & upper-body endurance.' 
                },
                { 
                  id: 'powered_wheelchair', 
                  title: 'Power Wheelchair User', 
                  desc: 'Seated cardio, posture alignment, active upper-body strength & resistance bands.' 
                },
                { 
                  id: 'limited_mobility', 
                  title: 'Limited Mobility / Ambulatory', 
                  desc: 'Adapted balance, upper-body conditioning, seated twists, and swimming.' 
                },
                { 
                  id: 'physio_recovery', 
                  title: 'Physio & Joint Recovery', 
                  desc: 'Gentle rotator cuff care, stretching, range of motion, and posture stabilization.' 
                },
              ].map((p) => {
                const isSelected = profileType === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setProfileType(p.id as MobilityProfileType)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-teal-50 dark:bg-teal-950/80 border-teal-600 dark:border-teal-400 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={`font-bold text-sm ${isSelected ? 'text-teal-900 dark:text-teal-200' : 'text-slate-900 dark:text-white'}`}>
                        {p.title}
                      </h3>
                      {isSelected && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="mobility-notes-input" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Personal Movement & Shoulder Notes
            </label>
            <textarea
              id="mobility-notes-input"
              rows={2}
              value={mobilityNotes}
              onChange={(e) => setMobilityNotes(e.target.value)}
              placeholder="e.g. Focus on shoulder stability, prevent neck stiffness, enjoy outdoor trails..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

        </section>

        {/* Section 2: Weekly Targets */}
        <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>2. Weekly Fitness Goals</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* Target 1: Weekly Roll Distance */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-teal-600" />
                Roll Distance ({unitLabel})
              </span>
              <input
                type="number"
                step="1"
                min="0"
                value={weeklyDistance}
                onChange={(e) => setWeeklyDistance(Number(e.target.value))}
                required
                className="w-full text-2xl font-extrabold text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-slate-600 py-1 focus:outline-none focus:border-teal-500"
              />
              <p className="text-[11px] text-slate-500">
                Recommended: 15–30 {unitLabel}/week
              </p>
            </div>

            {/* Target 2: Weekly Active Minutes */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                Active Minutes
              </span>
              <input
                type="number"
                step="15"
                min="30"
                value={weeklyActiveMins}
                onChange={(e) => setWeeklyActiveMins(Number(e.target.value))}
                required
                className="w-full text-2xl font-extrabold text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-slate-600 py-1 focus:outline-none focus:border-teal-500"
              />
              <p className="text-[11px] text-slate-500">
                Recommended: 150–250 min/week
              </p>
            </div>

            {/* Target 3: Weekly Workouts */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4 text-emerald-600" />
                Workouts / Sessions
              </span>
              <input
                type="number"
                step="1"
                min="1"
                max="14"
                value={weeklyWorkouts}
                onChange={(e) => setWeeklyWorkouts(Number(e.target.value))}
                required
                className="w-full text-2xl font-extrabold text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-slate-600 py-1 focus:outline-none focus:border-teal-500"
              />
              <p className="text-[11px] text-slate-500">
                Recommended: 3–6 sessions/week
              </p>
            </div>

          </div>
        </section>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-extrabold text-base shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <Save className="w-5 h-5" />
          <span>Save Profile & Apply Targets</span>
        </button>

      </form>

    </div>
  );
};
