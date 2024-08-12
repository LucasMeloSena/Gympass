import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { Role, SubscriptionStatus } from '@prisma/client';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';
import { app } from '../../../app';

describe('Verify Subscription Status Controller (e2e)', () => {
  it('should be able to verify subscription status', async () => {
    const { token } = await createAndAuthenticateUser(app, Role.ADMIN);

    await request(app).post('/subscription').set('Authorization', `Bearer ${token}`).send({
      status: SubscriptionStatus.ACTIVE,
    });

    const response = await request(app).get('/subscription/verify-status').set('Authorization', `Bearer ${token}`).send({});

    expect(response.statusCode).toBe(200);
    expect(response.body.isValid).toEqual(expect.any(Boolean));
  });
});
