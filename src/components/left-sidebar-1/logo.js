import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Link from "next/link";

const Logo = () => {
  const dispatch = useDispatch();
  const { config, leftSidebar } = useSelector(
    (state) => ({
      config: state.config,
      leftSidebar: state.leftSidebar,
    }),
    shallowEqual
  );
  const { collapsed } = { ...config };
  const { showLogo } = { ...leftSidebar };
  if (showLogo) {
    return (
      <div className="logo truncate">
        <Link href="/admin/dashboard">
          <a
            className="flex items-center py-2 bg-white"
            style={{ height: "52px" }}
          >
            <img
              src="/logos/logo-icon.png"
              alt="logo"
              className="h-8 object-contain"
            />

            <p
              className="uppercase text-xl mt-2"
              style={{ fontFamily: "Opensans-bold" }}
            >
              <span style={{ color: "var(--blue)" }}>Rent a</span>
              <span style={{ color: "var(--orange)" }}> Roof</span>
            </p>
          </a>
        </Link>
        <button
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "collapsed",
              value: !collapsed,
            })
          }
          className="ml-auto mr-4 block lg:hidden"
        >
          <FiMenu size={20} />
        </button>
      </div>
    );
  }
  return null;
};

export default Logo;
