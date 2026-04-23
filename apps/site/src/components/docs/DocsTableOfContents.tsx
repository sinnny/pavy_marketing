import { useState, useEffect } from 'react';
import { useTranslation } from '@pavy/i18n';
import { clsx } from 'clsx';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function DocsTableOfContents() {
  const { t } = useTranslation('site');
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the prose content
    const elements = Array.from(document.querySelectorAll('.docs-content h2, .docs-content h3'))
      .map((elem) => ({
        id: elem.id,
        text: elem.textContent || '',
        level: Number(elem.tagName.charAt(1)),
      }))
      .filter(item => item.id); // Only include those with IDs

    setHeadings(elements);

    // Setup intersection observer to highlight active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0% -80% 0%' }
    );

    elements.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings.length]); // Re-run if content length changes

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block sticky top-32 w-64 pl-8">
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
        {t('legal.common.onThisPage')}
      </h4>
      <nav aria-label="Table of contents">
        <ul className="space-y-3">
          {headings.map((heading) => (
            <li 
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className={clsx(
                  "block text-sm transition-colors duration-200",
                  activeId === heading.id
                    ? "text-indigo-600 dark:text-indigo-400 font-medium"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
