import Head from "next/head";
import { useSelector, shallowEqual } from "react-redux";
import Navbar1 from "../../components/navbar-1";
import LeftSidebar1 from "../../components/left-sidebar-1";
import RightSidebar1 from "../../components/right-sidebar-1";
import { useEffect } from "react";
import { useRouter } from "next/router";
import getUser from "../../lib/authentication";

const Admin = ({ children }) => {
  const router = useRouter();
  const { config, palettes } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
    }),
    shallowEqual
  );
  const { layout, collapsed } = { ...config };
  let { background, navbar, leftSidebar, rightSidebar } = {
    ...palettes,
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (!user) {
        router.push("/admin");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Rent a Roof</title>
      </Head>
      <div
        data-layout={layout}
        data-collapsed={collapsed}
        data-background={background}
        data-navbar={navbar}
        data-left-sidebar={leftSidebar}
        data-right-sidebar={rightSidebar}
        className={`font-sans antialiased text-sm disable-scrollbars ${
          background === "dark" ? "dark" : ""
        }`}
      >
        <RightSidebar1 />
        <div className="wrapper">
          <LeftSidebar1 />
          <div className="main w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
            <Navbar1 />
            <div className="min-h-screen w-full p-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
