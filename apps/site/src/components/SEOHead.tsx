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

  // Ensure path starts with slash and doesn't end with slash (unless it's just '/')
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${BASE_URL}/${currentLanguage}${cleanPath === '/' ? '' : cleanPath}`;
  
  // Organization schema always included
  const orgSchema = getOrganizationSchema();

  const schemas: Record<string, unknown>[] = [orgSchema];
  if (structuredData) {
    schemas.push(structuredData as Record<string, unknown>);
  }

  return (
    <Helmet>
      <html lang={currentLanguage} />
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang Alternate Links */}
      {supportedLanguages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${BASE_URL}/${lang}${cleanPath === '/' ? '' : cleanPath}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}/en${cleanPath === '/' ? '' : cleanPath}`}
      />

      {/* Open Graph */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas) }} />
    </Helmet>
  );
}
