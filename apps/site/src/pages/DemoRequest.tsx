import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { useTranslation } from '@pavy/i18n';
import { trackEvent } from '../lib/analytics';
import { getUTMParams } from '../lib/utm';
import { useLocation } from 'react-router-dom';

export default function DemoRequest() {
    const { t } = useTranslation('site');
    const location = useLocation();

    const handleSubmit = () => {
        const utmParams = getUTMParams();
        trackEvent('submit_demo_request', {
            source_page: location.pathname,
            ...utmParams,
        });
        // Form submission logic would go here
    };

    return (
        <div className="relative w-full bg-slate-50 min-h-screen font-sans flex flex-col">
            <SEOHead
                title={t('seo.demo.title')}
                description={t('seo.demo.description')}
                path="/demo"
            />
            <Header />
            <main className="flex-1 pt-40 pb-32 max-w-[600px] w-full mx-auto px-6 text-center">
                <h1 className="text-5xl font-heading font-black text-slate-900 mb-6">{t('pages.demoRequest.title')}</h1>
                <p className="text-xl text-slate-600 mb-12 font-medium">{t('pages.demoRequest.description')}</p>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl flex flex-col gap-4 text-left">
                    <input type="text" placeholder={t('pages.demoRequest.fullName')} className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-indigo-500" />
                    <input type="email" placeholder={t('pages.demoRequest.workEmail')} className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-indigo-500" />
                    <button 
                        onClick={handleSubmit}
                        className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl mt-4 hover:bg-indigo-700 transition"
                    >
                        {t('pages.demoRequest.submit')}
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
