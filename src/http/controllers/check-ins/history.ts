import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { makeFetchCheckInUserHistoryUseCase } from '@/services/shared/factories/make-fetch-check-in-history';
import { ReqUser } from '@/@types/express';

export async function history(req: Request, res: Response, next: NextFunction) {
  try {
    const checkInHistoryQuerySchema = z.object({
      page: z.coerce.number().min(1).default(1),
    });

    const { page } = checkInHistoryQuerySchema.parse(req.query);
    const { sub } = req.user as ReqUser;

    const fetchCheckHistoryUseCase = makeFetchCheckInUserHistoryUseCase();
    const { checkIns } = await fetchCheckHistoryUseCase.execute({
      userId: sub,
      page,
    });

    res.status(200).json({ checkIns });
  } catch (err) {
    next(err);
  }
}
