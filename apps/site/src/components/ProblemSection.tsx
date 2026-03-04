import { motion } from 'framer-motion';
import { User, Zap, Database, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { AIIcon } from '@pavy/ui';
import { useTranslation } from '@pavy/i18n';

export default function ProblemSection() {
    const { t } = useTranslation('site');

    return (
        <section className="w-full max-w-[1400px] px-10 relative overflow-visible">
            <div className="flex flex-col mb-20">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6 font-sans">{t('problem.sectionLabel')}</span>
                <h2 className="text-[32px] sm:text-5xl md:text-7xl font-heading font-black tracking-[-0.04em] leading-[1.15] text-slate-900">
                    {t('problem.title')}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Big Card - Main Problem */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="md:col-span-8 h-[500px] rounded-[32px] bg-white border border-slate-200 shadow-sm p-12 flex flex-col justify-end group overflow-hidden relative"
                >
                    {/* Meaningful Animation: 10m vs 200ms comparison */}
                    <div className="absolute top-12 left-12 flex flex-col gap-8 w-full max-w-sm z-20">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm font-semibold text-slate-500">
                                <span className="flex items-center gap-2"><User className="w-4 h-4" /> {t('problem.tenMinuteMyth.humanAgent')}</span>
                                <span className="tabular-nums">{t('problem.tenMinuteMyth.humanTime')}</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                                <motion.div className="h-full bg-slate-300 rounded-full" initial={{ width: "0%" }} whileInView={{ width: "100%" }} transition={{ duration: 10, ease: "linear" }} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-base font-bold text-brand-primary">
                                <span className="flex items-center gap-2"><Zap className="w-5 h-5 fill-indigo-100" /> {t('problem.tenMinuteMyth.aiAgent')}</span>
                                <span className="tabular-nums">{t('problem.tenMinuteMyth.aiTime')}</span>
                            </div>
                            <div className="h-3 w-full bg-indigo-50 rounded-full overflow-hidden p-0.5 shadow-inner">
                                <motion.div className="h-full bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.6)]" initial={{ width: "0%" }} whileInView={{ width: "100%" }} transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }} />
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-4xl font-extrabold mb-6 tracking-tight text-slate-900">{t('problem.tenMinuteMyth.title')}</h3>
                        <p className="text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
                            {t('problem.tenMinuteMyth.description')}
                        </p>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-50/50 blur-[80px] rounded-full group-hover:bg-indigo-100/50 transition-all duration-1000"></div>
                </motion.div>

                {/* Small Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="md:col-span-4 h-[500px] rounded-[32px] bg-slate-50 border border-slate-200 shadow-sm p-10 flex flex-col group relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h3 className="text-3xl font-extrabold mb-6 tracking-tight text-slate-900" dangerouslySetInnerHTML={{ __html: t('problem.scalingCosts.title').replace('\n', '<br />') }} />
                        <p className="text-lg text-slate-600 mb-8 font-medium">
                            {t('problem.scalingCosts.description')}
                        </p>
                    </div>

                    {/* Meaningful Animation: Linear vs Flat Cost Curve */}
                    <div className="relative h-40 w-full mt-auto border-l-2 border-b-2 border-slate-200/80 pl-2 pb-2 z-10">
                        {/* Human Cost Line (Linear Up) */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <motion.path d="M 0 100 L 100 10" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="150" initial={{ strokeDashoffset: 150 }} whileInView={{ strokeDashoffset: 0 }} transition={{ duration: 2, ease: "linear", delay: 0.2 }} />
                            {/* AI Cost Line (Flat) */}
                            <motion.path d="M 0 100 Q 30 85 100 80" fill="none" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" strokeDasharray="150" initial={{ strokeDashoffset: 150 }} whileInView={{ strokeDashoffset: 0 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }} />
                        </svg>
                        <motion.div className="absolute top-2 right-0 text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-50 px-1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2 }}>{t('problem.scalingCosts.humanCost')}</motion.div>
                        <motion.div className="absolute bottom-6 right-0 text-[10px] uppercase font-bold tracking-wider text-brand-primary bg-slate-50 px-1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5 }}>{t('problem.scalingCosts.aiCost')}</motion.div>
                    </div>
                </motion.div>

                {/* Wide Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="md:col-span-5 h-[400px] rounded-[32px] bg-white border border-slate-200 shadow-sm p-10 flex flex-col relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <h3 className="text-3xl font-extrabold mb-6 tracking-tight text-slate-900">{t('problem.hallucination.title')}</h3>
                        <p className="text-lg text-slate-600 relative z-10 font-medium">
                            {t('problem.hallucination.description')}
                        </p>
                    </div>

                    {/* Meaningful Animation: Document Verification Flow */}
                    <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center">
                        <div className="relative w-full max-w-[340px] h-32 flex items-center justify-between px-10">
                            {/* Source document */}
                            <div className="flex flex-col items-center gap-2 z-10 bg-white p-2 rounded-xl">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-inner">
                                    <Database className="w-6 h-6 text-indigo-500" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('problem.hallucination.yourDocs')}</span>
                            </div>

                            {/* Animated line representing data flow */}
                            <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-[40%] h-0.5 bg-slate-100 -z-10">
                                <motion.div
                                    className="h-full bg-indigo-400"
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                                />
                            </div>

                            {/* AI Agent generating verified answer */}
                            <div className="flex flex-col items-center gap-2 z-10 bg-white p-2 rounded-xl">
                                <div className="w-16 h-16 rounded-[20px] bg-white border-2 border-indigo-500 flex items-center justify-center relative shadow-[0_8px_30px_-10px_rgba(79,70,229,0.3)]">
                                    <AIIcon family="wave" className="w-8 h-8 flex items-center justify-center text-brand-primary" glass={false} />
                                    <motion.div
                                        className="absolute -top-3 -right-3 bg-white rounded-full p-1 drop-shadow-sm"
                                        initial={{ scale: 0, rotate: -45 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", delay: 0.8, duration: 0.6 }}
                                    >
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-50" />
                                    </motion.div>
                                </div>
                                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">{t('problem.hallucination.verified')}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tall Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="md:col-span-7 h-[400px] rounded-[32px] bg-brand-primary shadow-lg text-white p-10 flex flex-col justify-center relative overflow-hidden group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-indigo-700 opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-1000"></div>

                    {/* Meaningful Animation: Circular Gauge filling up */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-12 w-64 h-64 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-indigo-900" />
                            <motion.circle
                                cx="50" cy="50" r="40"
                                fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
                                className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                strokeDasharray="251.2"
                                initial={{ strokeDashoffset: 251.2 }}
                                whileInView={{ strokeDashoffset: 40.192 }}
                                transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                            />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-bold mb-4 opacity-80">
                            <BrainCircuit className="w-4 h-4" /> {t('problem.metric.label')}
                        </span>
                        <h3 className="text-6xl font-black tracking-[-0.05em] leading-none mb-8">{t('problem.metric.value')}</h3>
                        <p className="text-xl font-semibold opacity-90 max-w-sm">{t('problem.metric.description')}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
