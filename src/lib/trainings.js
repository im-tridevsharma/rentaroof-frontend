import { getToken } from "./authentication";
import server from "../server";

const getTrainings = async () => {
  const token = getToken();
  let trainings = false;

  if (token) {
    await server
      .get("/admin/trainings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        trainings = response?.data;
      })
      .catch((error) => {
        trainings = error?.response?.data;
      });
  }

  return trainings;
};

export const getTrainingById = async (id) => {
  const token = getToken();
  let training = false;

  if (id && token) {
    await server
      .get(`/admin/trainings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        training = response?.data;
      })
      .catch((error) => {
        training = error?.response?.data;
      });
  }

  return training;
};

export const deleteTraining = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/trainings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          res = response?.data;
        })
        .catch((error) => {
          res = error?.response?.data;
        });
    }
  }

  return res;
};

export const addTraining = async (data) => {
  const token = getToken();
  let training = false;

  if (token) {
    await server
      .post(`/admin/trainings/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        training = response?.data;
      })
      .catch((error) => {
        training = error?.response?.data;
      });
  }

  return training;
};

export const updateTraining = async (id, data) => {
  const token = getToken();
  let training = false;

  if (id) {
    if (token) {
      await server
        .post(`/admin/trainings/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          training = response?.data;
        })
        .catch((error) => {
          training = error?.response?.data;
        });
    }
  }

  return training;
};

export default getTrainings;
