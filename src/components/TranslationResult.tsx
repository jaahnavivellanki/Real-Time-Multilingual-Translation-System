import React from 'react';
import { Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TranslationResultProps = {
  status: 'idle' | 'translating' | 'done';
  translatedText: string;
  errorMessage: string;
  copyMessage: string;
  onCopy: () => void;
  statusLabel: string;
};

const TranslationResult: React.FC<TranslationResultProps> = ({
  status,
  translatedText,
  errorMessage,
  copyMessage,
  onCopy,
  statusLabel,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
        border border-white/30 dark:border-white/10
        p-6 sm:p-8
        shadow-xl shadow-slate-900/10 dark:shadow-slate-900/20
        transition-all duration-300
        hover:shadow-2xl hover:shadow-violet-500/10 dark:hover:shadow-violet-500/20"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Translated Output
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-300">
            Translation Preview
          </h2>
        </div>
        <motion.div
          key={statusLabel}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-full bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm
            px-4 py-2 border border-slate-200/50 dark:border-slate-700/50
            text-xs font-semibold uppercase tracking-[0.08em]
            text-slate-600 dark:text-slate-300
            w-fit"
        >
          {statusLabel}
        </motion.div>
      </div>

      {/* Content Section */}
      <motion.div
        className="min-h-[240px] rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-sm
          border border-slate-200/50 dark:border-slate-700/50
          p-6 sm:p-8 text-slate-900 dark:text-slate-100
          transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence mode="wait">
          {status === 'translating' ? (
            // Loading State
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex h-full flex-col items-center justify-center gap-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="h-16 w-16 rounded-full border-2 border-slate-200 dark:border-slate-700"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 dark:border-t-violet-400"
                />
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Translating your content...
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Please wait a moment
                </p>
              </div>
            </motion.div>
          ) : errorMessage ? (
            // Error State
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex h-full flex-col items-center justify-center gap-4
                rounded-xl bg-red-50/80 dark:bg-red-950/30 backdrop-blur-sm
                p-6 text-red-700 dark:text-red-200
                border border-red-200/50 dark:border-red-800/50"
            >
              <AlertCircle size={32} className="text-red-500 dark:text-red-400" />
              <div className="text-center">
                <p className="text-base font-semibold mb-2">Translation Failed</p>
                <p className="text-sm leading-relaxed max-w-md">{errorMessage}</p>
              </div>
            </motion.div>
          ) : translatedText ? (
            // Success State
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-full flex-col justify-between gap-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="max-h-[280px] overflow-y-auto pr-3 text-base leading-relaxed font-medium"
              >
                <p className="whitespace-pre-wrap">{translatedText}</p>
              </motion.div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                <motion.button
                  type="button"
                  onClick={onCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2
                    rounded-xl font-semibold text-white text-sm
                    bg-gradient-to-r from-violet-600 to-cyan-500
                    hover:from-violet-700 hover:to-cyan-600
                    shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30
                    px-6 py-3
                    transition-all duration-300
                    w-full sm:w-auto"
                >
                  <Copy size={18} />
                  <span>Copy Translation</span>
                </motion.button>
                <AnimatePresence mode="wait">
                  {copyMessage && (
                    <motion.p
                      key="copy-message"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400"
                    >
                      <CheckCircle2 size={16} className="text-green-500" />
                      {copyMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            // Empty State
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex h-full flex-col items-center justify-center gap-4 text-center"
            >
              <div className="rounded-2xl bg-slate-100/80 dark:bg-slate-700/50 p-4">
                <p className="text-5xl">✨</p>
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  Ready to translate
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Enter text and click translate to get started
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default TranslationResult;
