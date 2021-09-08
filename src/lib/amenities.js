import { getToken } from "./authentication";
import server from "../server";

const getAmenities = async () => {
  const token = getToken();
  let amenities = false;

  if (token) {
    await server
      .get("/admin/amenities", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        amenities = response?.data;
      })
      .catch((error) => {
        amenities = error?.response?.data;
      });
  }

  return amenities;
};

export const getAmenityById = async (id) => {
  const token = getToken();
  let amenity = false;

  if (id && token) {
    await server
      .get(`/admin/amenities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        amenity = response?.data;
      })
      .catch((error) => {
        amenity = error?.response?.data;
      });
  }

  return amenity;
};

export const deleteAmenity = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/amenities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          res = response?.data?.data;
        })
        .catch((error) => {
          res = error?.response?.data;
        });
    }
  }

  return res;
};

export const addAmenity = async (data) => {
  const token = getToken();
  let amenity = false;

  if (token) {
    await server
      .post(`/admin/amenities/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        amenity = response?.data;
      })
      .catch((error) => {
        amenity = error?.response?.data;
      });
  }

  return amenity;
};

export const updateAmenity = async (id, data) => {
  const token = getToken();
  let amenity = false;

  if (id && data) {
    if (token) {
      await server
        .post(`/admin/amenities/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          amenity = response?.data;
        })
        .catch((error) => {
          amenity = error?.response?.data;
        });
    }
  }

  return amenity;
};

export default getAmenities;
