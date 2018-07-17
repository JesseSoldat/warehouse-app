import React from "react";

// components
import SearchBarSelect from "./SearchBarSelect";
import SearchBarInput from "./SearchBarInput";
import SearchBarInputNumber from "./SearchBarInputNumber";
import SearchBarBtn from "./SearchBarBtn";

const SearchBar = ({
  // option
  searchOption,
  searchOptionErr,
  // option CB
  onChangeSearchOption,
  // value
  value,
  valueErr,
  value2,
  value2Err,
  // value CB
  onChangeSearchValue,
  onChangeSearchValue2,
  // type
  searchType,
  // btn CB
  onSearchProduct,
  onResetFilter
}) => {
  return (
    <div className="row mb-3">
      <div className="col-12 d-flex">
        <SearchBarSelect
          searchOption={searchOption}
          searchOptionErr={searchOptionErr}
          info="Select an option to search by."
          onChangeSearchOption={onChangeSearchOption}
        />

        {searchType === "string" && (
          <SearchBarInput
            value={value}
            valueErr={valueErr}
            info="Enter the text you want to filter by."
            onChangeSearchValue={onChangeSearchValue}
          />
        )}

        {searchType === "number" && (
          <SearchBarInputNumber
            value={value}
            valueErr={valueErr}
            value2={value2}
            value2Err={value2Err}
            info="Enter a number or a range of two numbers."
            onChangeSearchValue={onChangeSearchValue}
            onChangeSearchValue2={onChangeSearchValue2}
          />
        )}

        {searchType === "date" && null}

        <SearchBarBtn
          onSearchProduct={onSearchProduct}
          onResetFilter={onResetFilter}
        />
      </div>
    </div>
  );
};

export default SearchBar;
