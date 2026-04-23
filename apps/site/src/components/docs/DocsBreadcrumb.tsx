import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@pavy/i18n';
import { ChevronRight, Home } from 'lucide-react';
import { clsx } from 'clsx';
import { useLocale } from '../../hooks/useLocale';
import { docsNavigation, DocsNavItem } from '../../lib/docs-nav';

export function DocsBreadcrumb() {
  const { t } = useTranslation('site');
  const { localePath } = useLocale();
  const location = useLocation();

  // Extract path segments after /:lang/docs/
  const pathSegments = location.pathname.split('/').slice(3);
  
  const breadcrumbs: { title: string; href: string }[] = [];
  let currentPath = '';
  
  // Find titles from docsNavigation structure
  let currentNavItems: DocsNavItem[] | undefined = docsNavigation;
  
  for (const segment of pathSegments) {
    const foundItem: DocsNavItem | undefined = currentNavItems?.find(item => item.slug === segment);
    if (foundItem) {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        title: t(foundItem.titleKey),
        href: localePath(`/docs${currentPath}`)
      });
      currentNavItems = foundItem.children;
    }
  }

  return (
    <nav className="flex mb-8 overflow-x-auto scrollbar-hidden whitespace-nowrap" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to={localePath('/')}
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            <Home className="w-4 h-4 mr-2" />
            {t('legal.common.home')}
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link
              to={localePath('/docs/getting-started/quick-start')}
              className="ml-1 text-sm font-medium text-slate-500 hover:text-indigo-600 md:ml-2 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              Docs
            </Link>
          </div>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href}>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <Link
                to={breadcrumb.href}
                className={clsx(
                  "ml-1 text-sm font-medium md:ml-2 transition-colors",
                  index === breadcrumbs.length - 1
                    ? "text-slate-900 dark:text-white pointer-events-none"
                    : "text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                )}
                aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
              >
                {breadcrumb.title}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
