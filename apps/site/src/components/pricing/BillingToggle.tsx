import type { KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@pavy/i18n';

interface BillingToggleProps {
  interval: 'monthly' | 'annual';
  onChange: (interval: 'monthly' | 'annual') => void;
}

export default function BillingToggle({ interval, onChange }: BillingToggleProps) {
  const { t } = useTranslation('site');

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      onChange('monthly');
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      onChange('annual');
    }
  };

  return (
    <div className="flex items-center justify-center mt-10 mb-16">
      <div
        className="relative flex items-center p-1 bg-slate-100 rounded-full border border-slate-200"
        role="radiogroup"
        aria-label={t('pages.pricing.toggle.aria_label')}
      >
        <button
          type="button"
          role="radio"
          aria-checked={interval === 'monthly'}
          tabIndex={interval === 'monthly' ? 0 : -1}
          onClick={() => onChange('monthly')}
          onKeyDown={handleKeyDown}
          className={`relative z-10 px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            interval === 'monthly' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('pages.pricing.toggle.monthly')}
          {interval === 'monthly' && (
            <motion.div
              layoutId="toggleBackground"
              className="absolute inset-0 bg-brand-primary rounded-full -z-10"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={interval === 'annual'}
          tabIndex={interval === 'annual' ? 0 : -1}
          onClick={() => onChange('annual')}
          onKeyDown={handleKeyDown}
          className={`relative z-10 px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            interval === 'annual' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('pages.pricing.toggle.annual')}
          {interval === 'annual' && (
            <motion.div
              layoutId="toggleBackground"
              className="absolute inset-0 bg-brand-primary rounded-full -z-10"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
            {t('pages.pricing.toggle.save')}
          </span>
        </button>
      </div>
    </div>
  );
}
