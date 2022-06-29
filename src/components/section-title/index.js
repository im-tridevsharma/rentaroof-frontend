import PropTypes from "prop-types";

const SectionTitle = ({ title, subtitle, right = null }) => {
  return (
    <>
      <div
        className="section-title p-3 bg-white"
        style={{
          position: "fixed",
          top: "60px",
          width: "calc(100% - 256px)",
          right: 0,
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <div className="text-xs uppercase font-light text-gray-500">
              {title}
            </div>
            <div className="text-xl font-bold">{subtitle}</div>
          </div>
          {right}
        </div>
      </div>
      <div className="mb-20"></div>
    </>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.any,
  subtitle: PropTypes.any,
  right: PropTypes.any,
};
export default SectionTitle;
