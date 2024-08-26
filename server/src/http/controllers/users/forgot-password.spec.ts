import { expect, describe, it } from 'vitest';
import { app } from '../../../app';
import request from 'supertest';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';
import { Role } from '@prisma/client';

describe('Forgot Password Controller (e2e)', () => {
  it('should be able to get a 2FA code', async () => {
    const { token } = await createAndAuthenticateUser(app, Role.MEMBER);

    const profileResponse = await request(app).get('/me').set('Authorization', `Bearer ${token}`).send();

    const response = await request(app).post('/forgot-pass').send({
      email: profileResponse.body.user.email,
    });

    expect(response.status).toBe(200);
    expect(response.body.code).toEqual(expect.any(String));
  });
});
