import { NextFunction, Request, Response } from 'express';

import userServices from '../services/user.services';

import { UserAttributes } from '../database/models/user';

import { LoginValues } from '../definitions';

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const userCredentials = req.body as UserAttributes;

    await userServices.register(userCredentials);

    res.status(200).json({
      message: 'User registered successfully.'
    });
  } catch (e) {
    next(e);
  }
}

async function verify(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.query;
    // @ts-ignore

    await userServices.verify(token);

    res.status(301).redirect('http://localhost:3000/login');
  } catch (e) {
    next(e);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const userCredentials = req.body as LoginValues;

    const data = await userServices.login(userCredentials);

    res.status(200).json({
      message: 'User logged in successfully.',
      data
    });
  } catch (e) {
    next(e);
  }
}

async function requestToChangePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;

    const message = await userServices.requestToChangePassword(email);

    res.status(200).json({
      message
    });
  } catch (e) {
    next(e);
  }
}

async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, password } = req.body;
    const { code } = req.query;

    const message = await userServices.changePassword(userId, password, code);

    res.status(200).json({
      message
    });
  } catch (e) {
    next(e);
  }
}

export const userController = {
  login,
  register,
  verify,
  requestToChangePassword,
  changePassword
};
