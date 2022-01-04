import { getToken } from "./authentication";
import server from "../server";

const getLocations = async () => {
  const token = getToken();
  let locations = false;

  if (token) {
    await server
      .get("/admin/locations", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          locations = response.data;
        } else {
          locations = false;
        }
      })
      .catch((error) => {
        if (error) {
          locations = false;
        }
      });
  }

  return locations;
};

export const getLocationById = async (id) => {
  const token = getToken();
  let location = false;

  if (id && token) {
    await server
      .get(`/admin/locations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          location = response.data;
        } else {
          location = false;
        }
      })
      .catch((error) => {
        if (error) {
          location = false;
        }
      });
  }

  return location;
};

export const deleteLocation = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/locations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            res = response.data.data;
          } else {
            res = false;
          }
        })
        .catch((error) => {
          if (error) {
            res = false;
          }
        });
    }
  }

  return res;
};

export const addLocation = async (name, city_id) => {
  const token = getToken();
  let location = false;

  if (name && city_id) {
    if (token) {
      await server
        .post(
          `/admin/locations/`,
          { name, city_id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data) {
            location = response.data.data;
          } else {
            location = false;
          }
        })
        .catch((error) => {
          if (error) {
            location = false;
          }
        });
    }
  }

  return location;
};

export const updateLocation = async (id, name, city_id) => {
  const token = getToken();
  let location = false;

  if (id && name && city_id) {
    if (token) {
      await server
        .post(
          `/admin/locations/${id}`,
          { name, city_id, _method: "PUT" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data) {
            location = response.data;
          } else {
            location = false;
          }
        })
        .catch((error) => {
          if (error) {
            location = false;
          }
        });
    }
  }

  return location;
};

export default getLocations;
