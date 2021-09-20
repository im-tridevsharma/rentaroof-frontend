import { useEffect } from "react";
import { useRouter } from "next/router";
import isAuthenticated from "../lib/frontend/auth";
import Cookies from "universal-cookie";
import { __d } from "../server";

function UseAuthentication() {
  const router = useRouter();
  const cookies = new Cookies();
  const role = __d(cookies.get("surole"));

  useEffect(() => {
    if (!role) {
      cookies.remove("_SYNC_");
      cookies.remove("surole");
    }
    !isAuthenticated()
      ? router.push("/login")
      : role
      ? router.push(`/${__d(cookies.get("surole"))}/dashboard`)
      : router.push("/login");
  }, []);

  return { isAuthenticated: isAuthenticated() };
}

export default UseAuthentication;
