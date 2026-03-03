import type { RoleId } from './rbac.js';

export interface User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly avatarUrl?: string;
  readonly role: RoleId;
  readonly tenantId: string;
  readonly isActive: boolean;
  readonly lastLoginAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateUserPayload {
  readonly email: string;
  readonly name: string;
  readonly role: RoleId;
}

export interface UpdateUserPayload {
  readonly name?: string;
  readonly avatarUrl?: string;
  readonly role?: RoleId;
  readonly isActive?: boolean;
}

export interface InternalUser {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly role: 'super_admin' | 'support' | 'viewer';
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
