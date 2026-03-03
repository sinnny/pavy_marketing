import type { Message } from './message.js';

export interface Conversation {
  readonly id: string;
  readonly chatbotId: string;
  readonly visitorId: string;
  readonly title?: string;
  readonly status: ConversationStatus;
  readonly metadata: ConversationMetadata;
  readonly lastMessageAt?: string;
  readonly messageCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type ConversationStatus = 'active' | 'closed' | 'archived';

export interface ConversationMetadata {
  readonly source: 'widget' | 'api' | 'test';
  readonly pageUrl?: string;
  readonly userAgent?: string;
  readonly referrer?: string;
}

export interface ConversationWithMessages extends Conversation {
  readonly messages: readonly Message[];
}

export interface CreateConversationPayload {
  readonly chatbotId: string;
  readonly visitorId: string;
  readonly metadata?: Partial<ConversationMetadata>;
}
