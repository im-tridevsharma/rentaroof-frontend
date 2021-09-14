import server from "../server";
import { getToken } from "./authentication";

const getSos = async () => {
  const token = getToken();
  let sos = false;

  if (token) {
    await server
      .get("/admin/sos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        sos = response.data;
      })
      .catch((error) => {
        sos = error?.response?.data;
      });
  }

  return sos;
};

export const getSosById = async (id) => {
  const token = getToken();
  let sos = false;

  if (id && token) {
    await server
      .get(`/admin/sos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        sos = response.data;
      })
      .catch((error) => {
        sos = error.response?.data;
      });
  }

  return sos;
};

export const deleteSos = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/sos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          res = response.data;
        })
        .catch((error) => {
          res = error.response?.data;
        });
    }
  }

  return res;
};

export const updateSos = async (id, data) => {
  const token = getToken();
  let sos = false;

  if (token) {
    await server
      .post(`/admin/sos/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        sos = response.data;
      })
      .catch((error) => {
        sos = error?.response?.data;
      });
  }

  return sos;
};

export const totalSos = async () => {
  const token = getToken();
  let count = false;

  if (token) {
    await server
      .get(`/admin/sos/total`, {
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

export default getSos;
