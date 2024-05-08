import { Injectable, PipeTransform } from '@nestjs/common';
import {
  ProductsQueryInputFixedModel,
  ProductsQueryInputModel,
} from '../../features/products/api/models/input/products.query.input.model';

const sortingProductsName = ['count', 'price', 'name'];

@Injectable()
export class ProductsQueryPipe implements PipeTransform {
  transform(query: ProductsQueryInputModel): ProductsQueryInputFixedModel {
    const fixedQuery: ProductsQueryInputFixedModel = {
      sortBy: query.sortBy
        ? sortingProductsName.includes(query.sortBy)
          ? query.sortBy
          : 'name'
        : 'name',
      sortDirection: query.sortDirection === 'asc' ? 'asc' : 'desc',
      pageNumber:
        query.pageNumber && query.pageNumber > 0 && query.pageNumber % 1 === 0
          ? query.pageNumber
          : 1,
      pageSize:
        query.pageSize && query.pageSize > 0 && query.pageSize % 1 === 0
          ? query.pageSize
          : 10,
    };

    return fixedQuery;
  }
}
