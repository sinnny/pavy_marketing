import { useTranslation } from '@pavy/i18n';
import { CASE_STUDIES } from '../lib/customer-data';
import CaseStudyCard from '../components/social-proof/CaseStudyCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';

export default function Customers() {
  const { t } = useTranslation('site');
  const { localePath } = useLocale();

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />

      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-heading tracking-tight">
              {t('socialProof.customersPage.title')}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
              {t('socialProof.customersPage.subtitle')}
            </p>
          </motion.div>
        </section>

        {/* Case Studies Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CASE_STUDIES.map((cs, idx) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} index={idx} />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-primary rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading">
                {t('socialProof.labels.ctaTitle')}
              </h2>
              <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-xl mx-auto">
                {t('socialProof.labels.ctaSubtitle')}
              </p>
              <Link
                to={localePath('/demo')}
                className="inline-flex items-center gap-3 bg-white text-brand-primary px-10 py-5 rounded-full font-black text-lg hover:bg-indigo-50 transition-colors shadow-lg"
              >
                {t('socialProof.labels.getStarted')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
