import Cookies from "universal-cookie";
import server, { __e, __d } from "../../server";
import jwt from "jsonwebtoken";

const cookies = new Cookies();

const isAuthenticated = () => {
  const token = __d(cookies.get("_SYNC_"));
  if (token) {
    try {
      const isvalid = jwt.verify(token, process.env.JWT);
      return isvalid ? true : false;
    } catch (err) {
      cookies.remove("surole", { path: "/" });
      cookies.remove("_SYNC_", { path: "/" });
      return false;
    }
  } else {
    return false;
  }
};

export const getProfile = async (allinfo = false) => {
  const token = __d(cookies.get("_SYNC_"));
  let user = false;

  if (token) {
    await server
      .post(
        "/auth/profile",
        { mode: allinfo },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        user = response?.data;
      })
      .catch((error) => {
        if (error.response.data.message === "Token expired.") {
          removeAuthToken();
        }
        user = error?.response?.data;
      });
  }

  return user;
};

export const getUserByCode = async (code) => {
  let user = false;
  await server
    .get("/profile/code/" + code)
    .then((response) => {
      user = response?.data;
    })
    .catch((error) => {
      if (error.response.data.message === "Token expired.") {
        removeAuthToken();
      }
      user = error?.response?.data;
    });
  return user;
};

export const getUserSavedProperties = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let user = false;

  if (token) {
    await server
      .get("/users/savedproperties/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        user = response?.data;
      })
      .catch((error) => {
        if (error.response.data.message === "Token expired.") {
          removeAuthToken();
        }
        user = error?.response?.data;
      });
  }

  return user;
};

export const deleteUserSavedProperties = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let user = false;

  if (token) {
    await server
      .delete("/users/savedproperties/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        user = response?.data;
      })
      .catch((error) => {
        if (error.response.data.message === "Token expired.") {
          removeAuthToken();
        }
        user = error?.response?.data;
      });
  }

  return user;
};

export const updateProfile = async (id, formdata) => {
  const token = __d(cookies.get("_SYNC_"));
  let user = false;

  if (token) {
    await server
      .post("/users/" + id, formdata, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        user = response?.data;
      })
      .catch((error) => {
        user = error?.response?.data;
      });
  }

  return user;
};

export const updatePassword = async (id, password) => {
  const token = __d(cookies.get("_SYNC_"));
  let user = false;

  if (token) {
    await server
      .post("/users/password/" + id, password, {
        headers: { Authorization: `Bearer ${token}` },
      })
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

export const loginUser = async (data) => {
  let user = false;
  await server
    .post("/auth/login", data)
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
  cookies.remove("surole", { path: "/" });
  cookies.remove("_SYNC_", { path: "/" });
};

export const getToken = () => {
  const token = cookies.get("_SYNC_");
  return __d(token);
};

export default isAuthenticated;
