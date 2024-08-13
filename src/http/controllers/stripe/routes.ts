import express, { Express } from 'express';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { create } from './create';
import { webHookLocal } from './web-hook-local';

export async function paymentCheckOutRoutes(app: Express) {
  app.post('/checkout', express.json(), verifyJWT, create);
  app.get('/webhook-local', verifyJWT, webHookLocal);
}
