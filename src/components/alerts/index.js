import PropTypes from "prop-types";

const Alert = ({
  outlined = false,
  raised = false,
  rounded = false,
  borderLeft = false,
  icon = null,
  size = "default",
  color,
  children,
}) => {
  let css = [];
  css.push(color);
  if (outlined) css.push(`border border-current`);
  if (raised) css.push("shadow");
  if (rounded) css.push("rounded-lg");
  if (borderLeft) css.push("border-l-4 border-current");
  if (size === "sm") {
    css.push("p-2");
  } else {
    css.push("p-4");
  }
  css = css.join(" ");
  return (
    <div className={`w-full flex items-center justify-start p-4 ${css}`}>
      <div className="flex-shrink">{icon}</div>
      <div className="flex-grow">{children}</div>
      <div className="flex-shrink"></div>
    </div>
  );
};

Alert.propTypes = {
  color: PropTypes.string,
  outlined: PropTypes.bool,
  raised: PropTypes.bool,
  rounded: PropTypes.bool,
  icon: PropTypes.any,
  children: PropTypes.any,
};

export default Alert;
