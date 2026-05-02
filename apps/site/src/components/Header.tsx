import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useTranslation } from '@pavy/i18n';
import { PavyLogo } from '@pavy/ui';
import { useLocale } from '../hooks/useLocale';
import LanguageSwitcher from './LanguageSwitcher';
import { trackEvent } from '../lib/analytics';
import { getSignupUrl } from '../lib/signup';

export default function Header() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { t } = useTranslation('site');
    const { localePath } = useLocale();
    const location = useLocation();

    useEffect(() => {
        return scrollY.on('change', (latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    // Close drawer when route changes (after a nav link click)
    useEffect(() => {
        setIsMobileOpen(false);
    }, [location.pathname]);

    // Lock body scroll while drawer is open + close on Escape
    useEffect(() => {
        if (!isMobileOpen) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMobileOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener('keydown', onKey);
        };
    }, [isMobileOpen]);

    const isPricingActive = location.pathname.includes('/pricing');
    const isDocsActive = location.pathname.includes('/docs');

    const handleCTAClick = (ctaText: string) => {
        trackEvent('click_header_cta', {
            cta_text: ctaText,
        });
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm' : 'py-8 bg-transparent'
                }`}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center">
                {/* Logo area */}
                <div className="flex-1 flex justify-start">
                    <Link to={localePath('/')} className="flex items-center group cursor-pointer transition-transform duration-500 hover:scale-[1.02]">
                        <PavyLogo variant="horizontal" size="md" theme="light" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-10 text-[13px] uppercase tracking-[0.1em] font-bold text-slate-500">
                    <div className="relative group/nav py-4">
                        <button className="flex items-center gap-1 hover:text-brand-primary transition-colors duration-300 text-[13px] uppercase tracking-[0.1em] font-bold">
                            {t('header.nav.products')} <ChevronDown className="w-3 h-3 group-hover/nav:-rotate-180 transition-transform duration-300" />
                        </button>
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300 z-50">
                            <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-3 w-56 flex flex-col gap-1">
                                <Link to={localePath('/product/chatbot')} className="px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-brand-primary transition-colors duration-300 text-left">
                                    <div className="font-bold text-slate-900 mb-0.5">{t('header.nav.chatbot')}</div>
                                    <div className="text-[10px] text-slate-500 tracking-normal normal-case font-medium">{t('header.nav.chatbotDesc')}</div>
                                </Link>
                                <Link to={localePath('/product/dashboard')} className="px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-brand-primary transition-colors duration-300 text-left">
                                    <div className="font-bold text-slate-900 mb-0.5">{t('header.nav.admin')}</div>
                                    <div className="text-[10px] text-slate-500 tracking-normal normal-case font-medium">{t('header.nav.adminDesc')}</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Link to={localePath('/pricing')} className={`transition-colors duration-300 py-4 whitespace-nowrap ${isPricingActive ? 'text-brand-primary' : 'hover:text-brand-primary'}`}>{t('header.nav.pricing')}</Link>
                    <Link to={localePath('/customers')} className={`transition-colors duration-300 py-4 whitespace-nowrap ${location.pathname.includes('/customers') ? 'text-brand-primary' : 'hover:text-brand-primary'}`}>{t('header.nav.customers')}</Link>
                    <Link to={localePath('/blog')} className={`transition-colors duration-300 py-4 whitespace-nowrap ${location.pathname.includes('/blog') ? 'text-brand-primary' : 'hover:text-brand-primary'}`}>{t('header.nav.blog')}</Link>
                    <Link to={localePath('/docs/getting-started/quick-start')} className={`transition-colors duration-300 py-4 whitespace-nowrap ${isDocsActive ? 'text-brand-primary' : 'hover:text-brand-primary'}`}>{t('header.nav.userGuide')}</Link>
                </nav>

                {/* CTA area */}
                <div className="flex-1 flex items-center justify-end gap-3 lg:gap-4">
                    <div className="hidden sm:block">
                        <LanguageSwitcher />
                    </div>
                    <button
                        onClick={() => handleCTAClick('Login')}
                        className="hidden lg:block text-[13px] uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-brand-primary transition-colors"
                    >
                        {t('header.cta.login')}
                    </button>
                    <a
                        href={getSignupUrl()}
                        onClick={() => handleCTAClick('Get Started')}
                        className="hidden sm:inline-flex bg-brand-primary text-white px-6 py-2.5 rounded-full text-[13px] uppercase tracking-[0.1em] font-extrabold hover:bg-indigo-700 transition-all duration-300 active:scale-95 shadow-md shadow-indigo-500/20"
                    >
                        {t('header.cta.getDemo')}
                    </a>
                    {/* Mobile hamburger — visible below lg */}
                    <button
                        type="button"
                        onClick={() => setIsMobileOpen(true)}
                        className="lg:hidden p-2 -mr-2 text-slate-700 hover:text-brand-primary transition-colors"
                        aria-label="Open menu"
                        aria-expanded={isMobileOpen}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <MobileDrawer
                isOpen={isMobileOpen}
                onClose={() => setIsMobileOpen(false)}
                t={t}
                localePath={localePath}
                onCTAClick={handleCTAClick}
            />
        </motion.header>
    );
}

/* ─────────────────────────────────────────────
   Mobile drawer — slides from right, full nav
   ───────────────────────────────────────────── */

function MobileDrawer({
    isOpen,
    onClose,
    t,
    localePath,
    onCTAClick,
}: {
    isOpen: boolean;
    onClose: () => void;
    t: (key: string) => string;
    localePath: (p: string) => string;
    onCTAClick: (label: string) => void;
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                    />
                    {/* Drawer panel */}
                    <motion.aside
                        className="fixed top-0 right-0 bottom-0 z-[70] w-[88%] max-w-[400px] bg-white shadow-2xl lg:hidden flex flex-col"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Drawer header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                            <PavyLogo variant="horizontal" size="sm" theme="light" />
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-2 -mr-2 text-slate-500 hover:text-slate-900 transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Drawer body — scrollable nav */}
                        <div className="flex-1 overflow-y-auto px-6 py-6">
                            <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-400 mb-3">
                                {t('header.nav.products')}
                            </div>
                            <Link
                                to={localePath('/product/chatbot')}
                                className="block px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-brand-primary transition-colors mb-1"
                            >
                                <div className="font-bold text-slate-900">{t('header.nav.chatbot')}</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">{t('header.nav.chatbotDesc')}</div>
                            </Link>
                            <Link
                                to={localePath('/product/dashboard')}
                                className="block px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-brand-primary transition-colors mb-6"
                            >
                                <div className="font-bold text-slate-900">{t('header.nav.admin')}</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">{t('header.nav.adminDesc')}</div>
                            </Link>

                            <div className="border-t border-slate-100 pt-6 space-y-1">
                                <Link
                                    to={localePath('/pricing')}
                                    className="block px-4 py-3 rounded-xl text-[15px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-primary transition-colors"
                                >
                                    {t('header.nav.pricing')}
                                </Link>
                                <Link
                                    to={localePath('/customers')}
                                    className="block px-4 py-3 rounded-xl text-[15px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-primary transition-colors"
                                >
                                    {t('header.nav.customers')}
                                </Link>
                                <Link
                                    to={localePath('/blog')}
                                    className="block px-4 py-3 rounded-xl text-[15px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-primary transition-colors"
                                >
                                    {t('header.nav.blog')}
                                </Link>
                                <Link
                                    to={localePath('/docs/getting-started/quick-start')}
                                    className="block px-4 py-3 rounded-xl text-[15px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-primary transition-colors"
                                >
                                    {t('header.nav.userGuide')}
                                </Link>
                            </div>

                            <div className="border-t border-slate-100 mt-6 pt-6 sm:hidden">
                                <LanguageSwitcher />
                            </div>
                        </div>

                        {/* Drawer footer — CTAs */}
                        <div className="border-t border-slate-100 px-6 py-5 space-y-3 bg-slate-50/50">
                            <button
                                onClick={() => {
                                    onCTAClick('Login');
                                    onClose();
                                }}
                                className="block w-full text-center text-[13px] uppercase tracking-[0.2em] font-bold text-slate-600 hover:text-brand-primary transition-colors py-2"
                            >
                                {t('header.cta.login')}
                            </button>
                            <a
                                href={getSignupUrl()}
                                onClick={() => onCTAClick('Get Started')}
                                className="block w-full text-center bg-brand-primary text-white px-6 py-3.5 rounded-full text-[13px] uppercase tracking-[0.1em] font-extrabold hover:bg-indigo-700 transition-all active:scale-[0.98] shadow-md shadow-indigo-500/20"
                            >
                                {t('header.cta.getDemo')}
                            </a>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
