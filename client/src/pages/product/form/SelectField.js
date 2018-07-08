import React from "react";
import Select from "react-select";

const SelectField = ({
  options,
  label,
  name,
  selectedId,
  cb,
  selectedOption
}) => {
  const selectOptions = [];

  // populate select element with option elements
  options.forEach((option, i) => {
    // Edit flow - check if an option was selected and saved before
    if (selectedId && selectedId === option._id) {
      return selectedOption.unshift({
        value: option._id,
        label: option[name]
      });
    }
    // non selected options are added
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

export default SelectField;
