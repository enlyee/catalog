export class ProductsQueryInputModel {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
}

export class ProductsQueryInputFixedModel {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
}
