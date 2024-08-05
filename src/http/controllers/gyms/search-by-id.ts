import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { makeSearchGymByIdUseCase } from '@/services/shared/factories/make-search-gym-by-id';

export async function searchById(req: Request, res: Response, next: NextFunction) {
  try {
    const searchGymByIdParamSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = searchGymByIdParamSchema.parse(req.params);

    const searchGymByIdUseCase = makeSearchGymByIdUseCase();
    const { gym } = await searchGymByIdUseCase.execute({
      id,
    });

    res.status(200).json({ gym });
  } catch (err) {
    next(err);
  }
}
