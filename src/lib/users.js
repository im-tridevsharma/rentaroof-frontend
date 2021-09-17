import server from "../server";
import { getToken } from "./authentication";

const getUsers = async () => {
  const token = getToken();
  let users = false;

  if (token) {
    await server
      .get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          users = response.data;
        }
      })
      .catch((error) => {
        users = error.response?.data;
      });
  }

  return users;
};

export const getUserById = async (id) => {
  const token = getToken();
  let user = false;

  if (id && token) {
    await server
      .get(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          user = response.data;
        }
      })
      .catch((error) => {
        user = error.response?.data;
      });
  }

  return user;
};

export const deleteUser = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            res = response.data;
          }
        })
        .catch((error) => {
          res = error.response?.data;
        });
    }
  }

  return res;
};

export const addUser = async (data) => {
  const token = getToken();
  let user = false;

  if (token) {
    await server
      .post(`/admin/users/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response) {
          user = response.data;
        }
      })
      .catch((error) => {
        if (error) {
          user = error.response?.data;
        }
      });
  }

  return user;
};

export const updateUser = async (id, data) => {
  const token = getToken();
  let user = false;

  if (id && data) {
    if (token) {
      await server
        .post(`/admin/users/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            user = response.data;
          }
        })
        .catch((error) => {
          user = error.response?.data;
        });
    }
  }

  return user;
};

export const totalUser = async () => {
  const token = getToken();
  let count = false;

  if (token) {
    await server
      .get(`/admin/users/total`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          count = response.data;
        }
      })
      .catch((error) => {
        count = error.response?.data;
      });
  }

  return count;
};

export default getUsers;
