import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, BookOpen, Eye, MessagesSquare, Plug, Code, Globe } from 'lucide-react';
import { i18next, useTranslation } from '@pavy/i18n';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import OptimizedImage from '../components/OptimizedImage';
import BentoCard from '../components/BentoCard';
import { getSoftwareApplicationSchema } from '../lib/structured-data';
import { getSignupUrl } from '../lib/signup';
import { trackEvent } from '../lib/analytics';

import dashboardHeroPng from '../assets/admin/dashboard-hero.png';
import dashboardHeroWebp from '../assets/admin/dashboard-hero.webp';
import knowledgeBasePng from '../assets/admin/knowledge-base.png';
import knowledgeBaseWebp from '../assets/admin/knowledge-base.webp';
import widgetConfigPng from '../assets/admin/widget-config.png';
import widgetConfigWebp from '../assets/admin/widget-config.webp';
import conversationsPng from '../assets/admin/conversations.png';
import conversationsWebp from '../assets/admin/conversations.webp';
import integrationPng from '../assets/admin/integration.png';
import integrationWebp from '../assets/admin/integration.webp';

const T = 'pages.productDashboard';

type TFn = (key: string) => string;

export default function ProductDashboard() {
  const { t } = useTranslation('site');

  const schema = getSoftwareApplicationSchema(
    t('seo.dashboard.title'),
    t('seo.dashboard.description'),
    `https://pavy.ai/${i18next.language}/product/dashboard`,
  );

  return (
    <div className="relative w-full bg-slate-50 min-h-screen font-sans selection:bg-indigo-500/20 text-slate-900 flex flex-col items-center">
      <SEOHead
        title={t('seo.dashboard.title')}
        description={t('seo.dashboard.description')}
        path="/product/dashboard"
        ogImage="/og/og-dashboard.png"
        structuredData={schema}
      />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-50/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-50/40 blur-[120px] rounded-full" />
      </div>

      <Header />

      <main className="relative z-10 flex flex-col items-center w-full">
        <SubPageHero t={t} />
        <BentoGrid t={t} />
        <CTA t={t} />
        <Footer />
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Compact sub-page hero
   ───────────────────────────────────────────── */

function SubPageHero({ t }: { t: TFn }) {
  return (
    <section className="w-full max-w-[1280px] px-6 lg:px-10 pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start gap-5"
      >
        <span className="text-[11px] uppercase tracking-[0.28em] font-bold text-brand-primary px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">
          {t(`${T}.hero.eyebrow`)}
        </span>
        <h1 className="text-[36px] sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-[-0.03em] leading-[1.05] text-slate-900 max-w-4xl">
          {t(`${T}.hero.title`)}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl font-light leading-relaxed">
          {t(`${T}.hero.tagline`)}
        </p>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Bento grid
   ───────────────────────────────────────────── */

function BentoGrid({ t }: { t: TFn }) {
  return (
    <section className="w-full max-w-[1280px] px-6 lg:px-10 py-16 lg:py-20">
      <div className="grid grid-cols-12 gap-5 lg:gap-7 auto-rows-min">

        {/* ─── Hero dashboard ─── */}
        <BentoCard className="col-span-12 flex flex-col" bare>
          <div className="relative bg-slate-100 overflow-hidden aspect-[16/10]">
            <OptimizedImage
              src={dashboardHeroPng}
              webpSrc={dashboardHeroWebp}
              alt={t(`${T}.cards.hero.imageAlt`)}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
          <div className="p-9 lg:p-12 flex items-start gap-4">
            <TrendingUp className="w-7 h-7 text-brand-primary flex-shrink-0 mt-0.5" strokeWidth={1.75} />
            <p className="text-xl lg:text-2xl text-slate-800 font-semibold leading-snug">
              {t(`${T}.cards.hero.caption`)}
            </p>
          </div>
        </BentoCard>

        {/* ─── Stats row — asymmetric 5/7 ─── */}
        <BentoCard
          variant="primary"
          className="col-span-12 lg:col-span-5 flex flex-col justify-center min-h-[280px]"
        >
          <TrendingUp className="w-8 h-8 mb-4 opacity-80" strokeWidth={1.75} />
          <div className="text-7xl lg:text-8xl font-heading font-black tracking-tight">
            {t(`${T}.cards.statBig.value`)}
          </div>
          <div className="mt-4 text-base font-bold uppercase tracking-wider opacity-90">
            {t(`${T}.cards.statBig.label`)}
          </div>
          <div className="mt-1 text-sm opacity-80">
            {t(`${T}.cards.statBig.sub`)}
          </div>
        </BentoCard>

        <BentoCard className="col-span-12 lg:col-span-7 flex flex-col justify-center min-h-[280px]">
          <div className="space-y-5">
            <StatRow
              value={t(`${T}.cards.statTrio.ctr.value`)}
              label={t(`${T}.cards.statTrio.ctr.label`)}
            />
            <div className="border-t border-slate-100" />
            <StatRow
              value={t(`${T}.cards.statTrio.activation.value`)}
              label={t(`${T}.cards.statTrio.activation.label`)}
            />
            <div className="border-t border-slate-100" />
            <StatRow
              value={t(`${T}.cards.statTrio.dismissal.value`)}
              label={t(`${T}.cards.statTrio.dismissal.label`)}
            />
          </div>
        </BentoCard>

        {/* ─── Pull quote ─── */}
        <PullQuote
          text1={t(`${T}.pullQuote.text1`)}
          text2={t(`${T}.pullQuote.text2`)}
          sub={t(`${T}.pullQuote.sub`)}
        />

        {/* ─── How it works — CSS-built workflow card (no screenshot) ─── */}
        <WorkflowCard t={t} />

        {/* ─── Knowledge Base — text top, focal image below ─── */}
        <BentoCard className="col-span-12 flex flex-col" bare>
          <div className="p-9 lg:p-12 max-w-3xl">
            <BookOpen className="w-9 h-9 text-brand-primary mb-5" strokeWidth={1.5} />
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-slate-900 mb-3 leading-tight">
              {t(`${T}.cards.kb.title`)}
            </h3>
            <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
              {t(`${T}.cards.kb.description`)}
            </p>
          </div>
          <FocalImage
            src={knowledgeBasePng}
            webpSrc={knowledgeBaseWebp}
            alt={t(`${T}.cards.kb.imageAlt`)}
          />
        </BentoCard>

        {/* ─── Widget Config — text top, focal image below ─── */}
        <BentoCard className="col-span-12 flex flex-col" bare>
          <div className="p-9 lg:p-12 max-w-3xl">
            <Eye className="w-9 h-9 text-brand-primary mb-5" strokeWidth={1.5} />
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-slate-900 mb-3 leading-tight">
              {t(`${T}.cards.widgetConfig.title`)}
            </h3>
            <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
              {t(`${T}.cards.widgetConfig.description`)}
            </p>
          </div>
          <FocalImage
            src={widgetConfigPng}
            webpSrc={widgetConfigWebp}
            alt={t(`${T}.cards.widgetConfig.imageAlt`)}
          />
        </BentoCard>

        {/* ─── Conversations — text top, focal image below ─── */}
        <BentoCard className="col-span-12 flex flex-col" bare>
          <div className="p-9 lg:p-12 max-w-3xl">
            <MessagesSquare className="w-9 h-9 text-brand-primary mb-5" strokeWidth={1.5} />
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-slate-900 mb-3 leading-tight">
              {t(`${T}.cards.conversations.title`)}
            </h3>
            <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
              {t(`${T}.cards.conversations.description`)}
            </p>
          </div>
          <FocalImage
            src={conversationsPng}
            webpSrc={conversationsWebp}
            alt={t(`${T}.cards.conversations.imageAlt`)}
          />
        </BentoCard>

        {/* ─── Integration — text top, focal image below ─── */}
        <BentoCard className="col-span-12 flex flex-col" bare>
          <div className="p-9 lg:p-12 max-w-3xl">
            <Plug className="w-9 h-9 text-brand-primary mb-5" strokeWidth={1.5} />
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-slate-900 mb-3 leading-tight">
              {t(`${T}.cards.integration.title`)}
            </h3>
            <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
              {t(`${T}.cards.integration.description`)}
            </p>
          </div>
          <FocalImage
            src={integrationPng}
            webpSrc={integrationWebp}
            alt={t(`${T}.cards.integration.imageAlt`)}
          />
        </BentoCard>
      </div>
    </section>
  );
}

/**
 * Image area for a feature card. Native aspect (h-auto) — no further crop
 * on focal captures. Container only constrains width.
 */
function FocalImage({
  src,
  webpSrc,
  alt,
}: {
  src: string;
  webpSrc: string;
  alt: string;
}) {
  return (
    <div className="relative bg-slate-100 overflow-hidden">
      <OptimizedImage
        src={src}
        webpSrc={webpSrc}
        alt={alt}
        className="w-full h-auto block"
      />
    </div>
  );
}

function StatRow({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-3xl lg:text-4xl font-heading font-black tracking-tight text-slate-900">
        {value}
      </span>
      <span className="text-sm text-slate-600 font-medium text-right">{label}</span>
    </div>
  );
}

/**
 * Editorial pull quote — typography-only row, no card.
 * Two-part headline with second half in indigo for emphasis.
 */
function PullQuote({
  text1,
  text2,
  sub,
}: {
  text1: string;
  text2: string;
  sub: string;
}) {
  return (
    <motion.div
      className="col-span-12 py-16 lg:py-24 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="font-heading text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.02em] max-w-4xl mx-auto">
        <span className="text-slate-900">{text1} </span>
        <span className="text-brand-primary">{text2}</span>
      </div>
      <div className="mt-6 text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
        {sub}
      </div>
    </motion.div>
  );
}

/**
 * CSS-built workflow card — 4 numbered steps in a horizontal row.
 * No screenshot; hand-built typography + icons + connecting accents.
 */
function WorkflowCard({ t }: { t: TFn }) {
  const steps = [
    { key: 'install', icon: Code },
    { key: 'crawl', icon: Globe },
    { key: 'watch', icon: MessagesSquare },
    { key: 'improve', icon: TrendingUp },
  ] as const;

  return (
    <BentoCard className="col-span-12 flex flex-col">
      <h3 className="text-2xl lg:text-3xl font-heading font-bold text-slate-900 leading-tight mb-10 lg:mb-14 max-w-3xl">
        {t(`${T}.workflow.title`)}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {steps.map(({ key, icon: Icon }, idx) => (
          <div key={key} className="relative flex flex-col items-center text-center">
            {/* Step number */}
            <div className="text-[11px] uppercase tracking-[0.32em] font-bold text-brand-primary mb-4">
              {t(`${T}.workflow.steps.${key}.num`)}
            </div>
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5">
              <Icon className="w-5 h-5 text-brand-primary" strokeWidth={1.75} />
            </div>
            {/* Title */}
            <h4 className="text-xl font-heading font-bold text-slate-900 mb-2 leading-tight">
              {t(`${T}.workflow.steps.${key}.title`)}
            </h4>
            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed max-w-[220px]">
              {t(`${T}.workflow.steps.${key}.description`)}
            </p>
            {/* Connecting arrow (hidden on last + on mobile/tablet) */}
            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute top-[68px] -right-4 text-slate-300">
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </div>
            )}
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

/* ─────────────────────────────────────────────
   CTA
   ───────────────────────────────────────────── */

function CTA({ t }: { t: TFn }) {
  return (
    <section className="w-full max-w-[1280px] px-6 lg:px-10 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <h2 className="text-[36px] sm:text-5xl md:text-6xl font-heading font-black tracking-tight mb-8 text-slate-900 max-w-3xl leading-[1.1]">
          {t(`${T}.cta.title`)}
        </h2>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl font-light leading-relaxed">
          {t(`${T}.cta.description`)}
        </p>
        <a
          href={getSignupUrl()}
          onClick={() => trackEvent('click_dashboard_cta', { location: 'footer' })}
          className="bg-brand-primary text-white px-10 py-5 rounded-full font-bold flex items-center justify-center gap-3 transition-all duration-500 hover:bg-indigo-700 active:scale-95 whitespace-nowrap shadow-lg shadow-indigo-500/20"
        >
          {t(`${T}.cta.primary`)}
          <ArrowRight className="w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
}
