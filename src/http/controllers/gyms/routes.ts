import { Express } from 'express';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { search } from './search';
import { nearby } from './nearby';
import { create } from './create';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';
import { Role } from '@prisma/client';

export async function gymsRoutes(app: Express) {
  app.get('/gyms/search', verifyJWT, search);
  app.get('/gyms/nearby', verifyJWT, nearby);
  app.post('/gyms', verifyJWT, verifyUserRole(Role.ADMIN), create);
}
