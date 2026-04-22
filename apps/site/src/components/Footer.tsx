
import { Link } from 'react-router-dom';
import { useTranslation } from '@pavy/i18n';
import { PavyLogo } from '@pavy/ui';
import { useLocale } from '../hooks/useLocale';

export default function Footer() {
    const { t } = useTranslation('site');
    const { localePath } = useLocale();

    return (
        <footer className="w-full bg-slate-50 border-t border-slate-200 relative overflow-hidden flex flex-col items-center">


            {/* Bottom Links */}
            <div className="w-full max-w-[1400px] border-t border-slate-200 px-10 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-20 mb-20">
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-indigo-500 italic">{t('footer.links.platform')}</span>
                        <Link to={localePath('/product/chatbot')} className="text-slate-500 hover:text-brand-primary transition-colors font-medium">{t('footer.links.infrastructure')}</Link>
                        <Link to={localePath('/product/dashboard')} className="text-slate-500 hover:text-brand-primary transition-colors font-medium">{t('footer.links.integrations')}</Link>
                    </div>
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-indigo-500 italic">{t('footer.links.company')}</span>
                        <a href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-medium">{t('footer.links.about')}</a>
                        <a href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-medium">{t('footer.links.changelog')}</a>
                        <a href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-medium">{t('footer.links.contact')}</a>
                    </div>
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-indigo-500 italic">{t('footer.links.legal')}</span>
                        <Link to={localePath('/legal/privacy')} className="text-slate-500 hover:text-brand-primary transition-colors font-medium">{t('footer.links.privacy')}</Link>
                        <Link to={localePath('/legal/terms')} className="text-slate-500 hover:text-brand-primary transition-colors font-medium">{t('footer.links.terms')}</Link>
                    </div>
                    <div className="flex flex-col gap-6 items-end justify-end">
                        <PavyLogo variant="vertical" size={56} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 gap-6">
                    <div>&copy; {new Date().getFullYear()} {t('footer.copyright')}</div>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-slate-600 transition-colors">{t('footer.social.twitter')}</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">{t('footer.social.github')}</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">{t('footer.social.linkedin')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
