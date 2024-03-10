import { BlogAttributes } from '../database/models/blog';

async function getBlog(id: number) {
  try {
  } catch (e) {
    throw new Error(e);
  }
}

async function getAllBlogs() {
  try {
  } catch (e) {
    throw new Error(e);
  }
}

async function createBlog(values: BlogAttributes) {
  try {
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteBlog(id: number) {
  try {
  } catch (e) {
    throw new Error(e);
  }
}

async function updateBlog(id: number, values: BlogAttributes) {
  try {
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
