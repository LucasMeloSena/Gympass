import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '@/app';

describe('Refresh Token Controller (e2e)', () => {
  it('should be able to refresh a token', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const authResponse = await request(app).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    const cookies = authResponse.get('Set-Cookie');
    const response = await request(app).patch('/token/refresh').set('Cookie', cookies!).send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get('Set-Cookie')).toEqual([expect.stringContaining('refreshToken=')]);
  });
});
