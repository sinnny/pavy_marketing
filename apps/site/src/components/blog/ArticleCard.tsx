import { Link } from 'react-router-dom';
import { useTranslation } from '@pavy/i18n';
import type { BlogPostMeta } from '../../lib/blog-loader';
import { useLocale } from '../../hooks/useLocale';
import OptimizedImage from '../OptimizedImage';

const EXCERPT_MAX = 160;

function truncate(text: string, max: number): string {
  if (!text) return '';
  if (text.length <= max) return text;
  const sliced = text.slice(0, max);
  const lastSpace = sliced.lastIndexOf(' ');
  const cut = lastSpace > max * 0.6 ? sliced.slice(0, lastSpace) : sliced;
  return `${cut.trimEnd()}…`;
}

export default function ArticleCard({ article }: { article: BlogPostMeta }) {
  const { t } = useTranslation('site');
  const { localePath, currentLanguage } = useLocale();

  const readingLabel = t('pages.blog.readingTime', { count: article.readingMinutes });
  const formattedDate = new Date(article.date).toLocaleDateString(currentLanguage, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const excerpt = truncate(article.description ?? '', EXCERPT_MAX);

  return (
    <Link
      to={localePath(`/blog/${article.slug}`)}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
        <OptimizedImage
          src={article.coverImage}
          alt={article.title}
          width={800}
          height={450}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        {article.tags && article.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-grow">{excerpt}</p>
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-4 border-t border-slate-100 mt-auto">
          <span className="truncate">{article.author}</span>
          <div className="flex items-center gap-3 shrink-0">
            <time dateTime={article.date}>{formattedDate}</time>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>{readingLabel}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
