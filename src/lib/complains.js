import { getToken } from "./authentication";
import server from "../server";

const getComplains = async () => {
  const token = getToken();
  let complains = false;

  if (token) {
    await server
      .get("/admin/complains", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          complains = response.data;
        } else {
          complains = false;
        }
      })
      .catch((error) => {
        if (error) {
          complains = false;
        }
      });
  }

  return complains;
};

export const getComplainById = async (id) => {
  const token = getToken();
  let complain = false;

  if (id && token) {
    await server
      .get(`/admin/complains/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          complain = response.data;
        } else {
          complain = false;
        }
      })
      .catch((error) => {
        if (error) {
          complain = false;
        }
      });
  }

  return complain;
};

export const deleteComplain = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/complains/${id}`, {
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

export const updateComplainStatus = async (id, status) => {
  const token = getToken();
  let complain = false;

  if (id && status) {
    if (token) {
      await server
        .post(
          `/admin/complains/status/${id}`,
          { status },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data) {
            complain = response.data;
          } else {
            complain = false;
          }
        })
        .catch((error) => {
          if (error) {
            complain = false;
          }
        });
    }
  }

  return complain;
};

export default getComplains;
