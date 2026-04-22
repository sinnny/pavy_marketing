import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatterStr = match[1];
  const frontmatter: Record<string, string | string[]> = {};

  frontmatterStr.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);

    if (value.startsWith('[') && value.endsWith(']')) {
      frontmatter[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
    } else {
      frontmatter[key] = value;
    }
  });

  return frontmatter;
}

function generateRss() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn(`Content directory ${CONTENT_DIR} does not exist. Skipping RSS generation.`);
    return;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.mdx'));

  const posts = files.map(file => {
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const frontmatter = parseFrontmatter(content);
    
    if (!frontmatter) return null;
    
    return {
      slug: file.replace('.mdx', ''),
      title: frontmatter.title as string,
      description: frontmatter.description as string,
      date: frontmatter.date as string,
      author: frontmatter.author as string,
    };
  }).filter((post): post is NonNullable<typeof post> => Boolean(post));

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const recentPosts = posts.slice(0, 20);

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Pavy.ai Blog</title>
    <link>https://pavy.ai/blog</link>
    <description>Insights and updates on AI chatbots, e-commerce, and customer experience.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${recentPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://pavy.ai/en/blog/${post.slug}</link>
      <guid>https://pavy.ai/en/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rssXml);
  console.log(`Generated rss.xml with ${recentPosts.length} posts`);
}

generateRss();
