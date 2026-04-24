import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from '@pavy/i18n';
import { clsx } from 'clsx';
import { useLocale } from '../../hooks/useLocale';
import { docsNavigation, type DocsNavItem } from '../../lib/docs-nav';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SidebarItemProps {
  item: DocsNavItem;
  level?: number;
}

function SidebarItem({ item, level = 0 }: SidebarItemProps) {
  const { t } = useTranslation('site');
  const { localePath } = useLocale();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const hasChildren = item.children && item.children.length > 0;
  const href = hasChildren ? undefined : localePath(`/docs/${item.slug}`);
  const isActive = href ? location.pathname === href : false;

  // For parent items, we check if any child is active
  const isChildActive = hasChildren && item.children?.some(child => {
    const childHref = localePath(`/docs/${item.slug}/${child.slug}`);
    return location.pathname === childHref;
  });

  const baseClasses = "flex items-center w-full text-sm font-medium py-2 px-3 rounded-lg transition-colors";
  const activeClasses = "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300";
  const inactiveClasses = "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200";

  const content = (
    <div className="flex items-center justify-between w-full text-left">
      <span>{t(item.titleKey)}</span>
      {hasChildren && (
        <ChevronRight 
          className={clsx(
            "h-4 w-4 transition-transform flex-shrink-0 ml-2",
            isOpen ? "rotate-90" : ""
          )}
        />
      )}
    </div>
  );

  return (
    <div className={clsx("space-y-1", level > 0 && "ml-4 border-l border-slate-200 dark:border-slate-800 pl-4")}>
      {href ? (
        <Link
          to={href}
          aria-current={isActive ? 'page' : undefined}
          className={clsx(baseClasses, isActive ? activeClasses : inactiveClasses)}
        >
          {content}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={clsx(baseClasses, isChildActive ? "text-indigo-700 dark:text-indigo-300" : "text-slate-900 dark:text-slate-200")}
        >
          {content}
        </button>
      )}

      {hasChildren && isOpen && (
        <div className="space-y-1 mt-1">
          {item.children?.map((child) => (
            <SidebarItem 
              key={child.slug} 
              item={{...child, slug: `${item.slug}/${child.slug}`}} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function DocsSidebar() {
  return (
    <nav className="space-y-8">
      {docsNavigation.map((section) => (
        <div key={section.slug} className="space-y-3">
          <SidebarItem item={section} />
        </div>
      ))}
    </nav>
  );
}
