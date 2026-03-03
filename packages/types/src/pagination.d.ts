export interface PaginationParams {
    readonly page: number;
    readonly limit: number;
    readonly sortBy?: string;
    readonly sortOrder?: 'asc' | 'desc';
    readonly search?: string;
}
export interface PaginationMeta {
    readonly total: number;
    readonly page: number;
    readonly limit: number;
    readonly totalPages: number;
    readonly hasNext: boolean;
    readonly hasPrev: boolean;
}
//# sourceMappingURL=pagination.d.ts.map