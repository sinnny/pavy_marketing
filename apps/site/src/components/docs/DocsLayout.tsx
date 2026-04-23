import { ReactNode, useState } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden flex items-center py-4 border-b border-slate-200 dark:border-slate-800 sticky top-[64px] bg-white dark:bg-slate-950 z-20">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5 mr-2" />
              ) : (
                <Menu className="h-5 w-5 mr-2" />
              )}
              Documentation Menu
            </button>
          </div>

          {/* Sidebar */}
          <aside className={clsx(
            "fixed inset-0 z-40 lg:z-0 lg:relative lg:block flex-shrink-0 w-64 pt-20 lg:pt-32 pb-10 overflow-y-auto bg-white dark:bg-slate-950 transition-transform duration-300 lg:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <div className="px-4 lg:px-0">
              <DocsSidebar />
            </div>
          </aside>

          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden" 
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-grow min-w-0 pt-8 lg:pt-32 pb-24">
            <DocsBreadcrumb />
            <div className="docs-content">
              {children}
            </div>
          </main>

          {/* Table of Contents */}
          <DocsTableOfContents />
        </div>
      </div>

      <Footer />
    </div>
  );
}
