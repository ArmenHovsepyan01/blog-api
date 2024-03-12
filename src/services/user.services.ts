import { UserAttributes } from '../database/models/user';

import { User } from '../database/models/models';

import bcrypt from 'bcrypt';

import { sendPasswordResetMail, sendVerificationCode } from './email.serivce';

import { LoginValues } from '../definitions';

import jwt from 'jsonwebtoken';

import crypto from 'node:crypto';
import { CustomError } from '../error/customError';

async function login(values: LoginValues) {
  try {
    const user = await User.findOne({
      where: {
        email: values.email
      }
    });

    if (!user)
      throw new CustomError(
        401,
        'There is no account with this email please register then log in.'
      );

    if (!user.dataValues.isVerified) throw new Error('Please pass verification then log in. ');

    if (!(await bcrypt.compare(values.password, user.password))) {
      throw new Error('Password is wrong please try again.');
    }

    const access_token = jwt.sign(
      {
        user_id: user.dataValues.id
      },
      process.env.SECRETKEY
    );

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      access_token
    };
  } catch (e: any) {
    throw new Error(e);
  }
}

async function register(values: UserAttributes) {
  try {
    const { email } = values;

    const existedUser = await User.findOne({
      where: {
        email
      }
    });

    if (existedUser && existedUser.isVerified)
      throw new Error('You already have registered by this email please log in.');

    values.password = await bcrypt.hash(values.password, 7);

    if (existedUser && !existedUser.isVerified) {
      await User.update(values, {
        where: {
          email
        }
      });

      return await sendVerificationCode(email, existedUser.dataValues.id, values.firstName);
    }

    if (!existedUser) {
      const newUser = await User.create(values);
      return await sendVerificationCode(email, newUser.dataValues.id, values.firstName);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

interface UserPayload {
  userId: number;
  email: string;
}

async function verify(token: string) {
  try {
    const userInfo = jwt.verify(token, process.env.SECRETKEY) as UserPayload;

    const user = await User.findByPk(userInfo.userId);

    if (!user) throw new Error('Verification failed.');

    if (user.dataValues.email !== userInfo.email) throw new Error('Verification failed.');

    if (user.isVerified) throw new Error("Your account is verificated you u can't pass it again.");

    await User.update(
      {
        isVerified: true
      },
      {
        where: {
          id: user.id
        }
      }
    );
  } catch (e) {
    throw new Error(e);
  }
}

async function requestToChangePassword(email: string) {
  try {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) throw new Error('Incorrect email there is no user with this email.');

    if (!user.dataValues.isVerified)
      throw new Error("Unverified users can't reset password please pass verification.");

    const code = crypto.randomBytes(16).toString('hex');
    const hashedCode = await bcrypt.hash(code, 9);

    await User.update(
      {
        resetPasswordCode: hashedCode
      },
      {
        where: {
          email
        }
      }
    );

    const link = `http://localhost:3000/change-password?code=${code}`;

    await sendPasswordResetMail(user.dataValues.email, user.dataValues.firstName, link);

    return 'Email for changing password send successfully.';
  } catch (e) {
    throw new Error(e);
  }
}

async function changePassword(id: number, password: string, code: any) {
  try {
    const user = await User.findByPk(id);

    if (!user) throw new Error('Access denied.');

    if (!(await bcrypt.compare(code, user.dataValues.resetPasswordCode)))
      throw new Error('Reset password failed');

    if (!password) throw new Error('Password is empty please fill it');

    const hashedPassword = await bcrypt.hash(password, 7);

    await User.update(
      {
        password: hashedPassword,
        resetPasswordCode: null
      },
      {
        where: {
          id
        }
      }
    );

    return 'Password changed successfully.';
  } catch (e) {
    throw new Error(e);
  }
}

const userServices = {
  login,
  register,
  verify,
  changePassword,
  requestToChangePassword
};

export default userServices;
