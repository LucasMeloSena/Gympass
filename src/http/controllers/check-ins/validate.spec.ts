import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { Role } from '@prisma/client';

describe('Validate CheckIn Controller (e2e)', () => {
  it('should be able to validate a check-in', async () => {
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

    const checkInResponse = await request(app).post(`/gyms/${gymResponse.body.gym.id}/check-ins`).set('Authorization', `Bearer ${token}`).send({
      latitude: -19.9760093,
      longitude: -43.9712307,
    });

    expect(checkInResponse.body.checkIn.validated_at).toBeNull();

    const response = await request(app).patch(`/check-ins/${checkInResponse.body.checkIn.id}/validate`).set('Authorization', `Bearer ${token}`).send();

    expect(response.statusCode).toBe(200);
    const validated_at = new Date(response.body.checkIn.validated_at);
    expect(validated_at).toEqual(expect.any(Date));
  });
});
