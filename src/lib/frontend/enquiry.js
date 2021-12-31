import { getToken } from "../frontend/auth";
import server from "../../server";

const addEnquiry = async (data) => {
  const token = getToken();
  let res = false;

  await server
    .post("/enquiries", data, {
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

export const findAgent = async (search) => {
  if (search) {
    const token = getToken();
    let res = false;

    await server
      .get(`/find-agent?search=${search}`)
      .then((response) => {
        res = response?.data;
      })
      .catch((error) => {
        res = error?.response?.data;
      });

    return res;
  }
};

export default addEnquiry;
