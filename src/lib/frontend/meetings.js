import { getToken } from "../frontend/auth";
import server from "../../server";

export const getMeetings = async () => {
  const token = getToken();
  let setting = false;

  if (token) {
    await server
      .get("/meetings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setting = response?.data;
      })
      .catch((error) => {
        setting = error?.response?.data;
      });
  }

  return setting;
};

export const getLandlordMeetings = async (user_id) => {
  const token = getToken();
  let setting = false;

  if (token) {
    await server
      .get("/meetings/landlord/" + user_id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setting = response?.data;
      })
      .catch((error) => {
        setting = error?.response?.data;
      });
  }

  return setting;
};

export const updateMeetingStatus = async (id, status) => {
  const token = getToken();
  let setting = false;

  if (token) {
    await server
      .post("/meetings/update/" + id + "/status", status, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setting = response?.data;
      })
      .catch((error) => {
        setting = error?.response?.data;
      });
  }

  return setting;
};

export const rescheduleMetting = async (id, data) => {
  const token = getToken();
  let setting = false;

  if (token) {
    await server
      .post("/meetings/update/" + id + "/reschedule", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setting = response?.data;
      })
      .catch((error) => {
        setting = error?.response?.data;
      });
  }

  return setting;
};
