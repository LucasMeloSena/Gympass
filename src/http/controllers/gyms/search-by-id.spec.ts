import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { Role } from '@prisma/client';

describe('Search Gym Controller (e2e)', () => {
  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, Role.ADMIN);

    const gymResponse = await request(app).post('/gyms').set('Authorization', `Bearer ${token}`).send({
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

    const response = await request(app).get(`/gym/${gymResponse.body.gym.id}`).set('Authorization', `Bearer ${token}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.gym).toEqual(
      expect.objectContaining({
        name: 'JavaScript Gym',
      }),
    );
  });
});
