function Input(props) {
  const {
    label,
    sublabel,
    type,
    name,
    error,
    errsetter,
    v,
    vsetter,
    options,
    required,
    onBlur,
  } = props;
  return (
    <>
      <div className="form-element">
        <div className="form-label">
          {label}
          {sublabel && <small className="text-gray-500">({sublabel})</small>}
          {required && <span className="text-red-500">*</span>}
        </div>
        {type !== "select" && type !== "textarea" ? (
          <input
            type={type}
            className={`form-input ${
              error[name] ? "border-red-400 border-2" : ""
            }`}
            onChange={(e) => {
              if (required) {
                e.target.value !== ""
                  ? errsetter({ ...error, [name]: false })
                  : errsetter({ ...error, [name]: true });
              }
              vsetter({ ...v, [name]: e.target.value });
            }}
            value={v[name] || ""}
            onBlur={onBlur}
          />
        ) : type === "select" ? (
          <select
            className={`form-input ${
              error[name] ? "border-red-400 border-2" : ""
            }`}
            onChange={(e) => {
              if (required) {
                e.target.value !== ""
                  ? errsetter({ ...error, [name]: false })
                  : errsetter({ ...error, [name]: true });
              }
              vsetter({ ...v, [name]: e.target.value });
            }}
            value={v[name] || ""}
          >
            <option value="">Select</option>
            {options &&
              options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
          </select>
        ) : (
          <textarea
            className={`form-input ${
              error[name] ? "border-red-400 border-2" : ""
            }`}
            onChange={(e) => {
              if (required) {
                e.target.value !== ""
                  ? errsetter({ ...error, [name]: false })
                  : errsetter({ ...error, [name]: true });
              }
              vsetter({ ...v, [name]: e.target.value });
            }}
            value={v[name] || ""}
          ></textarea>
        )}
      </div>
    </>
  );
}

export default Input;
