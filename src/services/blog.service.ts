import { BlogAttributes } from '../database/models/blog';
import { Blog } from '../database/models/models';

async function getBlog(id: number) {
  try {
    return await Blog.findByPk(id);
  } catch (e) {
    throw new Error(e);
  }
}

async function getAllBlogs() {
  try {
    return Blog.findAll();
  } catch (e) {
    throw new Error(e);
  }
}

// protect with middlware
async function createBlog(values: BlogAttributes) {
  try {
    const newBlog = await Blog.create(values);

    console.log(newBlog);

    return newBlog;
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteBlog(id: number) {
  try {
    const deletedBlog = await Blog.destroy({
      where: {
        id
      }
    });

    console.log(deletedBlog);
    return 'Blog deleted successfully.';
  } catch (e) {
    throw new Error(e);
  }
}

// protect with middlware
async function updateBlog(id: number, values: BlogAttributes) {
  try {
    if (!values) return 'Values are empty there is nothing to update.';

    return await Blog.update(values, {
      where: {
        id
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

const blogServices = {
  getBlog,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog
};

export default blogServices;
