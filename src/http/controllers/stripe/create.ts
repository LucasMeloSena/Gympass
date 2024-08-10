import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '../../../services/shared/factories/make-get-user-profile';
import { makeStripeCheckout } from '../../../services/shared/factories/make-stripe-checkout';
import { CheckOutSessionError } from '../../../services/shared/errors/check-out-session.error';
import { ActiveSubscriptionError } from '../../../services/shared/errors/active-subscription.error';
import { ServerError } from '../../../services/shared/errors';
import { env } from 'process';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userIdSchema = z.object({
      sub: z.string().uuid(),
    });

    const { sub } = userIdSchema.parse(req.user);

    const userProfileUseCase = makeGetUserProfileUseCase();
    const { user } = await userProfileUseCase.execute({ userId: sub });

    const createPaymentSessionUseCase = makeStripeCheckout();
    const { url } = await createPaymentSessionUseCase.execute({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      quantity: 1,
      success_url: `${env.CLIENT_URL}/dashboard`,
      cancel_url: `${env.CLIENT_URL}/plans`,
    });

    res.status(200).json({ url });
  } catch (err) {
    if (err instanceof CheckOutSessionError) {
      return res.status(400).json({ message: err.message, code: ServerError.CheckOutSessionError });
    } else if (err instanceof ActiveSubscriptionError) {
      return res.status(400).json({ message: err.message, code: ServerError.ActiveSubscription });
    }

    next(err);
  }
}
