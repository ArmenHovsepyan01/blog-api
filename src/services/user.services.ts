import { UserAttributes } from '../database/models/user';

import { Blog, LikedBlogs, User, VerificationCodes } from '../database/models/models';

import bcrypt from 'bcrypt';

import { sendPasswordResetMail, sendVerificationCode } from './email.serivce';

import { LoginValues } from '../definitions';

import jwt from 'jsonwebtoken';

import db from '../database/models';

async function login(values: LoginValues) {
  try {
    const user = await User.findOne({
      where: {
        email: values.email
      }
    });

    if (!user) throw new Error('There is no account with this email please register then log in.');

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

    const exitedUser = await User.findOne({
      where: {
        email
      }
    });

    if (exitedUser && exitedUser.isVerified)
      throw new Error('You already have registered by this email please log in.');

    if (exitedUser && !exitedUser.isVerified)
      throw new Error('You already have registered by this email please pass verification.');

    const hashedPassword = await bcrypt.hash(values.password, 7);

    const newUser = await User.create({
      ...values,
      password: hashedPassword
    });

    return await sendVerificationCode(email, newUser.dataValues.id, values.firstName);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

async function verify(code: string) {
  try {
    const userVerificationInfo = await VerificationCodes.findOne({
      where: {
        code
      }
    });

    if (!userVerificationInfo)
      throw new Error('The code is not exist please pass registration to get verification code.');

    if (userVerificationInfo.dataValues.code !== code)
      throw new Error('The code is wrong please write right one or pass registration once more.');

    const t = await db.sequelize.transaction();

    await User.update(
      {
        isVerified: true
      },
      {
        where: {
          id: userVerificationInfo.dataValues.user_id
        },
        transaction: t
      }
    );

    await VerificationCodes.destroy({
      where: {
        id: userVerificationInfo.dataValues.id
      },
      transaction: t
    });

    await t.commit();
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

    const token = jwt.sign(
      {
        id: user.id,
        email
      },
      process.env.SECRETKEY,
      {
        expiresIn: '3m'
      }
    );

    const link = `http://localhost:3000/change-password?token=${token}`;

    await sendPasswordResetMail(user.dataValues.email, user.dataValues.firstName, link);

    return 'Email for changing password send successfully.';
  } catch (e) {
    throw new Error(e);
  }
}

async function changePassword(id: number, password: string) {
  try {
    if (!password) throw new Error('Password is empty please fill it');

    const hashedPassword = await bcrypt.hash(password, 7);
    console.log(hashedPassword);

    await User.update(
      {
        password: hashedPassword
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

async function getUser(id: number) {
  try {
    return await User.findByPk(id, {
      attributes: ['id', 'firstName', 'lastName', 'email'],
      include: [
        {
          model: Blog,
          as: 'blogs'
        },
        {
          model: LikedBlogs,
          as: 'likedBlogs'
        }
      ]
    });
  } catch (e) {
    throw new Error(e);
  }
}

const userServices = {
  login,
  register,
  verify,
  changePassword,
  requestToChangePassword,
  getUser
};

export default userServices;
