import { NextFunction, Request, Response } from 'express';

export class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorResponder = (
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.header('Content-Type', 'application/json');
  console.log(error.statusCode);

  const status = error.statusCode || 400;
  response.status(status).send(error.message);
};
