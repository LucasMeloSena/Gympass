import { ReqUser } from '@/@types/express';
import { Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export function verifyUserRole(roleToVerify: Role) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user as ReqUser;
    if (role != roleToVerify) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    return next()
  };
}
