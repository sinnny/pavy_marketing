import type { PaginationMeta } from './pagination.js';

export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data: T | null;
  readonly error: ApiError | null;
  readonly meta?: PaginationMeta;
}

export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly details?: Record<string, unknown>;
}

export interface ApiListResponse<T> {
  readonly success: boolean;
  readonly data: readonly T[];
  readonly error: ApiError | null;
  readonly meta: PaginationMeta;
}
