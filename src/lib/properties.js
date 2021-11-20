import { getToken } from "./authentication";
import server from "../server";

const getProperties = async () => {
  const token = getToken();
  let properties = false;

  if (token) {
    await server
      .get("/admin/properties", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        properties = response?.data;
      })
      .catch((error) => {
        properties = error?.response?.data;
      });
  }

  return properties;
};

export const assignPropertyVerification = async (data) => {
  const token = getToken();
  let res = false;

  if (data && token) {
    await server
      .post(`/admin/properties/assign_verification`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        res = response?.data;
      })
      .catch((error) => {
        res = error?.response?.data;
      });
  }

  return res;
};

export const rejectPropertyDeleteReqeust = async (id) => {
  const token = getToken();
  let res = false;

  if (id && token) {
    await server
      .get(`/admin/properties/reject_delete_request/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        res = response?.data;
      })
      .catch((error) => {
        res = error?.response?.data;
      });
  }

  return res;
};

export const getPropertyById = async (id) => {
  const token = getToken();
  let property = false;

  if (id && token) {
    await server
      .get(`/admin/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        property = response?.data;
      })
      .catch((error) => {
        property = error?.response?.data;
      });
  }

  return property;
};

export const getAgreements = async () => {
  const token = getToken();
  let agreements = false;

  if (token) {
    await server
      .get(`/admin/agreements`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        agreements = response?.data;
      })
      .catch((error) => {
        agreements = error?.response?.data;
      });
  }

  return agreements;
};

export const verifyProperty = async (id, option) => {
  const token = getToken();
  let property = false;

  if (id && token) {
    await server
      .post(`/admin/properties/verification/${id}`, option, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        property = response?.data;
      })
      .catch((error) => {
        property = error?.response?.data;
      });
  }

  return property;
};

export const deleteProperty = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/properties/${id}`, {
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

export const addProperty = async (data) => {
  const token = getToken();
  let property = false;

  if (token) {
    await server
      .post(`/admin/properties/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        property = response?.data;
      })
      .catch((error) => {
        property = error?.response?.data;
      });
  }

  return property;
};

export const updateProperty = async (id, data) => {
  const token = getToken();
  let property = false;

  if (id) {
    if (token) {
      await server
        .post(`/admin/properties/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          property = response?.data;
        })
        .catch((error) => {
          property = error?.response?.data;
        });
    }
  }

  return property;
};

export default getProperties;
