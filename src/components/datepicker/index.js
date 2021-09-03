import React from "react";
import Datetime from "react-datetime";

const Datepicker = ({ name }) => {
  return (
    <Datetime
      defaultValue={new Date()}
      dateFormat="DD-MM-YYYY"
      timeFormat={false}
      input={true}
      inputProps={{
        className: "form-input",
        placeholder: "Select date",
        name,
      }}
      viewMode={"days"}
    />
  );
};

export default Datepicker;
