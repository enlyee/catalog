import { Module, Provider } from '@nestjs/common';
import { ProductsController } from './features/products/api/products.controller';
import { ProductsService } from './features/products/application/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './features/products/domain/products.entity';
import { ProductsQueryPipe } from './common/pipes/products.query.pipe';
import { ProductsQueryRepository } from './features/products/infrostructure/products.query.repository';
import { ProductsRepository } from './features/products/infrostructure/products.repository';
import { MulterModule } from '@nestjs/platform-express';
import { Testing } from './features/testing/delete.all.data';
import configuration from './settings/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';

const productProviders: Provider[] = [
  ProductsService,
  ProductsQueryPipe,
  ProductsQueryRepository,
  ProductsRepository,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('typeOrmConfig'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Product]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [ProductsController, Testing],
  providers: [...productProviders],
})
export class AppModule {}
