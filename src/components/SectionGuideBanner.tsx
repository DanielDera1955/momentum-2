import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Info, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SectionGuideProps {
  title: string;
  badgeText: string;
  whatItShows: string[];
  whatYouCanDo: string[];
}

export const SectionGuideBanner: React.FC<SectionGuideProps> = ({
  title,
  badgeText,
  whatItShows,
  whatYouCanDo
}) => {
  const { showSectionGuides } = useApp();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  if (!showSectionGuides) return null;

  return (
    <div className="bg-gradient-to-r from-teal-900/10 via-indigo-900/10 to-slate-900/10 dark:from-teal-950/40 dark:via-indigo-950/40 dark:to-slate-900/40 border border-teal-500/20 dark:border-teal-500/30 rounded-3xl p-4 sm:p-5 shadow-sm transition-all mb-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/20">
            <Info className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                {title}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/80 dark:text-teal-300 text-[10px] font-extrabold uppercase tracking-wider border border-teal-200 dark:border-teal-800">
                {badgeText}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium hidden sm:block">
              Section Explanation & Functionality Guide
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-bold"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Hide Guide' : 'Show Guide'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mt-3 border-t border-teal-500/15">
              
              {/* What It Shows */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>What This Section Shows</span>
                </h4>
                <ul className="space-y-1.5">
                  {whatItShows.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What You Can Do */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>What You Can Do Here</span>
                </h4>
                <ul className="space-y-1.5">
                  {whatYouCanDo.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
