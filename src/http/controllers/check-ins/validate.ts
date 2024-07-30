import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { makeValidateCheckInUseCase } from '@/services/shared/factories/make-validate-check-in';
import { ResourceNotFoundError } from '@/services/shared/errors/resource-not-found.error';
import { LateCheckInValidateError } from '@/services/shared/errors/late-check-in-validate.error';

export async function validate(req: Request, res: Response, next: NextFunction) {
  try {
    const validateCheckInParamsSchema = z.object({
      checkInId: z.string().uuid(),
    });

    const { checkInId } = validateCheckInParamsSchema.parse(req.params);

    const validateCheckInUseCase = makeValidateCheckInUseCase();
    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId,
    });

    res.status(200).json({ message: 'CheckIn validated successfully.', checkIn });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(400).json({ message: err.message });
    } else if (err instanceof LateCheckInValidateError) {
      res.status(400).json({ message: err.message });
    }
    next(err);
  }
}
