import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://pavy.ai';
const LOCALES = ['en', 'ko', 'ja'];
const ROUTES = [
  '/',
  '/product/chatbot',
  '/product/dashboard',
  '/pricing',
  '/demo',
  '/guide',
];

function buildLocalePath(lang: string, route: string): string {
  return route === '/' ? `/${lang}` : `/${lang}${route}`;
}

function generateSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = ROUTES.map((route) => {
    const isHome = route === '/';

    return LOCALES.map((lang) => {
      const loc = `${BASE_URL}${buildLocalePath(lang, route)}`;

      const alternates = LOCALES.map((altLang) => {
        return `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${BASE_URL}${buildLocalePath(altLang, route)}" />`;
      }).join('\n');

      return `  <url>
    <loc>${loc}</loc>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${buildLocalePath('en', route)}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${isHome ? '1.0' : '0.8'}</priority>
  </url>`;
    }).join('\n');
  }).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemapXml);
  console.log(`Generated sitemap.xml with ${ROUTES.length * LOCALES.length} URLs at ${outputPath}`);
}

generateSitemap();
