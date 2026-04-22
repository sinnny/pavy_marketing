import { useTranslation } from '@pavy/i18n';
import { CASE_STUDIES } from '../lib/customer-data';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { getArticleSchema } from '../lib/structured-data';

export default function CaseStudyDetail() {
  const { t } = useTranslation('site');
  const { lang, slug } = useParams<{ lang: string; slug: string }>();
  
  const caseStudy = CASE_STUDIES.find(cs => cs.slug === slug);

  if (!caseStudy) {
    return <Navigate to={`/${lang}/customers`} replace />;
  }

  const articleSchema = getArticleSchema({
    headline: t(caseStudy.headlineKey),
    description: t(caseStudy.challengeKey),
    url: `/${lang}/customers/${caseStudy.slug}`,
  });

  return (
    <div className="bg-white min-h-screen">
      <SEOHead
        title={`${caseStudy.companyName} Case Study | Pavy AI`}
        description={t(caseStudy.headlineKey)}
        path={`/customers/${caseStudy.slug}`}
        structuredData={articleSchema}
      />
      <Header />
      
      <main className="pt-32 pb-24">
        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <Link
            to={`/${lang}/customers`}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('socialProof.labels.seeAll')}
          </Link>
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <div className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4">
            {t(caseStudy.industryKey)}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 font-heading tracking-tight leading-tight">
            {t(caseStudy.headlineKey)}
          </h1>
          
          <div className="flex items-center gap-12 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
            <div>
              <div className="text-5xl font-black text-brand-primary tracking-tighter mb-1">
                {caseStudy.metricValue}
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {t(caseStudy.metricLabelKey)}
              </div>
            </div>
            <div className="h-12 w-px bg-slate-200" />
            <div className="text-xl font-bold text-slate-900">
              {caseStudy.companyName}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="space-y-20">
            {/* Challenge */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider font-heading">
                  {t('socialProof.labels.challenge')}
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-xl text-slate-600 font-light leading-relaxed">
                  {t(caseStudy.challengeKey)}
                </p>
              </div>
            </div>

            {/* Solution */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider font-heading">
                  {t('socialProof.labels.solution')}
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-xl text-slate-600 font-light leading-relaxed">
                  {t(caseStudy.solutionKey)}
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider font-heading">
                  {t('socialProof.labels.results')}
                </h2>
              </div>
              <div className="md:col-span-8">
                <div className="bg-indigo-50 border border-indigo-100 rounded-[32px] p-10">
                  <p className="text-xl text-slate-800 font-medium leading-relaxed mb-8">
                    {t(caseStudy.resultsKey)}
                  </p>
                  <ul className="space-y-4">
                    {['Result 1', 'Result 2', 'Result 3'].map((r, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span>Placeholder detail for {caseStudy.companyName} result #{i+1}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-4xl mx-auto px-6 mt-32">
          <div className="bg-slate-900 rounded-[40px] p-12 text-center text-white">
            <h2 className="text-3xl font-black mb-6 font-heading">
              Get similar results for your business
            </h2>
            <Link
              to={`/${lang}/demo`}
              className="inline-flex items-center gap-3 bg-brand-primary text-white px-10 py-5 rounded-full font-black text-lg hover:bg-indigo-600 transition-colors shadow-lg"
            >
              Request a Custom Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
