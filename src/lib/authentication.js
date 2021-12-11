import Cookies from "universal-cookie";
import server, { __e, __d } from "../server";

const cookies = new Cookies();

const getUser = async (details = false) => {
  const token = __d(cookies.get("__NEXT"));
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

export const getAdminNotification = async (count = true) => {
  const token = __d(cookies.get("__NEXT"));
  let notification = false;

  if (token) {
    await server
      .get(`/admin/notifications${count ? "?count=yes" : ""}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        notification = response?.data;
      })
      .catch((error) => {
        notification = error?.response?.data;
      });
  }
  return notification;
};

export const delAdminNotification = async (id) => {
  const token = __d(cookies.get("__NEXT"));
  let notification = false;
  await server
    .delete("/admin/notifications/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const seenAdminNotification = async (id) => {
  const token = __d(cookies.get("__NEXT"));
  let notification = false;
  await server
    .get("/admin/notifications/seen/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const getSetting = async (key) => {
  const token = __d(cookies.get("__NEXT"));
  let setting = false;

  if (token) {
    await server
      .get("/admin/settings/" + key, {
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

export const saveOrUpdateSetting = async (data) => {
  const token = __d(cookies.get("__NEXT"));
  let setting = false;

  if (token) {
    await server
      .post("/admin/settings/", data, {
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

export const saveBulkSetting = async (data) => {
  const token = __d(cookies.get("__NEXT"));
  let setting = false;

  if (token) {
    await server
      .post("/admin/settings/bulk", data, {
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

export const logoutUser = async () => {
  const token = __d(cookies.get("__NEXT"));
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
    cookies.set("__NEXT", __e(token), { path: "/" });
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
    cookies.set("__NEXT", __e(newToken), { path: "/" });
    return true;
  }
};

export const removeAuthToken = () => {
  cookies.remove("__NEXT");
};

export const getToken = () => {
  const token = cookies.get("__NEXT");
  return __d(token);
};

export default getUser;
