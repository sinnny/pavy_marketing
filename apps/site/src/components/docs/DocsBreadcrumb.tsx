import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@pavy/i18n';
import { ChevronRight, Home } from 'lucide-react';
import { clsx } from 'clsx';
import { useLocale } from '../../hooks/useLocale';
import { docsNavigation, type DocsNavItem } from '../../lib/docs-nav';

export function DocsBreadcrumb() {
  const { t } = useTranslation('site');
  const { localePath } = useLocale();
  const location = useLocation();

  // Extract path segments after /:lang/docs/
  const pathSegments = location.pathname.split('/').filter(Boolean).slice(2);

  const breadcrumbs: { title: string; href: string; isLast: boolean }[] = [];
  let currentPath = '';

  // Find titles from docsNavigation structure
  let currentNavItems: DocsNavItem[] | undefined = docsNavigation;

  for (const segment of pathSegments) {
    const foundItem: DocsNavItem | undefined = currentNavItems?.find(item => item.slug === segment);
    if (foundItem) {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        title: t(foundItem.titleKey),
        href: localePath(`/docs${currentPath}`),
        isLast: false,
      });
      currentNavItems = foundItem.children;
    }
  }
  if (breadcrumbs.length > 0) {
    breadcrumbs[breadcrumbs.length - 1].isLast = true;
  }

  return (
    <nav className="flex mb-8 overflow-x-auto scrollbar-hidden whitespace-nowrap" aria-label={t('pages.docs.breadcrumb.ariaLabel')}>
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to={localePath('/')}
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            <Home className="w-4 h-4 mr-2" />
            {t('pages.docs.breadcrumb.home')}
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link
              to={localePath('/docs/getting-started/quick-start')}
              className="ml-1 text-sm font-medium text-slate-500 hover:text-indigo-600 md:ml-2 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              {t('pages.docs.breadcrumb.docs')}
            </Link>
          </div>
        </li>
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.href}>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-slate-400" />
              {breadcrumb.isLast ? (
                <span
                  className="ml-1 text-sm font-medium md:ml-2 text-slate-900 dark:text-white"
                  aria-current="page"
                >
                  {breadcrumb.title}
                </span>
              ) : (
                <Link
                  to={breadcrumb.href}
                  className={clsx(
                    "ml-1 text-sm font-medium md:ml-2 transition-colors",
                    "text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  )}
                >
                  {breadcrumb.title}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
