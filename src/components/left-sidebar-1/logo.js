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
  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  const { collapsed } = { ...config };
  const { showLogo } = { ...leftSidebar };
  if (showLogo) {
    return (
      <div className="truncate p-2 sticky top-0 bg-white z-40">
        <Link href="/admin/dashboard">
          <a
            className="flex items-center justify-center p-2 bg-white"
            style={{ height: "52px" }}
          >
            <img
              src={website?.logo || "/images/website/no_photo.png"}
              alt="logo"
              className="h-20 w-20 object-contain"
            />
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
