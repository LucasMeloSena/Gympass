import { NextFunction, Request, Response } from 'express';
import { ReqUser } from '../../../@types/express';
import { makeGetUserMetricsUseCase } from '../../../services/shared/factories/user/make-get-user-metrics';

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
