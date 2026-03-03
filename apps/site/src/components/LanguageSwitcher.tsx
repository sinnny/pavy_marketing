import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLocale, type SupportedLanguage } from '../hooks/useLocale';

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
};

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { currentLanguage, changeLanguage, supportedLanguages } = useLocale();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-slate-500 hover:text-brand-primary transition-colors duration-300 p-2 rounded-xl hover:bg-slate-50"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-[11px] uppercase tracking-[0.1em] font-bold">
          {currentLanguage}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-2 min-w-[140px] z-50"
          >
            {supportedLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  lang === currentLanguage
                    ? 'bg-indigo-50 text-brand-primary font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-brand-primary'
                }`}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
