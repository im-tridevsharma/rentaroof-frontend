import { getToken } from "./authentication";
import server from "../server";

const getFaqs = async () => {
  const token = getToken();
  let faqs = false;

  if (token) {
    await server
      .get("/admin/faqs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        faqs = response?.data;
      })
      .catch((error) => {
        faqs = error?.response?.data;
      });
  }

  return faqs;
};

export const getFaqById = async (id) => {
  const token = getToken();
  let training = false;

  if (id && token) {
    await server
      .get(`/admin/faqs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        training = response?.data;
      })
      .catch((error) => {
        training = error?.response?.data;
      });
  }

  return training;
};

export const deleteFaq = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/faqs/${id}`, {
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

export const addFaq = async (data) => {
  const token = getToken();
  let training = false;

  if (token) {
    await server
      .post(`/admin/faqs/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        training = response?.data;
      })
      .catch((error) => {
        training = error?.response?.data;
      });
  }

  return training;
};

export const updateFaq = async (id, data) => {
  const token = getToken();
  let training = false;

  if (id) {
    if (token) {
      await server
        .post(`/admin/faqs/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          training = response?.data;
        })
        .catch((error) => {
          training = error?.response?.data;
        });
    }
  }

  return training;
};

export default getFaqs;
