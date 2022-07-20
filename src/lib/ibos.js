import server from "../server";
import { getToken } from "./authentication";

const getIbos = async (filterValue = "") => {
  const token = getToken();
  let ibos = false;

  if (token) {
    await server
      .get("/admin/ibos?type=" + filterValue, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          ibos = response.data;
        }
      })
      .catch((error) => {
        ibos = error.response?.data;
      });
  }
  return ibos;
};

export const getIBOById = async (id) => {
  const token = getToken();
  let ibo = false;

  if (id && token) {
    await server
      .get(`/admin/ibos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          ibo = response.data;
        }
      })
      .catch((error) => {
        ibo = error.response?.data;
      });
  }

  return ibo;
};

export const banIboProfile = async (id) => {
  const token = getToken();
  let ibo = false;

  if (id && token) {
    await server
      .get(`/admin/ibos/ban/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          ibo = response.data;
        }
      })
      .catch((error) => {
        ibo = error.response?.data;
      });
  }

  return ibo;
};

export const iboRatings = async (id) => {
  const token = getToken();
  let ibo = false;

  if (id && token) {
    await server
      .get(`/admin/ibos/ratings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          ibo = response.data;
        }
      })
      .catch((error) => {
        ibo = error.response?.data;
      });
  }

  return ibo;
};

export const activateIboProfile = async (id) => {
  const token = getToken();
  let ibo = false;

  if (id && token) {
    await server
      .get(`/admin/ibos/activate/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          ibo = response.data;
        }
      })
      .catch((error) => {
        ibo = error.response?.data;
      });
  }

  return ibo;
};

export const deleteIBO = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/ibos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            res = response.data.data;
          }
        })
        .catch((error) => {
          res = error.response?.data;
        });
    }
  }

  return res;
};

export const addIBO = async (data) => {
  const token = getToken();
  let ibo = false;

  if (token) {
    await server
      .post(`/admin/ibos/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response) {
          ibo = response.data;
        }
      })
      .catch((error) => {
        if (error) {
          ibo = error.response?.data;
        }
      });
  }

  return ibo;
};

export const bulkActionIbos = async (data) => {
  const token = getToken();
  let ibo = false;

  if (token) {
    await server
      .post(`/admin/ibos/bulk_action`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        ibo = response?.data;
      })
      .catch((error) => {
        ibo = error?.response?.data;
      });
  }

  return ibo;
};

export const updateKycIbo = async (id, data) => {
  const token = getToken();
  let kyc = false;

  if (token) {
    await server
      .post(`/admin/ibos/kyc/verification/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          kyc = response.data;
        }
      })
      .catch((error) => {
        if (error) {
          kyc = error.response?.data;
        }
      });
  }

  return kyc;
};

export const updateIBO = async (id, data) => {
  const token = getToken();
  let ibo = false;

  if (id && data) {
    if (token) {
      await server
        .post(`/admin/ibos/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            ibo = response.data;
          }
        })
        .catch((error) => {
          ibo = error.response?.data;
        });
    }
  }

  return ibo;
};

export const assignMeetingToIBO = async (data) => {
  const token = getToken();
  let meeting = false;

  if (data) {
    if (token) {
      await server
        .post(`/admin/meetings/assign_to_ibo`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            meeting = response.data;
          }
        })
        .catch((error) => {
          meeting = error.response?.data;
        });
    }
  }

  return meeting;
};

export const totalIbo = async () => {
  const token = getToken();
  let count = false;

  if (token) {
    await server
      .get(`/admin/ibos/total`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          count = response.data;
        }
      })
      .catch((error) => {
        count = error.response?.data;
      });
  }

  return count;
};

export default getIbos;
