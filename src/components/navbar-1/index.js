import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { FiSettings, FiMenu } from "react-icons/fi";
import Dropdown1 from "./dropdown-1";
import Dropdown3 from "./dropdown-3";
import Dropdown4 from "./dropdown-4";
import Dropdown5 from "./dropdown-5";
import ReactTooltip from "react-tooltip";

const Navbar = () => {
  const { config } = useSelector(
    (state) => ({
      config: state.config,
    }),
    shallowEqual
  );
  let { rightSidebar, collapsed } = { ...config };
  const dispatch = useDispatch();

  return (
    <div className="navbar navbar-1 border-b">
      <div className="navbar-inner w-full flex items-center justify-start">
        <button
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "collapsed",
              value: !collapsed,
            })
          }
          className="mx-4"
        >
          <FiMenu size={20} data-tip="Toggle Sidebar" />
        </button>
        <span className="ml-auto"></span>
        {false && <Dropdown1 />}

        <Dropdown4 />
        <Dropdown3 />
        <Dropdown5 />
        <button
          className="btn-transparent flex items-center justify-center h-16 w-8 mx-4"
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "rightSidebar",
              value: !rightSidebar,
            })
          }
        >
          <FiSettings size={18} data-tip="UI Customization" />
          <ReactTooltip />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
