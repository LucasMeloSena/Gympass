import { Express } from 'express';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyStatus } from './verify-status';
import { create } from './create';

export async function subscriptionRoutes(app: Express) {
  app.get('/subscription/verify-status', verifyJWT, verifyStatus);
  app.post('/subscription', verifyJWT, create);
}
