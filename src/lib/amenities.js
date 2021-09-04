import Cookies from "universal-cookie";
import server from "../server";

const cookies = new Cookies();

const getAmenities = async () => {
  const token = cookies.get("_token");
  let amenities = false;

  if (token) {
    await server
      .get("/admin/amenities", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          amenities = response.data;
        }
      })
      .catch((error) => {
        amenities = error.response.data;
      });
  }

  return amenities;
};

export const getAmenityById = async (id) => {
  const token = cookies.get("_token");
  let amenity = false;

  if (id && token) {
    await server
      .get(`/admin/amenities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          amenity = response.data;
        }
      })
      .catch((error) => {
        amenity = error.response.data;
      });
  }

  return amenity;
};

export const deleteAmenity = async (id) => {
  const token = cookies.get("_token");
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/amenities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            res = response.data.data;
          }
        })
        .catch((error) => {
          res = error.response.data;
        });
    }
  }

  return res;
};

export const addAmenity = async (data) => {
  const token = cookies.get("_token");
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
        if (response.data) {
          amenity = response.data;
        }
      })
      .catch((error) => {
        amenity = error.response.data;
      });
  }

  return amenity;
};

export const updateAmenity = async (id, name, code) => {
  const token = cookies.get("_token");
  let amenity = false;

  if (id && name && code) {
    if (token) {
      await server
        .post(
          `/admin/amenities/${id}`,
          { name, code, _method: "PUT" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data) {
            amenity = response.data.data;
          }
        })
        .catch((error) => {
          amenity = error.response.data;
        });
    }
  }

  return amenity;
};

export default getAmenities;
