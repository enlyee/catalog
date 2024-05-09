import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Product } from '../src/features/products/domain/products.entity';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await request(app.getHttpServer()).delete('/testing/all-data');
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  let product: Product;
  it('/ (POST) Should create product', async () => {
    const res = await request(app.getHttpServer())
      .post('/')
      .send({
        name: 'Plain Product',
        count: 1,
        price: 1.1,
      })
      .expect(201);
    expect(res.body).toMatchObject({
      name: 'Plain Product',
      count: 1,
      price: 1.1,
      id: expect.any(String),
    });
    product = res.body;
  });

  it('/ (POST) Shouldn`t create product with the same name', async () => {
    await request(app.getHttpServer())
      .post('/')
      .send({
        name: 'Plain Product',
        count: 1,
        price: 1.1,
      })
      .expect(409);
  });

  it('/ (GET) Should return created product', async () => {
    const res = await request(app.getHttpServer())
      .get('/' + product.id)
      .expect(200);
    expect(res.body).toEqual(product);
  });

  it('/ (DELETE) Should delete created product', async () => {
    await request(app.getHttpServer())
      .delete('/' + product.id)
      .expect(200);
    await request(app.getHttpServer())
      .get('/' + product.id)
      .expect(404);
  });
});
