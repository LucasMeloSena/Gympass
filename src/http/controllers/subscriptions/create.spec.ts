import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { Role, SubscriptionStatus } from '@prisma/client';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';
import { app } from '../../../app';

describe('Create Subscription Controller (e2e)', () => {
  it('should be able to create a subscription', async () => {
    const { token } = await createAndAuthenticateUser(app, Role.ADMIN);

    const response = await request(app).post('/subscription').set('Authorization', `Bearer ${token}`).send({
      status: SubscriptionStatus.ACTIVE,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.subscription).toHaveProperty('id');
  });
});
