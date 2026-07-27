import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Exercise } from '../types';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  ShieldCheck,
  Dumbbell,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';

interface GuidedWorkoutModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export const GuidedWorkoutModal: React.FC<GuidedWorkoutModalProps> = ({ exercise, onClose }) => {
  const { addActivity } = useApp();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (!exercise) return;
    setSecondsLeft(60);
    setCurrentStepIndex(0);
    setIsTimerRunning(false);
  }, [exercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsLeft]);

  if (!exercise) return null;

  const handleFinishWorkout = () => {
    addActivity({
      type: exercise.category === 'physio' ? 'physio' : exercise.category === 'cardio' ? 'wheeling' : 'strength',
      title: exercise.title,
      distanceKm: 0,
      durationMinutes: exercise.durationMinutes,
      feelRating: 'strong',
      notes: `Completed guided workout: ${exercise.title}`,
      energyBurnedEst: exercise.caloriesEst
    });
    onClose();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guided-workout-title"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto"
      >
        {/* Top Bar */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Guided Adaptive Player
            </span>
            <h2 id="guided-workout-title" className="text-lg sm:text-xl font-extrabold mt-1">
              {exercise.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Close guided player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Step Timer & Controls */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-center space-y-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Step Timer Cue
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-teal-600 dark:text-teal-400 tracking-tight font-mono">
              {formatTime(secondsLeft)}
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  isTimerRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
              </button>

              <button
                onClick={() => { setSecondsLeft(60); setIsTimerRunning(false); }}
                className="p-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                title="Reset timer"
                aria-label="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Step Guidance */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Instruction Step {currentStepIndex + 1} of {exercise.fullInstructions.length}</span>
              <span>{Math.round(((currentStepIndex + 1) / exercise.fullInstructions.length) * 100)}%</span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/80 text-slate-900 dark:text-teal-100 font-semibold text-sm leading-relaxed">
              {exercise.fullInstructions[currentStepIndex]}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex(prev => prev - 1)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>

              <button
                disabled={currentStepIndex === exercise.fullInstructions.length - 1}
                onClick={() => setCurrentStepIndex(prev => prev + 1)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Muscles & Equipment Specs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-500 dark:text-slate-400 block mb-1">Target Muscles</span>
              <span className="font-semibold text-slate-900 dark:text-white">{exercise.targetMuscles.join(', ')}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-500 dark:text-slate-400 block mb-1">Equipment</span>
              <span className="font-semibold text-slate-900 dark:text-white">{exercise.equipmentNeeded}</span>
            </div>
          </div>

          {/* Finish & Record Button */}
          <button
            onClick={handleFinishWorkout}
            className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-base shadow-lg shadow-teal-600/25 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Complete & Log {exercise.durationMinutes} min Workout</span>
          </button>

        </div>
      </motion.div>
    </div>
  );
};
