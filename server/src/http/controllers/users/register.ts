import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { Role } from '@prisma/client';
import { makeCreateUserUseCase } from '../../../services/shared/factories/user/make-register-user';
import { UserAlreadyExistsError } from '../../../services/shared/errors/user-already-exists.error';
import { ServerError } from '../../../services/shared/errors/_index';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      phone: z.string().min(16).max(16),
      role: z.enum([Role.MEMBER, Role.ADMIN]).optional(),
    });

    const { name, email, password, phone, role } = registerBodySchema.parse(req.body);

    const registerUserUseCase = makeCreateUserUseCase();
    await registerUserUseCase.execute({
      name,
      email,
      password,
      phone,
      role,
    });

    res.status(201).json({ message: 'User successfully created.' });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      res.status(409).json({ message: err.message, code: ServerError.UserAlreadyExists });
    }

    next(err);
  }
}
