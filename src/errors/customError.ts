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
