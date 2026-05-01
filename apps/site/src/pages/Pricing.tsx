import { useState, useEffect } from 'react';
import { useTranslation } from '@pavy/i18n';
import { motion } from 'framer-motion';
import { plans } from '../lib/pricing-data';
import PlanCard from '../components/pricing/PlanCard';
import BillingToggle from '../components/pricing/BillingToggle';
import ComparisonTable from '../components/pricing/ComparisonTable';
import FAQSection from '../components/FAQSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { getFAQPageSchema } from '../lib/structured-data';
import { trackEvent } from '../lib/analytics';

type Interval = 'monthly' | 'annual';

const PRICING_FAQ_KEYS = ['q1', 'q2', 'q3', 'q4'] as const;

export default function Pricing() {
  const { t } = useTranslation('site');
  const [billingInterval, setBillingInterval] = useState<Interval>('annual');

  useEffect(() => {
    trackEvent('view_pricing');
  }, []);

  const faqSchema = getFAQPageSchema(
    PRICING_FAQ_KEYS.map((key) => ({
      question: t(`pages.pricing.faq.items.${key}.question`),
      answer: t(`pages.pricing.faq.items.${key}.answer`),
    }))
  );

  return (
    <div className="relative w-full bg-slate-50 min-h-screen font-sans selection:bg-indigo-500/20 text-slate-900 flex flex-col items-center">
      <SEOHead
        title={t('seo.pricing.title')}
        description={t('seo.pricing.description')}
        path="/pricing"
        ogImage="/og/og-pricing.png"
        structuredData={faqSchema}
      />
      <Header />
      <main className="relative z-10 w-full flex flex-col items-center pt-32 pb-24">
        {/* Hero Section */}
        <section className="px-6 md:px-10 text-center max-w-4xl mx-auto mb-16 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t('pages.pricing.hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            {t('pages.pricing.hero.subtitle')}
          </p>
        </section>

        {/* Billing Toggle */}
        <div className="w-full">
          <BillingToggle interval={billingInterval} onChange={setBillingInterval} />
        </div>

        {/* Plan Cards Grid */}
        <section className="px-6 md:px-10 max-w-6xl w-full mx-auto mb-20">
          <motion.div
            className="grid md:grid-cols-3 gap-8 items-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} interval={billingInterval} />
            ))}
          </motion.div>
        </section>

        {/* Feature Comparison Matrix */}
        <section className="px-6 md:px-10 max-w-5xl w-full mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <ComparisonTable />
          </motion.div>
        </section>

        {/* FAQ Section */}
        <div className="w-full max-w-4xl mx-auto px-6 md:px-10 mb-32 flex flex-col items-center justify-center">
          <FAQSection
            sectionLabelKey="pages.pricing.faq.section_label"
            titleKey="pages.pricing.faq.title"
            itemKeys={PRICING_FAQ_KEYS}
            itemKeyPrefix="pages.pricing.faq.items"
          />
        </div>

        {/* Bottom CTA Section */}
        <section className="w-full px-6 md:px-10 max-w-4xl mx-auto text-center bg-white rounded-3xl p-12 md:p-16 border border-slate-200 shadow-sm mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {t('pages.pricing.bottom_cta.title')}
          </h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            {t('pages.pricing.bottom_cta.subtitle')}
          </p>
          <a
            href="mailto:axiomni.official@gmail.com"
            className="inline-block bg-brand-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-indigo-700 transition-colors shadow-md"
          >
            {t('pages.pricing.bottom_cta.button')}
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
