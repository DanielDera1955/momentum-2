import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { EXERCISE_LIBRARY } from '../data/seedData';
import { Exercise, ExerciseCategory } from '../types';
import { GuidedWorkoutModal } from './GuidedWorkoutModal';
import { SectionGuideBanner } from './SectionGuideBanner';
import { 
  Dumbbell, 
  Search, 
  Clock, 
  Flame, 
  ShieldCheck, 
  Play, 
  Plus, 
  CheckCircle2, 
  Sparkles,
  Filter
} from 'lucide-react';

export const ExerciseLibrary: React.FC = () => {
  const { addActivity, profile } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGuidedExercise, setActiveGuidedExercise] = useState<Exercise | null>(null);

  const filteredExercises = useMemo(() => {
    return EXERCISE_LIBRARY.filter(ex => {
      const matchesCategory = selectedCategory === 'all' || ex.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.targetMuscles.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleQuickLog = (ex: Exercise) => {
    addActivity({
      type: ex.category === 'physio' ? 'physio' : ex.category === 'cardio' ? 'wheeling' : 'strength',
      title: ex.title,
      distanceKm: 0,
      durationMinutes: ex.durationMinutes,
      feelRating: 'strong',
      notes: `Logged directly from Exercise Library: ${ex.title}`,
      energyBurnedEst: ex.caloriesEst
    });
  };

  const getCategoryBadgeClass = (cat: ExerciseCategory) => {
    switch (cat) {
      case 'cardio': return 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800';
      case 'strength': return 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800';
      case 'physio': return 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 border-teal-200 dark:border-teal-800';
      case 'mobility': return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      
      {/* Guided Player Modal Overlay */}
      <GuidedWorkoutModal 
        exercise={activeGuidedExercise} 
        onClose={() => setActiveGuidedExercise(null)} 
      />

      {/* Header & Description */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold border border-teal-200 dark:border-teal-800">
          <Dumbbell className="w-3.5 h-3.5" />
          <span>Curated for Wheelchair & Adaptive Movement</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Exercise Library
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
          Purpose-built exercises designed for upper-body conditioning, rotator cuff joint care, seated core stability, and wheelchair push efficiency.
        </p>
      </div>

      {/* Section Guide Banner */}
      <SectionGuideBanner
        title="Exercise Library Section Guide"
        badgeText="Workouts & Physio"
        whatItShows={[
          "Curated exercise cards categorized into Seated Cardio, Upper-Body Strength, Shoulder Physio, and Trunk Mobility",
          "Target muscle groups, duration estimates, required equipment, and difficulty levels for each exercise",
          "Suitability tags showing matching mobility profiles (Manual Wheelchair, Power Wheelchair, Limited Mobility, Physio Care)"
        ]}
        whatYouCanDo={[
          "Filter routines by category or search by target muscle (e.g. Deltoids, Rotator Cuff, Upper Back)",
          "Click 'Start Guided Session' to open an interactive step-by-step timer player with visual guides",
          "Click 'Quick Log' to instantly record a completed workout directly to your daily summary"
        ]}
      />

      {/* Filters & Search Bar */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by exercise name, muscle (e.g. Deltoids, Rotator Cuff)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All Exercises' },
            { id: 'cardio', label: 'Seated Cardio' },
            { id: 'strength', label: 'Upper-Body Strength' },
            { id: 'physio', label: 'Shoulder Physio' },
            { id: 'mobility', label: 'Trunk Mobility' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Exercise Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredExercises.map((ex) => (
          <div
            key={ex.id}
            className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              
              {/* Badges Bar */}
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(ex.category)}`}>
                  {ex.category}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {ex.durationMinutes} mins • {ex.caloriesEst} kcal
                </span>
              </div>

              {/* Title & Short Description */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {ex.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {ex.shortDescription}
                </p>
              </div>

              {/* Target Muscles Tags */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Muscles</span>
                <div className="flex flex-wrap gap-1.5">
                  {ex.targetMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {/* Equipment Needed */}
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                <strong className="text-slate-700 dark:text-slate-300">Equipment:</strong> {ex.equipmentNeeded}
              </p>

            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
              <button
                onClick={() => setActiveGuidedExercise(ex)}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Player</span>
              </button>

              <button
                onClick={() => handleQuickLog(ex)}
                className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                title="Log this workout directly to today's activity feed"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Log</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
