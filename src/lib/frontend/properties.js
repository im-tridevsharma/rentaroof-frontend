import { getToken } from "../frontend/auth";
import server, { __d } from "../../server";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getProperties = async (skip = 0, filter = "") => {
  const token = getToken();
  let res = false;

  await server
    .get("/properties?skip=" + skip + "&type=" + filter, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const schedulePropertyVisit = async (id, data) => {
  let appointment = false;
  const token = getToken();
  if (id && data) {
    await server
      .post(`/properties/appointment/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        appointment = response?.data;
      })
      .catch((error) => {
        appointment = error?.response?.data;
      });
  }

  return appointment;
};

export const addPropertyReview = async (data) => {
  let review = false;
  const token = getToken();
  if (data) {
    await server
      .post(`/properties/reviews`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        review = response?.data;
      })
      .catch((error) => {
        review = error?.response?.data;
      });
  }

  return review;
};

export const addPropertyAddressPin = async (id, data) => {
  let pin = false;
  const token = getToken();
  if (id && data) {
    await server
      .post(`/properties/pin/` + id, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        pin = response?.data;
      })
      .catch((error) => {
        pin = error?.response?.data;
      });
  }

  return pin;
};

export const searchProperties = async (search, skip) => {
  let res = false;

  await server
    .get("/properties/search?" + search + "&skip=" + skip)
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const fetchSimilarProperties = async (code, limit) => {
  let res = false;

  await server
    .get(`/properties/similar/${code}/${limit}`)
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const searchPropertiesForCoords = async (n, e, s, w) => {
  let res = false;

  await server
    .get(
      `/properties/search_by_coords?north=${n}&east=${e}&south=${s}&west=${w}`
    )
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const getPropertiesCount = async (search) => {
  const token = getToken();
  let res = false;

  await server
    .post("/properties/total", search, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

const addProperty = async (data, isAdmin = false) => {
  const token = isAdmin ? __d(cookies.get("__NEXT")) : getToken();
  let res = false;

  await server
    .post("/properties", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const updateProperty = async (id, data, isAdmin = false) => {
  const token = isAdmin ? __d(cookies.get("__NEXT")) : getToken();
  let res = false;

  await server
    .post("/properties/" + id, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const addPropertyGallery = async (data, isAdmin = false) => {
  const token = isAdmin ? __d(cookies.get("__NEXT")) : getToken();

  let res = false;

  await server
    .post("/properties/galleries", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const getPropertyByCode = async (code) => {
  let property = false;

  if (code) {
    await server
      .get(`/properties/code/${code}`)
      .then((response) => {
        property = response?.data;
      })
      .catch((error) => {
        property = error?.response?.data;
      });
  }
  return property;
};

export const savePropertyRequirement = async (data) => {
  let property = false;

  if (data) {
    await server
      .post(`/properties/requirement`, data)
      .then((response) => {
        property = response?.data;
      })
      .catch((error) => {
        property = error?.response?.data;
      });
  }
  return property;
};

export const saveSearch = async (data) => {
  const token = getToken();
  let res = false;

  await server
    .post("/users/searches", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const saveUserProperty = async (data) => {
  const token = getToken();
  let res = false;

  await server
    .post("/users/savedproperties", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const getUserProperty = async (data) => {
  const token = getToken();
  let res = false;

  await server
    .post("/users/savedproperties/search", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const addPropertyAddress = async (data, isAdmin = false) => {
  const token = isAdmin ? __d(cookies.get("__NEXT")) : getToken();
  let res = false;

  await server
    .post("/properties/addresses", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const updatePropertyAddress = async (id, data, isAdmin = false) => {
  const token = isAdmin ? __d(cookies.get("__NEXT")) : getToken();
  let res = false;

  await server
    .post("/properties/addresses/" + id, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const addPropertyAmenities = async (data, isAdmin = false) => {
  const token = isAdmin ? __d(cookies.get("__NEXT")) : getToken();
  let res = false;

  await server
    .post("/properties/amenities", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const addPropertyEssential = async (data, isAdmin = false) => {
  const token = isAdmin ? __d(cookies.get("__NEXT")) : getToken();
  let res = false;

  await server
    .post("/properties/essentials", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const updatePropertyEssential = async (id, data, isAdmin = false) => {
  const token = isAdmin ? __d(cookies.get("__NEXT")) : getToken();
  let res = false;

  await server
    .post("/properties/essentials/" + id, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const getAmenities = async (data) => {
  const token = getToken();
  let res = false;

  await server
    .get("/amenities", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const getPreferences = async (data) => {
  const token = getToken();
  let res = false;

  await server
    .get("/preferences", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export const deleteProperty = async (reason, id) => {
  const token = getToken();
  let res = false;

  await server
    .delete("/properties/" + id + "?delete_reason=" + reason, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });

  return res;
};

export default addProperty;
