import server from "../server";
import { getToken } from "./authentication";

const getEnquiries = async () => {
  const token = getToken();
  let enquiries = false;

  if (token) {
    await server
      .get("/admin/enquiries", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        enquiries = response.data;
      })
      .catch((error) => {
        enquiries = error?.response?.data;
      });
  }

  return enquiries;
};

export const getEnquiryById = async (id) => {
  const token = getToken();
  let enquiry = false;

  if (id && token) {
    await server
      .get(`/admin/enquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        enquiry = response.data;
      })
      .catch((error) => {
        enquiry = error.response?.data;
      });
  }

  return enquiry;
};

export const deleteEnquiry = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/enquiries/${id}`, {
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

export const totalEnquiry = async () => {
  const token = getToken();
  let count = false;

  if (token) {
    await server
      .get(`/admin/enquiries/total`, {
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

export default getEnquiries;
