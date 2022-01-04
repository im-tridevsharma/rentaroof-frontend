import { getToken } from "../frontend/auth";
import server from "../../server";

export const getCountries = async () => {
  const token = getToken();
  let countries = false;

  if (token) {
    await server
      .get("/countries", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        countries = response?.data;
      })
      .catch((error) => {
        countries = error.response.data;
      });
  }

  return countries;
};

export const getStates = async () => {
  const token = getToken();
  let states = false;

  if (token) {
    await server
      .get("/states", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        states = response?.data;
      })
      .catch((error) => {
        states = error.response.data;
      });
  }

  return states;
};

export const getCities = async () => {
  const token = getToken();
  let cities = false;

  if (token) {
    await server
      .get("/cities", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        cities = response?.data;
      })
      .catch((error) => {
        cities = error.response.data;
      });
  }

  return cities;
};

export const getLocations = async () => {
  const token = getToken();
  let locations = false;

  if (token) {
    await server
      .get("/locations", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        locations = response?.data;
      })
      .catch((error) => {
        locations = error.response.data;
      });
  }

  return locations;
};
