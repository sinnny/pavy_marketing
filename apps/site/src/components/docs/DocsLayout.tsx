import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@pavy/i18n';
import Header from '../Header';
import Footer from '../Footer';
import { DocsSidebar } from './DocsSidebar';
import { DocsTableOfContents } from './DocsTableOfContents';
import { DocsBreadcrumb } from './DocsBreadcrumb';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const { t } = useTranslation('site');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close the mobile sidebar drawer when the user navigates to a new page.
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <div className="max-w-[1400px] mx-auto px-10 pt-32 lg:pt-40">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* Sidebar - Stays on the left */}
          <aside
            id="docs-sidebar"
            aria-label={t('pages.docs.layout.menuLabel')}
            className={clsx(
              "fixed inset-0 z-40 lg:z-0 lg:relative lg:block flex-shrink-0 w-64 pb-10 overflow-y-auto bg-white dark:bg-slate-950 transition-transform duration-300 lg:translate-x-0",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="lg:hidden flex items-center py-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-950 z-20 mb-8 px-4">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center text-sm font-medium text-slate-600"
              >
                <X className="h-5 w-5 mr-2" />
                {t('pages.docs.layout.close')}
              </button>
            </div>
            <div className="px-4 lg:px-0">
              <DocsSidebar />
            </div>
          </aside>

          {/* Main Content - Breadcrumb moved back inside here */}
          <main className="flex-grow min-w-0 pb-24">
            <DocsBreadcrumb />
            <div className="docs-content">
              {children}
            </div>
          </main>

          {/* Table of Contents - Stays on the right */}
          <DocsTableOfContents />
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed bottom-8 right-8 z-50">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-brand-primary text-white p-4 rounded-full shadow-lg"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
      </div>

      <Footer />
    </div>
  );
}
