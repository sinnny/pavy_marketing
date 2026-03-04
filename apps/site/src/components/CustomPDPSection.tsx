import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { AIIcon } from '@pavy/ui';
import { useTranslation } from '@pavy/i18n';
import type { IconThemeAlias } from '@pavy/types';

interface MockPDP {
    readonly titleKey: string;
    readonly contentKey: string;
    readonly bg: string;
    readonly headerBg: string;
    readonly iconAlias: IconThemeAlias;
}

const mockPDPs: readonly MockPDP[] = [
    {
        titleKey: "pages.productChatbot.customPDP.tabs.ecommerce.title",
        contentKey: "pages.productChatbot.customPDP.tabs.ecommerce.content",
        bg: "bg-rose-50",
        headerBg: "bg-rose-600",
        iconAlias: "coral-rose",
    },
    {
        titleKey: "pages.productChatbot.customPDP.tabs.saas.title",
        contentKey: "pages.productChatbot.customPDP.tabs.saas.content",
        bg: "bg-slate-50",
        headerBg: "bg-brand-primary",
        iconAlias: "blue-orbit",
    },
    {
        titleKey: "pages.productChatbot.customPDP.tabs.travel.title",
        contentKey: "pages.productChatbot.customPDP.tabs.travel.content",
        bg: "bg-emerald-50",
        headerBg: "bg-emerald-600",
        iconAlias: "teal-cyan",
    }
];

export default function CustomPDPSection() {
    const { t } = useTranslation('site');
    const T_PREFIX = 'pages.productChatbot.customPDP';

    return (
        <section className="w-full max-w-[1400px] px-6 lg:px-20 relative overflow-visible flex flex-col items-center">
            <div className="flex flex-col mb-24 items-center text-center">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6 font-sans">{t(`${T_PREFIX}.sectionLabel`)}</span>
                <h2 className="text-[32px] sm:text-5xl md:text-7xl font-heading font-black tracking-[-0.04em] leading-[1.15] text-slate-900 mb-8">
                    {t(`${T_PREFIX}.title1`)}<br />
                    <span className="text-brand-primary">{t(`${T_PREFIX}.title2`)}</span>
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl font-light">
                    {t(`${T_PREFIX}.description`)}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                {mockPDPs.map((pdp, idx) => (
                    <motion.div
                        key={pdp.titleKey}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: idx * 0.2 }}
                        className={`relative h-[500px] rounded-[32px] overflow-hidden border border-slate-200 shadow-xl flex flex-col ${pdp.bg}`}
                    >
                        {/* Mock PDP Content */}
                        <div className="flex-1 p-8 opacity-50">
                            <div className="w-1/3 h-4 bg-slate-300 rounded-full mb-8"></div>
                            <div className="w-3/4 h-8 bg-slate-800 rounded-full mb-4"></div>
                            <div className="w-1/2 h-8 bg-slate-800 rounded-full mb-12"></div>
                            <div className="w-full h-32 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center">
                                <span className="text-slate-400 font-medium">{t(pdp.contentKey)}</span>
                            </div>
                        </div>

                        {/* Floating Mock Chatbot Widget */}
                        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-4 z-10 w-[280px]">
                            {/* Open Widget Window */}
                            <div className="bg-white w-full rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
                                <div className={`${pdp.headerBg} p-4 flex items-center gap-3`}>
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                                        <AIIcon alias={pdp.iconAlias} glass={false} style={{ transform: 'scale(0.6)' }} />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">{t(`${T_PREFIX}.chat.aiAssistant`)}</div>
                                        <div className="text-white/80 text-xs">{t(`${T_PREFIX}.chat.replyTime`)}</div>
                                    </div>
                                </div>
                                <div className="p-4 h-32 bg-slate-50 flex flex-col gap-3">
                                    <div className="bg-slate-200 text-slate-800 text-sm p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%]">
                                        {t(`${T_PREFIX}.chat.greeting`, { title: t(pdp.titleKey) })}
                                    </div>
                                </div>
                                <div className="p-3 border-t border-slate-100 flex items-center gap-2">
                                    <div className="flex-1 bg-slate-100 rounded-full h-8 px-4 flex items-center text-slate-400 text-xs">
                                        {t(`${T_PREFIX}.chat.inputPlaceholder`)}
                                    </div>
                                    <div className={`${pdp.headerBg} w-8 h-8 rounded-full flex items-center justify-center`}>
                                        <Send className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>


                            {/* Trigger Button - New Dynamic AI Icon */}
                            <div className="relative w-16 h-16 cursor-pointer hover:scale-105 transition-all duration-300 group">
                                <AIIcon alias={pdp.iconAlias} glass={true} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
