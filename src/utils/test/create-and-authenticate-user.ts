import request from 'supertest';
import { Express } from 'express';
import { Role } from '@prisma/client';

export async function createAndAuthenticateUser(app: Express, role: Role) {
  await request(app).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
    role
  });

  const authResponse = await request(app).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  });

  const { token } = authResponse.body;
  return {
    token,
  };
}
