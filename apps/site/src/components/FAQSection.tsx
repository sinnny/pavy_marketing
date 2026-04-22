import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@pavy/i18n';

const DEFAULT_FAQ_KEYS = ['q1', 'q2'] as const;

interface FAQSectionProps {
    sectionLabelKey?: string;
    titleKey?: string;
    itemKeys?: readonly string[];
    itemKeyPrefix?: string;
}

export default function FAQSection({
    sectionLabelKey = 'faq.sectionLabel',
    titleKey = 'faq.title',
    itemKeys = DEFAULT_FAQ_KEYS,
    itemKeyPrefix = 'faq.items',
}: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const { t } = useTranslation('site');

    return (
        <section className="w-full max-w-[1200px] px-10 relative overflow-visible">
            <div className="flex flex-col mb-20">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6 font-sans">{t(sectionLabelKey)}</span>
                <h2 className="text-[32px] sm:text-5xl font-heading font-black tracking-[-0.04em] text-slate-900">
                    {t(titleKey)}
                </h2>
            </div>

            <div className="space-y-4 max-w-2xl">
                {itemKeys.map((key, idx) => (
                    <div
                        key={key}
                        className="py-10 border-b border-slate-200 group cursor-pointer"
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    >
                        <div className="flex items-center justify-between gap-10">
                            <h3 className="text-2xl font-extrabold text-slate-900 group-hover:translate-x-2 transition-transform duration-500">{t(`${itemKeyPrefix}.${key}.question`)}</h3>
                            <span className={`text-3xl font-light text-slate-400 transition-transform duration-500 ${openIndex === idx ? 'rotate-45 text-indigo-500' : ''}`}>+</span>
                        </div>
                        <AnimatePresence>
                            {openIndex === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className="pt-8 text-xl text-slate-600 font-medium leading-relaxed">
                                        {t(`${itemKeyPrefix}.${key}.answer`)}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
