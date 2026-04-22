import { useState, useEffect } from 'react';
import { useTranslation } from '@pavy/i18n';
import { featureMatrix } from '../../lib/pricing-data';
import type { FeatureCategory } from '../../lib/pricing-data';
import ComparisonRow from './ComparisonRow';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function CategorySection({ category }: { category: FeatureCategory }) {
  const { t } = useTranslation('site');
  const [isOpen, setIsOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button 
        className={`w-full flex items-center justify-between p-6 bg-slate-50 lg:bg-transparent ${isDesktop ? 'cursor-default' : 'cursor-pointer hover:bg-slate-100'}`}
        onClick={() => {
          if (!isDesktop) {
            setIsOpen(!isOpen);
          }
        }}
        aria-expanded={isDesktop ? undefined : isOpen}
      >
        <h4 className="text-base font-bold text-slate-900 uppercase tracking-wider">
          {t(category.nameKey)}
        </h4>
        <ChevronDown 
          className={`w-5 h-5 text-slate-500 lg:hidden transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence initial={false}>
        {(isOpen || isDesktop) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:!h-auto lg:!opacity-100"
          >
            {/* Mobile Plan Headers */}
            {!isDesktop && (
              <div className="grid grid-cols-3 gap-4 px-6 py-3 border-b border-slate-100 bg-slate-50/30 text-center">
                <span className="text-xs font-bold text-slate-600 uppercase">{t('pages.pricing.plans.free.name')}</span>
                <span className="text-xs font-bold text-brand-primary uppercase">{t('pages.pricing.plans.pro.name')}</span>
                <span className="text-xs font-bold text-slate-600 uppercase">{t('pages.pricing.plans.enterprise.name')}</span>
              </div>
            )}

            <div className="flex flex-col">
              {category.features.map((feature, idx) => (
                <ComparisonRow key={idx} feature={feature} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ComparisonTable() {
  const { t } = useTranslation('site');

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">
          {t('pages.pricing.comparison.title')}
        </h2>
      </div>

      <div className="w-full bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Desktop Header */}
        <div className="hidden lg:grid grid-cols-4 gap-4 p-6 border-b border-slate-200 bg-slate-50/50 sticky top-0 z-20">
          <div className="col-span-1"></div>
          <div className="col-span-3 grid grid-cols-3 gap-4 text-center">
            <h3 className="text-lg font-bold text-slate-900">{t('pages.pricing.plans.free.name')}</h3>
            <h3 className="text-lg font-bold text-brand-primary">{t('pages.pricing.plans.pro.name')}</h3>
            <h3 className="text-lg font-bold text-slate-900">{t('pages.pricing.plans.enterprise.name')}</h3>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col">
          {featureMatrix.map((category, idx) => (
            <CategorySection key={idx} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
