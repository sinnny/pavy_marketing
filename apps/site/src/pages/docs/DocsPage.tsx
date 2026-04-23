import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '@pavy/i18n';
import { useMemo } from 'react';
import DocsLayout from '../../components/docs/DocsLayout';
import { Prose } from '../../components/blog/Prose';
import { getDocsPageByPath } from '../../lib/docs-loader';
import { docsNavigation, DocsNavItem } from '../../lib/docs-nav';
import { useLocale } from '../../hooks/useLocale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';

export default function DocsPage() {
  const { '*': path } = useParams();
  const { t } = useTranslation('site');
  const { localePath } = useLocale();
  
  const page = useMemo(() => {
    if (!path) return null;
    return getDocsPageByPath(path);
  }, [path]);

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
            path: currentPath
          });
        }
      }
    }
    
    flatten(docsNavigation);
    return flattened;
  }, []);

  const { prev, next } = useMemo(() => {
    const currentIndex = flatNav.findIndex(item => item.path === path);
    if (currentIndex === -1) return { prev: null, next: null };
    
    return {
      prev: currentIndex > 0 ? flatNav[currentIndex - 1] : null,
      next: currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null,
    };
  }, [flatNav, path]);

  if (!page) {
    return (
      <DocsLayout>
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Page not found</p>
          <Link 
            to={localePath('/docs/getting-started/quick-start')}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Back to Docs
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
        description={page.frontmatter.description || "Pavy.ai Integration and Configuration Documentation"}
        path={`/docs/${path}`}
      />
      
      <Prose>
        <header className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4" id="overview">
            {page.frontmatter.title}
          </h1>
          {page.frontmatter.description && (
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {page.frontmatter.description}
            </p>
          )}
        </header>

        <MDXContent />

        <nav className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
          {prev ? (
            <Link
              to={localePath(`/docs/${prev.path}`)}
              className="flex flex-col items-start gap-1 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors group"
            >
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center">
                <ChevronLeft className="w-3 h-3 mr-1" />
                Previous
              </span>
              <span className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {t(prev.titleKey)}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              to={localePath(`/docs/${next.path}`)}
              className="flex flex-col items-end gap-1 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors group text-right"
            >
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center">
                Next
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
