/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import AppError from '../error/AppError';

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let message = 'Something went wrong';
  let statusCode = 500;
  if (err instanceof AppError) {
    message = err.message;
    statusCode = err?.statusCode;
  } else if (err instanceof Error) {
    message = err?.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
    status: statusCode,
    stack: err?.stack,
  });
}
