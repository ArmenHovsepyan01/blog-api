import { Request, Response } from 'express';

import userServices from '../services/user.services';

import { UserAttributes } from '../database/models/user';

import { LoginValues } from '../definitions';

async function register(req: Request, res: Response) {
  try {
    const userCredentials = req.body as UserAttributes;

    await userServices.register(userCredentials);

    res.status(200).json({
      message: 'User registered successfully.'
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

async function verify(req: Request, res: Response) {
  try {
    const { code } = req.body;
    await userServices.verify(code);

    res.status(301).redirect('http://localhost//3000//login');
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

async function login(req: Request, res: Response) {
  try {
    const userCredentials = req.body as LoginValues;

    const data = await userServices.login(userCredentials);

    res.status(200).json({
      message: 'User logged in successfully.',
      data
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

async function requestToChangePassword(req: Request, res: Response) {
  try {
    const { email } = req.body;

    const message = await userServices.requestToChangePassword(email);

    res.status(200).json({
      message
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

async function changePassword(req: Request, res: Response) {
  try {
    const { id, password } = req.body;
    console.log(password);

    const message = await userServices.changePassword(id, password);

    res.status(200).json({
      message
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

export const userController = {
  login,
  register,
  verify,
  requestToChangePassword,
  changePassword
};
