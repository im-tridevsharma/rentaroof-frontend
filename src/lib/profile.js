import { getToken } from "./authentication";
import server from "../server";

const updateProfile = async (id, data) => {
  const token = getToken();
  let profile = false;

  if (id) {
    if (token) {
      await server
        .post(`/users/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          profile = response?.data;
        })
        .catch((error) => {
          profile = error?.response?.data;
        });
    }
  }

  return profile;
};

export const updatePassword = async (id, data) => {
  const token = getToken();
  let password = false;

  if (id) {
    if (token) {
      await server
        .post(`/users/password/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          password = response?.data;
        })
        .catch((error) => {
          password = error?.response?.data;
        });
    }
  }

  return password;
};

export default updateProfile;
