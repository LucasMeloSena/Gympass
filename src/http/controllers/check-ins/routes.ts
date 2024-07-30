import { Express } from 'express';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { create } from './create';
import { validate } from './validate';
import { history } from './history';
import { metrics } from './metrics';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';
import { Role } from '@prisma/client';

export async function checkInsRoutes(app: Express) {
  app.get('/check-ins/history', verifyJWT, history);
  app.get('/check-ins/metrics', verifyJWT, metrics);

  app.post('/gyms/:gymId/check-ins', verifyJWT, create);

  app.patch('/check-ins/:checkInId/validate', verifyJWT, verifyUserRole(Role.ADMIN), validate);
}
