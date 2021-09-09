import server from "../server";
import { getToken } from "./authentication";

const getEmployees = async () => {
  const token = getToken();
  let employees = false;

  if (token) {
    await server
      .get("/admin/employees", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        employees = response.data;
      })
      .catch((error) => {
        employees = error?.response?.data;
      });
  }

  return employees;
};

export const getEmployeeById = async (id) => {
  const token = getToken();
  let employee = false;

  if (id && token) {
    await server
      .get(`/admin/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        employee = response.data;
      })
      .catch((error) => {
        employee = error.response?.data;
      });
  }

  return employee;
};

export const deleteEmployee = async (id) => {
  const token = getToken();
  let res = false;

  if (id) {
    if (token) {
      await server
        .delete(`/admin/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          res = response.data;
        })
        .catch((error) => {
          res = error.response?.data;
        });
    }
  }

  return res;
};

export const addEmployee = async (data) => {
  const token = getToken();
  let employee = false;

  if (token) {
    await server
      .post(`/admin/employees/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        employee = response.data;
      })
      .catch((error) => {
        employee = error?.response?.data;
      });
  }

  return employee;
};

export const updateEmployee = async (id, data) => {
  const token = getToken();
  let employee = false;

  if (id && data) {
    if (token) {
      await server
        .post(`/admin/employees/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          employee = response.data;
        })
        .catch((error) => {
          employee = error?.response?.data;
        });
    }
  }

  return employee;
};

export const totalEmployee = async () => {
  const token = getToken();
  let count = false;

  if (token) {
    await server
      .get(`/admin/employees/total`, {
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

export default getEmployees;
