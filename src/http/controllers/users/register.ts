import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { UserAlreadyExistsError } from '@/services/shared/errors/user-already-exists.error';
import { makeCreateUserUseCase } from '@/services/shared/factories/make-register-user';
import { Role } from '@prisma/client';

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
      res.status(409).json({ message: err.message });
    }

    next(err);
  }
}
