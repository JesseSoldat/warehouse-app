import React from "react";

const SelectField = ({ options, label, name, selectedId, cb }) => {
  const selectOptions = [];
  const firstOption = [];
  const unSelected = "unSelected";
  const defaultOption = (
    <option key="default" value={unSelected}>
      Choose a {label}...
    </option>
  );

  options.forEach((option, i) => {
    // Edit flow - check if an option was selected and saved before
    if (selectedId && selectedId === option._id) {
      return firstOption.push(
        <option key={option._id} value={option._id}>
          {option[name]}
        </option>
      );
    }
  });

  return <div />;
};

export default SelectField;
