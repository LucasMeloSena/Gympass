import { env } from '../../../env';
import { NextFunction, Request, Response } from 'express';
import { InvalidCredentialsError } from '../../../services/shared/errors/invalid-credentials.error';
import { makeCreatePayments } from '../../../services/shared/factories/payment/make-payments';
import { makeCreateSubscription } from '../../../services/shared/factories/subscription/make-subscriptions';
import { z } from 'zod';
import { PaymentStatus, SubscriptionStatus } from '@prisma/client';

export async function webHookLocal(req: Request, res: Response, next: NextFunction) {
  try {
    if (env.NODE_ENV === 'dev' || env.NODE_ENV === 'test') {
      const userIdSchema = z.object({
        sub: z.string().uuid(),
      });

      const { sub } = userIdSchema.parse(req.user);

      const createPaymentsUseCase = makeCreatePayments();
      const createSubscriptionUseCase = makeCreateSubscription();

      const { subscription } = await createSubscriptionUseCase.execute({
        user_id: sub,
        subscription_id: `sub_${sub}`,
        status: SubscriptionStatus.ACTIVE,
      });

      await createPaymentsUseCase.execute({
        payment_id: `pay_${sub}`,
        amount: 30,
        status: PaymentStatus.SUCCESSED,
        user_id: sub,
        subscription_id: subscription.id,
      });

      return res.status(200).json({ message: 'Webhook processed successfully' });
    }

    throw new InvalidCredentialsError();
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}
