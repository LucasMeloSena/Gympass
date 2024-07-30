import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { userRoutes } from './http/controllers/users/routes';
import { ZodError } from 'zod';
import { env } from './env';
import { gymsRoutes } from './http/controllers/gyms/routes';
import { checkInsRoutes } from './http/controllers/check-ins/routes';

export const app = express();

app.use(express.json());
app.use(cookieParser());

userRoutes(app);
gymsRoutes(app);
checkInsRoutes(app);

app.use((err: Error, _req: Request, res: Response, _: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      issues: err.format(),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err);
  } else {
    // TODO
  }
  return res.status(500).json({ message: 'Internal server error.' });
});
