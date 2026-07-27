import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ActivityType, PushIntensity, TerrainType, FeelRating } from '../types';
import { 
  X, 
  Compass, 
  Dumbbell, 
  ShieldCheck, 
  Heart, 
  Activity as ActivityIcon, 
  Check, 
  Plus, 
  Minus,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LogActivityModal: React.FC = () => {
  const { 
    isLogModalOpen, 
    setIsLogModalOpen, 
    addActivity, 
    settings 
  } = useApp();

  const isMiles = settings.distanceUnit === 'miles';
  const unitLabel = isMiles ? 'mi' : 'km';

  // Form State
  const [type, setType] = useState<ActivityType>('wheeling');
  const [title, setTitle] = useState('Morning Outdoor Roll');
  const [distance, setDistance] = useState<number>(3.5);
  const [duration, setDuration] = useState<number>(30);
  const [pushIntensity, setPushIntensity] = useState<PushIntensity>('moderate');
  const [terrain, setTerrain] = useState<TerrainType>('paved');
  const [feelRating, setFeelRating] = useState<FeelRating>('energized');
  const [notes, setNotes] = useState('');

  if (!isLogModalOpen) return null;

  const handleTypeChange = (newType: ActivityType) => {
    setType(newType);
    if (newType === 'wheeling') {
      setTitle('Outdoor Roll & Push Session');
      setDistance(3.5);
      setDuration(30);
    } else if (newType === 'strength') {
      setTitle('Seated Upper Body Resistance');
      setDistance(0);
      setDuration(25);
    } else if (newType === 'physio') {
      setTitle('Shoulder Care & Posture Physio');
      setDistance(0);
      setDuration(20);
    } else if (newType === 'swimming') {
      setTitle('Adaptive Swimming Laps');
      setDistance(1.0);
      setDuration(40);
    } else if (newType === 'handcycling') {
      setTitle('Handcycling Trail Ride');
      setDistance(6.0);
      setDuration(45);
    }
  };

  const adjustDistance = (delta: number) => {
    setDistance(prev => Math.max(0, Number((prev + delta).toFixed(1))));
  };

  const adjustDuration = (delta: number) => {
    setDuration(prev => Math.max(5, prev + delta));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert miles back to km for canonical store if in miles mode
    const finalDistanceKm = isMiles ? Number((distance / 0.621371).toFixed(1)) : distance;

    addActivity({
      type,
      title: title || 'Adaptive Workout',
      distanceKm: finalDistanceKm,
      durationMinutes: duration,
      pushIntensity: type === 'wheeling' || type === 'handcycling' ? pushIntensity : undefined,
      terrain,
      feelRating,
      notes,
    });

    setIsLogModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="log-activity-title"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-teal-500/20 text-teal-400 rounded-2xl border border-teal-500/30">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 id="log-activity-title" className="text-lg sm:text-xl font-extrabold tracking-tight">
                  Log Activity
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Track your pushes, seated exercises, and mobility work
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsLogModalOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* 1. Activity Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                1. Select Activity Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'wheeling', label: 'Wheeling / Push', icon: Compass },
                  { id: 'strength', label: 'Seated Strength', icon: Dumbbell },
                  { id: 'physio', label: 'Shoulder Physio', icon: ShieldCheck },
                  { id: 'swimming', label: 'Adaptive Swim', icon: Heart },
                  { id: 'handcycling', label: 'Handcycling', icon: ActivityIcon },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = type === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTypeChange(item.id as ActivityType)}
                      className={`flex items-center gap-2 p-3 rounded-2xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        isSelected
                          ? 'bg-teal-50 dark:bg-teal-950/80 border-teal-600 dark:border-teal-400 text-teal-900 dark:text-teal-200 font-bold shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500'}`} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Title & Preset Name */}
            <div className="space-y-2">
              <label htmlFor="activity-title-input" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                2. Activity Name
              </label>
              <input
                id="activity-title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Morning Park Push, Resistance Bands"
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* 3. Distance & Duration Fast Steppers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Distance Stepper (If applicable or allowed) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Distance ({unitLabel})
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => adjustDistance(-0.5)}
                    className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    aria-label="Decrease distance"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 text-center py-2.5 bg-slate-50 dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 font-extrabold text-lg text-slate-900 dark:text-white">
                    {distance} <span className="text-xs font-normal text-slate-500">{unitLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => adjustDistance(0.5)}
                    className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    aria-label="Increase distance"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-1.5 pt-1">
                  {[0, 1.5, 3.0, 5.0].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDistance(d)}
                      className={`flex-1 py-1 text-xs font-semibold rounded-lg border ${
                        distance === d 
                          ? 'bg-teal-600 text-white border-teal-600' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {d}{unitLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Stepper */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Duration (mins)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => adjustDuration(-5)}
                    className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    aria-label="Decrease duration"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 text-center py-2.5 bg-slate-50 dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 font-extrabold text-lg text-slate-900 dark:text-white">
                    {duration} <span className="text-xs font-normal text-slate-500">min</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => adjustDuration(5)}
                    className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    aria-label="Increase duration"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-1.5 pt-1">
                  {[15, 30, 45, 60].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDuration(m)}
                      className={`flex-1 py-1 text-xs font-semibold rounded-lg border ${
                        duration === m 
                          ? 'bg-teal-600 text-white border-teal-600' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* 4. Push Intensity (For wheeling/handcycling) */}
            {(type === 'wheeling' || type === 'handcycling') && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Push Cadence & Intensity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'light', label: 'Light Push', desc: 'Gentle cadence' },
                    { id: 'moderate', label: 'Moderate', desc: 'Steady endurance' },
                    { id: 'vigorous', label: 'Vigorous', desc: 'Sprints & inclines' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPushIntensity(item.id as PushIntensity)}
                      className={`p-2.5 rounded-2xl border text-center transition-all ${
                        pushIntensity === item.id
                          ? 'bg-teal-600 text-white border-teal-600 font-bold'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Terrain Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Terrain / Environment
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'paved', label: 'Paved Asphalt' },
                  { id: 'track', label: 'Track / Field' },
                  { id: 'indoor', label: 'Indoor Gym/Home' },
                  { id: 'incline', label: 'Hills & Inclines' },
                  { id: 'water', label: 'Pool / Water' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTerrain(item.id as TerrainType)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                      terrain === item.id
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold border-transparent'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Feel Rating */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                How did this session feel?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'energized', label: '😊 Energized' },
                  { id: 'relaxed', label: '💆 Relaxed' },
                  { id: 'strong', label: '💪 Strong' },
                  { id: 'challenged', label: '⚡ Challenged' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFeelRating(item.id as FeelRating)}
                    className={`p-2 rounded-xl border text-center text-xs font-semibold transition-all ${
                      feelRating === item.id
                        ? 'bg-teal-50 dark:bg-teal-950 border-teal-500 text-teal-800 dark:text-teal-200 font-bold'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 7. Quick Notes */}
            <div className="space-y-2">
              <label htmlFor="activity-notes" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Notes / Shoulder feel (Optional)
              </label>
              <textarea
                id="activity-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Shoulder felt great, smooth push cadence..."
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-extrabold text-base shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:scale-98"
            >
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>Record Activity & Celebration</span>
            </button>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
