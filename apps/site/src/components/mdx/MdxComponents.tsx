import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'react-router-dom';
import { CodeBlock } from './CodeBlock';
import { useLocale } from '../../hooks/useLocale';

function MdxAnchor({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { localePath } = useLocale();

  if (!href) return <a {...rest}>{children}</a>;

  // Hash-only or non-http schemes (mailto:, tel:) — render as native anchor.
  if (href.startsWith('#') || /^[a-z]+:/i.test(href)) {
    return <a href={href} {...rest}>{children}</a>;
  }

  // Absolute internal path (e.g. "/docs/troubleshoot/origin-not-allowed"):
  // prepend the active locale and route through the SPA so the click does not
  // trigger a full page reload that would hit the redirect handler.
  if (href.startsWith('/')) {
    return <Link to={localePath(href)} {...rest}>{children}</Link>;
  }

  // Relative path (e.g. "./origin-not-allowed") — let the router resolve it
  // against the current docs path. <Link to> with a relative value uses the
  // matched route as base, which is the correct behaviour for cross-doc links.
  return <Link to={href} {...rest}>{children}</Link>;
}

const components = {
  pre: CodeBlock,
  a: MdxAnchor,
};

export function MdxComponentsProvider({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
