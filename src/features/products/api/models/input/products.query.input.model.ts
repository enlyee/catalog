export class QueryProductsInputModel {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
}

export class QueryProductsInputFixedModel {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
}
