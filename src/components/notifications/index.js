import React from "react";
import Portal from "../portal";
import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";

const Notifications = ({
  outerClassNames,
  innerClassNames,
  animation,
  icon,
  content,
  visible,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      {visible && (
        <Portal selector="#portal">
          <div className={`${outerClassNames} ${visible ? animation : ""}`}>
            <div
              className={`w-full flex items-center justify-start p-4 ${innerClassNames}`}
            >
              {icon && <div className="flex-shrink">{icon}</div>}
              <div className="flex-grow">{content}</div>
              <div className="flex-shrink">
                <button
                  onClick={() =>
                    dispatch({
                      type: "SET_CONFIG_KEY",
                      key: "notification",
                      value: {
                        content: "",
                        outerClassNames: "",
                        innerClassNames: "",
                        icon: "",
                        animation: "",
                        visible: false,
                      },
                    })
                  }
                  className="ml-auto flex items-center justify-center"
                >
                  <FiX className="stroke-current h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

Notifications.propTypes = {
  visible: PropTypes.bool,
  outerClassNames: PropTypes.string,
  innerClassNames: PropTypes.string,
  animation: PropTypes.string,
  icon: PropTypes.any,
  content: PropTypes.any,
};
export default Notifications;
