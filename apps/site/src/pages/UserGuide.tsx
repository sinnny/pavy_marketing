import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '@pavy/i18n';

export default function UserGuide() {
    const { t } = useTranslation('site');

    return (
        <div className="relative w-full bg-slate-50 min-h-screen font-sans">
            <Header />
            <main className="pt-40 pb-32 max-w-[1200px] mx-auto px-6 text-center">
                <h1 className="text-5xl font-heading font-black text-slate-900 mb-6">{t('pages.userGuide.title')}</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">{t('pages.userGuide.description')}</p>
            </main>
            <Footer />
        </div>
    );
}
