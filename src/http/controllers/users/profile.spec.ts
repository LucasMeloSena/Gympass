import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { Role } from '@prisma/client';

describe('Get User Profile Controller (e2e)', () => {
  it('should be able to get an user profile', async () => {
    const { token } = await createAndAuthenticateUser(app, Role.MEMBER);

    const profileResponse = await request(app).get('/me').set('Authorization', `Bearer ${token}`).send();

    expect(profileResponse.statusCode).toBe(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    );
  });
});
