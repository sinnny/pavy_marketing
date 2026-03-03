export interface Chatbot {
    readonly id: string;
    readonly tenantId: string;
    readonly name: string;
    readonly description?: string;
    readonly model: ChatbotModel;
    readonly systemPrompt: string;
    readonly temperature: number;
    readonly maxTokens: number;
    readonly status: ChatbotStatus;
    readonly knowledgeBaseIds: readonly string[];
    readonly widgetConfigId?: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}
export type ChatbotModel = 'gpt-4o' | 'gpt-4o-mini' | 'claude-sonnet-4-5-20250929' | 'claude-haiku-4-5-20251001';
export type ChatbotStatus = 'draft' | 'active' | 'paused' | 'archived';
export interface CreateChatbotPayload {
    readonly name: string;
    readonly description?: string;
    readonly model: ChatbotModel;
    readonly systemPrompt: string;
    readonly temperature?: number;
    readonly maxTokens?: number;
}
export interface UpdateChatbotPayload {
    readonly name?: string;
    readonly description?: string;
    readonly model?: ChatbotModel;
    readonly systemPrompt?: string;
    readonly temperature?: number;
    readonly maxTokens?: number;
    readonly status?: ChatbotStatus;
    readonly knowledgeBaseIds?: readonly string[];
}
//# sourceMappingURL=chatbot.d.ts.map