import { getToken } from "./authentication";
import server from "../server";

const getPages = async () => {
  const token = getToken();
  let pages = false;

  if (token) {
    await server
      .get("/admin/pages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        pages = response?.data;
      })
      .catch((error) => {
        pages = error?.response?.data;
      });
  }

  return pages;
};

export const getPageById = async (id) => {
  const token = getToken();
  let page = false;

  if (id && token) {
    await server
      .get(`/admin/pages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        page = response?.data;
      })
      .catch((error) => {
        page = error?.response?.data;
      });
  }

  return page;
};

export const deletePage = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/pages/${id}`, {
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

export const addPage = async (data) => {
  const token = getToken();
  let page = false;

  if (token) {
    await server
      .post(`/admin/pages/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        page = response?.data;
      })
      .catch((error) => {
        page = error?.response?.data;
      });
  }

  return page;
};

export const updatePage = async (id, data) => {
  const token = getToken();
  let page = false;

  if (id) {
    if (token) {
      await server
        .post(`/admin/pages/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          page = response?.data;
        })
        .catch((error) => {
          page = error?.response?.data;
        });
    }
  }

  return page;
};

export default getPages;
