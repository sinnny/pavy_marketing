import { motion } from 'framer-motion';
import { useTranslation } from '@page-chatbot/i18n';
import widgetScreenshot from '../assets/widget-screenshot.png';

export default function SolutionSection() {
    const { t } = useTranslation('site');

    return (
        <section className="w-full max-w-[1400px] px-10 relative overflow-visible">
            <div className="flex flex-col mb-24 items-end text-right">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6 font-sans">{t('solution.sectionLabel')}</span>
                <h2 className="text-[32px] sm:text-5xl md:text-7xl font-heading font-black tracking-[-0.04em] leading-[1.15] text-slate-900">
                    {t('solution.title1')}<br />
                    <span className="text-brand-primary">{t('solution.title2')}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Visual - Widget Screenshot in a spatial container */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="relative group"
                >
                    <div className="absolute inset-0 bg-indigo-100/50 blur-[100px] rounded-full pointer-events-none group-hover:bg-indigo-200/50 transition-colors duration-1000"></div>
                    <div className="relative rounded-[40px] border border-slate-200 bg-white overflow-hidden shadow-2xl p-4 shadow-slate-900/10">
                        <div className="rounded-[32px] overflow-hidden border border-slate-100 bg-slate-50">
                            <img src={widgetScreenshot} alt="Chatbot UI" className="w-full h-auto drop-shadow-sm" />
                        </div>
                    </div>
                    {/* Floating pill */}
                    <div className="absolute -top-6 -right-6 bg-white text-slate-900 border border-slate-100 px-6 py-3 rounded-full font-bold text-sm shadow-xl z-10 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        {t('solution.floatingPill')}
                    </div>
                </motion.div>

                {/* Content */}
                <div className="flex flex-col gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl font-extrabold mb-6 tracking-tight text-slate-900 italic">{t('solution.steps.step1.title')}</h3>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            {t('solution.steps.step1.description')}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-3xl font-extrabold mb-6 tracking-tight text-slate-900 italic">{t('solution.steps.step2.title')}</h3>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            {t('solution.steps.step2.description')}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 className="text-3xl font-extrabold mb-6 tracking-tight text-slate-900 italic">{t('solution.steps.step3.title')}</h3>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            {t('solution.steps.step3.description')}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
