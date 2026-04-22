import { Helmet } from 'react-helmet-async';
import { useLocale } from '../hooks/useLocale';
import { getOrganizationSchema } from '../lib/structured-data';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;           // canonical path (e.g., '/pricing')
  ogImage?: string;       // OG image URL
  ogType?: string;        // 'website' | 'article'
  noIndex?: boolean;      // for non-indexable pages
  structuredData?: object; // JSON-LD
}

const BASE_URL = 'https://pavy.ai';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/og-default.png`;
const OG_LOCALES: Record<string, string> = {
  en: 'en_US',
  ko: 'ko_KR',
  ja: 'ja_JP',
};

// Serialize JSON-LD safely for embedding inside <script> — escape sequences
// that could close the tag or be misinterpreted by HTML parsers.
function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

function resolveAbsoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  return `${BASE_URL}${value.startsWith('/') ? '' : '/'}${value}`;
}

export function SEOHead({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  structuredData,
}: SEOHeadProps) {
  const { currentLanguage, supportedLanguages } = useLocale();

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const pathSuffix = cleanPath === '/' ? '' : cleanPath;
  const canonicalUrl = `${BASE_URL}/${currentLanguage}${pathSuffix}`;
  const absoluteOgImage = resolveAbsoluteUrl(ogImage);
  const ogLocale = OG_LOCALES[currentLanguage] ?? 'en_US';

  const orgSchemaJson = serializeJsonLd(getOrganizationSchema());
  const pageSchemaJson = structuredData ? serializeJsonLd(structuredData) : null;

  return (
    <Helmet>
      <html lang={currentLanguage} />
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical + hreflang only for indexable pages */}
      {!noIndex && <link rel="canonical" href={canonicalUrl} />}
      {!noIndex && supportedLanguages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${BASE_URL}/${lang}${pathSuffix}`}
        />
      ))}
      {!noIndex && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${BASE_URL}/en${pathSuffix}`}
        />
      )}

      {/* Open Graph */}
      <meta property="og:site_name" content="Pavy.ai" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:alt" content={title} />

      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="Pavy.ai Blog RSS Feed" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Robots */}
      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow'}
      />

      {/* Structured Data — separate scripts per schema for cleaner validation */}
      <script
        type="application/ld+json"
        data-schema="organization"
        dangerouslySetInnerHTML={{ __html: orgSchemaJson }}
      />
      {pageSchemaJson && (
        <script
          type="application/ld+json"
          data-schema="page"
          dangerouslySetInnerHTML={{ __html: pageSchemaJson }}
        />
      )}
    </Helmet>
  );
}
