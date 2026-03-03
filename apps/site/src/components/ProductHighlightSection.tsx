import { motion } from 'framer-motion';
import { useTranslation } from '@page-chatbot/i18n';

export default function ProductHighlightSection() {
    const { t } = useTranslation('site');
    const T_PREFIX = 'pages.productChatbot.productHighlight';

    return (
        <section className="w-full max-w-[1400px] px-10 relative overflow-visible">
            <div className="flex flex-col mb-24 items-center text-center">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6 font-sans">{t(`${T_PREFIX}.sectionLabel`)}</span>
                <h2 className="text-[32px] sm:text-5xl md:text-7xl font-heading font-black tracking-[-0.04em] leading-[1.15] text-slate-900">
                    {t(`${T_PREFIX}.title1`)}<br />
                    <span className="text-brand-primary">{t(`${T_PREFIX}.title2`)}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: Performance Bento */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="h-[600px] rounded-[48px] bg-brand-primary border border-indigo-500 p-16 flex flex-col justify-between group overflow-hidden relative text-white shadow-xl shadow-indigo-500/10"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-indigo-400/20 to-transparent blur-2xl group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="relative z-10">
                        <h3 className="text-4xl font-extrabold mb-8 tracking-tight">{t(`${T_PREFIX}.accuracy.title`)}</h3>
                        <p className="text-2xl text-indigo-100 leading-relaxed font-medium max-w-sm">
                            {t(`${T_PREFIX}.accuracy.description`)}
                        </p>
                    </div>
                    <div className="relative z-10">
                        <div className="h-px w-full bg-indigo-400/50 mb-8"></div>
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-200">{t(`${T_PREFIX}.accuracy.metricLabel`)}</span>
                            <span className="text-8xl font-black text-white tracking-tighter">{t(`${T_PREFIX}.accuracy.metricValue`)}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Feature Bento List */}
                <div className="grid grid-cols-1 gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-[280px] rounded-[40px] bg-white border border-slate-200 p-10 flex flex-col justify-center group hover:border-indigo-300 hover:shadow-lg transition-all duration-500 shadow-sm"
                    >
                        <h4 className="text-2xl font-extrabold mb-4 tracking-tight text-slate-900">{t(`${T_PREFIX}.globalSupport.title`)}</h4>
                        <p className="text-slate-600 text-lg font-medium">{t(`${T_PREFIX}.globalSupport.description`)}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-[280px] rounded-[40px] bg-slate-900 text-white p-12 flex flex-col justify-center group shadow-xl"
                    >
                        <h4 className="text-2xl font-extrabold mb-4 tracking-tight uppercase text-white">{t(`${T_PREFIX}.enterprise.title`)}</h4>
                        <p className="text-slate-300 font-semibold text-lg leading-relaxed">{t(`${T_PREFIX}.enterprise.description`)}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

