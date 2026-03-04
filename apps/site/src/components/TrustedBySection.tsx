import { motion } from 'framer-motion';
import { useTranslation } from '@pavy/i18n';

const MOCK_LOGOS = [
    "AURA", "NEXUS", "QUANTUM", "HYPERION", "STARK", "WAYNE", "MONO", "ORBIT", "FLUX"
];

export default function TrustedBySection() {
    const { t } = useTranslation('site');

    return (
        <section className="w-full py-20 border-y border-slate-200 bg-slate-50 overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto px-10 mb-12 text-center">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500">
                    {t('trustedBy.sectionLabel')}
                </span>
            </div>

            <div className="relative flex overflow-x-hidden w-full group">
                <motion.div
                    className="flex space-x-24 whitespace-nowrap py-4 px-12 items-center"
                    animate={{ x: [0, -1200] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    {[...MOCK_LOGOS, ...MOCK_LOGOS, ...MOCK_LOGOS].map((logo, idx) => (
                        <div key={idx} className="text-2xl md:text-4xl font-black tracking-[-0.08em] text-slate-300 hover:text-brand-primary transition-colors duration-700 select-none cursor-default font-heading">
                            {logo}
                        </div>
                    ))}
                </motion.div>

                {/* Extreme Fade Out Gradients */}
                <div className="absolute top-0 left-0 w-60 h-full bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10"></div>
                <div className="absolute top-0 right-0 w-60 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10"></div>
            </div>
        </section>
    );
}
