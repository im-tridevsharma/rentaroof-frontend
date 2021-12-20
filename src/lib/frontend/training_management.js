import { getToken } from "../frontend/auth";
import server from "../../server";

const getVideos = async (user_id) => {
  const token = getToken();
  let videos = false;

  if (token) {
    await server
      .get("/trainings/videos/" + user_id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        videos = response?.data;
      })
      .catch((error) => {
        videos = error?.response?.data;
      });
  }

  return videos;
};

export const getPdfs = async (user_id) => {
  const token = getToken();
  let pdfs = false;

  if (token) {
    await server
      .get("/trainings/pdfs/" + user_id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        pdfs = response?.data;
      })
      .catch((error) => {
        pdfs = error?.response?.data;
      });
  }

  return pdfs;
};

export const getFaqs = async () => {
  const token = getToken();
  let faqs = false;

  if (token) {
    await server
      .get("/trainings/faqs/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        faqs = response?.data;
      })
      .catch((error) => {
        faqs = error?.response?.data;
      });
  }

  return faqs;
};
export default getVideos;
