import type { ComponentType } from 'react';
import readingTimes from 'virtual:blog-reading-times';

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  coverImage: string;
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  component: ComponentType;
  readingMinutes: number;
}

export interface BlogPostMeta extends BlogPostFrontmatter {
  slug: string;
  readingMinutes: number;
}

const blogModules = import.meta.glob<{
  frontmatter: BlogPostFrontmatter;
  default: ComponentType;
}>('../content/blog/*.mdx', { eager: true });

function slugFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.mdx$/, '') ?? '';
}

function buildMeta(path: string): BlogPostMeta | null {
  const slug = slugFromPath(path);
  const module = blogModules[path];
  if (!module?.frontmatter) return null;

  return {
    slug,
    ...module.frontmatter,
    readingMinutes: readingTimes[slug] ?? 1,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return Object.keys(blogModules)
    .map(buildMeta)
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const path = `../content/blog/${slug}.mdx`;
  const module = blogModules[path];
  if (!module?.frontmatter) return null;

  return {
    slug,
    ...module.frontmatter,
    component: module.default,
    readingMinutes: readingTimes[slug] ?? 1,
  };
}
