import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { makeUpdateUserUseCase } from '@/services/shared/factories/make-update';
import { ResourceNotFoundError } from '@/services/shared/errors/resource-not-found.error';

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const updateBodySchema = z.object({
      name: z.string().min(3).optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).optional(),
      phone: z.string().min(16).max(16).optional(),
    });

    const userIdSchema = z.object({
      sub: z.string().uuid(),
    });

    const { sub } = userIdSchema.parse(req.user);
    const { name, email, password, phone } = updateBodySchema.parse(req.body);

    const updateUserUseCase = makeUpdateUserUseCase();
    await updateUserUseCase.execute({
      user: {
        id: sub,
        name,
        email,
        password_hash: password,
        phone,
      },
    });

    res.status(200).json({ message: 'User successfully updated.' });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(400).json({ message: err.message });
    }

    next(err);
  }
}
