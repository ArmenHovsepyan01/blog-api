import { UserAttributes } from '../database/models/user';
import { Blog, LikedBlogs, User } from '../database/models/models';

async function login() {
  try {
  } catch (e: any) {
    throw new Error(e);
  }
}

async function register(values: UserAttributes) {
  try {
  } catch (e) {
    throw new Error(e);
  }
}

async function verify() {
  try {
  } catch (e) {
    throw new Error(e);
  }
}

async function changePassword(id: number, password: string) {
  try {
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
  getUser
};

export default userServices;
