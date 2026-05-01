import { getSignupUrl } from './signup';

export interface PlanTier {
  id: 'free' | 'pro' | 'enterprise';
  nameKey: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  currency: string;
  featuresKeys: string[];
  ctaKey: string;
  ctaHref: string;
  highlighted: boolean;
  badge?: string;
}

export interface FeatureRow {
  nameKey: string;
  category: string;
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

export interface FeatureCategory {
  nameKey: string;
  features: FeatureRow[];
}

export const featureMatrix: FeatureCategory[] = [
  {
    nameKey: 'pages.pricing.comparison.categories.chatbot.name',
    features: [
      {
        nameKey: 'pages.pricing.comparison.categories.chatbot.features.product_recommendation',
        category: 'chatbot',
        free: true,
        pro: true,
        enterprise: true,
      },
      {
        nameKey: 'pages.pricing.comparison.categories.chatbot.features.message_limit',
        category: 'chatbot',
        free: 'pages.pricing.comparison.values.1k_msgs',
        pro: 'pages.pricing.comparison.values.10k_msgs',
        enterprise: 'pages.pricing.comparison.values.unlimited',
      },
      {
        nameKey: 'pages.pricing.comparison.categories.chatbot.features.custom_styling',
        category: 'chatbot',
        free: false,
        pro: true,
        enterprise: true,
      },
      {
        nameKey: 'pages.pricing.comparison.categories.chatbot.features.multi_language',
        category: 'chatbot',
        free: false,
        pro: true,
        enterprise: true,
      },
    ],
  },
  {
    nameKey: 'pages.pricing.comparison.categories.dashboard.name',
    features: [
      {
        nameKey: 'pages.pricing.comparison.categories.dashboard.features.analytics',
        category: 'dashboard',
        free: 'pages.pricing.comparison.values.basic',
        pro: 'pages.pricing.comparison.values.advanced',
        enterprise: 'pages.pricing.comparison.values.custom',
      },
      {
        nameKey: 'pages.pricing.comparison.categories.dashboard.features.chat_history',
        category: 'dashboard',
        free: 'pages.pricing.comparison.values.7_days',
        pro: 'pages.pricing.comparison.values.1_year',
        enterprise: 'pages.pricing.comparison.values.unlimited',
      },
      {
        nameKey: 'pages.pricing.comparison.categories.dashboard.features.knowledge_base',
        category: 'dashboard',
        free: 'pages.pricing.comparison.values.10_pages',
        pro: 'pages.pricing.comparison.values.1000_pages',
        enterprise: 'pages.pricing.comparison.values.unlimited',
      },
    ],
  },
  {
    nameKey: 'pages.pricing.comparison.categories.support.name',
    features: [
      {
        nameKey: 'pages.pricing.comparison.categories.support.features.email_support',
        category: 'support',
        free: true,
        pro: true,
        enterprise: true,
      },
      {
        nameKey: 'pages.pricing.comparison.categories.support.features.priority_support',
        category: 'support',
        free: false,
        pro: true,
        enterprise: true,
      },
      {
        nameKey: 'pages.pricing.comparison.categories.support.features.dedicated_manager',
        category: 'support',
        free: false,
        pro: false,
        enterprise: true,
      },
      {
        nameKey: 'pages.pricing.comparison.categories.support.features.sla',
        category: 'support',
        free: false,
        pro: false,
        enterprise: 'pages.pricing.comparison.values.99_9',
      },
    ],
  },
  {
    nameKey: 'pages.pricing.comparison.categories.integrations.name',
    features: [
      {
        nameKey: 'pages.pricing.comparison.categories.integrations.features.shopify',
        category: 'integrations',
        free: true,
        pro: true,
        enterprise: true,
      },
      {
        nameKey: 'pages.pricing.comparison.categories.integrations.features.api_access',
        category: 'integrations',
        free: false,
        pro: true,
        enterprise: true,
      },
      {
        nameKey: 'pages.pricing.comparison.categories.integrations.features.webhooks',
        category: 'integrations',
        free: false,
        pro: true,
        enterprise: true,
      },
    ],
  },
  {
    nameKey: 'pages.pricing.comparison.categories.security.name',
    features: [
      {
        nameKey: 'pages.pricing.comparison.categories.security.features.encryption',
        category: 'security',
        free: true,
        pro: true,
        enterprise: true,
      },
      {
        nameKey: 'pages.pricing.comparison.categories.security.features.sso',
        category: 'security',
        free: false,
        pro: false,
        enterprise: true,
      },
      {
        nameKey: 'pages.pricing.comparison.categories.security.features.custom_data_retention',
        category: 'security',
        free: false,
        pro: false,
        enterprise: true,
      },
    ],
  }
];

export const plans: PlanTier[] = [
  {
    id: 'free',
    nameKey: 'pages.pricing.plans.free.name',
    monthlyPrice: 0,
    annualPrice: 0,
    currency: '$',
    featuresKeys: [
      'pages.pricing.plans.free.features.f1',
      'pages.pricing.plans.free.features.f2',
      'pages.pricing.plans.free.features.f3',
    ],
    ctaKey: 'pages.pricing.plans.free.cta',
    ctaHref: getSignupUrl(),
    highlighted: false,
  },
  {
    id: 'pro',
    nameKey: 'pages.pricing.plans.pro.name',
    monthlyPrice: 49,
    annualPrice: 39,
    currency: '$',
    featuresKeys: [
      'pages.pricing.plans.pro.features.f1',
      'pages.pricing.plans.pro.features.f2',
      'pages.pricing.plans.pro.features.f3',
      'pages.pricing.plans.pro.features.f4',
    ],
    ctaKey: 'pages.pricing.plans.pro.cta',
    ctaHref: getSignupUrl(),
    highlighted: true,
    badge: 'pages.pricing.plans.pro.badge',
  },
  {
    id: 'enterprise',
    nameKey: 'pages.pricing.plans.enterprise.name',
    monthlyPrice: null,
    annualPrice: null,
    currency: '$',
    featuresKeys: [
      'pages.pricing.plans.enterprise.features.f1',
      'pages.pricing.plans.enterprise.features.f2',
      'pages.pricing.plans.enterprise.features.f3',
      'pages.pricing.plans.enterprise.features.f4',
    ],
    ctaKey: 'pages.pricing.plans.enterprise.cta',
    ctaHref: 'mailto:axiomni.official@gmail.com',
    highlighted: false,
  },
];
