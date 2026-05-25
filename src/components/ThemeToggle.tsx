import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label="Toggle dark mode"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full 
        bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
        border border-slate-200/50 dark:border-slate-700/50
        text-slate-700 dark:text-slate-200
        shadow-md shadow-slate-900/5 dark:shadow-slate-900/20
        transition-all duration-300
        hover:border-violet-400 dark:hover:border-violet-500
        hover:shadow-lg hover:shadow-violet-500/10
        focus:outline-none focus:ring-2 focus:ring-violet-500/50"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? (
          <Moon size={20} className="text-violet-400" />
        ) : (
          <Sun size={20} className="text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
