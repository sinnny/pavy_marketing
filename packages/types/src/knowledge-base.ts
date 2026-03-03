export interface KnowledgeBase {
  readonly id: string;
  readonly tenantId: string;
  readonly name: string;
  readonly description?: string;
  readonly documentCount: number;
  readonly totalTokens: number;
  readonly status: KnowledgeBaseStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type KnowledgeBaseStatus = 'ready' | 'processing' | 'error';

export interface KnowledgeDocument {
  readonly id: string;
  readonly knowledgeBaseId: string;
  readonly title: string;
  readonly fileName: string;
  readonly fileType: DocumentFileType;
  readonly fileSize: number;
  readonly tokenCount: number;
  readonly status: DocumentStatus;
  readonly errorMessage?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type DocumentFileType = 'pdf' | 'txt' | 'md' | 'csv' | 'docx' | 'html' | 'url';

export type DocumentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface CreateKnowledgeBasePayload {
  readonly name: string;
  readonly description?: string;
}

export interface UploadDocumentPayload {
  readonly fileName: string;
  readonly fileContent: ArrayBuffer;
  readonly mimeType: string;
  readonly title?: string;
}

export interface AddUrlPayload {
  readonly url: string;
  readonly title?: string;
}
