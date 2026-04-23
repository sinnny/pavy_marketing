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

const docsModules = import.meta.glob<{
  frontmatter: DocsFrontmatter;
  default: ComponentType;
}>('../content/docs/**/*.mdx', { eager: true });

function pathFromModulePath(path: string): string {
  // Convert ../content/docs/getting-started/quick-start.mdx -> getting-started/quick-start
  return path
    .replace('../content/docs/', '')
    .replace(/\.mdx$/, '');
}

export function getDocsPageByPath(path: string): DocsPage | null {
  const modulePath = `../content/docs/${path}.mdx`;
  const module = docsModules[modulePath];
  
  if (!module?.frontmatter) return null;

  return {
    slug: path.split('/').pop() || '',
    path,
    frontmatter: module.frontmatter,
    component: module.default,
  };
}

export function getAllDocsPaths(): string[] {
  return Object.keys(docsModules).map(pathFromModulePath);
}
