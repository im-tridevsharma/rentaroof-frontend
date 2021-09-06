import Cookies from "universal-cookie";
import server from "../server";

const cookies = new Cookies();

const getUsers = async () => {
  const token = cookies.get("_token");
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
  const token = cookies.get("_token");
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
  const token = cookies.get("_token");
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            res = response.data.data;
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
  const token = cookies.get("_token");
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
  const token = cookies.get("_token");
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
  const token = cookies.get("_token");
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
