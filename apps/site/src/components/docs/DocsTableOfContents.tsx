import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@pavy/i18n';
import { clsx } from 'clsx';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function DocsTableOfContents() {
  const { t } = useTranslation('site');
  const location = useLocation();
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    // Defer one frame so the MDX content renders before we query the DOM.
    const rafId = window.requestAnimationFrame(() => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>('.docs-content h2, .docs-content h3')
      )
        .map((elem) => ({
          id: elem.id,
          text: elem.textContent || '',
          level: Number(elem.tagName.charAt(1)),
        }))
        .filter((item) => item.id);

      setHeadings(elements);
      setActiveId(elements[0]?.id ?? '');

      // Pick the topmost intersecting heading so jumping between adjacent
      // sections doesn't flicker the active indicator.
      const visible = new Map<string, number>();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).id;
            if (entry.isIntersecting) {
              visible.set(id, entry.boundingClientRect.top);
            } else {
              visible.delete(id);
            }
          }
          if (visible.size > 0) {
            const next = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0];
            setActiveId(next);
          }
        },
        { rootMargin: '-96px 0px -70% 0px', threshold: [0, 1] }
      );

      elements.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element && observer) observer.observe(element);
      });
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [location.pathname]);

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block sticky top-32 w-64 pl-8 self-start">
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
        {t('pages.docs.common.onThisPage')}
      </h4>
      <nav aria-label={t('pages.docs.common.onThisPage')}>
        <ul className="space-y-3">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className={clsx(
                  'block text-sm transition-colors duration-200',
                  activeId === heading.id
                    ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(heading.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.replaceState(null, '', `#${heading.id}`);
                  }
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
