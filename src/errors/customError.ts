import { NextFunction, Request, Response } from 'express';

export class CustomError extends Error {
  readonly statusCode: number;

  constructor(message: string, code: number) {
    super(message);
    this.statusCode = code;
    this.message = message;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err instanceof CustomError) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({ error: { message } });
  }

  console.error(JSON.stringify(err, null, 2));
  return res.status(500).send({ error: err });
};
