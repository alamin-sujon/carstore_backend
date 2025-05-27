import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import route from './app/route';
import { notFound } from './app/middleware/notFound';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import Stripe from 'stripe';
import { config } from './app/config';
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://project-44.netlify.app'],
    credentials: true,
  }),
);
export const stripe = new Stripe(config.stripe_secret as string);
app.use(cookieParser());

app.use('/api', route);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Car Store',
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
