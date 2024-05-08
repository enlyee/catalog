import { Module, Provider } from '@nestjs/common';
import { ProductsController } from './features/products/api/products.controller';
import { ProductsService } from './features/products/application/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './features/products/domain/products.entity';
import { ProductsQueryPipe } from './common/pipes/products.query.pipe';
import { ProductsQueryRepository } from './features/products/infrostructure/products.query.repository';
import { ProductsRepository } from './features/products/infrostructure/products.repository';
import { MulterModule } from '@nestjs/platform-express';

const productProviders: Provider[] = [
  ProductsService,
  ProductsQueryPipe,
  ProductsQueryRepository,
  ProductsRepository,
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sa',
      database: 'catalog',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [ProductsController],
  providers: [...productProviders],
})
export class AppModule {}
