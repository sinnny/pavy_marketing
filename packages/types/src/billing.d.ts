import type { TenantPlan } from './tenant.js';
export interface Subscription {
    readonly id: string;
    readonly tenantId: string;
    readonly plan: TenantPlan;
    readonly status: SubscriptionStatus;
    readonly currentPeriodStart: string;
    readonly currentPeriodEnd: string;
    readonly cancelAtPeriodEnd: boolean;
    readonly createdAt: string;
}
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'cancelled' | 'incomplete';
export interface Invoice {
    readonly id: string;
    readonly tenantId: string;
    readonly amount: number;
    readonly currency: string;
    readonly status: InvoiceStatus;
    readonly pdfUrl?: string;
    readonly periodStart: string;
    readonly periodEnd: string;
    readonly createdAt: string;
}
export type InvoiceStatus = 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
export interface UsageRecord {
    readonly tenantId: string;
    readonly metric: UsageMetric;
    readonly current: number;
    readonly limit: number;
    readonly period: string;
}
export type UsageMetric = 'messages' | 'chatbots' | 'knowledge_bases' | 'documents' | 'team_members';
export interface PlanDetails {
    readonly plan: TenantPlan;
    readonly name: string;
    readonly price: number;
    readonly currency: string;
    readonly interval: 'month' | 'year';
    readonly limits: Record<UsageMetric, number>;
    readonly features: readonly string[];
}
//# sourceMappingURL=billing.d.ts.map