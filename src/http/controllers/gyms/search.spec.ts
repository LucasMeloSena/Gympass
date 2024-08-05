import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { Role } from '@prisma/client';

describe('Search Gym Controller (e2e)', () => {
  it('should be able to search gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, Role.ADMIN);

    await request(app).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      name: 'JavaScript Gym',
      image: 'https://gujsp.com.br/wp-content/uploads/2017/09/smart-fit-academia-unidade-shopping-castanheira-belem-pa-1-recepcao.jpg',
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      email: 'javascriptgym@example.com',
      latitude: -19.9760093,
      longitude: -43.9712307,
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Buritis',
      street: 'Maria Heilbuth Surette',
      adress_number: '643',
      adress_addition: 'loja 2',
    });

    await request(app).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      name: 'TypeScript Gym',
      image: 'https://gujsp.com.br/wp-content/uploads/2017/09/smart-fit-academia-unidade-shopping-castanheira-belem-pa-1-recepcao.jpg',
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      email: 'typecriptgym@example.com',
      latitude: -19.8848941,
      longitude: -43.9087459,
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Buritis',
      street: 'Maria Heilbuth Surette',
      adress_number: '643',
      adress_addition: 'loja 2',
    });

    const response = await request(app)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        query: 'JavaScript',
        page: 1,
      })
      .send();

    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'JavaScript Gym',
      }),
    ]);
  });
});
