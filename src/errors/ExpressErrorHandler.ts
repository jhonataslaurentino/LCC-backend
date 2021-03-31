import { NextFunction, Request, Response } from 'express';
import ExpressError from './ExpressError';

const ExpressErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response => {
  if (error instanceof ExpressError) {
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
