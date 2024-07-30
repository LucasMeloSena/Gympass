import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { makeSearchGymsUseCase } from '@/services/shared/factories/make-search-gyms';

export async function search(req: Request, res: Response, next: NextFunction) {
  try {
    const searchGymsQuerySchema = z.object({
      query: z.string(),
      page: z.coerce.number().min(1).default(1),
    });

    const { query, page } = searchGymsQuerySchema.parse(req.query);

    const searchGymsUseCase = makeSearchGymsUseCase();
    const { gyms } = await searchGymsUseCase.execute({
      query,
      page,
    });

    res.status(200).json({ gyms });
  } catch (err) {
    next(err);
  }
}
