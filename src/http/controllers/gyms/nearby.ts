import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { makeFetchNearbyGymsUseCase } from '@/services/shared/factories/make-fetch-nearby-gyms';

export async function nearby(req: Request, res: Response, next: NextFunction) {
  try {
    const nearbyGymsQuerySchema = z.object({
      latitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 90;
      }),
      longitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 180;
      }),
    });

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.query);

    const nearbyGymsUseCase = makeFetchNearbyGymsUseCase();
    const { gyms } = await nearbyGymsUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    });

    res.status(200).json({ gyms });
  } catch (err) {
    next(err);
  }
}
