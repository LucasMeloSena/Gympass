import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../../app';
import { Role } from '@prisma/client';
import { env } from '../../../env';

describe('Update User Password Controller (e2e)', () => {
  it('should be able to update user password', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '(31) 9 0000-0000',
      role: Role.MEMBER,
    });

    const response = await request(app).patch('/update/user/pass').send({
      email: 'johndoe@example.com',
      password: '12345678',
      token: env.PASSWORD_SECRET,
    });

    expect(response.statusCode).toBe(200);
  });
});
