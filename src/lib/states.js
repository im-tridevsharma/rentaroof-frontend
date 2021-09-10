import { getToken } from "./authentication";
import server from "../server";

const getStates = async () => {
  const token = getToken();
  let states = false;

  if (token) {
    await server
      .get("/admin/states", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          states = response.data;
        } else {
          states = false;
        }
      })
      .catch((error) => {
        if (error) {
          states = false;
        }
      });
  }

  return states;
};

export const getStateById = async (id) => {
  const token = getToken();
  let state = false;

  if (id && token) {
    await server
      .get(`/admin/states/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          state = response.data;
        } else {
          state = false;
        }
      })
      .catch((error) => {
        if (error) {
          state = false;
        }
      });
  }

  return state;
};

export const deleteState = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/states/${id}`, {
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

export const addState = async (name, country_id) => {
  const token = getToken();
  let state = false;

  if (name && country_id) {
    if (token) {
      await server
        .post(
          `/admin/states/`,
          { name, country_id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data) {
            state = response.data.data;
          } else {
            state = false;
          }
        })
        .catch((error) => {
          if (error) {
            state = false;
          }
        });
    }
  }

  return state;
};

export const updateState = async (id, name, country_id) => {
  const token = getToken();
  let state = false;

  if (id && name && country_id) {
    if (token) {
      await server
        .post(
          `/admin/states/${id}`,
          { name, country_id, _method: "PUT" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data) {
            state = response.data.data;
          } else {
            state = false;
          }
        })
        .catch((error) => {
          if (error) {
            state = false;
          }
        });
    }
  }

  return state;
};

export default getStates;
