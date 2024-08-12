import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { makeVerifySubscriptionStatus } from '../../../services/shared/factories/subscription/make-verify-status';
import { ResourceNotFoundError } from '../../../services/shared/errors/resource-not-found.error';

export async function verifyStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const userIdSchema = z.object({
      sub: z.string().uuid(),
    });

    const { sub } = userIdSchema.parse(req.user);

    const verifySubscriptionStatusUseCase = makeVerifySubscriptionStatus();
    const { subscription, isValid } = await verifySubscriptionStatusUseCase.execute({ userId: sub });

    return res.status(200).json({ subscription, isValid });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: err.message, isValid: false });
    }
    next(err);
  }
}
