import { getToken } from "./authentication";
import server from "../server";

const getWalletPayouts = async () => {
  const token = getToken();
  let locations = false;

  if (token) {
    await server
      .get("/admin/payouts/wallet", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          locations = response.data;
        } else {
          locations = false;
        }
      })
      .catch((error) => {
        if (error) {
          locations = false;
        }
      });
  }

  return locations;
};

export const getWalletPayout = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .get(`/admin/payouts/wallet/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            res = response.data;
          } else {
            res = false;
          }
        })
        .catch((error) => {
          if (error) {
            res = false;
          }
        });
    }
  }

  return res;
};

export const releasePayout = async (id, data) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .post(`/admin/payouts/wallet/release/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            res = response.data;
          } else {
            res = false;
          }
        })
        .catch((error) => {
          if (error) {
            res = false;
          }
        });
    }
  }

  return res;
};

export const deleteWalletPayout = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/payouts/wallet/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data) {
            res = response.data.data;
          } else {
            res = false;
          }
        })
        .catch((error) => {
          if (error) {
            res = false;
          }
        });
    }
  }

  return res;
};

export default getWalletPayouts;
