import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { makeCreateGymUseCase } from '@/services/shared/factories/make-create-gym';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createGymBodySchema = z.object({
      name: z.string(),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90;
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180;
      }),
    });

    const { name, description, phone, latitude, longitude } = createGymBodySchema.parse(req.body);

    const createGymUseCase = makeCreateGymUseCase();
    const { gym } = await createGymUseCase.execute({
      name,
      description,
      phone,
      latitude,
      longitude,
    });

    res.status(201).json({ message: 'Gym successfully created.', gym });
  } catch (err) {
    next(err);
  }
}
