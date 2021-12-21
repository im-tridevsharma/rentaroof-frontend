import { getToken } from "./authentication";
import server from "../server";

const getMcqs = async () => {
  const token = getToken();
  let mcqs = false;

  if (token) {
    await server
      .get("/admin/mcqs", {
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

export const getEvaluations = async () => {
  const token = getToken();
  let evaluations = false;

  if (token) {
    await server
      .get("/admin/evaluations", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        evaluations = response?.data;
      })
      .catch((error) => {
        evaluations = error?.response?.data;
      });
  }

  return evaluations;
};

export const getMcqById = async (id) => {
  const token = getToken();
  let mcq = false;

  if (id && token) {
    await server
      .get(`/admin/mcqs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        mcq = response?.data;
      })
      .catch((error) => {
        mcq = error?.response?.data;
      });
  }

  return mcq;
};

export const deleteMcq = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/mcqs/${id}`, {
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

export const deleteEvaluation = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/evaluations/${id}`, {
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

export const deleteMcqQuestion = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/mcqs/delete/question/${id}`, {
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

export const addMcq = async (data) => {
  const token = getToken();
  let mcq = false;

  if (token) {
    await server
      .post(`/admin/mcqs/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        mcq = response?.data;
      })
      .catch((error) => {
        mcq = error?.response?.data;
      });
  }

  return mcq;
};

export const updateMcq = async (id, data) => {
  const token = getToken();
  let mcq = false;

  if (id) {
    if (token) {
      await server
        .post(`/admin/mcqs/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          mcq = response?.data;
        })
        .catch((error) => {
          mcq = error?.response?.data;
        });
    }
  }

  return mcq;
};

export default getMcqs;
