import type { Permission, Role, RoleId } from '@pavy/types';

const ALL_PERMISSIONS: readonly Permission[] = [
  'chatbot:create',
  'chatbot:read',
  'chatbot:update',
  'chatbot:delete',
  'knowledge_base:create',
  'knowledge_base:read',
  'knowledge_base:update',
  'knowledge_base:delete',
  'conversation:read',
  'conversation:delete',
  'analytics:read',
  'team:invite',
  'team:remove',
  'team:update_role',
  'billing:read',
  'billing:manage',
  'settings:read',
  'settings:update',
  'widget:customize',
] as const;

export const ROLES: Record<RoleId, Role> = {
  owner: {
    id: 'owner',
    name: 'Owner',
    description: 'Full access to all resources',
    permissions: ALL_PERMISSIONS,
  },
  admin: {
    id: 'admin',
    name: 'Admin',
    description: 'Manage team, chatbots, and settings',
    permissions: ALL_PERMISSIONS.filter(
      (p) => p !== 'billing:manage' && p !== 'team:remove',
    ),
  },
  editor: {
    id: 'editor',
    name: 'Editor',
    description: 'Manage chatbots and knowledge bases',
    permissions: [
      'chatbot:create',
      'chatbot:read',
      'chatbot:update',
      'knowledge_base:create',
      'knowledge_base:read',
      'knowledge_base:update',
      'conversation:read',
      'analytics:read',
      'widget:customize',
      'settings:read',
    ],
  },
  viewer: {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: [
      'chatbot:read',
      'knowledge_base:read',
      'conversation:read',
      'analytics:read',
      'settings:read',
    ],
  },
} as const;

export const ROLE_IDS: readonly RoleId[] = ['owner', 'admin', 'editor', 'viewer'] as const;
