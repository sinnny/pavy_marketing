import { motion } from 'framer-motion';
import { useTranslation } from '@pavy/i18n';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CaseStudy } from '../../lib/customer-data';
import { useLocale } from '../../hooks/useLocale';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
}

export default function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  const { t } = useTranslation('site');
  const { localePath } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
    >
      <Link
        to={localePath(`/customers/${caseStudy.slug}`)}
        aria-label={t(caseStudy.headlineKey)}
        className="block p-10 h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-[32px]"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="text-sm font-bold text-indigo-500 uppercase tracking-widest">
              {t(caseStudy.industryKey)}
            </div>
            <div className="text-2xl font-black text-slate-200 group-hover:text-indigo-100 transition-colors">
              {caseStudy.companyName.toUpperCase()}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors font-heading leading-tight">
            {t(caseStudy.headlineKey)}
          </h3>

          <div className="flex items-end gap-4 mb-10">
            <div className="text-5xl font-black text-brand-primary tracking-tighter">
              {caseStudy.metricValue}
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t(caseStudy.metricLabelKey)}
            </div>
          </div>

          <div className="mt-auto">
            <span className="inline-flex items-center gap-2 font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {t('socialProof.labels.readMore')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
