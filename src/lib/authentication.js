import Cookies from "universal-cookie";
import server from "../server";

const cookies = new Cookies();

const getUser = async () => {
  const token = cookies.get("_token");
  let user = false;

  if (token) {
    await server
      .post(
        "/auth/profile",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          user = response.data.user;
        } else {
          user = false;
        }
      })
      .catch((error) => {
        if (error) {
          user = false;
        }
      });
  }

  return user;
};

export const logoutUser = async () => {
  const token = cookies.get("_token");
  let user = false;

  await server
    .post(
      "/auth/logout",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      if (response.data) {
        user = response.data;
      } else {
        user = false;
      }
    })
    .catch((error) => {
      if (error) {
        user = false;
      }
    });

  return user;
};

export const loginUser = async (email, password) => {
  if (email && password) {
    let user = false;
    await server
      .post("/auth/login", { email, password })
      .then((response) => {
        if (response.data) {
          user = response.data;
        } else {
          user = false;
        }
      })
      .catch((err) => {
        if (err) {
          user = false;
        }
      });

    return user;
  } else {
    return false;
  }
};

export const setAuthToken = (token) => {
  if (token) {
    cookies.set("_token", token, { path: "/" });
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
        if (response.data) {
          newToken = response.data.access_token;
        } else {
          newToken = "";
        }
      })
      .catch((err) => {
        if (err) {
          newToken = "";
        }
      });
    cookies.set("_token", newToken, { path: "/" });
    return true;
  }
};

export const removeAuthToken = () => {
  cookies.remove("_token");
  return true;
};

export default getUser;
