import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '@/app';

describe('Authenticate User Controller (e2e)', () => {
  it('should be able to authenticate an user', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await request(app).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
