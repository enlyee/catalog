import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Product } from '../src/features/products/domain/products.entity';
import { ProductInputModel } from '../src/features/products/api/models/input/product.input.model';

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

  it('/ (GET) Return all products', async () => {
    const res = await request(app.getHttpServer()).get('/').expect(200);
    expect(res.body).toEqual({
      pagesCount: 1,
      page: 1,
      totalCount: 1,
      items: [product],
    });
  });

  it('/:id (GET) Should return created product', async () => {
    const res = await request(app.getHttpServer())
      .get('/' + product.id)
      .expect(200);
    expect(res.body).toEqual(product);
  });

  it('/:id (DELETE) Should delete created product', async () => {
    await request(app.getHttpServer())
      .delete('/' + product.id)
      .expect(200);
    await request(app.getHttpServer())
      .get('/' + product.id)
      .expect(404);
  });

  it('/ (GET) Return all products with query', async () => {
    const productList: ProductInputModel[] = [];
    for (let i = 0; i < 5; i++) {
      productList.push({
        name: 'Plain Product' + i,
        count: i + 1,
        price: 1.1,
      });
    }
    const res = await Promise.all(
      productList.map(async (pr) => {
        return request(app.getHttpServer()).post('/').send(pr);
      }),
    );
    const res2 = await request(app.getHttpServer())
      .get('/')
      .query('sortBy=count')
      .query('sortDirection=desc');
    expect(res2.body).toEqual({
      pagesCount: 1,
      page: 1,
      totalCount: 5,
      items: res.map((p) => p.body).reverse(),
    });
  });
});
