import { getToken } from "./authentication";
import server from "../server";

const getCities = async () => {
  const token = getToken();
  let cities = false;

  if (token) {
    await server
      .get("/admin/cities", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          cities = response.data;
        } else {
          cities = false;
        }
      })
      .catch((error) => {
        if (error) {
          cities = false;
        }
      });
  }

  return cities;
};

export const getCityById = async (id) => {
  const token = getToken();
  let city = false;

  if (id && token) {
    await server
      .get(`/admin/cities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          city = response.data;
        } else {
          city = false;
        }
      })
      .catch((error) => {
        if (error) {
          city = false;
        }
      });
  }

  return city;
};

export const deleteCity = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/cities/${id}`, {
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

export const addCity = async (name, state_id) => {
  const token = getToken();
  let city = false;

  if (name && state_id) {
    if (token) {
      await server
        .post(
          `/admin/cities/`,
          { name, state_id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data) {
            city = response.data.data;
          } else {
            city = false;
          }
        })
        .catch((error) => {
          if (error) {
            city = false;
          }
        });
    }
  }

  return city;
};

export const updateCity = async (id, name, state_id) => {
  const token = getToken();
  let city = false;

  if (id && name && state_id) {
    if (token) {
      await server
        .post(
          `/admin/cities/${id}`,
          { name, state_id, _method: "PUT" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data) {
            city = response.data.data;
          } else {
            city = false;
          }
        })
        .catch((error) => {
          if (error) {
            city = false;
          }
        });
    }
  }

  return city;
};

export default getCities;
