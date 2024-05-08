import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from '../application/products.service';
import { ProductsQueryPipe } from '../../../common/pipes/products.query.pipe';
import { ProductsQueryInputFixedModel } from './models/input/products.query.input.model';
import { ProductsQueryOutputModel } from './models/output/products.query.output.model';
import { ProductsQueryRepository } from '../infrostructure/products.query.repository';
import { ProductInputModel } from './models/input/product.input.model';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get(':id')
  async getById(@Param('id') id: string) {
    const product = await this.productsQueryRepository.getById(id);
    if (!product) throw new NotFoundException();
    return product;
  }

  @Post('')
  async create(@Body() product: ProductInputModel) {
    const output = await this.productsService.create(product);
    if (!output) throw new BadRequestException();
    if (output === -1) throw new ConflictException();
    return output;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleteResult = await this.productsService.delete(id);
    if (!deleteResult) throw new NotFoundException();
    return;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: ProductInputModel) {
    const updateResult = await this.productsService.update(id, updateData);
    if (!updateResult) throw new NotFoundException();
    return;
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    console.log(file);
  }
}
