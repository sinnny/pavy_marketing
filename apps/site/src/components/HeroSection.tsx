import { useRef, useEffect, useCallback } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AIIcon } from '@pavy/ui';
import { useTranslation } from '@pavy/i18n';
import { getSiteHeroCopy } from '../lib/siteHero';
import OptimizedImage from './OptimizedImage';
import { trackEvent } from '../lib/analytics';
import { useLocation } from 'react-router-dom';

export default function HeroSection({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const { t } = useTranslation('site');
    const heroCopy = getSiteHeroCopy(t);
    const location = useLocation();
    // Spatial scroll transforms
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
    const translateY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

    const handleCTAClick = () => {
        trackEvent('click_hero_cta', {
            cta_text: t('hero.startBuilding'),
            page: location.pathname,
        });
    };

    return (
        <section className="relative w-full py-32 min-h-screen flex flex-col items-center justify-center overflow-visible">
            <style>
                {`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: transparent;
                    border-radius: 10px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb,
                .custom-scrollbar:active::-webkit-scrollbar-thumb {
                    background-color: #4f46e5;
                }
                `}
            </style>
            {/* Header Content */}
            <div className="max-w-[1400px] mx-auto px-6 w-full flex flex-col items-center z-10 text-center mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-brand-primary text-[11px] uppercase tracking-[0.2em] font-bold mb-10">
                        <AIIcon family="wave" className="w-4 h-4 text-indigo-500" glass={false} />
                        <span>{heroCopy.badge}</span>
                    </div>

                    <h1 className="text-[36px] sm:text-[52px] md:text-[62px] lg:text-[80px] xl:text-[90px] font-heading font-black tracking-tight mb-16 text-slate-900 selection:bg-indigo-500 selection:text-white break-keep flex flex-col gap-2 md:gap-1 leading-[1.1]">
                        <span>{heroCopy.title1}</span>
                        <span className="text-brand-primary">{heroCopy.title2}</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 mb-16 max-w-2xl lg:max-w-3xl font-medium leading-relaxed">
                        {heroCopy.description}
                    </p>

                    <div className="w-full max-w-lg flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder={t('hero.emailPlaceholder')}
                            className="flex-1 bg-white border border-slate-200 shadow-sm rounded-full px-8 py-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-300"
                        />
                        <button 
                            onClick={handleCTAClick}
                            className="bg-brand-primary text-white px-10 py-5 rounded-full font-bold flex items-center justify-center gap-3 transition-all duration-500 hover:bg-indigo-700 active:scale-95 whitespace-nowrap shadow-lg shadow-indigo-500/20"
                        >
                            {t('hero.startBuilding')}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Direct UI Showcase */}
            <motion.div
                className="relative w-full max-w-[1400px] px-6 lg:px-10"
                style={{ scale, y: translateY }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative flex justify-center w-full">
                    <div className="relative z-20 w-full max-w-[1200px] rounded-[40px] border border-slate-200 bg-white overflow-hidden shadow-2xl p-4 shadow-slate-900/10">
                        <div className="relative rounded-[24px] overflow-hidden border border-slate-100 bg-white w-full h-[600px] flex flex-col lg:flex-row">
                            {/* Left Column - Image */}
                            <div className="w-full lg:w-1/2 bg-gray-900 relative overflow-hidden h-64 lg:h-full shrink-0">
                                <OptimizedImage
                                    src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1080"
                                    alt="Premium Wireless Headphones"
                                    className="object-cover w-full h-full opacity-80 scale-105 transition-transform hover:scale-110 duration-1000"
                                    priority={true}
                                    width={540}
                                    height={600}
                                />
                            </div>
                            {/* Right Column - Product Info */}
                            <div className="w-full lg:w-1/2 bg-white p-8 lg:p-16 flex flex-col justify-center text-left space-y-6 overflow-y-auto">
                                <div className="h-4 w-24 bg-indigo-500/20 rounded"></div>
                                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">{t('hero.product.title')}</h1>
                                <p className="text-gray-500 text-lg leading-relaxed">
                                    {t('hero.product.description')}
                                </p>
                                <div className="h-16 w-full bg-brand-primary hover:bg-indigo-700 transition-colors rounded-xl mt-8 flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-lg shadow-brand-primary/30">
                                    {t('hero.product.addToCart')}
                                </div>

                                <div className="pt-8 border-t border-gray-100 mt-8">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t('hero.product.highlights')}</p>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-4 text-gray-700 font-medium">
                                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                                            <span>{t('hero.product.battery')}</span>
                                        </li>
                                        <li className="flex items-center gap-4 text-gray-700 font-medium">
                                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                                            <span>{t('hero.product.spatialAudio')}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Overlay to subtly fade out the image and focus eyes on chat */}
                            <div className="absolute inset-0 bg-white/40 pointer-events-none transition-all duration-700 hover:bg-transparent z-10"></div>
                        </div>
                    </div>

                    {/* Floating Accent - Animated Chatbot UI */}
                    <AnimatedChatWindow t={t} />
                </div>
            </motion.div>

            {/* Ambient Background Accents */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-50/50 blur-[120px] rounded-full"></div>
            </div>
        </section>
    );
}

function AnimatedChatWindow({ t }: { t: (key: string) => string }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const delays = [1.5, 2.5, 5.5, 6.5, 9.0, 10.0, 12.5, 13.5];
        const timers = delays.map(d => setTimeout(scrollToBottom, d * 1000));
        return () => timers.forEach(clearTimeout);
    }, [scrollToBottom]);

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
                    <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse shadow-[0_0_8px_rgba(110,231,183,1)]"></span>{t('hero.chatbot.status')}</span>
                </div>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto overflow-x-hidden bg-slate-50 relative custom-scrollbar">
                <div className="flex flex-col gap-4 w-full pb-4">
                    {/* Q1: Size */}
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 1.5 }}
                        className="self-end bg-white border border-slate-200 text-slate-800 p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm"
                    >
                        {t('hero.chatbot.userMsg1')}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2, duration: 0.3 }}
                        className="self-start bg-brand-primary text-white p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm shadow-md"
                    >
                        <TypingText text={t('hero.chatbot.botMsg1')} delay={2.5} />
                    </motion.div>

                    {/* Q2: Noise cancellation */}
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 5.5 }}
                        className="self-end bg-white border border-slate-200 text-slate-800 p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm mt-2"
                    >
                        {t('hero.chatbot.userMsg2')}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 6.2, duration: 0.3 }}
                        className="self-start bg-brand-primary text-white p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm shadow-md"
                    >
                        <TypingText text={t('hero.chatbot.botMsg2')} delay={6.5} />
                    </motion.div>

                    {/* Q3: Returns */}
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 9.0 }}
                        className="self-end bg-white border border-slate-200 text-slate-800 p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm mt-2"
                    >
                        {t('hero.chatbot.userMsg3')}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 9.7, duration: 0.3 }}
                        className="self-start bg-brand-primary text-white p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm shadow-md"
                    >
                        <TypingText text={t('hero.chatbot.botMsg3')} delay={10.0} />
                    </motion.div>

                    {/* Q4: Shipping */}
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 12.5 }}
                        className="self-end bg-white border border-slate-200 text-slate-800 p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm mt-2"
                    >
                        {t('hero.chatbot.userMsg4')}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 13.2, duration: 0.3 }}
                        className="self-start bg-brand-primary text-white p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm shadow-md"
                    >
                        <TypingText text={t('hero.chatbot.botMsg4')} delay={13.5} />
                    </motion.div>
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
    const words = text.split(" ");
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: delay }
                }
            }}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                    }}
                    className="inline-block mr-[4px]"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
