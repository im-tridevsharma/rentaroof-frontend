function CheckboxToggle({ label, name, onChange, data }) {
  return (
    <label htmlFor={name} className="flex items-center justify-between">
      <span>{label}</span>
      <label htmlFor={name}>
        <input
          type="checkbox"
          name={name}
          id={name}
          className="cursor-pointer"
          checked={
            typeof data === "object" &&
            data.filter((d) => d[name] === "yes").length > 0
              ? true
              : false
          }
          onChange={onChange}
        />
      </label>
    </label>
  );
}

export default CheckboxToggle;
