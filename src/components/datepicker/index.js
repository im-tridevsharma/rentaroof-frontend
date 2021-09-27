import React from "react";
import Datetime from "react-datetime";
import moment from "moment";

const Datepicker = (props) => {
  return (
    <Datetime
      value={props.value && moment(props.value).format("DD-MM-YYYY")}
      dateFormat="DD-MM-YYYY"
      timeFormat={false}
      input={true}
      inputProps={{
        className: "form-input",
        placeholder: "Select date",
        name: props.name,
      }}
      viewMode={"days"}
    />
  );
};

export default Datepicker;
