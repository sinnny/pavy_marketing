import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ArrowRight,
    FileText,
    DollarSign,
    Cpu,
    AlignLeft,
    Truck,
    RotateCcw,
    Star,
    AlertTriangle,
    CheckCircle2,
    Search,
    MousePointerClick,
    ExternalLink,
    LogOut,
    MessageCircle,
    Zap,
    ShoppingCart,
} from 'lucide-react';
import { AIIcon } from '@page-chatbot/ui';
import { i18next, useTranslation } from '@page-chatbot/i18n';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductHighlightSection from '../components/ProductHighlightSection';
import CustomPDPSection from '../components/CustomPDPSection';
import adminScreenshot from '../assets/admin-screenshot.png';
import { getSiteHeroCopy } from '../lib/siteHero';

const T_PREFIX = 'pages.productChatbot';
const CHAT_PAIR_COUNT = 5;
const CHAT_INDICES = Array.from({ length: CHAT_PAIR_COUNT }, (_, i) => i + 1);

export default function ProductChatbot() {
    const { t } = useTranslation('site');
    const containerRef = useRef<HTMLDivElement>(null);
    const demoT = useCallback(
        (key: string) => i18next.t(key, { ns: 'site', lng: 'en' }) as string,
        [],
    );
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-slate-50 min-h-screen font-sans selection:bg-indigo-500/20 text-slate-900 flex flex-col items-center"
        >
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white">
                <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-indigo-50/50 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-50/40 blur-[120px] rounded-full" />
            </div>

            <Header />

            <main className="relative z-10 flex flex-col items-center w-full">
                <HeroSection t={t} demoT={demoT} scrollYProgress={scrollYProgress} />

                <div className="w-full flex flex-col items-center space-y-40 pb-40">
                    <PDPAnalysisSection t={t} />
                    <HallucinationSection t={t} />
                    <ReviewIntelligenceSection t={t} />
                    <FrictionReductionSection t={t} />
                    <AdminSection t={t} />
                    <ProductHighlightSection />
                    <CustomPDPSection />
                    <CTASection t={t} />
                </div>

                <Footer />
            </main>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Shared: Auto-scroll Chat Window
   ───────────────────────────────────────────── */

function ChatWindow({
    translationPrefix,
    t,
    className,
}: {
    translationPrefix: string;
    t: (key: string) => string;
    className?: string;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [visiblePairs, setVisiblePairs] = useState(0);

    useEffect(() => {
        const timers = CHAT_INDICES.map((_, i) =>
            setTimeout(() => setVisiblePairs(i + 1), (i * 4.5 + 1.0) * 1000),
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (visiblePairs === 0) return;
        const scrollTo = () =>
            scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        const t1 = setTimeout(scrollTo, 50);
        const t2 = setTimeout(scrollTo, 1300);
        const t3 = setTimeout(scrollTo, 2500);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [visiblePairs]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
            className={className}
        >
            {/* Header */}
            <div className="flex items-center gap-3 p-5 border-b border-white/10 shrink-0">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <AIIcon family="wave" className="w-5 h-5 text-white" glass={false} />
                </div>
                <span className="text-sm font-bold text-slate-300">Pavy.ai</span>
                <span className="ml-auto text-[10px] text-emerald-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                </span>
            </div>

            {/* Scroll Body */}
            <div
                ref={scrollRef}
                className="flex-1 p-5 flex flex-col gap-3 overflow-y-auto overflow-x-hidden custom-scrollbar"
            >
                <style>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: transparent; border-radius: 10px; }
                    .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: rgba(99,102,241,0.4); }
                `}</style>

                {CHAT_INDICES.slice(0, visiblePairs).map((n) => (
                    <div key={n} className="flex flex-col gap-3">
                        {/* User Q */}
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="self-end bg-white/10 border border-white/10 text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] text-[13px]"
                        >
                            {t(`${translationPrefix}.q${n}`)}
                        </motion.div>

                        {/* Bot A */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.3 }}
                            className="self-start bg-brand-primary text-white p-3 rounded-2xl rounded-tl-sm max-w-[88%] text-[13px] leading-relaxed"
                        >
                            {t(`${translationPrefix}.a${n}`)}
                        </motion.div>

                        {/* Source */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.2 }}
                            className="self-start flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full"
                        >
                            <CheckCircle2 className="w-3 h-3" />
                            {t(`${translationPrefix}.s${n}`)}
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 shrink-0">
                <div className="bg-white/5 border border-white/10 rounded-full h-9 px-4 flex items-center text-slate-500 text-xs">
                    {t('hero.chatbot.inputPlaceholder')}
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────── */

function HeroSection({
    t,
    demoT,
    scrollYProgress,
}: {
    t: (key: string) => string;
    demoT: (key: string) => string;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
    const scale = useTransform(scrollYProgress, [0, 0.15], [1, 1.04]);
    const y = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
    const heroCopy = getSiteHeroCopy(t);

    return (
        <section className="relative w-full py-32 min-h-screen flex flex-col items-center justify-center overflow-visible">
            <div className="max-w-[1400px] mx-auto px-6 w-full flex flex-col items-center z-10 text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-brand-primary text-[11px] uppercase tracking-[0.2em] font-bold mb-10">
                        <AIIcon family="wave" className="w-4 h-4 text-indigo-500" glass={false} />
                        <span>{heroCopy.badge}</span>
                    </div>

                    <h1 className="text-[36px] sm:text-[52px] md:text-[62px] lg:text-[80px] xl:text-[90px] font-heading font-black tracking-tight mb-16 text-slate-900 break-keep flex flex-col gap-2 md:gap-1 leading-[1.1]">
                        <span>{heroCopy.title1}</span>
                        <span className="text-brand-primary">{heroCopy.title2}</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 mb-16 max-w-2xl font-light leading-relaxed">
                        {heroCopy.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-brand-primary text-white px-10 py-5 rounded-full font-bold flex items-center justify-center gap-3 transition-all duration-500 hover:bg-indigo-700 active:scale-95 whitespace-nowrap shadow-lg shadow-indigo-500/20">
                            {t('footer.cta.startBuilding')}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Hero Visual */}
            <motion.div
                className="relative w-full max-w-[1400px] px-6 lg:px-10"
                style={{ scale, y }}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative flex justify-center w-full">
                    <div className="relative z-20 w-full max-w-[1200px] rounded-[40px] border border-slate-200 bg-white overflow-hidden shadow-2xl p-4 shadow-slate-900/10">
                        <div className="relative rounded-[24px] overflow-hidden border border-slate-100 bg-white w-full h-[600px] flex flex-col lg:flex-row">
                            {/* Left Column - Product Image */}
                            <div className="w-full lg:w-1/2 bg-gray-900 relative overflow-hidden h-64 lg:h-full shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1080"
                                    alt="Premium Wireless Headphones"
                                    className="object-cover w-full h-full opacity-80 scale-105 transition-transform hover:scale-110 duration-1000"
                                />
                            </div>
                            {/* Right Column - Product Info */}
                            <div className="w-full lg:w-1/2 bg-white p-8 lg:p-16 flex flex-col justify-center text-left space-y-6 overflow-y-auto">
                                <div className="h-4 w-24 bg-indigo-500/20 rounded" />
                                <h3 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">{demoT('hero.product.title')}</h3>
                                <p className="text-gray-500 text-lg leading-relaxed">{demoT('hero.product.description')}</p>
                                <div className="h-16 w-full bg-brand-primary hover:bg-indigo-700 transition-colors rounded-xl mt-8 flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-lg shadow-brand-primary/30">
                                    {demoT('hero.product.addToCart')}
                                </div>
                                <div className="pt-8 border-t border-gray-100 mt-8">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{demoT('hero.product.highlights')}</p>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-4 text-gray-700 font-medium">
                                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                                            <span>{demoT('hero.product.battery')}</span>
                                        </li>
                                        <li className="flex items-center gap-4 text-gray-700 font-medium">
                                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                                            <span>{demoT('hero.product.spatialAudio')}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* Subtle overlay */}
                            <div className="absolute inset-0 bg-white/40 pointer-events-none transition-all duration-700 hover:bg-transparent z-10" />
                        </div>
                    </div>

                    {/* Floating Animated Chatbot */}
                    <HeroAnimatedChatWindow t={t} />
                </div>
            </motion.div>

            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-50/50 blur-[120px] rounded-full" />
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Section 1: PDP Analysis
   ───────────────────────────────────────────── */

const PDP_ELEMENTS = [
    { key: 'productName', icon: FileText, delay: 0 },
    { key: 'price', icon: DollarSign, delay: 0.1 },
    { key: 'specs', icon: Cpu, delay: 0.2 },
    { key: 'description', icon: AlignLeft, delay: 0.3 },
    { key: 'shipping', icon: Truck, delay: 0.4 },
    { key: 'returnPolicy', icon: RotateCcw, delay: 0.5 },
    { key: 'reviews', icon: Star, delay: 0.6 },
] as const;

function PDPAnalysisSection({ t }: { t: (key: string) => string }) {
    return (
        <section className="w-full max-w-[1400px] px-10 relative overflow-visible">
            <div className="flex flex-col mb-20">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6 font-sans">
                    {t(`${T_PREFIX}.pdpAnalysis.sectionLabel`)}
                </span>
                <h2 className="text-[32px] sm:text-5xl md:text-7xl font-heading font-black tracking-[-0.04em] leading-[1.15] text-slate-900">
                    {t(`${T_PREFIX}.pdpAnalysis.title1`)}
                    <br />
                    <span className="text-brand-primary">{t(`${T_PREFIX}.pdpAnalysis.title2`)}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left: Extracted elements grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="lg:col-span-7 rounded-[32px] bg-white border border-slate-200 shadow-sm p-10 relative overflow-hidden group"
                >
                    <p className="text-xl text-slate-600 leading-relaxed font-light mb-10 max-w-lg">
                        {t(`${T_PREFIX}.pdpAnalysis.description`)}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {PDP_ELEMENTS.map(({ key, icon: Icon, delay }) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                                    <Icon className="w-5 h-5 text-indigo-500" />
                                </div>
                                <span className="text-sm font-bold text-slate-700">
                                    {t(`${T_PREFIX}.pdpAnalysis.elements.${key}`)}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-indigo-50/40 blur-[80px] rounded-full group-hover:bg-indigo-100/40 transition-all duration-1000" />
                </motion.div>

                {/* Right: Auto-scroll chat with 5 Q&A pairs */}
                <ChatWindow
                    translationPrefix={`${T_PREFIX}.pdpAnalysis.chat`}
                    t={t}
                    className="lg:col-span-5 rounded-[32px] bg-slate-900 text-white flex flex-col relative overflow-hidden h-[540px]"
                />
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Section 2: Keyword vs Context Understanding
   ───────────────────────────────────────────── */

function HallucinationSection({ t }: { t: (key: string) => string }) {
    return (
        <section className="w-full max-w-[1400px] px-10 relative overflow-visible">
            <div className="flex flex-col mb-20 items-end text-right">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6 font-sans">
                    {t(`${T_PREFIX}.hallucination.sectionLabel`)}
                </span>
                <h2 className="text-[32px] sm:text-5xl md:text-7xl font-heading font-black tracking-[-0.04em] leading-[1.15] text-slate-900">
                    {t(`${T_PREFIX}.hallucination.title1`)}
                    <br />
                    <span className="text-brand-primary">{t(`${T_PREFIX}.hallucination.title2`)}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Keyword-based chatbot - Limited */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="rounded-[32px] bg-white border border-slate-200 shadow-sm p-10 relative overflow-hidden group hover:border-red-200 transition-colors duration-500"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="text-lg font-extrabold text-slate-900">
                            {t(`${T_PREFIX}.hallucination.generic.label`)}
                        </span>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">
                        {t(`${T_PREFIX}.hallucination.generic.description`)}
                    </p>

                    {/* Question */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-4">
                        <p className="text-sm text-slate-600 font-medium">
                            &ldquo;{t(`${T_PREFIX}.hallucination.sharedQuestion`)}&rdquo;
                        </p>
                    </div>

                    {/* Failure answer */}
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 mb-6">
                        <p className="text-slate-700 text-sm leading-relaxed font-medium">
                            {t(`${T_PREFIX}.hallucination.generic.answer`)}
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-2 text-[11px] text-red-500 font-bold bg-red-50 border border-red-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {t(`${T_PREFIX}.hallucination.generic.tag`)}
                    </div>

                    <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-red-50/30 blur-[60px] rounded-full" />
                </motion.div>

                {/* Pavy.ai - Context Understanding */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="rounded-[32px] bg-white border border-slate-200 shadow-sm p-10 relative overflow-hidden group hover:border-emerald-200 transition-colors duration-500"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                            <AIIcon family="wave" className="w-5 h-5 text-indigo-500" glass={false} />
                        </div>
                        <span className="text-lg font-extrabold text-slate-900">
                            {t(`${T_PREFIX}.hallucination.PavyAI.label`)}
                        </span>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">
                        {t(`${T_PREFIX}.hallucination.PavyAI.description`)}
                    </p>

                    {/* Same question */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-4">
                        <p className="text-sm text-slate-600 font-medium">
                            &ldquo;{t(`${T_PREFIX}.hallucination.sharedQuestion`)}&rdquo;
                        </p>
                    </div>

                    {/* Smart answer */}
                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 mb-4">
                        <p className="text-slate-700 text-sm leading-relaxed font-medium">
                            {t(`${T_PREFIX}.hallucination.PavyAI.answer`)}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 text-[11px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {t(`${T_PREFIX}.hallucination.PavyAI.source`)}
                        </span>
                        <span className="inline-flex items-center gap-2 text-[11px] text-brand-primary font-bold bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {t(`${T_PREFIX}.hallucination.PavyAI.tag`)}
                        </span>
                    </div>

                    <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-emerald-50/30 blur-[60px] rounded-full" />
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Section 3: Review Intelligence
   ───────────────────────────────────────────── */

const REVIEWS = [
    { key: 'r1', rating: 5 },
    { key: 'r2', rating: 4 },
    { key: 'r3', rating: 5 },
] as const;

function ReviewIntelligenceSection({ t }: { t: (key: string) => string }) {
    return (
        <section className="w-full max-w-[1400px] px-10 relative overflow-visible">
            <div className="flex flex-col mb-20">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6 font-sans">
                    {t(`${T_PREFIX}.reviewIntelligence.sectionLabel`)}
                </span>
                <h2 className="text-[32px] sm:text-5xl md:text-7xl font-heading font-black tracking-[-0.04em] leading-[1.15] text-slate-900">
                    {t(`${T_PREFIX}.reviewIntelligence.title1`)}
                    <br />
                    <span className="text-brand-primary">{t(`${T_PREFIX}.reviewIntelligence.title2`)}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Left: Description + review count */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="md:col-span-5 rounded-[32px] bg-brand-primary text-white p-12 flex flex-col justify-center gap-10 relative overflow-hidden h-[600px] shadow-xl shadow-indigo-500/10"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

                    <div className="relative z-10">
                        <p className="text-xl text-indigo-100 leading-relaxed font-medium max-w-sm">
                            {t(`${T_PREFIX}.reviewIntelligence.description`)}
                        </p>
                    </div>

                    {/* Review cards */}
                    <div className="relative z-10 flex flex-col gap-3">
                        {REVIEWS.map(({ key, rating }, idx) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                viewport={{ once: true }}
                                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-white/80">
                                        {t(`${T_PREFIX}.reviewIntelligence.reviews.${key}.author`)}
                                    </span>
                                    <div className="flex items-center gap-0.5 ml-auto">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < rating ? 'text-amber-300 fill-amber-300' : 'text-white/20'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed">
                                    {t(`${T_PREFIX}.reviewIntelligence.reviews.${key}.text`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Auto-scroll chat with 5 review-based Q&A pairs */}
                <ChatWindow
                    translationPrefix={`${T_PREFIX}.reviewIntelligence.chat`}
                    t={t}
                    className="md:col-span-7 rounded-[32px] bg-slate-900 text-white flex flex-col relative overflow-hidden h-[600px]"
                />
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Section 4: Friction Reduction
   ───────────────────────────────────────────── */

const BEFORE_STEPS = [
    { key: 's1', icon: Search },
    { key: 's2', icon: MousePointerClick },
    { key: 's3', icon: Search },
    { key: 's4', icon: MousePointerClick },
    { key: 's5', icon: ExternalLink },
    { key: 's6', icon: LogOut },
] as const;

const AFTER_STEPS = [
    { key: 's1', icon: MessageCircle },
    { key: 's2', icon: Zap },
    { key: 's3', icon: ShoppingCart },
] as const;

function FrictionReductionSection({ t }: { t: (key: string) => string }) {
    return (
        <section className="w-full max-w-[1400px] px-10 relative overflow-visible">
            <div className="flex flex-col mb-20 items-center text-center">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6 font-sans">
                    {t(`${T_PREFIX}.frictionReduction.sectionLabel`)}
                </span>
                <h2 className="text-[32px] sm:text-5xl md:text-7xl font-heading font-black tracking-[-0.04em] leading-[1.15] text-slate-900">
                    {t(`${T_PREFIX}.frictionReduction.title1`)}
                    <br />
                    <span className="text-brand-primary">{t(`${T_PREFIX}.frictionReduction.title2`)}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Before */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="md:col-span-5 rounded-[32px] bg-white border border-slate-200 shadow-sm p-10 relative overflow-hidden flex flex-col"
                >
                    <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-slate-400 mb-6 block">
                        {t(`${T_PREFIX}.frictionReduction.before.label`)}
                    </span>

                    <div className="space-y-3 mb-8 flex-grow">
                        {BEFORE_STEPS.map(({ key, icon: Icon }, idx) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 text-sm text-slate-500"
                            >
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-slate-400" />
                                </div>
                                <span className="font-medium">
                                    {t(`${T_PREFIX}.frictionReduction.before.${key}`)}
                                </span>
                                {idx < BEFORE_STEPS.length - 1 && (
                                    <div className="ml-auto w-4 h-px bg-slate-200" />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
                        <span className="text-3xl font-black text-slate-300">
                            {t(`${T_PREFIX}.frictionReduction.before.time`)}
                        </span>
                        <span className="text-sm font-bold text-red-400">
                            {t(`${T_PREFIX}.frictionReduction.before.result`)}
                        </span>
                    </div>
                </motion.div>

                {/* After */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="md:col-span-4 rounded-[32px] bg-white border border-indigo-200 shadow-sm p-10 relative overflow-hidden flex flex-col"
                >
                    <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6 block">
                        {t(`${T_PREFIX}.frictionReduction.after.label`)}
                    </span>

                    <div className="space-y-4 mb-8 flex-grow">
                        {AFTER_STEPS.map(({ key, icon: Icon }, idx) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + idx * 0.15 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 text-sm text-slate-700"
                            >
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-indigo-500" />
                                </div>
                                <span className="font-bold">
                                    {t(`${T_PREFIX}.frictionReduction.after.${key}`)}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 pt-6 border-t border-indigo-100">
                        <span className="text-3xl font-black text-brand-primary">
                            {t(`${T_PREFIX}.frictionReduction.after.time`)}
                        </span>
                        <span className="text-sm font-bold text-emerald-500">
                            {t(`${T_PREFIX}.frictionReduction.after.result`)}
                        </span>
                    </div>
                </motion.div>

                {/* Metric */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="md:col-span-3 rounded-[32px] bg-brand-primary text-white p-10 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-xl shadow-indigo-500/10"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

                    <div className="relative z-10">
                        <motion.span
                            className="text-7xl font-black tracking-tighter block mb-4"
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', delay: 0.6, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            {t(`${T_PREFIX}.frictionReduction.metric.value`)}
                        </motion.span>
                        <span className="text-sm font-bold text-indigo-200 uppercase tracking-wider">
                            {t(`${T_PREFIX}.frictionReduction.metric.label`)}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Section 5: Admin Dashboard
   ───────────────────────────────────────────── */

const ADMIN_FEATURES = ['funnel', 'trends', 'pages'] as const;

function AdminSection({ t }: { t: (key: string) => string }) {
    return (
        <section className="w-full max-w-[1400px] px-10 relative overflow-visible">
            <div className="flex flex-col mb-24 items-end text-right">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6 font-sans">
                    {t(`${T_PREFIX}.admin.sectionLabel`)}
                </span>
                <h2 className="text-[32px] sm:text-5xl md:text-7xl font-heading font-black tracking-[-0.04em] leading-[1.15] text-slate-900">
                    {t(`${T_PREFIX}.admin.title1`)}
                    <br />
                    <span className="text-brand-primary">{t(`${T_PREFIX}.admin.title2`)}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Visual - Admin Screenshot */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="relative group"
                >
                    <div className="absolute inset-0 bg-indigo-100/50 blur-[100px] rounded-full pointer-events-none group-hover:bg-indigo-200/50 transition-colors duration-1000" />
                    <div className="relative rounded-[40px] border border-slate-200 bg-white overflow-hidden shadow-2xl p-4 shadow-slate-900/10">
                        <div className="rounded-[32px] overflow-hidden border border-slate-100 bg-slate-50">
                            <img
                                src={adminScreenshot}
                                alt="Admin Dashboard"
                                className="w-full h-auto drop-shadow-sm"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Content - Feature list */}
                <div className="flex flex-col gap-6">
                    <p className="text-xl text-slate-600 leading-relaxed font-light mb-4">
                        {t(`${T_PREFIX}.admin.description`)}
                    </p>

                    {ADMIN_FEATURES.map((key, idx) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            viewport={{ once: true }}
                            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-md transition-all duration-300"
                        >
                            <h4 className="text-lg font-extrabold text-slate-900 mb-2 tracking-tight">
                                {t(`${T_PREFIX}.admin.features.${key}`)}
                            </h4>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                {t(`${T_PREFIX}.admin.features.${key}Desc`)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   CTA
   ───────────────────────────────────────────── */

function HeroAnimatedChatWindow({ t }: { t: (key: string) => string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [visiblePairs, setVisiblePairs] = useState(0);

    useEffect(() => {
        const pairDelays = [1.5, 5.5, 9.0, 12.5];
        const timers = pairDelays.map((d, i) =>
            setTimeout(() => setVisiblePairs(i + 1), d * 1000),
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (visiblePairs === 0) return;
        const scrollTo = () =>
            scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        const t1 = setTimeout(scrollTo, 50);
        const t2 = setTimeout(scrollTo, 800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [visiblePairs]);

    return (
        <motion.div
            className="absolute right-0 lg:-right-4 bottom-[-40px] w-[350px] md:w-[400px] rounded-[24px] border border-slate-200 bg-white shadow-[0_30px_80px_-15px_rgba(0,0,0,0.3)] z-30 overflow-hidden hidden lg:flex flex-col h-[500px]"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
        >
            {/* Header */}
            <div className="bg-brand-primary text-white p-4 flex items-center gap-3 shrink-0 relative z-10 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-white shrink-0 overflow-hidden border border-slate-100 shadow-sm relative">
                    <div className="absolute inset-0 flex items-center justify-center scale-[0.55]">
                        <AIIcon family="wave" glass={false} />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-sm m-0 leading-tight">{t('hero.chatbot.name')}</h4>
                    <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse shadow-[0_0_8px_rgba(110,231,183,1)]" />
                        {t('hero.chatbot.status')}
                    </span>
                </div>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto overflow-x-hidden bg-slate-50 relative hero-chat-scrollbar">
                <style>{`
                    .hero-chat-scrollbar::-webkit-scrollbar { width: 6px; }
                    .hero-chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .hero-chat-scrollbar::-webkit-scrollbar-thumb { background-color: transparent; border-radius: 10px; }
                    .hero-chat-scrollbar:hover::-webkit-scrollbar-thumb,
                    .hero-chat-scrollbar:active::-webkit-scrollbar-thumb { background-color: #4f46e5; }
                `}</style>
                <div className="flex flex-col gap-4 w-full pb-4">
                    {[1, 2, 3, 4].slice(0, visiblePairs).map((n) => (
                        <div key={n} className="flex flex-col gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="self-end bg-white border border-slate-200 text-slate-800 p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm"
                            >
                                {t(`hero.chatbot.userMsg${n}`)}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.3 }}
                                className="self-start bg-brand-primary text-white p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm shadow-md"
                            >
                                <TypingText text={t(`hero.chatbot.botMsg${n}`)} delay={1.0} />
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Input Placeholder */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0 relative z-10 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
                <div className="bg-slate-100 rounded-full h-10 px-4 flex items-center text-slate-400 text-sm">
                    {t('hero.chatbot.inputPlaceholder')}
                </div>
            </div>
        </motion.div>
    );
}

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
    const words = text.split(' ');
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: delay },
                },
            }}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                    className="inline-block mr-[4px]"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}

function CTASection({ t }: { t: (key: string) => string }) {
    return (
        <section className="w-full max-w-[1400px] px-10 py-40 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-[42px] sm:text-[60px] md:text-[70px] lg:text-[90px] xl:text-[95px] font-heading font-black tracking-tight mb-16 text-slate-900 break-keep flex flex-col gap-2 md:gap-1 leading-[1.1]">
                    <span>{t(`${T_PREFIX}.cta.title1`)}</span>
                    <span className="text-brand-primary">{t(`${T_PREFIX}.cta.title2`)}</span>
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button className="bg-brand-primary text-white px-12 py-5 rounded-full font-extrabold text-lg hover:bg-indigo-700 transition-all duration-300 active:scale-95 shadow-lg shadow-indigo-500/20">
                        {t(`${T_PREFIX}.cta.startFree`)}
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
