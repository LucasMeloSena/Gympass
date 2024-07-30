import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { InvalidCredentialsError } from '@/services/shared/errors/invalid-credentials.error';
import { makeAuthenticateUseCase } from '@/services/shared/factories/make-authenticate';
import { jwtSignIn } from '../../middlewares/verify-jwt';
import { Role } from '@prisma/client';

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

    const token = jwtSignIn({ role: user.role, userId: user.id }, '1h');
    const refreshToken = jwtSignIn({ role: user.role, userId: user.id }, '7d');

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: true,
    });
    
    return res.status(200).json({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      res.status(400).json({ message: err.message });
    }

    next(err);
  }
}
