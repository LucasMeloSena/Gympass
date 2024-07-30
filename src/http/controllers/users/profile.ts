import { NextFunction, Request, Response } from 'express';
import { makeGetUserProfileUseCase } from '@/services/shared/factories/make-get-user-profile';
import { ResourceNotFoundError } from '@/services/shared/errors/resource-not-found.error';
import { ReqUser } from '@/@types/express';

export async function profile(req: Request, res: Response, next: NextFunction) {
  try {
    const getUserProfile = makeGetUserProfileUseCase();
    const { sub } = req.user as ReqUser;
    const { user } = await getUserProfile.execute({ userId: sub });

    res.status(200).json({
      user: {
        ...user,
        password_hash: undefined,
      },
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}
