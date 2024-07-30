import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { Role } from '@prisma/client';

describe('Create Gym Controller (e2e)', () => {
  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, Role.ADMIN);

    const response = await request(app).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      name: 'JavaScript Gym',
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      latitude: -19.9760093,
      longitude: -43.9712307,
    });

    expect(response.statusCode).toBe(201);
  });
});
