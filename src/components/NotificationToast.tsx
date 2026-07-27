import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NotificationToast: React.FC = () => {
  const { toastMessage, setToastMessage } = useApp();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          role="status"
          aria-live="polite"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-2xl rounded-2xl p-4 border border-slate-700/50 dark:border-slate-300/50 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/20 text-teal-400 dark:bg-teal-600/20 dark:text-teal-700 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium leading-snug">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-slate-400 hover:text-white dark:text-slate-500 dark:hover:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
