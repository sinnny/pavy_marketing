import { motion } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  Palette,
  MessageCircle,
  Filter,
  Sparkles,
} from 'lucide-react';
import { i18next, useTranslation } from '@pavy/i18n';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import OptimizedImage from '../components/OptimizedImage';
import BentoCard from '../components/BentoCard';
import { getSoftwareApplicationSchema } from '../lib/structured-data';
import { getSignupUrl } from '../lib/signup';
import { trackEvent } from '../lib/analytics';

import heroPdpPng from '../assets/chatbot/hero-pdp.png';
import heroPdpWebp from '../assets/chatbot/hero-pdp.webp';
import widgetPanelFashionPng from '../assets/chatbot/widget-panel-fashion.png';
import widgetPanelFashionWebp from '../assets/chatbot/widget-panel-fashion.webp';
import shopFashionPng from '../assets/chatbot/shop-fashion.png';
import shopFashionWebp from '../assets/chatbot/shop-fashion.webp';
import shopBeautyPng from '../assets/chatbot/shop-beauty.png';
import shopBeautyWebp from '../assets/chatbot/shop-beauty.webp';
import shopElectronicsPng from '../assets/chatbot/shop-electronics.png';
import shopElectronicsWebp from '../assets/chatbot/shop-electronics.webp';
import shopTravelPng from '../assets/chatbot/shop-travel.png';
import shopTravelWebp from '../assets/chatbot/shop-travel.webp';

const T = 'pages.chatbotSubpage';

type TFn = (key: string) => string;

