import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { Role } from '@prisma/client';

describe('Get User CheckIns Metrics Controller (e2e)', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should be able to get the user check-ins metrics', async () => {
    vi.setSystemTime(new Date());
    let { token, cookies } = await createAndAuthenticateUser(app, Role.ADMIN);

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

    vi.advanceTimersByTime(90000000);

    const refreshTokenResponse = await request(app).patch('/token/refresh').set('Cookie', cookies!).send();
    token = refreshTokenResponse.body.token;

    await request(app).post(`/gyms/${gymResponse.body.gym.id}/check-ins`).set('Authorization', `Bearer ${token}`).send({
      latitude: -19.9760093,
      longitude: -43.9712307,
    });

    vi.useRealTimers();
    await request(app).patch(`/check-ins/${checkInResponse.body.checkIn.id}/validate`).set('Authorization', `Bearer ${token}`).send();

    const response = await request(app).get('/check-ins/metrics').set('Authorization', `Bearer ${token}`).send();
    const currentMonth = new Date().getMonth();

    expect(response.statusCode).toBe(200);
    expect(response.body.checkInsCount).toBe(1);
    expect(response.body.checkInsCountByMonth[currentMonth].count).toBe(1);
  });
});
