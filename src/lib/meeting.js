import server from "../server";
import { getToken } from "./authentication";

const getMeeting = async (filterValue = "") => {
  const token = getToken();
  let meetings = false;

  if (token) {
    await server
      .get("/admin/meetings?type=" + filterValue, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        meetings = response.data;
      })
      .catch((error) => {
        meetings = error?.response?.data;
      });
  }

  return meetings;
};

export const getMeetingById = async (id) => {
  const token = getToken();
  let meeting = false;

  if (id && token) {
    await server
      .get(`/admin/meetings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        meeting = response.data;
      })
      .catch((error) => {
        meeting = error.response?.data;
      });
  }

  return meeting;
};

export const deleteMeeting = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/meetings/${id}`, {
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

export const updateMeeting = async (id, data) => {
  const token = getToken();
  let meetings = false;

  if (token) {
    await server
      .post(`/admin/meetings/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        meetings = response.data;
      })
      .catch((error) => {
        meetings = error?.response?.data;
      });
  }

  return meetings;
};

export const totalMeeting = async () => {
  const token = getToken();
  let count = false;

  if (token) {
    await server
      .get(`/admin/meetings/total`, {
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

export default getMeeting;
