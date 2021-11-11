import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Alert from "../../components/alerts/";
import { useRouter } from "next/router";
import getUser, {
  loginUser,
  removeAuthToken,
  setAuthToken,
} from "../../lib/authentication";
import { FiAlertCircle } from "react-icons/fi";
import Loader from "../../components/loader";
import { useDispatch } from "react-redux";

function Index() {
  const [verror, setVError] = useState(false);
  const [loggedIn, setLoggedIn] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await getUser();
      if (response?.user) {
        router.push("/admin/dashboard");
      } else {
        removeAuthToken();
      }
    })();
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    submitForm(email.current.value, password.current.value);
  };

  const submitForm = async (email, password) => {
    const response = await loginUser(email, password);
    if (setAuthToken(response?.access_token)) {
      setLoggedIn(true);
      setVError(false);
      setIsLoading(false);
      dispatch({
        type: "SET_CONFIG_KEY",
        key: "user",
        value: {
          user_id: response?.user?.id,
          name: response.user?.fullname,
          email: response.user?.email,
          role: response.user?.role,
          permissions: response.user?.permissions || [],
          profile_pic: response.user?.profile_pic,
        },
      });
      router.push("/admin/dashboard");
    } else if (response?.error) {
      setVError(response.error);
      setIsLoading(false);
    } else {
      setVError({ message: response.message });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin | Login</title>
      </Head>
      <div className="flex items-center flex-col p-10 bg-white shadow-md">
        <h1 className="text-2xl mb-5">Admin Login</h1>
        {verror && (
          <div className="errors">
            {Object.keys(verror).map((index, i) => (
              <div className="w-full mb-2" key={i}>
                <Alert
                  icon={<FiAlertCircle className="mr-2" />}
                  color="bg-white border-red-500 text-red-500"
                  borderLeft
                  raised
                >
                  {verror[index]}
                </Alert>
              </div>
            ))}
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
        {isLoading && <Loader />}
      </div>
    </>
  );
}

export default Index;
