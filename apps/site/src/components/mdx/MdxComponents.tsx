import type { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { CodeBlock } from './CodeBlock';

const components = {
  pre: CodeBlock,
};

export function MdxComponentsProvider({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
