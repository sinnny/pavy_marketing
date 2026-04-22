import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFile, readdir } from 'node:fs/promises';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { visualizer } from 'rollup-plugin-visualizer';

// Virtual module that maps blog slug -> reading-time minutes (~200 wpm),
// computed by reading the raw .mdx files at server start / build time.
// We can't read the raw text from the runtime side because the MDX rollup
// plugin claims every `*.mdx` request (including `?raw`) and returns the
// compiled JSX module instead of the source string.
function blogReadingTimesPlugin(): Plugin {
  const virtualId = 'virtual:blog-reading-times';
  const resolved = '\0' + virtualId;
  const blogDir = resolve(__dirname, 'src/content/blog');

  async function buildMap(): Promise<Record<string, number>> {
    const map: Record<string, number> = {};
    let files: string[] = [];
    try {
      files = await readdir(blogDir);
    } catch {
      return map;
    }
    await Promise.all(
      files
        .filter((f) => f.endsWith('.mdx'))
        .map(async (file) => {
          const source = await readFile(resolve(blogDir, file), 'utf-8');
          const text = source
            .replace(/^---[\s\S]*?---/, '')
            .replace(/```[\s\S]*?```/g, ' ')
            .replace(/`[^`]*`/g, ' ')
            .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
            .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
            .replace(/[#>*_~`\-+|]/g, ' ');
          const words = text.split(/\s+/).filter(Boolean).length;
          map[file.replace(/\.mdx$/, '')] = Math.max(1, Math.ceil(words / 200));
        }),
    );
    return map;
  }

  return {
    name: 'blog-reading-times',
    resolveId(id) {
      if (id === virtualId) return resolved;
      return null;
    },
    async load(id) {
      if (id !== resolved) return null;
      const map = await buildMap();
      return `export default ${JSON.stringify(map)};`;
    },
    async handleHotUpdate(ctx) {
      if (!ctx.file.startsWith(blogDir) || !ctx.file.endsWith('.mdx')) return;
      const mod = ctx.server.moduleGraph.getModuleById(resolved);
      if (mod) {
        ctx.server.moduleGraph.invalidateModule(mod);
        ctx.server.ws.send({ type: 'full-reload' });
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    blogReadingTimesPlugin(),
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [rehypeHighlight],
    }),
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: false, quality: 82 },
      includePublic: true,
    }),
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      open: process.env.ANALYZE === 'true',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@pavy/i18n': resolve(__dirname, '../../packages/i18n/src/index.ts'),
      '@pavy/ui': resolve(__dirname, '../../packages/ui/src/index.ts'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'framer-motion': ['framer-motion'],
          'lucide': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    host: true,
    port: 4273,
    strictPort: true,
    fs: {
      // 프로젝트 루트 바깥의 packages 폴더 접근 허용
      allow: ['..', '../../packages'],
    },
    watch: {
      // 워크스페이스 내의 패키지 수정사항을 즉시 감지하도록 설정
      ignored: ['!**/packages/i18n/src/locales/**'],
      usePolling: true, // 파일 시스템 이벤트가 전달되지 않는 경우를 대비해 폴링 방식 사용 (확실한 방법)
    },
  },
  optimizeDeps: {
    exclude: ['@pavy/i18n', '@pavy/ui'],
  },
});
