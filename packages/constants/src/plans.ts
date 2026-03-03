import type { PlanDetails, TenantPlan } from '@page-chatbot/types';

export const PLANS: Record<TenantPlan, PlanDetails> = {
  free: {
    plan: 'free',
    name: 'Free',
    price: 0,
    currency: 'USD',
    interval: 'month',
    limits: {
      messages: 100,
      chatbots: 1,
      knowledge_bases: 1,
      documents: 5,
      team_members: 1,
    },
    features: ['1 chatbot', 'Basic analytics', 'Community support'],
  },
  starter: {
    plan: 'starter',
    name: 'Starter',
    price: 29,
    currency: 'USD',
    interval: 'month',
    limits: {
      messages: 5000,
      chatbots: 3,
      knowledge_bases: 5,
      documents: 50,
      team_members: 3,
    },
    features: ['3 chatbots', 'Advanced analytics', 'Email support', 'Custom branding'],
  },
  professional: {
    plan: 'professional',
    name: 'Professional',
    price: 99,
    currency: 'USD',
    interval: 'month',
    limits: {
      messages: 25000,
      chatbots: 10,
      knowledge_bases: 20,
      documents: 500,
      team_members: 10,
    },
    features: [
      '10 chatbots',
      'Full analytics',
      'Priority support',
      'Custom branding',
      'API access',
      'Integrations',
    ],
  },
  enterprise: {
    plan: 'enterprise',
    name: 'Enterprise',
    price: 299,
    currency: 'USD',
    interval: 'month',
    limits: {
      messages: -1,
      chatbots: -1,
      knowledge_bases: -1,
      documents: -1,
      team_members: -1,
    },
    features: [
      'Unlimited chatbots',
      'Unlimited messages',
      'Dedicated support',
      'Custom integrations',
      'SLA',
      'SSO',
    ],
  },
} as const;

export const PLAN_ORDER: readonly TenantPlan[] = [
  'free',
  'starter',
  'professional',
  'enterprise',
] as const;
