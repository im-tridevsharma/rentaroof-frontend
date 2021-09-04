import Cookies from "universal-cookie";
import server from "../server";

const cookies = new Cookies();

const getCountries = async () => {
  const token = cookies.get("_token");
  let countries = false;

  if (token) {
    await server
      .get("/admin/countries", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          countries = response.data;
        } else {
          countries = false;
        }
      })
      .catch((error) => {
        if (error) {
          countries = false;
        }
      });
  }

  return countries;
};

export const getCountryById = async (id) => {
  const token = cookies.get("_token");
  let country = false;

  if (id && token) {
    await server
      .get(`/admin/countries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          country = response.data;
        } else {
          country = false;
        }
      })
      .catch((error) => {
        if (error) {
          country = false;
        }
      });
  }

  return country;
};

export const deleteCountry = async (id) => {
  const token = cookies.get("_token");
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/countries/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            res = response.data;
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

export const addCountry = async (name, code) => {
  const token = cookies.get("_token");
  let country = false;

  if (name && code) {
    if (token) {
      await server
        .post(
          `/admin/countries/`,
          { name, code },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data) {
            country = response.data;
          } else {
            country = false;
          }
        })
        .catch((error) => {
          if (error) {
            country = false;
          }
        });
    }
  }

  return country;
};

export const updateCountry = async (id, name, code) => {
  const token = cookies.get("_token");
  let country = false;

  if (id && name && code) {
    if (token) {
      await server
        .post(
          `/admin/countries/${id}`,
          { name, code, _method: "PUT" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data) {
            country = response.data;
          } else {
            country = false;
          }
        })
        .catch((error) => {
          if (error) {
            country = false;
          }
        });
    }
  }

  return country;
};

export default getCountries;
