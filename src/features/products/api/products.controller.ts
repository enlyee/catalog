import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseFilePipeBuilder,
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('/')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productsQueryRepository: ProductsQueryRepository,
  ) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Returns all products',
  })
  @Get('')
  async getAll(
    @Query(ProductsQueryPipe) query: ProductsQueryInputFixedModel,
  ): Promise<ProductsQueryOutputModel> {
    const output = this.productsQueryRepository.getAll(query);
    return output;
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, description: 'Returns products' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    const product = await this.productsQueryRepository.getById(id);
    if (!product) throw new NotFoundException();
    return product;
  }

  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, description: 'Returns created products' })
  @ApiResponse({ status: 400, description: 'Wrong product data' })
  @ApiResponse({ status: 409, description: 'This product name already exists' })
  @Post('')
  async create(@Body() product: ProductInputModel) {
    const output = await this.productsService.create(product);
    if (!output) throw new BadRequestException();
    if (output === -1) throw new ConflictException();
    return output;
  }

  @ApiOperation({ summary: 'Delete product by id' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleteResult = await this.productsService.delete(id);
    if (!deleteResult) throw new NotFoundException();
    return;
  }

  @ApiOperation({ summary: 'Update product by id' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiResponse({ status: 400, description: 'Wrong product data' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: ProductInputModel) {
    const updateResult = await this.productsService.update(id, updateData);
    if (!updateResult) throw new NotFoundException();
    return;
  }

  @ApiOperation({ summary: 'Update product image by id' })
  @ApiResponse({ status: 200, description: 'Product image updated' })
  @ApiResponse({ status: 400, description: 'Wrong file type' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Put(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .addMaxSizeValidator({
          maxSize: 10000000, // just to you know it's possible.
        })
        .build({
          exceptionFactory(error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          },
        }),
    )
    file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const status = await this.productsService.uploadPhoto(id, file);
    if (!status) throw new NotFoundException();
    return;
  }
}
