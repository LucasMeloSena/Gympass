import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '@/app';
import { Role } from '@prisma/client';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('User Register Controller (e2e)', () => {
  it('should be able to register an user', async () => {
    const { token } = await createAndAuthenticateUser(app, Role.MEMBER);

    const response = await request(app).put('/update/user').set('Authorization', `Bearer ${token}`).send({
      name: 'John Doe II',
      email: 'johndoe2@example.com',
      password: '12345678',
      phone: '(31) 9 0000-0001',
    });
    expect(response.statusCode).toBe(200);
  });
});
