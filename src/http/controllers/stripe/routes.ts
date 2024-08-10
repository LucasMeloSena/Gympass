import express, { Express } from 'express';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { create } from './create';

export async function paymentCheckOutRoutes(app: Express) {
  app.post('/checkout', express.json(), verifyJWT, create);
}
