import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { makeCreateGymUseCase } from '@/services/shared/factories/make-create-gym';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createGymBodySchema = z.object({
      name: z.string(),
      image: z.string(),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      email: z.string(),
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90;
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180;
      }),
      state: z.string(),
      city: z.string(),
      district: z.string(),
      street: z.string(),
      adress_number: z.string(),
      adress_addition: z.string().nullable(),
    });

    const { name, description, email, image, phone, latitude, longitude, state, city, district, street, adress_addition, adress_number } = createGymBodySchema.parse(req.body);

    const createGymUseCase = makeCreateGymUseCase();
    const { gym } = await createGymUseCase.execute({
      name,
      email,
      image,
      description,
      phone,
      latitude,
      longitude,
      state,
      city,
      district,
      street,
      adress_number,
      adress_addition,
    });

    res.status(201).json({ message: 'Gym successfully created.', gym });
  } catch (err) {
    next(err);
  }
}
