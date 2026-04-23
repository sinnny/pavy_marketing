import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useTranslation } from '@pavy/i18n';
import { useLocale } from '../../hooks/useLocale';

interface TocItem {
  id: string;
  text: string;
}

interface LegalPageLayoutProps {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, effectiveDate, children }: LegalPageLayoutProps) {
  const { t } = useTranslation('site');
  const { localePath } = useLocale();
  const [toc, setToc] = useState<TocItem[]>([]);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h2');
      const tocItems: TocItem[] = Array.from(headings).map((heading, index) => {
        if (!heading.id) {
          heading.id = `section-${index}`;
        }
        return {
          id: heading.id,
          text: heading.textContent || '',
        };
      });
      setToc(tocItems);
    }
  }, [children]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav
          className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8"
          aria-label="Breadcrumb"
        >
          <Link to={localePath('/')} className="hover:text-indigo-600 transition-colors">
            {t('pages.legal.common.home')}
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-300" aria-hidden="true" />
          <span className="text-slate-900" aria-current="page">
            {t('pages.legal.common.legal')}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <header className="mb-12">
              <Link
                to={localePath('/')}
                className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-slate-500 hover:text-indigo-600 transition-colors mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                {t('pages.legal.common.backToHome')}
              </Link>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                {title}
              </h1>
              <p className="text-slate-500 font-medium">
                {t('pages.legal.common.effectiveDate')}: {effectiveDate}
              </p>
            </header>

            {/* Mobile TOC — collapsible */}
            {toc.length > 0 && (
              <div className="lg:hidden mb-10 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileTocOpen((open) => !open)}
                  aria-expanded={isMobileTocOpen}
                  aria-controls="legal-mobile-toc"
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <span className="text-sm font-bold uppercase tracking-widest text-slate-900">
                    {t('pages.legal.common.onThisPage')}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${isMobileTocOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {isMobileTocOpen && (
                  <nav id="legal-mobile-toc" className="px-5 pb-5 space-y-3">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setIsMobileTocOpen(false)}
                        className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                )}
              </div>
            )}

            <div
              ref={contentRef}
              className="prose prose-lg prose-slate max-w-none prose-h2:scroll-mt-32 prose-a:text-indigo-600 hover:prose-a:text-indigo-700"
            >
              {children}
            </div>

            <footer className="mt-16 pt-8 border-t border-slate-100">
              <p className="text-sm text-slate-400">
                {t('pages.legal.common.lastUpdated')}: {effectiveDate}
              </p>
            </footer>
          </div>

          {/* Desktop Sidebar TOC */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 self-start h-fit hidden lg:block">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">
                {t('pages.legal.common.onThisPage')}
              </h3>
              <nav className="space-y-4" aria-label={t('pages.legal.common.onThisPage')}>
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
