import { Product } from '../../../domain/products.entity';
import { ProductsQueryInputFixedModel } from '../input/products.query.input.model';

export class ProductsQueryOutputModel {
  pagesCount: number;
  page: number;
  totalCount: number;
  items: Product[];

  constructor(
    query: ProductsQueryInputFixedModel,
    items: Product[],
    totalCount: number,
  ) {
    this.page = +query.pageNumber;
    this.pagesCount = Math.ceil(totalCount / query.pageSize);
    this.totalCount = +totalCount;
    this.items = items;
  }
}
