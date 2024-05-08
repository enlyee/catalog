import { Injectable } from '@nestjs/common';
import { ProductsQueryInputFixedModel } from '../api/models/input/products.query.input.model';
import { ProductsQueryOutputModel } from '../api/models/output/products.query.output.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../domain/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsQueryRepository {
  constructor(
    @InjectRepository(Product) private readonly connection: Repository<Product>,
  ) {}
  async getAll(
    query: ProductsQueryInputFixedModel,
  ): Promise<ProductsQueryOutputModel> {
    const itemsAndCount = await this.connection.findAndCount({
      order: { [query.sortBy]: query.sortDirection },
      take: query.pageSize,
      skip: query.pageSize * (query.pageNumber - 1),
    });
    const output = new ProductsQueryOutputModel(
      query,
      itemsAndCount[0],
      itemsAndCount[1],
    );
    return output;
  }
  async getById(id: string) {
    try {
      const product: Product | null = await this.connection.findOneBy({
        id: id,
      });
      if (!product) return false;
      return product;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async getByName(name: string) {
    try {
      const product: Product | null = await this.connection.findOneBy({
        name: name,
      });
      if (!product) return false;
      return product;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
