import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@pavy/i18n';
import { useCookieConsent } from '../../hooks/use-cookie-consent';
import { useLocale } from '../../hooks/useLocale';
import CookiePreferencesModal from './CookiePreferencesModal';

export default function CookieBanner() {
  const { t } = useTranslation('site');
  const { hasConsented, acceptAll, rejectAll, savePreferences, consent } = useCookieConsent();
  const { localePath } = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showBanner = !hasConsented();

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            key="cookie-banner"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-6 md:p-8"
            role="region"
            aria-label={t('pages.legal.cookieBanner.title')}
          >
            <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 p-6 md:p-8 overflow-hidden relative">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" aria-hidden="true" />

              <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div
                  className="bg-indigo-600 p-4 rounded-2xl shrink-0 hidden md:block shadow-lg shadow-indigo-200"
                  aria-hidden="true"
                >
                  <Cookie className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center justify-center md:justify-start gap-2">
                    <Cookie className="w-5 h-5 text-indigo-600 md:hidden" aria-hidden="true" />
                    {t('pages.legal.cookieBanner.title')}
                  </h3>
                  <p className="text-slate-600 leading-relaxed max-w-2xl">
                    {t('pages.legal.cookieBanner.description')}
                    <Link
                      to={localePath('/legal/privacy')}
                      className="text-indigo-600 font-bold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm"
                    >
                      {t('pages.legal.cookieBanner.privacyPolicy')}
                    </Link>
                    {t('pages.legal.cookieBanner.forMoreDetails')}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    {t('pages.legal.cookieBanner.manage')}
                  </button>
                  <button
                    type="button"
                    onClick={rejectAll}
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    {t('pages.legal.cookieBanner.rejectAll')}
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="w-full sm:w-auto px-8 py-3 rounded-full text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  >
                    {t('pages.legal.cookieBanner.acceptAll')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookiePreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentConsent={consent}
        onSave={savePreferences}
      />
    </>
  );
}
