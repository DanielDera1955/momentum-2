import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MobilityProfileType } from '../types';
import { 
  Accessibility, 
  User, 
  Compass, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Dumbbell, 
  ShieldCheck, 
  Target,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const OnboardingFlowModal: React.FC = () => {
  const { 
    profile, 
    goals, 
    updateGoals, 
    updateSettings, 
    completeOnboarding, 
    settings 
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>(profile.name || '');
  const [mobilityType, setMobilityType] = useState<MobilityProfileType>(profile.profileType || 'manual_wheelchair');
  const [chairType, setChairType] = useState<string>(profile.chairType || '');
  const [mobilityNotes, setMobilityNotes] = useState<string>(profile.mobilityNotes || '');
  
  // Goal states
  const [weeklyDist, setWeeklyDist] = useState<number>(goals.distanceKm || 25);
  const [weeklyMins, setWeeklyMins] = useState<number>(goals.activeMinutes || 300);
  const [unit, setUnit] = useState<'km' | 'miles'>(settings.distanceUnit || 'km');

  const mobilityOptions: Array<{
    id: MobilityProfileType;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    suggestedChair: string;
  }> = [
    {
      id: 'manual_wheelchair',
      title: 'Manual Wheelchair Athlete',
      subtitle: 'Self-propelled / Pushing',
      description: 'Tracks roll distance, push cadence/intensity, hill inclines, and shoulder rotator cuff maintenance.',
      icon: '♿',
      suggestedChair: 'Manual Rigid Ultralight Chair'
    },
    {
      id: 'powered_wheelchair',
      title: 'Power Wheelchair User',
      subtitle: 'Electric Propulsion',
      description: 'Emphasizes upper body isometric holds, core stability, seated stretching, and adaptive swim laps.',
      icon: '⚡',
      suggestedChair: 'Permobil Power Mobility'
    },
    {
      id: 'limited_mobility',
      title: 'Limited Mobility & Prosthetics',
      subtitle: 'Walker, Crutches, or Canes',
      description: 'Designed for gentle gait pacing, leg & core strengthening, and joint balance routines.',
      icon: '🩼',
      suggestedChair: 'Prosthetic / Mobility Aid'
    },
    {
      id: 'physio_recovery',
      title: 'Physio & Rehabilitation Care',
      subtitle: 'Recovery & Rotator Cuff Care',
      description: 'Guided gentle physical therapy exercises, posture alignment, and shoulder pain prevention.',
      icon: '🏥',
      suggestedChair: 'Rehab / Physio Routine'
    }
  ];

  const handleFinish = () => {
    updateGoals({ distanceKm: weeklyDist, activeMinutes: weeklyMins });
    updateSettings({ distanceUnit: unit });
    completeOnboarding({
      name,
      profileType: mobilityType,
      mobilityNotes
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto"
      >
        
        {/* Onboarding Header */}
        <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/20 text-teal-400 rounded-2xl border border-teal-500/30">
              <Accessibility className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 text-[10px] font-bold uppercase tracking-wider border border-teal-800">
                <span>Adaptive Onboarding Step {step} of 3</span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight mt-0.5">
                {step === 1 && 'Welcome! Let’s set up your preferred name'}
                {step === 2 && 'Select your mobility profile'}
                {step === 3 && 'Customize your weekly fitness & distance goals'}
              </h2>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5">
          <div 
            className="bg-gradient-to-r from-teal-500 to-indigo-500 h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Step Contents */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: Name & Avatar */}
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  What is your preferred name?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Momentum uses your preferred name for personal greetings and achievement summaries.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Preferred Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson, Sam, Jordan"
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

            </motion.div>
          )}

          {/* STEP 2: Mobility profile selection */}
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Which mobility & equipment category best describes you?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This tailors workout metrics (push distance vs seated duration) and recommends safe shoulder physio exercises.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mobilityOptions.map((opt) => {
                  const isSelected = mobilityType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setMobilityType(opt.id);
                        setChairType(opt.suggestedChair);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all space-y-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        isSelected
                          ? 'bg-teal-50 dark:bg-teal-950/80 border-teal-600 dark:border-teal-400 text-slate-900 dark:text-white font-bold shadow-md'
                          : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{opt.icon}</span>
                        {isSelected && (
                          <span className="p-1 rounded-full bg-teal-600 text-white">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{opt.title}</h4>
                        <p className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">{opt.subtitle}</p>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Additional Notes */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Mobility Notes & Focus Areas (Optional)
                </label>
                <input
                  type="text"
                  value={mobilityNotes}
                  onChange={(e) => setMobilityNotes(e.target.value)}
                  placeholder="e.g. Rotator cuff protection, spinal cord injury level T6, posture maintenance"
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 3: Weekly Goals & Units */}
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Set Your Weekly Adaptive Fitness Targets
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Goals can be adjusted anytime. You will earn unlocked achievement badges as you progress!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Distance Goal */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-teal-600" />
                      <span>Weekly Distance</span>
                    </label>
                    <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400">
                      {weeklyDist} {unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={5}
                    value={weeklyDist}
                    onChange={(e) => setWeeklyDist(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>5 {unit} (Gentle)</span>
                    <span>25 {unit} (Moderate)</span>
                    <span>100 {unit} (Athlete)</span>
                  </div>
                </div>

                {/* Active Minutes Goal */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-indigo-600" />
                      <span>Weekly Active Minutes</span>
                    </label>
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                      {weeklyMins} mins
                    </span>
                  </div>
                  <input
                    type="range"
                    min={60}
                    max={600}
                    step={30}
                    value={weeklyMins}
                    onChange={(e) => setWeeklyMins(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>60 min (1h/wk)</span>
                    <span>300 min (5h/wk)</span>
                    <span>600 min (10h/wk)</span>
                  </div>
                </div>

              </div>

              {/* Distance Unit Preference */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Preferred Distance Unit</h4>
                  <p className="text-[11px] text-slate-500">Kilometers vs Miles</p>
                </div>
                <div className="flex bg-slate-200 dark:bg-slate-700 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setUnit('km')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      unit === 'km' ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-300 shadow-sm' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Kilometers (km)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('miles')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      unit === 'miles' ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-300 shadow-sm' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Miles (mi)
                  </button>
                </div>
              </div>

            </motion.div>
          )}

        </div>

        {/* Modal Controls Footer */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              disabled={step === 1 && !name.trim()}
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-teal-600 text-white font-extrabold text-xs shadow-md shadow-teal-600/25 flex items-center gap-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-teal-600/30 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enter Momentum App</span>
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
};
