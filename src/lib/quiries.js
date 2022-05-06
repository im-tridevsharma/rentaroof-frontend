import { getToken } from "./authentication";
import server from "../server";

const getQueries = async () => {
  const token = getToken();
  let queries = false;

  if (token) {
    await server
      .get("/admin/properties/queries", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          queries = response.data;
        } else {
          queries = false;
        }
      })
      .catch((error) => {
        if (error) {
          queries = false;
        }
      });
  }

  return queries;
};

export const deleteQuery = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/properties/queries/${id}`, {
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

export default getQueries;
