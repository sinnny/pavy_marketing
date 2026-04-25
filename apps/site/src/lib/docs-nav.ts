export interface DocsNavItem {
  titleKey: string;        // i18n key
  slug: string;            // URL segment
  children?: DocsNavItem[];
}

export const docsNavigation: DocsNavItem[] = [
  {
    titleKey: 'pages.docs.nav.getting_started',
    slug: 'getting-started',
    children: [
      { titleKey: 'pages.docs.nav.quick_start', slug: 'quick-start' },
      { titleKey: 'pages.docs.nav.api_key', slug: 'api-key' },
    ]
  },
  {
    titleKey: 'pages.docs.nav.integrations',
    slug: 'integrations',
    children: [
      { titleKey: 'pages.docs.nav.html', slug: 'html' },
      { titleKey: 'pages.docs.nav.shopify', slug: 'shopify' },
      { titleKey: 'pages.docs.nav.woocommerce', slug: 'woocommerce' },
      { titleKey: 'pages.docs.nav.react', slug: 'react' },
      { titleKey: 'pages.docs.nav.nextjs', slug: 'nextjs' },
    ]
  },
  {
    titleKey: 'pages.docs.nav.configuration',
    slug: 'configuration',
    children: [
      { titleKey: 'pages.docs.nav.theming', slug: 'theming' },
      { titleKey: 'pages.docs.nav.events', slug: 'events' },
    ]
  },
  {
    titleKey: 'pages.docs.nav.troubleshooting',
    slug: 'troubleshoot',
    children: [
      { titleKey: 'pages.docs.nav.widget_not_showing_overview', slug: 'widget-not-showing-overview' },
      { titleKey: 'pages.docs.nav.invalid_api_key', slug: 'invalid-api-key' },
      { titleKey: 'pages.docs.nav.not_public_key', slug: 'not-public-key' },
      { titleKey: 'pages.docs.nav.origin_not_allowed', slug: 'origin-not-allowed' },
      { titleKey: 'pages.docs.nav.workspace_not_found', slug: 'workspace-not-found' },
      { titleKey: 'pages.docs.nav.rate_limited', slug: 'rate-limited' },
      { titleKey: 'pages.docs.nav.network_error', slug: 'network-error' },
      { titleKey: 'pages.docs.nav.cors_blocked', slug: 'cors-blocked' },
    ]
  },
];
