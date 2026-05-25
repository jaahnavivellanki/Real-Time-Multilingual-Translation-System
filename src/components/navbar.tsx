import React from 'react';
import { Languages } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, onToggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm transition duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white font-bold shadow-lg shadow-violet-500/30 group-hover:shadow-xl group-hover:shadow-violet-500/40 transition-all duration-300 group-hover:scale-105">
            <Languages size={24} />
          </div>
          <div className="hidden sm:block space-y-0">
            <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-300">
              LangFlow
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Instant Translation
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a
            href="#translate"
            className="text-slate-600 dark:text-slate-300 transition-colors duration-300 hover:text-violet-600 dark:hover:text-violet-400 relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#features"
            className="text-slate-600 dark:text-slate-300 transition-colors duration-300 hover:text-violet-600 dark:hover:text-violet-400 relative group"
          >
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 group-hover:w-full transition-all duration-300" />
          </a>
        </nav>

        {/* Theme Toggle */}
        <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
      </div>
    </header>
  );
};

export default Navbar;
