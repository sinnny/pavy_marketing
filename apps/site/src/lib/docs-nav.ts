export interface DocsNavItem {
  titleKey: string;        // i18n key
  slug: string;            // URL segment
  children?: DocsNavItem[];
}

export const docsNavigation: DocsNavItem[] = [
  {
    titleKey: 'docs.nav.getting_started',
    slug: 'getting-started',
    children: [
      { titleKey: 'docs.nav.quick_start', slug: 'quick-start' },
      { titleKey: 'docs.nav.api_key', slug: 'api-key' },
    ]
  },
  {
    titleKey: 'docs.nav.integrations',
    slug: 'integrations',
    children: [
      { titleKey: 'docs.nav.html', slug: 'html' },
      { titleKey: 'docs.nav.shopify', slug: 'shopify' },
      { titleKey: 'docs.nav.woocommerce', slug: 'woocommerce' },
      { titleKey: 'docs.nav.react', slug: 'react' },
      { titleKey: 'docs.nav.nextjs', slug: 'nextjs' },
    ]
  },
  {
    titleKey: 'docs.nav.configuration',
    slug: 'configuration',
    children: [
      { titleKey: 'docs.nav.theming', slug: 'theming' },
      { titleKey: 'docs.nav.events', slug: 'events' },
    ]
  },
];
