import React, { useState } from 'react';
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

export default function CookiePreferencesModal({
  isOpen,
  onClose,
  currentConsent,
  onSave,
}: CookiePreferencesModalProps) {
  const { t } = useTranslation('site');
  const [preferences, setPreferences] = useState({
    analytics: currentConsent?.analytics ?? true,
    marketing: currentConsent?.marketing ?? true,
  });

  const handleToggle = (key: 'analytics' | 'marketing') => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">{t('pages.legal.cookieModal.title')}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
              >
                <X className="w-6 h-6" />
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
                <div className="relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-not-allowed rounded-full bg-indigo-600">
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
                  onClick={() => handleToggle('analytics')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
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
                  onClick={() => handleToggle('marketing')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
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
                onClick={onClose}
                className="px-6 py-3 rounded-full font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                {t('pages.legal.cookieModal.cancel')}
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 rounded-full font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
              >
                {t('pages.legal.cookieModal.save')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
