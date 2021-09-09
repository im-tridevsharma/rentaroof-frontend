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
          <a className="flex items-center justify-center w-full mt-8 -m-3">
            <Image src="/icons/ms-icon-150x150.png" width={70} height={70} />
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
