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

export default addProperty;
