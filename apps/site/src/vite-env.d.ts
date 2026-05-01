/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA4_MEASUREMENT_ID: string;
  readonly VITE_ADMIN_SIGNUP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const component: ComponentType<Record<string, unknown>>;
  export default component;
  export const frontmatter: Record<string, unknown>;
}

declare module 'virtual:blog-reading-times' {
  const readingTimes: Record<string, number>;
  export default readingTimes;
}
