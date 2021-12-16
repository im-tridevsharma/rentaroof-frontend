import { useRouter } from "next/router";
import Centered from "./centered";
import Empty from "./empty";
import Admin from "./admin";

const Layouts = ({ children }) => {
  const router = useRouter();
  let { pathname } = { ...router };

  if (["/404", "/500"].includes(pathname)) {
    return <Centered>{children}</Centered>;
  }

  if ("/admin" === pathname || "/admin/employee" === pathname) {
    return <Centered>{children}</Centered>;
  }

  if (
    [
      "/contact-us-1",
      "/create-account",
      "/email-confirmation",
      "/admin/logout",
      "/reset-password",
      "/forgot-password",
      "/lock-screen",
      "/subscribe",
      "/error-page",
      "/coming-soon",
      "/admin/forgot-password",
    ].includes(pathname)
  ) {
    return <Centered>{children}</Centered>;
  } else if (
    pathname.includes("/admin") ||
    pathname.includes("/admin/employee")
  ) {
    return <Admin>{children}</Admin>;
  } else {
    return <Empty>{children}</Empty>;
  }
};

export default Layouts;
