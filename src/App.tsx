// Using translation utility with fallback system for stable, production-ready translations
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import LanguageSelect from './components/LanguageSelect';
import TranslationResult from './components/TranslationResult';
import { translateWithFallback } from './translateWithFallback';
import {
  prepareSpeechForTranslation,
  postprocessTranslationResult,
} from './translationProcessing';

const languageOptions = [
  { value: 'auto', label: 'Auto-detect' },
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ur', label: 'Urdu' },
  { value: 'bn', label: 'Bengali' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh-Hans', label: 'Chinese (Simplified)' },
  { value: 'zh-Hant', label: 'Chinese (Traditional)' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'pt-BR', label: 'Portuguese (Brazil)' },
  { value: 'ar', label: 'Arabic' },
  { value: 'ru', label: 'Russian' },
  { value: 'tr', label: 'Turkish' },
  { value: 'nl', label: 'Dutch' },
];

const MAX_CHARACTERS = 1000;

type TranslationStatus = 'idle' | 'translating' | 'done';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [text, setText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [translatedText, setTranslatedText] = useState('');
  const [status, setStatus] = useState<TranslationStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isInitiallyDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDarkMode(isInitiallyDark);
    updateTheme(isInitiallyDark);
  }, []);

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const handleToggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    updateTheme(newDarkMode);
  };

  const characterCount = text.length;
  const isTextTooLong = characterCount > MAX_CHARACTERS;
  const canTranslate = Boolean(text.trim()) && !isTextTooLong && status !== 'translating';

  const handleCopy = useCallback(async () => {
    if (!translatedText) return;

    try {
      await navigator.clipboard.writeText(translatedText);
      setCopyMessage('Copied to clipboard');
      window.setTimeout(() => setCopyMessage(''), 1800);
    } catch {
      setCopyMessage('Copy failed. Please try again.');
      window.setTimeout(() => setCopyMessage(''), 1800);
    }
  }, [translatedText]);

  const handleTranslate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setTranslatedText('');

    const trimmedText = text.trim();
    if (!trimmedText) {
      setErrorMessage('Please enter text to translate.');
      return;
    }

    if (sourceLanguage !== 'auto' && sourceLanguage === targetLanguage) {
      setErrorMessage('Please select different source and target languages.');
      return;
    }

    if (isTextTooLong) {
      setErrorMessage(`Text cannot exceed ${MAX_CHARACTERS} characters.`);
      return;
    }

    setStatus('translating');

    try {
      // Apply smart preprocessing (greeting detection, name protection)
      const { processedText, nameMap, replacements } = prepareSpeechForTranslation(
        trimmedText,
        sourceLanguage,
        targetLanguage
      );

      // If greetings were detected and replaced, use preprocessed text directly
      let translated: string;
      if (replacements.size > 0) {
        // Greetings were replaced - use those directly, translate the rest
        translated = await translateWithFallback(processedText, sourceLanguage, targetLanguage);
      } else {
        // No special greeting replacements - use normal translation
        translated = await translateWithFallback(processedText, sourceLanguage, targetLanguage);
      }

      // Apply smart post-processing (name restoration, translation corrections)
      const finalTranslation = postprocessTranslationResult(
        translated,
        nameMap,
        targetLanguage,
        sourceLanguage
      );

      setTranslatedText(finalTranslation);
      setStatus('done');
    } catch (err: any) {
      console.error('Translation failed:', err);
      setStatus('idle');
      setErrorMessage('Translation service temporarily unavailable. Please try again later.');
    }
  };

  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };

  const statusLabel = useMemo(() => {
    if (status === 'translating') return 'Translating...';
    if (translatedText) return 'Translation ready';
    return 'Awaiting your input';
  }, [status, translatedText]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navbar isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
      
      <div className="app-root-simple" id="translate">
        <motion.div
          className="card-simple"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="card-header-simple">
            <h1 className="card-title-simple">Language Translator</h1>
            <p className="card-subtitle-simple">Translate text instantly across multiple languages</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <form onSubmit={handleTranslate} className="card-body-simple">
                <label className="label-simple">Input text ({characterCount}/{MAX_CHARACTERS})</label>
                <textarea
                  className="textarea-simple"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={8}
                  placeholder="Type or paste text here..."
                  maxLength={MAX_CHARACTERS}
                />

                <div className="row-simple">
                  <div className="col-simple">
                    <LanguageSelect id="source" label="Source" value={sourceLanguage} options={languageOptions} onChange={setSourceLanguage} />
                  </div>
                  <div className="col-simple swap-col">
                    <motion.button
                      type="button"
                      className="swap-simple"
                      onClick={handleSwapLanguages}
                      whileHover={{ scale: 1.08, rotate: 180 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      ⇄
                    </motion.button>
                  </div>
                  <div className="col-simple">
                    <LanguageSelect id="target" label="Target" value={targetLanguage} options={languageOptions} onChange={setTargetLanguage} />
                  </div>
                </div>

                <div className="actions-simple">
                  <motion.button
                    type="submit"
                    className="btn-primary-simple"
                    disabled={!canTranslate}
                    whileHover={{ scale: canTranslate ? 1.05 : 1 }}
                    whileTap={{ scale: canTranslate ? 0.95 : 1 }}
                  >
                    <Send size={18} />
                    <span>{status === 'translating' ? 'Translating…' : 'Translate'}</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Output Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TranslationResult
                status={status}
                translatedText={translatedText}
                errorMessage={errorMessage}
                copyMessage={copyMessage}
                onCopy={handleCopy}
                statusLabel={statusLabel}
              />
            </motion.div>
          </div>

          {/* Character Count Warning */}
          {isTextTooLong && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 backdrop-blur-sm
                border border-amber-200/50 dark:border-amber-800/50
                text-amber-700 dark:text-amber-200
                text-sm font-medium"
            >
              ⚠️ Text exceeds the maximum character limit ({MAX_CHARACTERS} characters)
            </motion.div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default App;