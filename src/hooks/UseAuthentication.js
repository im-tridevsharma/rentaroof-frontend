import { useEffect } from "react";
import { useRouter } from "next/router";
import isAuthenticated from "../lib/frontend/auth";
import Cookies from "universal-cookie";
import { __d } from "../server";

function UseAuthentication() {
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    const role =
      localStorage.getItem("LU") &&
      JSON.parse(__d(localStorage.getItem("LU")))?.role;

    if (!role) {
      cookies.remove("_SYNC_");
      cookies.remove("surole");
      router.push("/login");
    }

    if (!isAuthenticated()) {
      router.push("/login");
    } else if (role && router.route === "/login") {
      router.push(`/${role}/dashboard`);
    } else if (!router.route.includes(role)) {
      router.push(`/${role}/dashboard`);
    }
  }, []);

  return { isAuthenticated: isAuthenticated() };
}

export default UseAuthentication;
