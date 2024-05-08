import { Injectable } from '@nestjs/common';
import { Product } from '../domain/products.entity';
import { ProductInputModel } from '../api/models/input/product.input.model';
import { ProductsRepository } from '../infrostructure/products.repository';
import { ProductsQueryRepository } from '../infrostructure/products.query.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly productQueryRepository: ProductsQueryRepository,
  ) {}
  async create(product: ProductInputModel): Promise<Product | false | -1> {
    const isExists = await this.productQueryRepository.getByName(product.name);
    if (isExists) return -1;
    const newProduct = new Product(product.name, product.price, product.count);
    const result: Product | false =
      await this.productRepository.create(newProduct);
    return result;
  }
  async delete(id: string) {
    return this.productRepository.delete(id);
  }
  async update(id: string, updateData: ProductInputModel) {
    return this.productRepository.update(id, updateData);
  }
}
