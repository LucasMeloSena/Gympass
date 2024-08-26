import { Express } from 'express';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { refresh } from './refresh';
import { update } from './update';
import { forgotPassword } from './forgot-password';
import { updatePass } from './update-pass';

export async function userRoutes(app: Express) {
  app.post('/users', register);
  app.post('/sessions', authenticate);
  app.post('/forgot-pass', forgotPassword);
  app.patch('/update/user/pass', updatePass);

  app.patch('/token/refresh', refresh);

  // AUTHENTICATED
  app.get('/me', verifyJWT, profile);
  app.patch('/update/user', verifyJWT, update);
}
