import { Express } from 'express';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { refresh } from './refresh';
import { update } from './update';

export async function userRoutes(app: Express) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);

  // AUTHENTICATED
  app.get('/me', verifyJWT, profile);
  app.put('/update/user', verifyJWT, update);
}
