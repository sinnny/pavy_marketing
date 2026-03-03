export interface Message {
    readonly id: string;
    readonly conversationId: string;
    readonly role: MessageRole;
    readonly content: string;
    readonly contentType: MessageContentType;
    readonly metadata?: MessageMetadata;
    readonly createdAt: string;
}
export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageContentType = 'text' | 'markdown' | 'product_card' | 'quick_replies';
export interface MessageMetadata {
    readonly tokens?: number;
    readonly model?: string;
    readonly latencyMs?: number;
    readonly sources?: readonly MessageSource[];
}
export interface MessageSource {
    readonly documentId: string;
    readonly title: string;
    readonly snippet: string;
    readonly relevanceScore: number;
}
export interface SendMessagePayload {
    readonly conversationId: string;
    readonly content: string;
    readonly contentType?: MessageContentType;
}
export interface StreamChunk {
    readonly type: 'token' | 'done' | 'error';
    readonly content: string;
    readonly messageId?: string;
}
//# sourceMappingURL=message.d.ts.map