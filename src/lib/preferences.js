import { getToken } from "./authentication";
import server from "../server";

const getPreferences = async () => {
  const token = getToken();
  let preferences = false;

  if (token) {
    await server
      .get("/admin/preferences", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        preferences = response?.data;
      })
      .catch((error) => {
        preferences = error?.response?.data;
      });
  }

  return preferences;
};

export const getPreferenceById = async (id) => {
  const token = getToken();
  let preference = false;

  if (id && token) {
    await server
      .get(`/admin/preferences/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        preference = response?.data;
      })
      .catch((error) => {
        preference = error?.response?.data;
      });
  }

  return preference;
};

export const deletePreference = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/preferences/${id}`, {
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

export const addPreference = async (data) => {
  const token = getToken();
  let preference = false;

  if (token) {
    await server
      .post(`/admin/preferences/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        preference = response?.data;
      })
      .catch((error) => {
        preference = error?.response?.data;
      });
  }

  return preference;
};

export const updatePreference = async (id, data) => {
  const token = getToken();
  let preference = false;

  if (id && data) {
    if (token) {
      await server
        .post(`/admin/preferences/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          preference = response?.data;
        })
        .catch((error) => {
          preference = error?.response?.data;
        });
    }
  }

  return preference;
};

export default getPreferences;