export default function ChatbotPage() {
  const { t } = useTranslation('site');

  const schema = getSoftwareApplicationSchema(
    t('seo.chatbot.title'),
    t('seo.chatbot.description'),
    `https://pavy.ai/${i18next.language}/product/chatbot`,
  );

  return (
    <div className="relative w-full bg-slate-50 min-h-screen font-sans selection:bg-indigo-500/20 text-slate-900 flex flex-col items-center">
      <SEOHead
        title={t(`${T}.title`)}
        description={t(`${T}.description`)}
        path="/product/chatbot"
        ogImage="/og/og-chatbot.png"
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
   Bento grid — 8 cards, widget-focused
   ───────────────────────────────────────────── */

function BentoGrid({ t }: { t: TFn }) {
  return (
    <section className="w-full max-w-[1280px] px-6 lg:px-10 py-16 lg:py-20">
      <div className="grid grid-cols-12 gap-5 lg:gap-7 auto-rows-min">

        {/* ─── Hero — clean PDP + floating widget panel breakout ─── */}
        <motion.div
          className="col-span-12 relative pb-12 lg:pb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Card with clean PDP background (FAB visible at corner) */}
          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden">
            <div className="relative bg-slate-100 overflow-hidden aspect-[21/10] lg:aspect-[16/7]">
              <OptimizedImage
                src={heroPdpPng}
                webpSrc={heroPdpWebp}
                alt={t(`${T}.cards.hero.imageAlt`)}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
            <div className="p-9 lg:p-12 lg:pr-[320px] flex items-start gap-4">
              <Sparkles className="w-7 h-7 text-brand-primary flex-shrink-0 mt-0.5" strokeWidth={1.75} />
              <p className="text-xl lg:text-2xl text-slate-800 font-semibold leading-snug">
                {t(`${T}.cards.hero.caption`)}
              </p>
            </div>
          </div>

          {/* Floating widget panel — bottom-right, sticking out just slightly */}
          <motion.div
            className="absolute right-4 lg:right-12 bottom-0 lg:-bottom-10 z-20 w-56 lg:w-[280px]"
            initial={{ opacity: 0, x: 20, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-2xl shadow-2xl shadow-indigo-900/25 border border-slate-200 overflow-hidden bg-white">
              <OptimizedImage
                src={widgetPanelFashionPng}
                webpSrc={widgetPanelFashionWebp}
                alt={t(`${T}.cards.hero.widgetAlt`)}
                className="w-full h-auto block"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ═══ CHAPTER 01 — ACCURACY ═══ */}
        <ChapterHeading
          eyebrow={t(`${T}.chapters.ch01.eyebrow`)}
          title1={t(`${T}.chapters.ch01.title1`)}
          title2={t(`${T}.chapters.ch01.title2`)}
        />

        {/* Q&A — col 7 (asymmetric) */}
        <BentoCard className="col-span-12 lg:col-span-7 flex flex-col">
          <div className="space-y-4 max-w-xl">
            <div className="flex justify-end">
              <div className="bg-brand-primary text-white rounded-2xl rounded-br-md px-5 py-3 max-w-[85%] shadow-sm">
                {t(`${T}.cards.qa.question`)}
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-slate-100 border border-slate-200 text-slate-900 rounded-2xl rounded-bl-md px-5 py-3 max-w-[90%]">
                {t(`${T}.cards.qa.answer`)}
              </div>
            </div>
            <div className="flex justify-start pl-2">
              <div className="text-xs text-slate-500 italic">
                {t(`${T}.cards.qa.source`)}
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Stat 84% — col 5 */}
        <BentoCard
          variant="primary"
          className="col-span-12 lg:col-span-5 flex flex-col justify-center min-h-[280px]"
        >
          <div className="text-7xl lg:text-8xl font-heading font-black tracking-tight">
            {t(`${T}.cards.stat1.value`)}
          </div>
          <div className="mt-4 text-base font-bold uppercase tracking-wider opacity-90">
            {t(`${T}.cards.stat1.label`)}
          </div>
          <div className="mt-1 text-sm opacity-80 leading-relaxed">
            {t(`${T}.cards.stat1.sub`)}
          </div>
        </BentoCard>

        {/* ═══ CHAPTER 02 — SPEED ═══ */}
        <ChapterHeading
          eyebrow={t(`${T}.chapters.ch02.eyebrow`)}
          title1={t(`${T}.chapters.ch02.title1`)}
          title2={t(`${T}.chapters.ch02.title2`)}
        />

        {/* Stat <200ms — col 5 */}
        <BentoCard className="col-span-12 lg:col-span-5 flex flex-col justify-center min-h-[280px]">
          <div className="text-6xl lg:text-7xl font-heading font-black tracking-tight text-slate-900">
            {t(`${T}.cards.stat2.value`)}
          </div>
          <div className="mt-4 text-base font-bold uppercase tracking-wider text-slate-700">
            {t(`${T}.cards.stat2.label`)}
          </div>
          <div className="mt-1 text-sm text-slate-500 leading-relaxed">
            {t(`${T}.cards.stat2.sub`)}
          </div>
        </BentoCard>

        {/* Multilingual — col 7, text-only */}
        <BentoCard className="col-span-12 lg:col-span-7 flex flex-col justify-center min-h-[280px]">
          <Globe className="w-9 h-9 text-brand-primary mb-5" strokeWidth={1.5} />
          <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3 leading-tight">
            {t(`${T}.cards.multilingual.title`)}
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6 max-w-xl">
            {t(`${T}.cards.multilingual.description`)}
          </p>
          <div className="text-sm font-mono tracking-wide text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 max-w-xl">
            {t(`${T}.cards.multilingual.languages`)}
          </div>
        </BentoCard>

        {/* ═══ CHAPTER 03 — ANYWHERE ═══ */}
        <ChapterHeading
          eyebrow={t(`${T}.chapters.ch03.eyebrow`)}
          title1={t(`${T}.chapters.ch03.title1`)}
          title2={t(`${T}.chapters.ch03.title2`)}
        />

        {/* Shop 1 — Fashion (Atelier) */}
        <ShopCard
          imagePng={shopFashionPng}
          imageWebp={shopFashionWebp}
          alt={t(`${T}.cards.shops.fashion.alt`)}
          label={t(`${T}.cards.shops.fashion.label`)}
          brand={t(`${T}.cards.shops.fashion.brand`)}
        />
        {/* Shop 2 — Beauty (Lumée) */}
        <ShopCard
          imagePng={shopBeautyPng}
          imageWebp={shopBeautyWebp}
          alt={t(`${T}.cards.shops.beauty.alt`)}
          label={t(`${T}.cards.shops.beauty.label`)}
          brand={t(`${T}.cards.shops.beauty.brand`)}
        />
        {/* Shop 3 — Electronics (Boltwave) */}
        <ShopCard
          imagePng={shopElectronicsPng}
          imageWebp={shopElectronicsWebp}
          alt={t(`${T}.cards.shops.electronics.alt`)}
          label={t(`${T}.cards.shops.electronics.label`)}
          brand={t(`${T}.cards.shops.electronics.brand`)}
        />
        {/* Shop 4 — Travel (Havenstays) */}
        <ShopCard
          imagePng={shopTravelPng}
          imageWebp={shopTravelWebp}
          alt={t(`${T}.cards.shops.travel.alt`)}
          label={t(`${T}.cards.shops.travel.label`)}
          brand={t(`${T}.cards.shops.travel.brand`)}
        />

        {/* ═══ CHAPTER 04 — SETUP ═══ */}
        <ChapterHeading
          eyebrow={t(`${T}.chapters.ch04.eyebrow`)}
          title1={t(`${T}.chapters.ch04.title1`)}
          title2={t(`${T}.chapters.ch04.title2`)}
        />

        {/* Setup code — col 7 */}
        <BentoCard variant="dark" className="col-span-12 lg:col-span-7 flex flex-col">
          <div className="font-mono text-sm leading-relaxed mb-8 select-all">
            <div className="text-slate-400">{`<script`}</div>
            <div className="text-slate-300 pl-4">
              src=<span className="text-emerald-300">{`"https://cdn.pavy.ai/v1.js"`}</span>
            </div>
            <div className="text-slate-300 pl-4">
              data-key=<span className="text-emerald-300">{`"pk_live_***"`}</span>
            </div>
            <div className="text-slate-300 pl-4">async</div>
            <div className="text-slate-400">{`></script>`}</div>
          </div>
          <div className="mt-auto pt-6 border-t border-slate-700/60">
            <h3 className="text-2xl font-heading font-bold text-white mb-2 leading-tight">
              {t(`${T}.cards.setup.title`)}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {t(`${T}.cards.setup.description`)}
            </p>
          </div>
        </BentoCard>

        {/* Customize — col 5 */}
        <BentoCard className="col-span-12 lg:col-span-5 flex flex-col">
          <Palette className="w-9 h-9 text-brand-primary mb-5" strokeWidth={1.5} />
          <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 leading-tight">
            {t(`${T}.cards.customize.title`)}
          </h3>
          <ul className="space-y-4">
            <CustomizeBullet icon={Palette} label={t(`${T}.cards.customize.bullets.colors`)} />
            <CustomizeBullet icon={MessageCircle} label={t(`${T}.cards.customize.bullets.questions`)} />
            <CustomizeBullet icon={Filter} label={t(`${T}.cards.customize.bullets.rules`)} />
          </ul>
        </BentoCard>
      </div>
    </section>
  );
}

/**
 * Editorial chapter heading — spans the full grid as a typography-only row.
 * No card border; pure type with eyebrow + 2-part headline (second half in indigo).
 */
function ChapterHeading({
  eyebrow,
  title1,
  title2,
}: {
  eyebrow: string;
  title1: string;
  title2: string;
}) {
  return (
    <motion.div
      className="col-span-12 pt-12 lg:pt-20 pb-2"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-[11px] uppercase tracking-[0.3em] font-bold text-brand-primary mb-4">
        {eyebrow}
      </div>
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-heading font-black leading-[1.1] tracking-[-0.02em] max-w-3xl">
        <span className="text-slate-900">{title1}</span>
        <br className="hidden md:block" />
        <span className="text-brand-primary md:ml-0 ml-1">{title2}</span>
      </h2>
    </motion.div>
  );
}

/**
 * Shop card — small screenshot of a brand's PDP with widget visible.
 * Used in the "Anywhere" chapter to show industry-agnostic embedding.
 */
function ShopCard({
  imagePng,
  imageWebp,
  alt,
  label,
  brand,
}: {
  imagePng: string;
  imageWebp: string;
  alt: string;
  label: string;
  brand: string;
}) {
  return (
    <BentoCard className="col-span-12 sm:col-span-6 flex flex-col" bare>
      <div className="relative bg-slate-100 overflow-hidden aspect-[16/10]">
        <OptimizedImage
          src={imagePng}
          webpSrc={imageWebp}
          alt={alt}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="p-6 lg:p-8 flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.28em] font-bold text-brand-primary mb-1.5">
            {label}
          </div>
          <div className="font-heading text-lg font-bold text-slate-900">
            {brand}
          </div>
        </div>
        <div className="text-xs text-slate-400 uppercase tracking-widest">Live</div>
      </div>
    </BentoCard>
  );
}

function CustomizeBullet({
  icon: Icon,
  label,
}: {
  icon: typeof Palette;
  label: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-brand-primary" />
      </div>
      <span className="text-slate-700 font-medium pt-1">{label}</span>
    </li>
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
          onClick={() => trackEvent('click_chatbot_cta', { location: 'footer' })}
          className="bg-brand-primary text-white px-10 py-5 rounded-full font-bold flex items-center justify-center gap-3 transition-all duration-500 hover:bg-indigo-700 active:scale-95 whitespace-nowrap shadow-lg shadow-indigo-500/20"
        >
          {t(`${T}.cta.primary`)}
          <ArrowRight className="w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
}
