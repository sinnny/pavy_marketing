import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@pavy/i18n';
import { SEOHead } from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleCard from '../components/blog/ArticleCard';
import { getAllPosts } from '../lib/blog-loader';

const PAGE_SIZE = 10;

export default function Blog() {
  const { t } = useTranslation('site');
  const posts = useMemo(() => getAllPosts(), []);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <div className="relative w-full bg-slate-50 min-h-screen font-sans selection:bg-indigo-500/20 text-slate-900 flex flex-col items-center">
      <SEOHead
        title={t('seo.blog.title')}
        description={t('seo.blog.description')}
        path="/blog"
      />
      <Header />

      <main className="relative z-10 w-full pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-3xl mb-16">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {t('pages.blog.title')}
            </motion.h1>
            <motion.p
              className="text-lg text-slate-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t('pages.blog.subtitle')}
            </motion.p>
          </div>

          {posts.length === 0 ? (
            <div className="py-20 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
              {t('pages.blog.empty')}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {visiblePosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i % PAGE_SIZE) * 0.05 }}
                >
                  <ArticleCard article={post} />
                </motion.div>
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-16 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="px-8 py-3 bg-white border border-slate-200 rounded-full font-bold text-sm tracking-widest uppercase text-slate-600 hover:text-indigo-600 hover:border-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-all duration-300 shadow-sm"
              >
                {t('pages.blog.loadMore')}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
