import server from "../server";
import { getToken } from "./authentication";

const getLandlords = async () => {
  const token = getToken();
  let landlords = false;

  if (token) {
    await server
      .get("/admin/landlords", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          landlords = response.data;
        }
      })
      .catch((error) => {
        landlords = error.response?.data;
      });
  }

  return landlords;
};

export const updateKycLandlord = async (id, data) => {
  const token = getToken();
  let kyc = false;

  if (token) {
    await server
      .post(`/admin/landlords/kyc/verification/${id}`, data, {
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

export const getLandlordById = async (id) => {
  const token = getToken();
  let Landlord = false;

  if (id && token) {
    await server
      .get(`/admin/landlords/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          Landlord = response.data;
        }
      })
      .catch((error) => {
        Landlord = error.response?.data;
      });
  }

  return Landlord;
};

export const deleteLandlord = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/landlords/${id}`, {
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

export const addLandlord = async (data) => {
  const token = getToken();
  let Landlord = false;

  if (token) {
    await server
      .post(`/admin/landlords/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response) {
          Landlord = response.data;
        }
      })
      .catch((error) => {
        if (error) {
          Landlord = error.response?.data;
        }
      });
  }

  return Landlord;
};

export const updateLandlord = async (id, data) => {
  const token = getToken();
  let Landlord = false;

  if (id && data) {
    if (token) {
      await server
        .post(`/admin/landlords/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            Landlord = response.data;
          }
        })
        .catch((error) => {
          Landlord = error.response?.data;
        });
    }
  }

  return Landlord;
};

export const totalLandlord = async () => {
  const token = getToken();
  let count = false;

  if (token) {
    await server
      .get(`/admin/landlords/total`, {
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

export default getLandlords;
