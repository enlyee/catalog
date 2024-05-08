import { Controller, Get, Post, Query } from '@nestjs/common';
import { ProductsService } from '../application/products.service';
import { ProductsQueryPipe } from '../../../common/pipes/products.query.pipe';
import { ProductsQueryInputFixedModel } from './models/input/products.query.input.model';
import { ProductsQueryOutputModel } from './models/output/products.query.output.model';
import { ProductsQueryRepository } from '../infrostructure/products.query.repository';

@Controller('/')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productsQueryRepository: ProductsQueryRepository,
  ) {}

  @Get('')
  async getAll(
    @Query(ProductsQueryPipe) query: ProductsQueryInputFixedModel,
  ): Promise<ProductsQueryOutputModel> {
    const output = this.productsQueryRepository.getAll(query);
    return output;
  }
}
