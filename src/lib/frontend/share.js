import Cookies from "universal-cookie";
import server, { __e, __d } from "../../server";

const cookies = new Cookies();

export const saveIboRating = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let rating = false;
  await server
    .post("/ratings/ibo", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const saveIboNotication = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let notification = false;
  await server
    .post("/ibo/notifications", data, {
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

export const saveLandlordNotication = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let notification = false;
  await server
    .post("/landlord/notifications", data, {
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

export const saveUserNotication = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let notification = false;
  await server
    .post("/tenant/notifications", data, {
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

export const getIboRating = async (id) => {
  let rating = false;
  await server
    .get("/ratings/ibo/all/" + id)
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const getIboNotification = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get("/ibo/notifications", {
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

export const getLandlordNotification = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get("/landlord/notifications", {
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

export const getUserNotification = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get("/tenant/notifications", {
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

export const saveLandlordRating = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let rating = false;
  await server
    .post("/ratings/landlord", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const saveUserRating = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let rating = false;
  await server
    .post("/ratings/tenant", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const getLandlordRating = async (id) => {
  let rating = false;
  await server
    .get("/ratings/landlord/all/" + id)
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const getUserRating = async (id) => {
  let rating = false;
  await server
    .get("/ratings/tenant/all/" + id)
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const delLandlordNotification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .delete("/landlord/notifications/" + id, {
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

export const delIboNotification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .delete("/ibo/notifications/" + id, {
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

export const delUserNotification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .delete("/tenant/notifications/" + id, {
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

export const seenUserNotification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get("/tenant/notifications/seen/" + id, {
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

export const seenIboNotification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get("/ibo/notifications/seen/" + id, {
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

export const seenLandlordNotification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get("/landlord/notifications/seen/" + id, {
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

export const getAmenities = async (id) => {
  let amenities = false;
  await server
    .get("/amenities")
    .then((response) => {
      amenities = response?.data;
    })
    .catch((error) => {
      amenities = error?.response?.data;
    });
  return amenities;
};

//agreements
export const saveAgreement = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let rating = false;
  await server
    .post("/agreements", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const getAgreements = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let rating = false;
  await server
    .get("/agreements", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const getPropertiesForVerification = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let properties = false;
  await server
    .get("/properties/for_verification", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      properties = response?.data;
    })
    .catch((error) => {
      properties = error?.response?.data;
    });
  return properties;
};

export const changeVerificationStatus = async (id, data) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .post(`/properties/change_verification_status/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};
