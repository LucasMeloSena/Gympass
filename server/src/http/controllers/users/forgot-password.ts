import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { makeForgotPassword } from '../../../services/shared/factories/user/make-forgot-password';
import { InvalidCredentialsError } from '../../../services/shared/errors/invalid-credentials.error';

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const forgotPasswordBodySchema = z.object({
      email: z.string().email(),
    });
    const { email } = forgotPasswordBodySchema.parse(req.body);

    const forgotPasswordUseCase = makeForgotPassword();
    const { code } = await forgotPasswordUseCase.execute({ email });

    res.status(200).json({ code });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}
