import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { Role } from '@prisma/client';

describe('Search Nearby Gyms Controller (e2e)', () => {
  it('should be able to search nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, Role.ADMIN);

    await request(app).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      name: 'JavaScript Gym',
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      latitude: -19.9760093,
      longitude: -43.9734746,
    });

    await request(app).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      name: 'TypeScript Gym',
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      latitude: -19.8848941,
      longitude: -43.9087459,
    });

    const response = await request(app)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: -19.9760093,
        longitude: -43.9734746,
      })
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'JavaScript Gym',
      }),
    ]);
  });
});
