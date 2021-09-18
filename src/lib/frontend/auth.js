import Cookies from "universal-cookie";
import server, { __e, __d } from "../../server";

const cookies = new Cookies();

const getUser = async (details = false) => {
  const token = __d(cookies.get("_SYNC_"));
  let user = false;

  if (token) {
    await server
      .post(
        "/auth/profile",
        { mode: details },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        user = response?.data;
      })
      .catch((error) => {
        user = error?.response?.data;
      });
  }

  return user;
};

export const logoutUser = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let user = false;
  if (token) {
    await server
      .post(
        "/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        user = response?.data;
      })
      .catch((error) => {
        user = error?.response?.data;
      });
  }
  return user;
};

export const registerUser = async (data) => {
  let user = false;
  if (data) {
    await server
      .post("/user/signup", data)
      .then((response) => {
        user = response?.data;
      })
      .catch((error) => {
        user = error?.response?.data;
      });
  }
  return user;
};

export const loginUser = async (email, password) => {
  let user = false;
  await server
    .post("/auth/login", { email, password })
    .then((response) => {
      user = response?.data;
    })
    .catch((err) => {
      user = err?.response?.data;
    });

  return user;
};

export const setAuthToken = (token) => {
  if (token) {
    cookies.set("_SYNC_", __e(token), { path: "/" });
    return true;
  } else {
    return false;
  }
};

export const refreshToken = async (token) => {
  if (token) {
    let newToken = "";
    await server
      .post(
        "/auth/refresh",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        newToken = response?.data;
      })
      .catch((err) => {
        newToken = err?.response?.data;
      });
    cookies.set("_SYNC_", __e(newToken), { path: "/" });
    return true;
  }
};

export const removeAuthToken = () => {
  cookies.remove("_SYNC_");
};

export const getToken = () => {
  const token = cookies.get("_SYNC_");
  return __d(token);
};

export default getUser;
