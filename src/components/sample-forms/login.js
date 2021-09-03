import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Validation from "../forms/validation";
import Alert from "../alerts";

import Auth from "../../services/auth";
import { isAuth, setAuth } from "../../client";

const Login = ({ message = null }) => {
  const [data, setData] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isAuth()) {
      router.push("/admin/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async ({ email, password }) => {
    if (email && password) {
      const response = await Auth(email, password);
      if (response.status) {
        setData(true);
        setError("");
        if (response.data.access_token) {
          setAuth(response.data.access_token);
          router.push("/admin/dashboard");
        }
      } else {
        setData(false);
        setError(response.message);
      }
    }
  };

  let items = [
    {
      label: "Email",
      error: { required: "Please enter a valid email" },
      name: "email",
      type: "email",
      placeholder: "Enter you email",
    },
    {
      label: "Password",
      error: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Your password should have at least 8 characters",
        },
        maxLength: {
          value: 20,
          message: "Your password should have no more than 20 characters",
        },
      },
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];
  return (
    <>
      <div className="flex flex-col">
        {data && message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised
            >
              {message}
            </Alert>
          </div>
        )}

        {error && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-red-500 text-red-500"
              borderLeft
              raised
            >
              {error}
            </Alert>
          </div>
        )}
        <Validation items={items} onSubmit={onSubmit} btnLabel="Login" />
      </div>
    </>
  );
};

export default Login;
