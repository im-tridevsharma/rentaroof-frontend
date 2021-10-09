import { getToken } from "../frontend/auth";
import server from "../../server";

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

export default addProperty;
