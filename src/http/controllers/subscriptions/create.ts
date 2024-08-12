import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { SubscriptionStatus } from '@prisma/client';
import { makeCreateSubscription } from '../../../services/shared/factories/subscription/make-subscriptions';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createSubscriptionBodySchema = z.object({
      status: z.enum([SubscriptionStatus.ACTIVE, SubscriptionStatus.CANCELED, SubscriptionStatus.EXPIRED, SubscriptionStatus.PAST_DUE, SubscriptionStatus.UNPAID]),
    });

    const userIdSchema = z.object({
      sub: z.string().uuid(),
    });

    const { status } = createSubscriptionBodySchema.parse(req.body);
    const { sub } = userIdSchema.parse(req.user);

    const createSubscriptionUseCase = makeCreateSubscription();
    const { subscription } = await createSubscriptionUseCase.execute({
      status,
      user_id: sub,
    });

    return res.status(200).json({ subscription });
  } catch (err) {
    next(err);
  }
}
