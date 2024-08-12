import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { userRoutes } from './http/controllers/users/routes';
import { ZodError } from 'zod';
import { env } from './env';
import { gymsRoutes } from './http/controllers/gyms/routes';
import { checkInsRoutes } from './http/controllers/check-ins/routes';
import cors from 'cors';
import { ServerError } from './services/shared/errors';
import { paymentCheckOutRoutes } from './http/controllers/stripe/routes';
import { webHook } from './http/controllers/stripe/web-hook';
import { subscriptionRoutes } from './http/controllers/subscriptions/routes';

export const app = express();

app.post('/webhook', express.raw({ type: 'application/json' }), webHook);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

userRoutes(app);
gymsRoutes(app);
checkInsRoutes(app);
paymentCheckOutRoutes(app);
subscriptionRoutes(app);

app.use((err: Error, _req: Request, res: Response, _: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      code: ServerError.ZodValidationError,
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
