import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function checkUserPrivilegies(req: Request, res: Response, next: NextFunction) {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(401).json({
        message: 'User access denied.'
      });
    }

    // const codeIsValid = await bcrypt.compare(code, )

    // console.log(userInfo);
    // @ts-ignore

    req.body.id = userInfo.id;

    next();
  } catch (e) {
    res.status(401).json({
      message: e.message
    });
  }
}
