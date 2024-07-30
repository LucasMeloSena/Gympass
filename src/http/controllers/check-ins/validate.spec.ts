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
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      latitude: -19.9760093,
      longitude: -43.9712307,
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
