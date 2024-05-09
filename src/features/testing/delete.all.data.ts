import { Controller, Delete } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('testing/all-data')
export class Testing {
  constructor(@InjectDataSource() private readonly rep: DataSource) {}
  @Delete('')
  async deleteAll() {
    await this.rep.query('DELETE FROM public.product');
  }
}
