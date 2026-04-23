import { useState, useEffect, useRef, useId, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from '@pavy/i18n';
import { CookieConsent } from '../../hooks/use-cookie-consent';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConsent: CookieConsent | null;
  onSave: (preferences: Partial<CookieConsent>) => void;
}

interface ModalContentProps {
  onClose: () => void;
  currentConsent: CookieConsent | null;
  onSave: (preferences: Partial<CookieConsent>) => void;
}

function ModalContent({ onClose, currentConsent, onSave }: ModalContentProps) {
  const { t } = useTranslation('site');
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Initialize directly from props — the parent remounts this component each
  // time the modal opens, so we do not need an effect to re-sync state.
  const [preferences, setPreferences] = useState({
    analytics: currentConsent?.analytics ?? false,
    marketing: currentConsent?.marketing ?? false,
  });

  const handleToggle = (key: 'analytics' | 'marketing') => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!dialogRef.current) return [];
    const selector =
      'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(dialogRef.current.querySelectorAll<HTMLElement>(selector));
  }, []);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      const focusables = getFocusableElements();
      focusables[0]?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = getFocusableElements();
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || !dialogRef.current?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(focusTimer);
      previouslyFocused?.focus?.();
    };
  }, [onClose, getFocusableElements]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <motion.div
        ref={dialogRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h2 id={titleId} className="text-2xl font-bold text-slate-900">
            {t('pages.legal.cookieModal.title')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={t('pages.legal.cookieModal.cancel')}
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Essential */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                {t('pages.legal.cookieModal.essential.title')}
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-500">
                  {t('pages.legal.cookieModal.essential.badge')}
                </span>
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {t('pages.legal.cookieModal.essential.description')}
              </p>
            </div>
            <div
              className="relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-not-allowed rounded-full bg-indigo-600"
              role="switch"
              aria-checked="true"
              aria-disabled="true"
              aria-label={t('pages.legal.cookieModal.essential.title')}
            >
              <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out" />
            </div>
          </div>

          {/* Analytics */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">{t('pages.legal.cookieModal.analytics.title')}</h3>
              <p className="text-sm text-slate-500 mt-1">
                {t('pages.legal.cookieModal.analytics.description')}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.analytics}
              aria-label={t('pages.legal.cookieModal.analytics.title')}
              onClick={() => handleToggle('analytics')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                preferences.analytics ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Marketing */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">{t('pages.legal.cookieModal.marketing.title')}</h3>
              <p className="text-sm text-slate-500 mt-1">
                {t('pages.legal.cookieModal.marketing.description')}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.marketing}
              aria-label={t('pages.legal.cookieModal.marketing.title')}
              onClick={() => handleToggle('marketing')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                preferences.marketing ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-full font-bold text-slate-600 hover:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {t('pages.legal.cookieModal.cancel')}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-8 py-3 rounded-full font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {t('pages.legal.cookieModal.save')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function CookiePreferencesModal({
  isOpen,
  onClose,
  currentConsent,
  onSave,
}: CookiePreferencesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalContent
          key="cookie-preferences-modal"
          onClose={onClose}
          currentConsent={currentConsent}
          onSave={onSave}
        />
      )}
    </AnimatePresence>
  );
}
