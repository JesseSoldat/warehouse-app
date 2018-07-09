import React from "react";
import Select from "react-select";

const SelectInput = ({ options, label, name, cb, selectedOption }) => {
  const selectOptions = [];

  // populate select element with option elements
  options.forEach((option, i) => {
    selectOptions.push({
      value: option._id,
      label: option[name]
    });
  });

  const selectElement = (
    <div className="form-group mt-3">
      <label>
        <strong>{label}</strong>
      </label>
      <Select
        name="form-field-name"
        value={selectedOption}
        onChange={cb}
        options={selectOptions}
      />
    </div>
  );

  return selectElement;
};

export default SelectInput;
