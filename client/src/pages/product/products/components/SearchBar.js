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
      <div className="col-12">
        <SearchBarSelect
          searchOption={searchOption}
          searchOptionErr={searchOptionErr}
          onChangeSearchOption={onChangeSearchOption}
        />

        {searchType === "string" && (
          <SearchBarInput
            value={value}
            valueErr={valueErr}
            onChangeSearchValue={onChangeSearchValue}
          />
        )}

        {searchType === "number" && (
          <SearchBarInputNumber
            value={value}
            valueErr={valueErr}
            value2={value2}
            value2Err={value2Err}
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
