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

export default getVideos;
