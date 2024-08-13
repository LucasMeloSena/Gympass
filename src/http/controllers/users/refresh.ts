import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSignIn } from '../../middlewares/verify-jwt';
import { env } from '../../../env';
import { ReqUser } from '../../../@types/express';

export async function refresh(req: Request, res: Response, _: NextFunction) {
  const oldRefreshToken = req.cookies.refreshToken;
  console.log(oldRefreshToken);

  if (oldRefreshToken) {
    const payload = jwt.verify(oldRefreshToken, env.JWT_SECRET) as ReqUser;

    const userId = payload.sub?.toString() ?? '';
    const token = jwtSignIn({ role: payload.role, userId }, '1m');
    const newRefreshToken = jwtSignIn({ role: payload.role, userId }, '7d');

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return res.status(200).json({ token });
  }
  return res.status(403).json({ message: 'Token expired.' });
}
