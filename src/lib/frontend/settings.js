import { getToken } from "../frontend/auth";
import server from "../../server";

const getSettings = async (user_id) => {
  const token = getToken();
  let setting = false;

  if (token) {
    await server
      .get("/settings/" + user_id, {
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

export const setSetting = async (user_id, key, value) => {
  const token = getToken();
  let set = false;

  if (token && key && value) {
    await server
      .post(
        "/settings/" + user_id,
        { key, value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        set = response?.data;
      })
      .catch((error) => {
        set = error?.response?.data;
      });
  }

  return set;
};

export const deactivateAccount = async (user_id, status) => {
  const token = getToken();
  let set = false;

  if (token && status) {
    await server
      .post(
        "/settings/account_status/" + user_id,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        set = response?.data;
      })
      .catch((error) => {
        set = error?.response?.data;
      });
  }

  return set;
};

export default getSettings;
