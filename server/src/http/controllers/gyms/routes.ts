import { Express } from 'express';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { search } from './search';
import { nearby } from './nearby';
import { create } from './create';
import { Role } from '@prisma/client';
import { searchById } from './search-by-id';
import { verifyUserRole } from '../../middlewares/verify-user-role';

export async function gymsRoutes(app: Express) {
  app.get('/gyms/search', verifyJWT, search);
  app.get('/gyms/nearby', verifyJWT, nearby);
  app.get('/gym/:id', verifyJWT, searchById);
  app.post('/gyms', verifyJWT, verifyUserRole(Role.ADMIN), create);
}
