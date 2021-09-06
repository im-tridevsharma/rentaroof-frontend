import Cookies from "universal-cookie";
import server from "../server";

const cookies = new Cookies();

const getIbos = async () => {
  const token = cookies.get("_token");
  let ibos = false;

  if (token) {
    await server
      .get("/admin/ibos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          ibos = response.data;
        }
      })
      .catch((error) => {
        ibos = error.response?.data;
      });
  }

  return ibos;
};

export const getIBOById = async (id) => {
  const token = cookies.get("_token");
  let ibo = false;

  if (id && token) {
    await server
      .get(`/admin/ibos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          ibo = response.data;
        }
      })
      .catch((error) => {
        ibo = error.response?.data;
      });
  }

  return ibo;
};

export const deleteIBO = async (id) => {
  const token = cookies.get("_token");
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/ibos/${id}`, {
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

export const addIBO = async (data) => {
  const token = cookies.get("_token");
  let ibo = false;

  if (token) {
    await server
      .post(`/admin/ibos/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response) {
          ibo = response.data;
        }
      })
      .catch((error) => {
        if (error) {
          ibo = error.response?.data;
        }
      });
  }

  return ibo;
};

export const updateIBO = async (id, data) => {
  const token = cookies.get("_token");
  let ibo = false;

  if (id && data) {
    if (token) {
      await server
        .post(`/admin/ibos/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            ibo = response.data;
          }
        })
        .catch((error) => {
          ibo = error.response?.data;
        });
    }
  }

  return ibo;
};

export const totalIbo = async () => {
  const token = cookies.get("_token");
  let count = false;

  if (token) {
    await server
      .get(`/admin/ibos/total`, {
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

export default getIbos;
