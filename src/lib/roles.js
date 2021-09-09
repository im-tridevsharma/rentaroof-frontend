import { getToken } from "./authentication";
import server from "../server";

const getRoles = async () => {
  const token = getToken();
  let roles = false;

  if (token) {
    await server
      .get("/admin/roles", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        roles = response?.data;
      })
      .catch((error) => {
        roles = error?.response?.data;
      });
  }

  return roles;
};

export const getRoleById = async (id) => {
  const token = getToken();
  let role = false;

  if (id && token) {
    await server
      .get(`/admin/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        role = response?.data;
      })
      .catch((error) => {
        role = error?.response?.data;
      });
  }

  return role;
};

export const deleteRole = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/roles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          res = response?.data?.data;
        })
        .catch((error) => {
          res = error?.response?.data;
        });
    }
  }

  return res;
};

export const addRole = async (data) => {
  const token = getToken();
  let role = false;

  if (token) {
    await server
      .post(`/admin/roles/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        role = response?.data;
      })
      .catch((error) => {
        role = error?.response?.data;
      });
  }

  return role;
};

export const updateRole = async (id, data) => {
  const token = getToken();
  let role = false;

  if (id && data) {
    if (token) {
      await server
        .post(`/admin/roles/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          role = response?.data;
        })
        .catch((error) => {
          role = error?.response?.data;
        });
    }
  }

  return role;
};

export default getRoles;
