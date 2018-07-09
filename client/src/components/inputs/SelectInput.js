import React from "react";
import Select from "react-select";

const SelectInput = ({ options, label, cb, selectedOption }) => {
  const selectElement = (
    <div className="form-group mt-3">
      <label>
        <strong>{label}</strong>
      </label>
      <Select
        name="form-field-name"
        value={selectedOption}
        onChange={cb}
        options={options.options}
      />
    </div>
  );

  return selectElement;
};

export default SelectInput;
