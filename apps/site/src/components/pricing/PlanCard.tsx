import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from '@pavy/i18n';
import { Link } from 'react-router-dom';
import { PlanTier } from '../../lib/pricing-data';
import { useLocale } from '../../hooks/useLocale';

interface PlanCardProps {
  plan: PlanTier;
  interval: 'monthly' | 'annual';
}

export default function PlanCard({ plan, interval }: PlanCardProps) {
  const { t } = useTranslation('site');
  const { localePath } = useLocale();

  const price = interval === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
  const isEnterprise = plan.monthlyPrice === null;

  return (
    <motion.div 
      className={`relative flex flex-col p-8 rounded-3xl border bg-white ${
        plan.highlighted 
          ? 'border-brand-primary shadow-xl shadow-brand-primary/10 scale-105 z-10' 
          : 'border-slate-200 shadow-lg'
      }`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {plan.highlighted && plan.badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          {t(plan.badge)}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{t(plan.nameKey)}</h3>
        <div className="flex items-baseline gap-1 h-16">
          {isEnterprise ? (
            <span className="text-3xl font-extrabold text-slate-900">
              {t('pages.pricing.plans.enterprise.price_label')}
            </span>
          ) : (
            <>
              <span className="text-2xl font-bold text-slate-400">{plan.currency}</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={price}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="text-5xl font-extrabold text-slate-900 tracking-tight"
                >
                  {price}
                </motion.span>
              </AnimatePresence>
              <span className="text-slate-500 font-medium ml-1">/ mo</span>
            </>
          )}
        </div>
      </div>

      <div className="flex-1">
        <ul className="space-y-4 mb-8">
          {plan.featuresKeys.map((featureKey, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
              <span className="text-slate-600 text-sm">{t(featureKey)}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={localePath(plan.ctaHref)}
        className={`block w-full py-3 px-6 text-center rounded-xl font-bold transition-all duration-300 ${
          plan.highlighted
            ? 'bg-brand-primary text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
            : 'bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200'
        }`}
      >
        {t(plan.ctaKey)}
      </Link>
    </motion.div>
  );
}
