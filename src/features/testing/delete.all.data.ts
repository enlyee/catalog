import { Controller, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/domain/products.entity';

@Controller('testing/all-data')
export class Testing {
  constructor(
    @InjectRepository(Product) private readonly rep: Repository<Product>,
  ) {}
  @Delete('')
  async deleteAll() {
    await this.rep.delete({});
  }
}
