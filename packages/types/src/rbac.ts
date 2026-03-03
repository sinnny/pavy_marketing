export type RoleId = 'owner' | 'admin' | 'editor' | 'viewer';

export type Permission =
  | 'chatbot:create'
  | 'chatbot:read'
  | 'chatbot:update'
  | 'chatbot:delete'
  | 'knowledge_base:create'
  | 'knowledge_base:read'
  | 'knowledge_base:update'
  | 'knowledge_base:delete'
  | 'conversation:read'
  | 'conversation:delete'
  | 'analytics:read'
  | 'team:invite'
  | 'team:remove'
  | 'team:update_role'
  | 'billing:read'
  | 'billing:manage'
  | 'settings:read'
  | 'settings:update'
  | 'widget:customize';

export interface Role {
  readonly id: RoleId;
  readonly name: string;
  readonly description: string;
  readonly permissions: readonly Permission[];
}

export interface RoleAssignment {
  readonly userId: string;
  readonly roleId: RoleId;
  readonly tenantId: string;
  readonly assignedAt: string;
  readonly assignedBy: string;
}
