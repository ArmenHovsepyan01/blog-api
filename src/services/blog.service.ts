import { BlogAttributes } from '../database/models/blog';
import { CustomError } from '../errors/customError';

import { Blog, User } from '../database/models/models';

import db from '../database/models';

async function getBlog(id: number) {
  try {
    const blog = await Blog.findOne({
      where: {
        id
      },
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
        as: 'user'
      }
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

    const transaction = await db.sequelize.transaction();

    const count = await Blog.count({
      where: condition,
      transaction
    });

    const blogs = await Blog.findAll({
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
        as: 'user'
      },
      where: condition,
      transaction: transaction,
      ...(page && limit ? { limit, offset } : {}),
      order: [['id', 'DESC']]
    });

    await transaction.commit();

    return {
      blogs,
      count
    };
  } catch (e) {
    throw e;
  }
}

async function createBlog(values: BlogAttributes) {
  try {
    const newBlog = await Blog.create(values);

    console.log(newBlog);

    return newBlog;
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
      }
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
