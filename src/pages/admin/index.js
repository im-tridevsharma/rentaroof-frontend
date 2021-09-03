import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Alert from "../../components/alerts/";
import { useRouter } from "next/router";
import getUser, {
  loginUser,
  refreshToken,
  setAuthToken,
} from "../../lib/authentication";

function Index() {
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (user) {
        router.push("/admin/dashboard");
      }
    })();
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.current.value) {
      setError("Please enter your email.");
      email.current.focus();
      return;
    }

    if (!password.current.value) {
      setError("Please enter your password.");
      password.current.focus();
      return;
    }

    if (email.current.value && password.current.value) {
      submitForm(email.current.value, password.current.value);
    }
  };

  const submitForm = async (email, password) => {
    const response = await loginUser(email, password);
    if (response.access_token) {
      if (setAuthToken(response.access_token)) {
        setLoggedIn(true);
        router.push("/admin/dashboard");
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Admin | Login</title>
      </Head>
      <div className="flex items-center flex-col p-10 bg-white shadow-md">
        <h1 className="text-2xl mb-5">Admin Login</h1>
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
        {loggedIn && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised
            >
              Loggedin! Redirecting to dashboard...
            </Alert>
          </div>
        )}
        <form method="POST" className="mt-2" onSubmit={handleLogin}>
          <div className="form-element">
            <label className="text-1xl text-gray-700 mb-1">Email</label>
            <input
              type="text"
              className="form-input rounded-sm"
              name="email"
              ref={email}
            />
          </div>
          <div className="form-element">
            <label className="text-1xl text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="form-input rounded-sm"
              name="password"
              ref={password}
            />
          </div>
          <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Index;
