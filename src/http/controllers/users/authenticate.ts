import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { jwtSignIn } from '../../middlewares/verify-jwt';
import { Role } from '@prisma/client';
import { makeAuthenticateUseCase } from '../../../services/shared/factories/user/make-authenticate';
import { InvalidCredentialsError } from '../../../services/shared/errors/invalid-credentials.error';

export interface CustomPayload {
  role: Role;
  userId: string;
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(req.body);

    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = jwtSignIn({ role: user.role, userId: user.id }, '1m');
    const refreshToken = jwtSignIn({ role: user.role, userId: user.id }, '7d');

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      secure: false,
      sameSite: 'strict',
    });

    return res.status(200).json({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).json({ message: err.message });
    }

    next(err);
  }
}
