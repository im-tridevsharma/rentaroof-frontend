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
