import { getToken } from "../frontend/auth";
import server from "../../server";

export const getProperties = async () => {
  const token = getToken();
  let res = false;

  await server
    .get("/properties", {
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

export const searchProperties = async (search) => {
  let res = false;

  await server
    .get("/properties/search?" + search)
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

const addProperty = async (data) => {
  const token = getToken();
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

export const updateProperty = async (id, data) => {
  const token = getToken();
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

export const addPropertyGallery = async (data) => {
  const token = getToken();
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

export const addPropertyAddress = async (data) => {
  const token = getToken();
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

export const updatePropertyAddress = async (id, data) => {
  const token = getToken();
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

export const addPropertyAmenities = async (data) => {
  const token = getToken();
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

export const addPropertyEssential = async (data) => {
  const token = getToken();
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

export const updatePropertyEssential = async (id, data) => {
  const token = getToken();
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

export const deleteProperty = async (id) => {
  const token = getToken();
  let res = false;

  await server
    .delete("/properties/" + id, {
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
