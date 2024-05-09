import { Controller, Delete } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/domain/products.entity';
import { DataSource, Repository } from 'typeorm';

@Controller('testing/all-data')
export class Testing {
  constructor(@InjectDataSource() private readonly rep: DataSource) {}
  @Delete('')
  async deleteAll() {
    await this.rep.query('DELETE FROM public.product');
  }
}
