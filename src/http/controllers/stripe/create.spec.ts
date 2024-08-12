import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { Role } from '@prisma/client';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';
import { app } from '../../../app';

describe('Create Checkout Session Controller (e2e)', () => {
  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, Role.ADMIN);

    const response = await request(app).post('/checkout').set('Authorization', `Bearer ${token}`).send({});

    expect(response.statusCode).toBe(200);
    expect(response.body.url).toEqual(expect.any(String));
  });
});
