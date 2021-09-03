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
        } else {
          users = false;
        }
      })
      .catch((error) => {
        if (error) {
          users = false;
        }
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
        } else {
          user = false;
        }
      })
      .catch((error) => {
        if (error) {
          user = false;
        }
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
          } else {
            res = false;
          }
        })
        .catch((error) => {
          if (error) {
            res = false;
          }
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
        } else {
          user = false;
        }
      })
      .catch((error) => {
        if (error) {
          if (error.response.status === 400) {
            user = "validation_errors";
          } else {
            user = false;
          }
        }
      });
  }

  return user;
};

export const updateUser = async (id, name, code) => {
  const token = cookies.get("_token");
  let user = false;

  if (id && name && code) {
    if (token) {
      await server
        .post(
          `/admin/users/${id}`,
          { name, code, _method: "PUT" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data) {
            user = response.data.data;
          } else {
            user = false;
          }
        })
        .catch((error) => {
          if (error) {
            user = false;
          }
        });
    }
  }

  return user;
};

export default getUsers;
