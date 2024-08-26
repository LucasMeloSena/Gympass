import { Express } from 'express';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyStatus } from './verify-status';

export async function subscriptionRoutes(app: Express) {
  app.get('/subscription/verify-status', verifyJWT, verifyStatus);
}
