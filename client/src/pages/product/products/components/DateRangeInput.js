import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeInput = ({
  value,
  value2,
  valueErr,
  info,
  handleDateChange,
  handleDateChange2
}) => {
  return (
    <div className="col-xs-12 col-md-5 d-inline-block py-0 my-0">
      <div className="input-group d-flex justify-content-between">
        <span className="pr-2">
          <label className="p-0 m-0">
            <small>Starting Date</small>
          </label>
          <DatePicker
            className="form-control"
            selected={value}
            onChange={handleDateChange}
          />
        </span>

        <span>
          <label className="p-0 m-0">
            <small>Ending Date</small>
          </label>
          <DatePicker
            className="form-control"
            selected={value2}
            onChange={handleDateChange2}
          />
        </span>
      </div>

      <div>
        {!valueErr ? (
          <small className="form-text text-muted py-0 my-0 pl-2 pt-1 ">
            {info}
          </small>
        ) : (
          <small
            className="form-text py-0 my-0 pl-2 pt-1"
            style={{ color: "red" }}
          >
            {valueErr}
          </small>
        )}
      </div>
    </div>
  );
};

export default DateRangeInput;
