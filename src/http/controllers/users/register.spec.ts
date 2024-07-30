import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '@/app';

describe('User Register Controller (e2e)', () => {
  it('should be able to register an user', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(201);
  });
});
