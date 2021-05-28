import { NextFunction, Request, Response } from 'express';
import AppError from './AppError';

const ExpressErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  // eslint-disable-next-line no-console
  console.log(error);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};

export default ExpressErrorHandler;
