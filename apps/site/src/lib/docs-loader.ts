import type { ComponentType } from 'react';

export interface DocsFrontmatter {
  title: string;
  description?: string;
}

export interface DocsPage {
  slug: string;
  path: string;
  frontmatter: DocsFrontmatter;
  component: ComponentType;
}

const FALLBACK_LANG = 'en';

const docsModules = import.meta.glob<{
  frontmatter: DocsFrontmatter;
  default: ComponentType;
}>('../content/docs/**/*.mdx', { eager: true });

function pathFromModulePath(path: string): string {
  // '../content/docs/en/getting-started/quick-start.mdx' -> 'getting-started/quick-start'
  const rest = path.replace('../content/docs/', '').replace(/\.mdx$/, '');
  const slashIdx = rest.indexOf('/');
  return slashIdx === -1 ? rest : rest.slice(slashIdx + 1);
}

export function getDocsPageByPath(path: string, lang: string = FALLBACK_LANG): DocsPage | null {
  const candidates = [
    `../content/docs/${lang}/${path}.mdx`,
    `../content/docs/${FALLBACK_LANG}/${path}.mdx`,
  ];

  for (const modulePath of candidates) {
    const module = docsModules[modulePath];
    if (module?.frontmatter) {
      return {
        slug: path.split('/').pop() || '',
        path,
        frontmatter: module.frontmatter,
        component: module.default,
      };
    }
  }

  return null;
}

export function getAllDocsPaths(): string[] {
  const paths = new Set<string>();
  for (const modulePath of Object.keys(docsModules)) {
    paths.add(pathFromModulePath(modulePath));
  }
  return Array.from(paths);
}
