import React from 'react';
import { motion } from 'framer-motion';

type LanguageOption = {
  value: string;
  label: string;
};

interface LanguageSelectorProps {
  id: string;
  label: string;
  value: string;
  options: LanguageOption[];
  onChange: (value: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ id, label, value, options, onChange }) => {
  return (
    <motion.label
      className="block text-left"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2 block uppercase tracking-[0.05em]">
        {label}
      </span>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full px-4 py-3 rounded-xl appearance-none cursor-pointer
            bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm
            border border-slate-200/50 dark:border-slate-700/50
            text-slate-900 dark:text-slate-100
            font-medium
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-violet-500/50
            focus:border-violet-400 dark:focus:border-violet-500
            focus:shadow-lg
            hover:border-slate-300 dark:hover:border-slate-600
            pr-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23667eea' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundPosition: 'right 0.75rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem',
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </motion.label>
  );
};

export default LanguageSelector;
