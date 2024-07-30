import { Express } from 'express';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { refresh } from './refresh';

export async function userRoutes(app: Express) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);

  // AUTHENTICATED
  app.get('/me', verifyJWT, profile);
}
