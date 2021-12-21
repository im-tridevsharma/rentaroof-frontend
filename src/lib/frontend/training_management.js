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

export const getMcqs = async () => {
  const token = getToken();
  let mcqs = false;

  if (token) {
    await server
      .get("/trainings/mcqs/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        mcqs = response?.data;
      })
      .catch((error) => {
        mcqs = error?.response?.data;
      });
  }

  return mcqs;
};

export const saveAnswers = async (data) => {
  const token = getToken();
  let res = false;

  if (token) {
    await server
      .post("/trainings/submit_answer", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        res = response?.data;
      })
      .catch((error) => {
        res = error?.response?.data;
      });
  }

  return res;
};

export default getVideos;
