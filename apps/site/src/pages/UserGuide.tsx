import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { useTranslation } from '@pavy/i18n';

export default function UserGuide() {
    const { t } = useTranslation('site');

    return (
        <div className="relative w-full bg-slate-50 min-h-screen font-sans">
            <SEOHead
                title={t('seo.guide.title')}
                description={t('seo.guide.description')}
                path="/guide"
            />
            <Header />
            <main className="pt-40 pb-32 max-w-[1400px] mx-auto px-10">
                <div className="max-w-4xl">
                    <h1 className="text-5xl font-heading font-black text-slate-900 mb-6">{t('pages.userGuide.title')}</h1>
                    <p className="text-xl text-slate-600 font-medium">{t('pages.userGuide.description')}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
