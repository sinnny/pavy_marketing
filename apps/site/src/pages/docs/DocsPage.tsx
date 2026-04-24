import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from '@pavy/i18n';
import { useMemo } from 'react';
import DocsLayout from '../../components/docs/DocsLayout';
import { Prose } from '../../components/blog/Prose';
import { getDocsPageByPath } from '../../lib/docs-loader';
import { docsNavigation, type DocsNavItem } from '../../lib/docs-nav';
import { useLocale } from '../../hooks/useLocale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { MdxComponentsProvider } from '../../components/mdx/MdxComponents';

const DEFAULT_DOCS_PATH = 'getting-started/quick-start';

export default function DocsPage() {
  const { '*': splat } = useParams();
  const path = splat ?? '';
  const { t } = useTranslation('site');
  const { localePath, currentLanguage } = useLocale();

  const page = useMemo(() => {
    if (!path) return null;
    return getDocsPageByPath(path, currentLanguage);
  }, [path, currentLanguage]);

  const flatNav = useMemo(() => {
    const flattened: { titleKey: string; slug: string; path: string }[] = [];

    function flatten(items: DocsNavItem[], parentPath = '') {
      for (const item of items) {
        const currentPath = parentPath ? `${parentPath}/${item.slug}` : item.slug;
        if (item.children) {
          flatten(item.children, currentPath);
        } else {
          flattened.push({
            titleKey: item.titleKey,
            slug: item.slug,
            path: currentPath,
          });
        }
      }
    }

    flatten(docsNavigation);
    return flattened;
  }, []);

  const { prev, next } = useMemo(() => {
    const currentIndex = flatNav.findIndex((item) => item.path === path);
    if (currentIndex === -1) return { prev: null, next: null };

    return {
      prev: currentIndex > 0 ? flatNav[currentIndex - 1] : null,
      next: currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null,
    };
  }, [flatNav, path]);

  // `/ :lang/docs` with no sub-path: land visitors on the first doc page
  // instead of showing a 404. Keeps the "Docs" nav link friendly.
  if (!path) {
    return <Navigate to={localePath(`/docs/${DEFAULT_DOCS_PATH}`)} replace />;
  }

  if (!page) {
    return (
      <DocsLayout>
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t('pages.docs.notFound.title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            {t('pages.docs.notFound.description')}
          </p>
          <Link
            to={localePath(`/docs/${DEFAULT_DOCS_PATH}`)}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            {t('pages.docs.notFound.backToDocs')}
          </Link>
        </div>
      </DocsLayout>
    );
  }

  const MDXContent = page.component;

  return (
    <DocsLayout>
      <SEOHead
        title={`${page.frontmatter.title} — Pavy.ai Docs`}
        description={page.frontmatter.description || t('pages.docs.seo.defaultDescription')}
        path={`/docs/${path}`}
      />

      <Prose>
        <header className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
          <h1
            className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
            id="overview"
          >
            {page.frontmatter.title}
          </h1>
          {page.frontmatter.description && (
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {page.frontmatter.description}
            </p>
          )}
        </header>

        <MdxComponentsProvider>
          <MDXContent />
        </MdxComponentsProvider>

        <nav
          aria-label={t('pages.docs.pagination.ariaLabel')}
          className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-4"
        >
          {prev ? (
            <Link
              to={localePath(`/docs/${prev.path}`)}
              rel="prev"
              className="flex flex-col items-start gap-1 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors group"
            >
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center">
                <ChevronLeft className="w-3 h-3 mr-1" />
                {t('pages.docs.pagination.previous')}
              </span>
              <span className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {t(prev.titleKey)}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              to={localePath(`/docs/${next.path}`)}
              rel="next"
              className="flex flex-col items-end gap-1 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors group text-right"
            >
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center">
                {t('pages.docs.pagination.next')}
                <ChevronRight className="w-3 h-3 ml-1" />
              </span>
              <span className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {t(next.titleKey)}
              </span>
            </Link>
          ) : <div />}
        </nav>
      </Prose>
    </DocsLayout>
  );
}
