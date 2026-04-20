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

function generateSitemap() {
  const urls = ROUTES.map((route) => {
    const isHome = route === '/';
    
    return LOCALES.map((lang) => {
      const locPath = isHome ? `/${lang}/` : `/${lang}${route}`;
      const loc = `${BASE_URL}${locPath}`;
      
      const alternates = LOCALES.map((altLang) => {
        const altPath = isHome ? `/${altLang}/` : `/${altLang}${route}`;
        return `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${BASE_URL}${altPath}" />`;
      }).join('\n');

      return `  <url>
    <loc>${loc}</loc>
${alternates}
    <changefreq>weekly</changefreq>
    <priority>${isHome ? '1.0' : '0.8'}</priority>
  </url>`;
    }).join('\n');
  }).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemapXml);
  console.log(`Generated sitemap.xml with ${ROUTES.length * LOCALES.length} URLs at ${outputPath}`);
}

generateSitemap();
