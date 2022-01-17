import { getToken } from "./authentication";
import server from "../server";

const getBlogs = async () => {
  const token = getToken();
  let blogs = false;

  if (token) {
    await server
      .get("/admin/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        blogs = response?.data;
      })
      .catch((error) => {
        blogs = error?.response?.data;
      });
  }

  return blogs;
};

export const getBlogById = async (id) => {
  const token = getToken();
  let blog = false;

  if (id && token) {
    await server
      .get(`/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        blog = response?.data;
      })
      .catch((error) => {
        blog = error?.response?.data;
      });
  }

  return blog;
};

export const deleteBlog = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          res = response?.data;
        })
        .catch((error) => {
          res = error?.response?.data;
        });
    }
  }

  return res;
};

export const addBlog = async (data) => {
  const token = getToken();
  let blog = false;

  if (token) {
    await server
      .post(`/admin/blogs/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        blog = response?.data;
      })
      .catch((error) => {
        blog = error?.response?.data;
      });
  }

  return blog;
};

export const updateBlog = async (id, data) => {
  const token = getToken();
  let blog = false;

  if (id) {
    if (token) {
      await server
        .post(`/admin/blogs/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          blog = response?.data;
        })
        .catch((error) => {
          blog = error?.response?.data;
        });
    }
  }

  return blog;
};

export default getBlogs;
