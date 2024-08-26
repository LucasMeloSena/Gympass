import { Role } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export interface ReqUser {
  sub: string;
  iat: number;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: ReqUser | JwtPayload;
    }
  }
}
