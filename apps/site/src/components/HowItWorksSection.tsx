import { motion } from 'framer-motion';
import { useTranslation } from '@page-chatbot/i18n';

const STEP_KEYS = ['step1', 'step2', 'step3'] as const;

export default function HowItWorksSection() {
    const { t } = useTranslation('site');

    return (
        <section className="w-full max-w-[1400px] px-10 relative overflow-visible">
            <div className="flex flex-col mb-32">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6 font-sans">{t('howItWorks.sectionLabel')}</span>
                <h2 className="text-[32px] sm:text-5xl md:text-7xl font-heading font-black tracking-[-0.04em] leading-[1.15] text-slate-900">
                    {t('howItWorks.title1')}<br />
                    <span className="text-brand-primary">{t('howItWorks.title2')}</span>
                </h2>
            </div>

            <div className="space-y-40 relative">
                {/* Vertical connector line */}
                <div className="absolute left-[30px] top-0 bottom-0 w-px bg-slate-200 hidden md:block"></div>

                {STEP_KEYS.map((key, idx) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: idx * 0.2 }}
                        className="relative flex md:pl-24 group"
                    >
                        {/* Circle on line */}
                        <div className="absolute left-[26px] top-0 w-2 h-2 rounded-full bg-indigo-500 hidden md:block group-hover:scale-[3] transition-transform duration-500 shadow-md shadow-indigo-500/20"></div>

                        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-40">
                            <div className="flex-shrink-0 w-40">
                                <span className="text-5xl font-black text-slate-200 group-hover:text-indigo-200 transition-colors duration-500">0{idx + 1}</span>
                            </div>
                            <div className="max-w-xl">
                                <h3 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight group-hover:translate-x-4 transition-transform duration-500">{t(`howItWorks.steps.${key}.title`)}</h3>
                                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                    {t(`howItWorks.steps.${key}.description`)}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
