import { NextFunction, Request, Response } from 'express';
import { makeGetUserMetricsUseCase } from '@/services/shared/factories/make-get-user-metrics';
import { ReqUser } from '@/@types/express';

export async function metrics(req: Request, res: Response, next: NextFunction) {
  try {
    const { sub } = req.user as ReqUser;

    const getCheckInUserMetricsUseCase = makeGetUserMetricsUseCase();
    const { checkInsCount, checkInsCountByMonth } = await getCheckInUserMetricsUseCase.execute({
      userId: sub,
    });

    res.status(200).json({ checkInsCount, checkInsCountByMonth });
  } catch (err) {
    next(err);
  }
}
