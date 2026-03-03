export interface Tenant {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly logoUrl?: string;
  readonly plan: TenantPlan;
  readonly status: TenantStatus;
  readonly settings: TenantSettings;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type TenantPlan = 'free' | 'starter' | 'professional' | 'enterprise';

export type TenantStatus = 'active' | 'suspended' | 'trial' | 'cancelled';

export interface TenantSettings {
  readonly defaultLanguage: string;
  readonly timezone: string;
  readonly customDomain?: string;
  readonly brandColor?: string;
}

export interface CreateTenantPayload {
  readonly name: string;
  readonly slug: string;
  readonly plan?: TenantPlan;
}

export interface UpdateTenantPayload {
  readonly name?: string;
  readonly logoUrl?: string;
  readonly settings?: Partial<TenantSettings>;
}
