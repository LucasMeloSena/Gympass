import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { makeCheckInUseCase } from '@/services/shared/factories/make-check-in';
import { ResourceNotFoundError } from '@/services/shared/errors/resource-not-found.error';
import { MaxDistanceError } from '@/services/shared/errors/max-distance.error';
import { MaxNumberOfCheckInsError } from '@/services/shared/errors/max-check-ins.error';
import { ServerError } from '@/services/shared/errors';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createCheckInParamsSchema = z.object({
      gymId: z.string().uuid(),
    });

    const createCheckInBodySchema = z.object({
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90;
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180;
      }),
    });

    const userIdSchema = z.object({
      sub: z.string().uuid(),
    });

    const { sub } = userIdSchema.parse(req.user);
    const { gymId } = createCheckInParamsSchema.parse(req.params);
    const { latitude, longitude } = createCheckInBodySchema.parse(req.body);

    const createCheckInUseCase = makeCheckInUseCase();
    const { checkIn } = await createCheckInUseCase.execute({
      gymId,
      userId: sub,
      userLatitude: latitude,
      userLongitude: longitude,
    });

    res.status(201).json({ message: 'Check-In successfully created.', checkIn });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(400).json({ message: err.message, code: ServerError.ResourceNotFound });
    } else if (err instanceof MaxDistanceError) {
      res.status(400).json({ message: err.message, code: ServerError.MaxDistanceForCheckIn });
    } else if (err instanceof MaxNumberOfCheckInsError) {
      res.status(400).json({ message: err.message, code: ServerError.MaxCheckInsNumber });
    }
    next(err);
  }
}
