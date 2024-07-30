import { ReqUser } from '@/@types/express';
import { env } from '@/env';
import { MissingAuthHeaderError } from '@/services/shared/errors/missing-auth-header.error';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomPayload } from '../controllers/users/authenticate';

export async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const payload = jwt.verify(token, env.JWT_SECRET) as ReqUser;
      req.user = payload;
      return next();
    }
    throw new MissingAuthHeaderError();
  } catch (err) {
    console.log((err as Error).message);
    if (err instanceof MissingAuthHeaderError) {
      return res.status(400).json({ message: err.message });
    }
    res.status(401).json({ message: 'Unauthorized.' });
  }
}

export function jwtSignIn({ role, userId }: CustomPayload, expiresIn: string) {
  const secretKey = env.JWT_SECRET;

  const payload = {
    sub: userId,
    role: role,
    iat: Math.floor(Date.now() / 1000),
  };

  const options = {
    expiresIn,
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
}
