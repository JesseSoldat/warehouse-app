import React from "react";

// helpers
import searchBarFields from "../helpers/searchBarFields";

const SearchBarSelect = ({
  searchOption,
  searchOptionErr,
  onChangeSearchOption,
  reset
}) => {
  const options = searchBarFields.map(field => (
    <option key={field.value} value={field.value}>
      {field.name}
    </option>
  ));

  return (
    <div className="col-xs-12 col-md-4 d-inline-block py-0 my-0">
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="productSelect">
            Options
          </label>
        </div>
        <select
          id="optionSelect"
          className={
            searchOptionErr ? "custom-select is-invalid" : "custom-select"
          }
          id="productSelect"
          value={searchOption}
          style={{ height: "37.61px" }}
          onChange={onChangeSearchOption}
        >
          {options}
        </select>

        <div className="invalid-feedback">{searchOptionErr}</div>
      </div>
    </div>
  );
};

export default SearchBarSelect;
