import { UserAttributes } from '../database/models/user';

import { Followers, User, Blog } from '../database/models/models';

import bcrypt from 'bcrypt';

import { sendPasswordResetMail, sendVerificationCode } from './email.serivce';

import { LoginValues } from '../definitions';

import jwt from 'jsonwebtoken';

import crypto from 'node:crypto';
import { CustomError } from '../errors/customError';
import { customizeUserInfo } from '../utilis/customizeUserInfo';
import { where } from 'sequelize';
import { sort } from '../utilis/sort';

const includeFollowers = [
  {
    model: Followers,
    as: 'userFollowed',
    attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'followerId'] },
    include: [
      {
        attributes: ['id', 'firstName', 'lastName'],
        model: User,
        as: 'followingUser'
      }
    ]
  },
  {
    model: Followers,
    as: 'userFollowers',
    attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'followingId'] },
    include: [
      {
        attributes: ['id', 'firstName', 'lastName'],
        model: User,
        as: 'followerUser'
      }
    ]
  }
];

async function login(values: LoginValues) {
  try {
    const user = await User.findOne({
      where: {
        email: values.email
      },
      include: [...includeFollowers]
    });

    if (!user) {
      throw new CustomError(
        'There is no account with this email please register then log in.',
        401
      );
    }

    if (!user.dataValues.isVerified)
      throw new CustomError('Please pass verification then log in.', 401);

    if (!(await bcrypt.compare(values.password, user.password))) {
      throw new CustomError('Password is wrong please try again.', 401);
    }

    const access_token = jwt.sign(
      {
        user_id: user.dataValues.id
      },
      process.env.SECRETKEY
    );

    return {
      user: {
        ...customizeUserInfo(user.dataValues, true),
        access_token
      },
      access_token
    };
  } catch (e: any) {
    throw e;
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
      throw new CustomError('You already have registered by this email please log in.', 409);

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
    throw e;
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

    if (!user) throw new CustomError('Verification failed.', 401);

    if (user.dataValues.email !== userInfo.email) throw new CustomError('Email mismatch.', 403);

    if (user.isVerified)
      throw new CustomError("Your account is verificated you can't pass it again.", 409);

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
    throw e;
  }
}

async function requestToChangePassword(email: string) {
  try {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) throw new CustomError('Incorrect email there is no user with this email.', 401);

    if (!user.dataValues.isVerified)
      throw new CustomError("Unverified users can't reset password please pass verification.", 403);

    if (user.dataValues.resetPasswordCode)
      throw new CustomError(
        'Please check your email you have already asked for reset password.',
        400
      );

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
    throw e;
  }
}

async function changePassword(id: number, password: string, code: any) {
  try {
    const user = await User.findByPk(id);

    if (!user) throw new CustomError('Access denied.', 403);

    if (!code) throw new CustomError('Code is missing please revisit email.', 401);
    let isEqual = false;

    try {
      isEqual = await bcrypt.compare(code, user.dataValues.resetPasswordCode);
    } catch (e) {
      throw new CustomError('Reset password failed', 400);
    }

    if (!isEqual) throw new CustomError('Reset password failed', 400);

    if (!password) throw new CustomError('Password is empty please fill it', 400);

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
    throw e;
  }
}

async function getUser(id: number) {
  try {
    const user = await User.findByPk(id, {
      attributes: ['firstName', 'lastName', 'id', 'email'],
      include: includeFollowers
    });

    if (!user) throw new CustomError("User doesn't exist.", 401);

    return customizeUserInfo(user.dataValues);
  } catch (e) {
    throw e;
  }
}

async function getUserInfo(id: number) {
  try {
    const user = await User.findByPk(id, {
      attributes: ['firstName', 'lastName', 'id', 'email'],
      include: [
        ...includeFollowers,
        {
          model: Blog,
          as: 'blogs',
          where: {
            isPublished: true
          },
          attributes: { exclude: ['updatedAt'] },
          required: false
        }
      ]
    });

    if (!user) throw new CustomError("User doesn't exist.", 401);

    return customizeUserInfo(user.dataValues);
  } catch (e) {
    throw e;
  }
}

async function getUserFollowers(id: number) {
  try {
    const user = await User.findByPk(id, {
      attributes: [],
      include: [
        {
          model: Followers,
          as: 'userFollowers',
          attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'followingId'] },
          include: [
            {
              attributes: ['id', 'firstName', 'lastName'],
              model: User,
              as: 'followerUser'
            }
          ]
        }
      ]
    });

    if (!user) throw new CustomError("User doesn't exist.", 401);

    return customizeUserInfo(user, true).userFollowers;
  } catch (e) {
    throw e;
  }
}

async function getUserFollowings(id: number, page: number, limit: number) {
  try {
    const offset = (page - 1) * limit;
    console.log(offset, page, limit);

    const user = await User.findByPk(id, {
      attributes: [],
      include: [
        {
          model: Followers,
          as: 'userFollowed',
          attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'followerId'] },
          include: [
            {
              attributes: ['id', 'firstName', 'lastName'],
              model: User,
              as: 'followingUser'
            }
          ]
        }
      ]
    });

    if (!user) throw new CustomError("User doesn't exist.", 401);

    const followings = sort(customizeUserInfo(user, true).userFollowed);

    if (page && limit) {
      return followings.slice(offset, limit + offset);
    }

    return followings;
  } catch (e) {
    throw e;
  }
}

const userServices = {
  login,
  register,
  verify,
  changePassword,
  requestToChangePassword,
  getUser,
  getUserInfo,
  getUserFollowers,
  getUserFollowings
};

export default userServices;
