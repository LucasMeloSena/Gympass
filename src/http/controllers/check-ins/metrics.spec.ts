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
    const { token } = await createAndAuthenticateUser(app, Role.MEMBER);
    vi.setSystemTime(new Date());

    const gymResponse = await request(app).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      name: 'JavaScript Gym',
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      latitude: -19.9760093,
      longitude: -43.9712307,
    });

    await request(app).post(`/gyms/${gymResponse.body.gym.id}/check-ins`).set('Authorization', `Bearer ${token}`).send({
      latitude: -19.9760093,
      longitude: -43.9712307,
    });

    vi.advanceTimersByTime(90000000);

    await request(app).post(`/gyms/${gymResponse.body.gym.id}/check-ins`).set('Authorization', `Bearer ${token}`).send({
      latitude: -19.9760093,
      longitude: -43.9712307,
    });

    const response = await request(app).get('/check-ins/metrics').set('Authorization', `Bearer ${token}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.checkInsCount).toBe(2);
  });
});
