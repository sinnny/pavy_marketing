import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Link as LinkIcon, Twitter, Linkedin, Check } from 'lucide-react';
import { useTranslation } from '@pavy/i18n';
import { SEOHead } from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OptimizedImage from '../components/OptimizedImage';
import { Prose } from '../components/blog/Prose';
import { getPostBySlug } from '../lib/blog-loader';
import { useLocale } from '../hooks/useLocale';

const BASE_URL = 'https://pavy.ai';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('site');
  const { localePath, currentLanguage } = useLocale();
  const [copied, setCopied] = useState(false);

  const post = useMemo(() => (slug ? getPostBySlug(slug) : null), [slug]);

  if (!post) {
    return (
      <div className="relative w-full bg-slate-50 min-h-screen font-sans selection:bg-indigo-500/20 text-slate-900 flex flex-col">
        <SEOHead
          title={`${t('pages.blog.notFound')} | Pavy.ai`}
          description={t('pages.blog.notFound')}
          path={`/blog/${slug ?? ''}`}
          noIndex
        />
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            {t('pages.blog.notFound')}
          </h1>
          <Link
            to={localePath('/blog')}
            className="text-indigo-600 font-medium hover:underline flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> {t('pages.blog.backToBlog')}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const MDXContent = post.component;
  const readingLabel = t('pages.blog.readingTime', { count: post.readingMinutes });
  const formattedDate = new Date(post.date).toLocaleDateString(currentLanguage, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const shareUrl = `${BASE_URL}/${currentLanguage}/blog/${post.slug}`;
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedShareTitle = encodeURIComponent(post.title);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable in insecure contexts; silently no-op.
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: [{ '@type': 'Person', name: post.author }],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': shareUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pavy.ai',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/pavy.ai-logo.svg`,
      },
    },
  };

  return (
    <div className="relative w-full bg-slate-50 min-h-screen font-sans selection:bg-indigo-500/20 text-slate-900 flex flex-col">
      <SEOHead
        title={`${post.title} | Pavy.ai`}
        description={post.description}
        path={`/blog/${post.slug}`}
        ogImage={post.coverImage}
        ogType="article"
        structuredData={jsonLd}
      />
      <Header />

      <main className="pt-24 pb-24">
        <article className="max-w-[800px] mx-auto px-6 sm:px-10">
          <Link
            to={localePath('/blog')}
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-slate-500 hover:text-indigo-600 transition-colors mb-12 group focus-visible:outline-none focus-visible:text-indigo-600"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('pages.blog.backToBlog')}
          </Link>

          <header className="mb-12">
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
              <div
                aria-hidden="true"
                className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-slate-500 font-bold text-lg"
              >
                {post.author?.charAt(0)}
              </div>
              <div>
                <div className="text-slate-900 font-bold">{post.author}</div>
                <div className="flex items-center gap-2">
                  <time dateTime={post.date}>{formattedDate}</time>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{readingLabel}</span>
                </div>
              </div>
            </div>
          </header>

          {post.coverImage && (
            <div className="w-full max-h-[400px] rounded-3xl overflow-hidden mb-12 shadow-md">
              <OptimizedImage
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={400}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <Prose className="max-w-none">
            <MDXContent />
          </Prose>

          <footer className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                {t('pages.blog.share')}
              </span>
              <button
                type="button"
                onClick={copyToClipboard}
                aria-label={copied ? t('pages.blog.shareCopied') : t('pages.blog.shareCopyLink')}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <LinkIcon className="w-4 h-4" />
                )}
              </button>
              <a
                href={`https://x.com/intent/post?url=${encodedShareUrl}&text=${encodedShareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('pages.blog.shareTwitter')}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('pages.blog.shareLinkedIn')}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0A66C2] hover:border-[#0A66C2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
