import Head from "next/head";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Navbar1 from "../../components/navbar-1";
import LeftSidebar1 from "../../components/left-sidebar-1";
import RightSidebar1 from "../../components/right-sidebar-1";
import { useEffect } from "react";
import { useRouter } from "next/router";
import getUser from "../../lib/authentication";
import Notifications from "../../components/notifications/";
import { FiAlertCircle } from "react-icons/fi";

const Admin = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { config, palettes } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
    }),
    shallowEqual
  );
  const { layout, collapsed, notification } = { ...config };
  let { background, navbar, leftSidebar, rightSidebar } = {
    ...palettes,
  };

  useEffect(() => {
    (async () => {
      const response = await getUser();
      if (!response?.user) {
        router.push("/admin");
      } else {
        dispatch({
          type: "SET_CONFIG_KEY",
          key: "notification",
          value: {
            content:
              response?.error || response?.message || response?.exception,
            outerClassNames: "bg-red-400",
            innerClassNames: "",
            icon: <FiAlertCircle className="mr-2" />,
            animation: "",
            visible:
              response?.error || response?.message || response?.exception
                ? true
                : false,
          },
        });
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
          <Notifications
            outerClassNames={notification?.outerClassNames}
            innerClassNames={notification?.innerClassNames}
            content={notification.content}
            visible={notification.visible}
            animation={notification.animation}
            icon={notification.icon}
          />
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
