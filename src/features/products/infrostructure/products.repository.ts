import { Injectable } from '@nestjs/common';
import { Product } from '../domain/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInputModel } from '../api/models/input/product.input.model';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private readonly connection: Repository<Product>,
  ) {}
  async create(product: Product): Promise<Product | false> {
    try {
      const newProduct: Product = await this.connection.save(product);
      return newProduct;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async delete(id: string) {
    try {
      const deleteResult = await this.connection.delete({ id: id });
      return !!deleteResult.affected;
    } catch (err) {
      return false;
    }
  }
  async update(id: string, updateData: ProductInputModel) {
    try {
      const updateResult = await this.connection.update(
        { id: id },
        {
          name: updateData.name,
          price: updateData.price,
          count: updateData.count,
        },
      );
      return !!updateResult.affected;
    } catch (err) {
      return false;
    }
  }
}
