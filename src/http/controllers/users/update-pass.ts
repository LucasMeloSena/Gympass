import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { ResourceNotFoundError } from '../../../services/shared/errors/resource-not-found.error';
import { makeUpdatePasswordUseCase } from '../../../services/shared/factories/user/make-update-pass';
import { env } from '../../../env';
import { InvalidCredentialsError } from '../../../services/shared/errors/invalid-credentials.error';

export async function updatePass(req: Request, res: Response, next: NextFunction) {
  try {
    const updatePassBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      token: z.string(),
    });

    const { email, password, token } = updatePassBodySchema.parse(req.body);

    if (token !== env.PASSWORD_SECRET) {
      throw new InvalidCredentialsError();
    }

    const updatePasswordUseCase = makeUpdatePasswordUseCase();
    await updatePasswordUseCase.execute({ email, password });

    res.status(200).json({ message: 'User password successfully updated.' });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: err.message });
    }
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).json({ message: err.message });
    }

    next(err);
  }
}
