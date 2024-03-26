import { BlogAttributes } from '../database/models/blog';
import { CustomError } from '../errors/customError';

import { Blog, User } from '../database/models/models';
import deleteImage from '../utilis/deleteImage';

const includeUser = {
  model: User,
  attributes: ['firstName', 'lastName'],
  as: 'user'
};

async function getBlog(id: number) {
  try {
    const blog = await Blog.findOne({
      where: {
        id
      },
      include: includeUser
    });

    if (!blog) return {};

    return blog;
  } catch (e) {
    throw e;
  }
}

async function getAllBlogs(page: number, limit: number) {
  try {
    const condition = {
      isPublished: true
    };

    const offset = (page - 1) * limit;

    const { count, rows } = await Blog.findAndCountAll({
      include: includeUser,
      where: condition,
      ...(page && limit ? { limit, offset } : {}),
      order: [['id', 'DESC']]
    });

    return {
      blogs: rows,
      count
    };
  } catch (e) {
    throw e;
  }
}

async function createBlog(values: BlogAttributes) {
  try {
    return await Blog.create(values);
  } catch (e) {
    throw e;
  }
}

async function deleteBlog(id: number, userId: number) {
  try {
    const blog = await Blog.findByPk(id);

    if (!blog) throw new CustomError("Blog doesn't exist.", 404);

    if (blog.dataValues.userId !== userId) throw new CustomError('User access denied.', 401);

    await Blog.destroy({
      where: {
        id
      }
    });

    return 'Blog deleted successfully.';
  } catch (e) {
    throw e;
  }
}

async function updateBlog(id: number, values: BlogAttributes) {
  try {
    if (!values) throw new CustomError('Values are empty there is nothing to update.', 400);

    const blog = await Blog.findByPk(id);

    if (!blog) throw new CustomError("Blog doesn't exist.", 404);

    if (blog.dataValues.userId !== values.userId) throw new CustomError('User access denied.', 401);

    await Blog.update(values, {
      where: {
        id
      }
    });

    return {
      ...blog.dataValues,
      ...values
    };
  } catch (e) {
    throw e;
  }
}

async function getUserBlogs(userId: number) {
  try {
    return await Blog.findAll({
      where: {
        userId
      },
      include: includeUser
    });
  } catch (e) {
    throw e;
  }
}

const blogServices = {
  getBlog,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getUserBlogs
};

export default blogServices;
