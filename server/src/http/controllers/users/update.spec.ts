import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { app } from '../../../app';
import { Role } from '@prisma/client';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';
import { UpdateCustomerUseCase } from '../../../services/stripe/update-customer';

describe('Update User Controller (e2e)', () => {
  it('should be able to update an user', async () => {
    const { token } = await createAndAuthenticateUser(app, Role.MEMBER);

    const mockExecute = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(UpdateCustomerUseCase.prototype, 'execute').mockImplementation(mockExecute);

    const response = await request(app).patch('/update/user').set('Authorization', `Bearer ${token}`).send({
      name: 'John Doe II',
      email: 'johndoe2@example.com',
      password: '12345678',
      phone: '(31) 9 0000-0001',
    });

    expect(mockExecute).toHaveBeenCalled();
    expect(response.statusCode).toBe(200);

    mockExecute.mockRestore();
  });
});
